import {createStore} from 'sentry/stores/createStore';
import type {StrictStoreDefinition} from 'sentry/stores/types';
import type {SentryAppInstallation} from 'sentry/types/integrations';

interface SentryAppInstallationStoreDefinition extends StrictStoreDefinition<
  SentryAppInstallation[]
> {
  load(items: SentryAppInstallation[]): void;
}

const storeConfig: SentryAppInstallationStoreDefinition = {
  state: [],
  init() {
    this.state = [];
  },

  getState() {
    return this.state;
  },

  load(items: SentryAppInstallation[]) {
    this.state = items;
    this.trigger(items);
  },
};

export const SentryAppInstallationStore = createStore(storeConfig);
