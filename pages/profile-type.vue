<template>
  <v-container
    fluid
    pa-0>
    <v-layout
      row
      wrap>
      <v-flex xs12>
        <v-item-group :value="activeType">
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
                v-for="type in profileTypes"
                :key="`ring-profile-${type}`"
                xs6
                sm3>
                <v-item
                  :class="{
                    'v-item': true,
                    'v-item--active': type === activeType,
                    'py-3': true,
                  }"
                  :value="type">
                  <v-card
                    slot-scope="{ active, toggle }"
                    v-ripple="{ class: 'secondary--text' }"
                    flat
                    ripple
                    hover
                    height="100%"
                    @click="
                      toggle();
                      setOptionsModel('profileType', type);
                    ">
                    <div
                      :class="{
                        'caption text-xs-center ma-1': true,
                        'font-weight-bold primary--text': active,
                      }">
                      {{ type }}
                    </div>

                    <v-img
                      :src="require(`~/assets/images/profiles/${type}.png`)"
                      :width="83"
                      class="ma-auto"
                      contain
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
    profileTypes() {
      return this.$store.state.optionsList.profileTypes;
    },
    activeType() {
      return (this.optionsModel.profileType || this.profileTypes[0]).toUpperCase() || '';
    },
    validToNext() {
      return this.activeType !== '';
    },
  },
};
</script>
