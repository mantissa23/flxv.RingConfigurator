import AppFooter from '~/components/AppFooter';

export default {
  components: {
    AppFooter
  },

  data: () => ({
    /**
     * Основной контейнер
     * @type {String}
     */
    containerPrefix: 'container--',
  }),

  computed: {
    isDark() {
      return this.$store.state.vAppTheme === 'dark';
    },

    breakpoint() {
      return this.$vuetify.breakpoint;
    },

    /**
     * Модификаторы по брикпоинтам для контейнера
     * @returns {Object}
     */
    breakpointCssModifiers() {
      const vm = this;
      const bpoint = vm.breakpoint;
      const prefix = vm.containerPrefix;

      return {
        [`${prefix}${bpoint.name}`]: true,
        [`${prefix}ultra-wide`]: bpoint.xlOnly,
        [`${prefix}desktop`]: bpoint.lgAndUp,
        [`${prefix}tablet`]: bpoint.mdAndDown,
        [`${prefix}handset`]: bpoint.xsOnly,
      };
    },
  },
};
