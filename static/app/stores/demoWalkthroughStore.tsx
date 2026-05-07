import {createStore} from 'sentry/stores/createStore';
import type {StoreDefinition} from 'sentry/stores/types';
import {OnboardingTaskKey} from 'sentry/types/onboarding';

interface DemoWalkthroughStoreDefinition extends StoreDefinition {
  activateGuideAnchor(guide: string): void;
  get(guide: string): boolean;
}

const storeConfig: DemoWalkthroughStoreDefinition = {
  issueGuideAnchor: false,
  sidebarGuideAnchor: false,
  init() {},

  activateGuideAnchor(task: OnboardingTaskKey) {
    switch (task) {
      case OnboardingTaskKey.ISSUE_GUIDE:
        this.issueGuideAnchor = true;
        this.trigger(this.issueGuideAnchor);
        break;
      case OnboardingTaskKey.SIDEBAR_GUIDE:
        this.sidebarGuideAnchor = true;
        this.trigger(this.sidebarGuideAnchor);
        break;
      default:
    }
  },

  get(guide: string) {
    switch (guide) {
      case 'issue':
        return this.issueGuideAnchor;
      case 'sidebar':
        return this.sidebarGuideAnchor;
      default:
        return false;
    }
  },
};

/**
 * This store is used to hold local user preferences
 * Side-effects (like reading/writing to cookies) are done in associated actionCreators
 */
export const DemoWalkthroughStore = createStore(storeConfig);
