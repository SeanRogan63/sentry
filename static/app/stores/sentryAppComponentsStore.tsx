import {createStore} from 'sentry/stores/createStore';
import type {StoreDefinition} from 'sentry/stores/types';
import type {SentryAppComponent} from 'sentry/types/integrations';

interface SentryAppComponentsStoreDefinition extends StoreDefinition {
  get: (uuid: string) => SentryAppComponent | undefined;
  getAll: () => SentryAppComponent[];
  getInitialState: () => SentryAppComponent[];
  init: () => void;
  loadComponents: (items: SentryAppComponent[]) => void;
}

const storeConfig: SentryAppComponentsStoreDefinition = {
  items: [],

  init() {
    this.items = [];
  },

  getInitialState() {
    return this.items;
  },

  loadComponents(items: SentryAppComponent[]) {
    this.items = items;
    this.trigger(items);
  },

  get(uuid: string) {
    const items: SentryAppComponent[] = this.items;
    return items.find(item => item.uuid === uuid);
  },

  getAll() {
    return this.items;
  },
};

export const SentryAppComponentsStore = createStore(storeConfig);
