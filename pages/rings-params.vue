<template>
  <v-container
    fluid
    pa-0
    grid-list-lg>
    <v-layout
      row
      wrap>
      <v-flex xs12>
        <v-card>
          <v-list
            two-line
            subheader>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                  <div class="title font-weight-light primary--text">
                    Кольцо для нее
                  </div>
                </v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-progress-circular
                  v-if="womanCost === 0"
                  indeterminate
                  color="primary"
                  size="24"
                ></v-progress-circular>
                <div v-else class="title font-weight-light primary--text">
                  {{ womanCost | formatCost }} P
                </div>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>

          <v-card-text class="pt-0">
            <ring-params model-key="woman" />
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card>
          <v-list
            two-line
            subheader>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                  <div class="title font-weight-light primary--text">
                    Кольцо для него
                  </div>
                </v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-progress-circular
                  v-if="manCost === 0"
                  indeterminate
                  color="primary"
                  size="24"
                ></v-progress-circular>
                <div v-else class="title font-weight-light primary--text">
                  {{ manCost | formatCost }} P
                </div>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>

          <v-card-text class="pt-0">
            <ring-params model-key="man" />
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12>
        <v-card flat>
          <v-list
            two-line
            subheader>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                  <div class="title primary--text">
                    Итого
                  </div>
                </v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-progress-circular
                  v-if="totalCost === 0"
                  indeterminate
                  color="primary"
                  size="32"
                ></v-progress-circular>
                <div v-else class="display-1 font-weight-thin primary--text">
                  {{ totalCost | formatCost }} P
                </div>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>

      <order />
    </v-layout>
  </v-container>
</template>

<script>
import stepMixin from '~/utils/mixins/step';
import RingParams from '~/components/RingParams';
import Order from '~/components/Order';
import formatCost from '~/utils/filters/formatCost';
import jsYaml from 'js-yaml';

export default {
  components: {
    RingParams,
    Order,
  },

  filters: {
    formatCost,
  },

  mixins: [stepMixin],

  data: () => ({
    /**
     * Видимость формы синхронизации
     * @type {Boolean}
     */
    syncFormVisibility: false,
  }),

  fetch ({ env, store }) {
    const { BASE_URL } = env;
    fetch(`${BASE_URL}data/size-on-weight.yml`)
      .then(r => r.text())
      .then(text => {
        store.dispatch('setWeightOnSize', jsYaml.load(text));
      });
  },

  computed: {
    womanCost() {
      return this.$store.getters.itemCost('woman');
    },

    manCost() {
      return this.$store.getters.itemCost('man');
    },

    totalCost() {
      return Number((this.womanCost + this.manCost).toFixed(0));
    },

    validToNext() {
      return true;
    },
  },
};
</script>

<style lang="stylus" scoped>
.v-list
  &__tile
    &__title
      border-bottom: 1px dotted var(--v-primary-base)
</style>
