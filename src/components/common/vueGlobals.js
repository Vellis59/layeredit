import Clipboard from 'clipboard';
import timeSvc from '../../services/timeSvc';
import store from '../../store';

// Export as a Vue 3 plugin
export default {
  install(app) {
    // Focus directive
    app.directive('focus', {
      mounted(el) {
        el.focus();
        const { value } = el;
        if (value && el.setSelectionRange) {
          el.setSelectionRange(0, value.length);
        }
      },
    });

    // Title directive
    const setElTitle = (el, title) => {
      el.title = title;
      el.setAttribute('aria-label', title);
    };
    app.directive('title', {
      beforeMount(el, { value }) {
        setElTitle(el, value);
      },
      updated(el, { value, oldValue }) {
        if (value !== oldValue) {
          setElTitle(el, value);
        }
      },
    });

    // Clipboard directive
    const createClipboard = (el, value) => {
      el.seClipboard = new Clipboard(el, { text: () => value });
    };
    const destroyClipboard = (el) => {
      if (el.seClipboard) {
        el.seClipboard.destroy();
        el.seClipboard = null;
      }
    };
    app.directive('clipboard', {
      beforeMount(el, { value }) {
        createClipboard(el, value);
      },
      updated(el, { value, oldValue }) {
        if (value !== oldValue) {
          destroyClipboard(el);
          createClipboard(el, value);
        }
      },
      unmounted(el) {
        destroyClipboard(el);
      },
    });

    // Global properties (replacement for Vue.filter in Vue 3)
    app.config.globalProperties.$formatTime = (time) =>
      timeSvc.format(time, store.state.timeCounter);
  },
};
