import {
  mapGetters
} from 'vuex';

export default {
  layout: 'step',

  head() {
    return {
      title: this.step.title,
    };
  },

  computed: {
    ...mapGetters([
      'optionValue',
      'optionDefault',
    ]),

    breakpoint() {
      return this.$vuetify.breakpoint;
    },

    stepIndex() {
      return this.$store.state.steps.findIndex(step => step.route === this.$route.name);
    },

    step() {
      return this.$store.state.steps[this.stepIndex] || {};
    },

    nextStep() {
      return this.$store.state.steps[this.stepIndex + 1] || {};
    },

    modelKey() {
      return this.$store.state.modelKey;
    },

    optionsModel() {
      const {
        optionsModel,
        modelKey
      } = this.$store.state;
      return optionsModel[modelKey] || optionsModel.both || {};
    },
  },

  methods: {
    /**
     * Добавление в стор модели опций кольца
     * @param {String} name
     * @param {String|Object} data
     */
    setOptionsModel(name, data) {
      this.$store.dispatch('setOptionsModel', {
        name,
        data
      });
    },
  },

  watch: {
    'optionsModel.sizeX': {
      handler(val) {
        if (Number(val) < 4) {
          this.setOptionsModel('diamondsRows', 1);
        }
      },
      immediate: true,
    },
  },
};
