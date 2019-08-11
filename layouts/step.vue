<template>
  <v-app :dark="isDark">
    <v-content>
      <v-container
        fluid
        pa-0
        :class="{ ...breakpointCssModifiers }"
      >
        <v-layout
          justify-space-between
          row
          wrap
        >
          <v-flex
            ref="mainContainer"
            :grow="breakpoint.lgAndUp"
          >
            <v-container
              fluid
              py-0
              :pr-0="breakpoint.lgAndUp"
            >
              <v-layout column>
                <v-flex
                  v-if="breakpoint.lgAndUp"
                  xs12
                  pt-3
                  class="page-header"
                >
                  <v-slide-x-transition
                    class="layout align-center justify-center row fill-height"
                    group
                    tag="div"
                  >
                    <v-flex
                      v-if="prevStep.route"
                      key="btn-back"
                      shrink
                    >
                      <v-btn
                        nuxt
                        :to="{ name: prevStep.route }"
                        flat
                        small
                        class="my-0"
                      >
                        &lt;
                        назад
                      </v-btn>
                    </v-flex>
                    <v-flex
                      key="route-title"
                      grow
                    >
                      <span class="title font-weight-light">
                        шаг
                        <span class="font-weight-medium">
                          {{ stepNum }}
                        </span>
                        из
                        <span class="font-weight-medium">
                          {{ stepsLen }}
                        </span></span>
                      <span
                        v-if="breakpoint.mdAndUp"
                        class="headline font-weight-regular pl-3"
                      >
                        {{ stepTitle }}
                      </span>
                    </v-flex>
                  </v-slide-x-transition>
                </v-flex>

                <v-flex xs12>
                  <embed3d />
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>

          <v-flex
            ref="navContainer"
            xs12
            md10
            offset-md1
            offset-lg0
            lg4
            :shrink="breakpoint.lgAndUp"
            flat
          >
            <v-container
              fluid
              py-3
              :pl-0="breakpoint.lgAndUp"
              :pa-0="breakpoint.mdAndDown"
            >
              <v-layout
                column
                wrap
              >
                <v-flex
                  xs12
                  pb-2
                >
                  <v-tabs
                    v-model="activeTab"
                    grow
                  >
                    <v-tabs-slider color="primary" />
                    <v-tab
                      v-for="(value, key) in tabsList"
                      :key="`gen-tab-${key}`"
                      :href="`#${key}`"
                    >
                      {{ value }}
                    </v-tab>
                  </v-tabs>
                </v-flex>

                <v-flex
                  xs12
                  py-2
                  :px-3="breakpoint.smAndDown"
                >
                  <v-card flat>
                    <v-card-title
                      v-if="breakpoint.mdAndDown"
                      primary-title
                      class="px-0 py-1"
                    >
                      <div class="headline font-weight-light">
                        {{ step.title }}
                      </div>
                    </v-card-title>

                    <v-flex
                      xs12
                      mt-3
                    >
                      <transition
                        name="blur-transition"
                        mode="out-in"
                      >
                        <Nuxt />
                      </transition>
                    </v-flex>

                    <v-card-actions class="justify-space-between mt-5 px-0">
                      <v-flex>
                        <div
                          v-if="prevStep.route"
                          class="mb-3"
                        >
                          <v-btn
                            nuxt
                            :to="{ name: prevStep.route }"
                            :small="breakpoint.smAndDown"
                          >
                            <v-icon
                              left
                              v-text="$vuetify.icons['arrow-left']"
                            ></v-icon>
                            Вернуться
                          </v-btn>
                        </div>
                        <div class="mb-3">
                          <v-btn
                            :small="breakpoint.smAndDown"
                            color="secondary"
                            outline
                            @click.prevent="$store.dispatch('resetOptionsModel')"
                          >
                            <v-icon
                              left
                              v-text="$vuetify.icons['refresh']"
                            ></v-icon>
                            Сбросить
                          </v-btn>
                        </div>
                      </v-flex>

                      <v-spacer />

                      <div class="mb-auto">
                        <v-btn
                          v-if="nextStep.route"
                          color="primary"
                          :large="breakpoint.smAndUp"
                          :small="breakpoint.xs"
                          :disabled="false"
                          nuxt
                          :to="{ name: nextStep.route }"
                        >
                          Продолжить

                          <v-icon
                            right
                            v-text="$vuetify.icons['arrow-right']"
                          ></v-icon>
                        </v-btn>
                      </div>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <AppFooter />
  </v-app>
</template>

<script>
import _keys from 'lodash-es/keys';
import layoutMixin from '~/utils/mixins/layout';
import Embed3d from '~/components/Embed3d';
// import DevPanel from '~/components/DevPanel';

const { TABS_ROUTING } = process.env;

export default {
  components: {
    Embed3d,
    // DevPanel,
  },

  mixins: [layoutMixin],

  computed: {
    tabsList() {
      return this.$store.state.tabsList;
    },

    firstTab() {
      return _keys(this.tabsList)[0];
    },

    activeTab: {
      get() {
        return this.$store.state.modelKey || this.firstTab;
      },
      set(payload) {
        const vm = this;
        const isDef = payload in vm.tabsList;
        const tab = isDef ? payload : vm.firstTab;

        vm.$store.dispatch('setModelKey', tab);

        if (+TABS_ROUTING) {
          vm.$router.replace({ query: { tab } });
        }

        if (!isDef && process.isDev) {
          console.error(`[layouts/step/activeTab]: '${payload}' is not defined in state.tabsList`);
        }
      },
    },

    stepIndex() {
      return this.$store.state.steps.findIndex(step => step.route === this.$route.name);
    },

    step() {
      return this.$store.state.steps[this.stepIndex] || {};
    },

    stepNum() {
      return this.stepIndex + 1;
    },

    stepTitle() {
      return this.step.title || '';
    },

    stepsLen() {
      return this.$store.state.steps.length;
    },

    prevStep() {
      return this.$store.state.steps[this.stepIndex - 1] || {};
    },

    nextStep() {
      return this.$store.state.steps[this.stepIndex + 1] || {};
    },
  },

  created() {
    const vm = this;
    const { tab } = vm.$route.query;

    if (tab) {
      vm.activeTab = tab;
    }
  },
};
</script>

<style lang="stylus">
.page-header
  padding: 0 0 14px
  border-bottom: solid 1px var(--v-primary-base)

  .v-btn--router
    transform: translateY(4px)

.v-tabs
  &__item
    &--active
      background-color: rgba(99, 0, 59, 0.1)
</style>
