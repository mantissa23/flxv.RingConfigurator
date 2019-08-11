<template>
  <v-container
    fluid
    pa-0>
    <v-layout
      row
      wrap>
      <v-flex xs12>
        <v-item-group :value="activeGrooves">
          <v-container
            fluid
            grid-list-md
            pa-0>
            <v-layout
              align-space-around
              justify-space-around
              wrap
              row
              fill-height>
              <v-flex
                v-for="(val, key) in grooves"
                :key="`grooves-${key}`"
                xs6
                md3>
                <v-item
                  :class="{
                    'v-item': true,
                    'v-item--active': key === activeGrooves,
                    'py-2': true,
                  }"
                  :value="key">
                  <v-card
                    slot-scope="{ active, toggle }"
                    v-ripple="{ class: 'secondary--text' }"
                    flat
                    ripple
                    hover
                    height="100%"
                    @click="
                      toggle();
                      setOptionsModel('grooves', key);
                    ">
                    <div
                      :class="{
                        'caption text-xs-center ma-1': true,
                        'font-weight-bold primary--text': active,
                      }">
                      {{ val }}
                    </div>

                    <v-img
                      class="ma-auto"
                      :max-width="110"
                      :src="require(`~/assets/images/grooves/${key}.png`)"
                      transition="slide-y-transition">
                      <template #placeholder>
                        <v-layout
                          fill-height
                          align-center
                          justify-center
                          ma-0>
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-2" />
                        </v-layout>
                      </template>
                    </v-img>
                  </v-card>
                </v-item>
              </v-flex>
            </v-layout>
          </v-container>
        </v-item-group>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import stepMixin from '~/utils/mixins/step';

export default {
  mixins: [stepMixin],

  computed: {
    grooves() {
      return this.$store.state.optionsList.grooves;
    },
    activeGrooves() {
      return this.optionsModel.grooves || Object.keys(this.grooves)[0];
    },

    validToNext() {
      return this.activeGrooves !== '';
    },
  },
};
</script>
