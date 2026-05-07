import type {FocusTrap} from 'focus-trap';

import type {ModalOptions, ModalRenderProps} from 'sentry/actionCreators/modal';
import {createStore} from 'sentry/stores/createStore';

import type {StrictStoreDefinition} from './types';

type Renderer = (renderProps: ModalRenderProps) => React.ReactNode;

type State = {
  options: ModalOptions;
  renderer: Renderer | null;
  focusTrap?: FocusTrap;
  triggerElement?: HTMLElement | null;
};

interface ModalStoreDefinition extends StrictStoreDefinition<State> {
  closeModal(): void;
  init(): void;
  openModal(renderer: Renderer, options: ModalOptions): void;
  reset(): void;
  setFocusTrap(focusTrap: FocusTrap): void;
}

const storeConfig: ModalStoreDefinition = {
  state: {renderer: null, options: {}},
  init() {
    this.reset();
  },

  getState() {
    return this.state;
  },

  reset() {
    this.state = {
      renderer: null,
      options: {},
      focusTrap: this.state.focusTrap,
    };
  },

  closeModal() {
    this.reset();
    this.trigger(this.state);
  },

  openModal(renderer: Renderer, options: ModalOptions) {
    const triggerElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.state = {renderer, options, focusTrap: this.state.focusTrap, triggerElement};
    this.trigger(this.state);
  },

  setFocusTrap(focusTrap: FocusTrap) {
    this.state = {
      ...this.state,
      focusTrap,
    };
  },
};

export const ModalStore = createStore(storeConfig);
