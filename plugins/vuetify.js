import '@mdi/font/css/materialdesignicons.css';

import Vuetify, {
  VApp,
  VFooter,
  VNavigationDrawer,
  VToolbar
} from 'vuetify/lib';

import {
  Ripple
} from 'vuetify/lib/directives';
import Vue from 'vue';

// import ru from 'vuetify/es5/locale/ru';

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VToolbar,
  },
  directives: {
    Ripple,
  },
  theme: {
    primary: '#63003b',
    secondary: '#7f2346',
    accent: '#FFC107',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
  options: {
    customProperties: true,
  },
  iconfont: 'mdi',
  icons: {
    'prev-page': 'mdi-page-previous-outline',
    'next-page': 'mdi-page-next-outline',
    'step-forward': 'mdi-step-forward',
    'arrow-left': 'mdi-arrow-left',
    'arrow-right': 'mdi-arrow-right',
    'open-in-new': 'mdi-open-in-new',
    'open-in-app': 'mdi-open-in-app',
    'call-made': 'mdi-call-made',
    'edit-list': 'mdi-playlist-edit',
    'edit-page': 'mdi-square-edit-outline',
    'check-bold': 'mdi-check-bold',
    'progress-check': 'mdi-progress-check',
    'save-move': 'mdi-content-save-move-outline',
    'phone-android': 'mdi-cellphone-android',
    'user-comment': 'mdi-comment-account-outline',
    'user-check': 'mdi-account-check-outline',
    'backup-restore': 'mdi-backup-restore',
    'card-bulleted': 'mdi-card-bulleted-outline',
    'tune': 'mdi-tune',
    'refresh': 'mdi-refresh',
    'share': 'mdi-share',
    'send': 'mdi-send',
    'ring': 'mdi-ring',
    'at': 'mdi-at',
  },
  /*
    lang: {
      locales: { ru },
      current: 'ru'
    }, */
});
