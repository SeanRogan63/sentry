/**
 * Loose store definition with an index signature, for stores that have
 * dynamic properties not captured in a typed interface.
 */
export interface StoreDefinition {
  [key: string]: any;
  init?(): void;
}

/**
 * All stores implementing this interface have a common getState which returns
 * the stores state.
 *
 * When a store implements this it becomes usable with the `useLegacyStore` hook.
 *
 * Does not have the `[key: string]: any;` index signature that `StoreDefinition` has.
 */
export interface StrictStoreDefinition<T> {
  /**
   * Returns the current state represented within the store
   */
  getState(): Readonly<T>;
  init(): void;
  state: Readonly<T>;
  /**
   * Trigger is not defined by the store definition, but is added by createStore
   * We could try to type this better, but would need to update all .listen calls
   */
  trigger?: any;
}
