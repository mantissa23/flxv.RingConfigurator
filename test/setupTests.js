import Vue from 'vue';
import Vuetify from 'vuetify';
import { config } from '@vue/test-utils';

// Vue.config.silent = true;
Vue.use(Vuetify);

config.stubs['nuxt'] = '<div><slot /></div>';
config.stubs['nuxt-link'] = '<a><slot /></a>';
config.stubs['no-ssr'] = '<span><slot /></span>';

config.mocks['$store'] = {
  state: {},
};
