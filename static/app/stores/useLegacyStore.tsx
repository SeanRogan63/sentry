import {useCallback, useSyncExternalStore} from 'react';

interface LegacyStoreShape {
  getState(): any;
  listen(callback: () => void, context: any): () => void;
}

/**
 * Returns the state of a legacy store. Automatically unsubscribes when destroyed
 *
 * ```tsx
 * const teams = useLegacyStore(TeamStore);
 * ```
 *
 * @link https://react.dev/reference/react/useSyncExternalStore
 */
export function useLegacyStore<T extends LegacyStoreShape>(
  store: T
): ReturnType<T['getState']> {
  const listener = useCallback(
    (fn: () => void) => {
      // Pass undefined to 2nd listen argument otherwise it explodes
      return store.listen(fn, undefined);
    },
    [store]
  );

  return useSyncExternalStore(listener, store.getState);
}
