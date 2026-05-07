import {createStore} from 'sentry/stores/createStore';
import type {StrictStoreDefinition} from 'sentry/stores/types';

type State = {
  requested: boolean;
};

interface TrialRequestedStoreInterface extends StrictStoreDefinition<State> {
  clearNotification(): void;
  requested(): void;
}

const storeConfig: TrialRequestedStoreInterface = {
  state: {
    requested: false,
  },

  init() {
    this.state = {requested: false};
  },

  requested() {
    this.state = {...this.state, requested: true};
    this.trigger(this.state);
  },

  clearNotification() {
    this.state = {...this.state, requested: false};
    this.trigger(this.state);
  },

  getState() {
    return this.state;
  },
};

export const TrialRequestedStore = createStore(storeConfig);
