<template>
  <v-container
    v-resize="keepOpacity"
    fluid
    pa-0
    class="embed3d-container"
    :style="{ opacity }"
    :pt-0="$vuetify.breakpoint.mdAndDown"
  >
    <v-layout
      justify-center
      row
      wrap
      fill-height
    >
      <v-flex md12>
        <div
          :id="containerId"
          :class="{
            'canvas-container': true,
            'canvas-container--fix2top': fixToTop,
          }"
        ></div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
let timer = 0;

export default {
  props: {
    /**
     * ID дом элемента
     * @type {String}
     */
    containerId: {
      type: String,
      default: 'canvas-container',
    },
  },

  data: () => ({
    opacity: 0,
    winScrollY: 0,
  }),

  computed: {
    containerEl() {
      return document.getElementById(this.containerId) || {};
    },
    optionsModel() {
      const { optionsModel, modelKey } = this.$store.state;
      return optionsModel[modelKey] || optionsModel.both || {};
    },
    fixToTop() {
      return this.winScrollY > 80;
    },
  },

  watch: {
    '$store.state.optionsModel': {
      handler() {
        const vm = this;

        vm.$nuxt.$loading.start();
        vm.$v3dProxy.update();
        vm.$nuxt.$loading.finish();
      },
      deep: true,
      immediate: false,
    },
  },

  mounted() {
    const vm = this;

    vm.$v3dProxy.init(vm.containerId);
    vm.keepOpacity();

    window.addEventListener('scroll', () => {
      this.winScrollY = window.scrollY;
    });
  },

  methods: {
    keepOpacity() {
      this.opacity = 0;
      clearTimeout(timer);

      timer = setTimeout(() => {
        this.opacity = 1;
      }, 500);
    },
  },
};
</script>

<style lang="stylus" scoped>
.embed3d-container
  height: auto

  .container--tablet &
    height: 170px
    margin: -10px auto -20px

  & >>> .canvas-container
    width: 100%
    max-width: 960px
    height: 493px
    margin: 0 auto

    &--fix2top
      // top: 0

    .container--desktop &
      min-width: 570px

    .container--tablet &
      height: 170px
      position: fixed
      left: 50%
      transform: translateX(-50%)
      z-index: 999
</style>
