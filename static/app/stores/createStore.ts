type Listener = (...args: any[]) => void;

interface StoreMixin {
  listen(callback: Listener, context: any): () => void;
  trigger(...args: any[]): void;
}

type RemoveIndex<T> = {
  [P in keyof T as string extends P ? never : P]: T[P];
};

/**
 * Minimal vendored version of `reflux` createStore
 *
 * @deprecated prefer built-in React Context
 */
export function createStore<T extends Record<string, any>>(
  definition: T
): RemoveIndex<StoreMixin & T> {
  const listeners = new Set<Listener>();

  const store: any = {
    ...definition,
    listen(callback: Listener, _context: any): () => void {
      listeners.add(callback);
      return () => {
        listeners.delete(callback);
      };
    },
    trigger(...args: any[]): void {
      for (const fn of listeners) {
        fn(...args);
      }
    },
  };

  for (const key of Object.keys(store)) {
    if (typeof store[key] === 'function') {
      store[key] = store[key].bind(store);
    }
  }

  store.init?.();

  return store;
}
