<template>
  <v-container
    fluid
    grid-list-md
    pa-0>
    <v-slide-y-transition
      class="layout row wrap"
      group
      tag="div">
      <v-flex
        key="divisons"
        xs12
        mb-4>
        <v-item-group :value="activeValues.division">
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
                v-for="(val, key) in divisions"
                :key="`division-${key}`"
                xs6>
                <v-item
                  :class="{
                    'v-item': true,
                    'v-item--active': key === activeValues.division,
                    'py-1': true,
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
                      setOptionsModel('division', key);
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
                      :max-width="224"
                      :src="require(`~/assets/images/colors/${key}.png`)"
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

      <v-flex
        v-if="activeValues.division === 'm1m1'"
        key="materials"
        xs12>
        <v-select
          :items="materials"
          box
          label="Цвет золота"
          :value="activeValues.material1"
          @change="value => setOptionsModel('material1', value)"></v-select>
      </v-flex>

      <v-flex
        key="surfaces"
        xs12>
        <v-select
          :items="surfaces"
          box
          label="Вид обработки кольца"
          :value="activeValues.surface"
          @change="value => setOptionsModel('surface', value)"></v-select>
      </v-flex>

      <v-flex
        key="fineness"
        xs12>
        <v-subheader class="pl-0">
          Выберите пробу металла
        </v-subheader>

        <v-btn-toggle
          :value="activeValues.fineness"
          @change="value => setOptionsModel('fineness', value)">
          <v-btn
            v-for="val in fineness"
            :key="`fineness-${val}`"
            :value="val"
            :color="activeValues.fineness === val ? 'blue-grey lighten-4' : 'white'"
            large
            class="px-5">
            {{ val }}
          </v-btn>
        </v-btn-toggle>
      </v-flex>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import stepMixin from '~/utils/mixins/step';

export default {
  mixins: [stepMixin],

  data: () => ({
    defaultValues: {
      material1: 'yellow',
      surface: 'polished',
    },
  }),

  computed: {
    divisions() {
      return this.$store.state.optionsList.divisions;
    },
    materials() {
      return Object.entries(this.$store.state.optionsList.materials).map(([value, text]) => ({ value, text }));
    },
    surfaces() {
      const vm = this;
      const { material1 } = vm.activeValues;
      const { surfaces, materialToSurfaces } = vm.$store.state.optionsList;
      const one2many = materialToSurfaces[material1] || ['*'];

      return Object.entries(surfaces)
        .filter(e => one2many[0] === '*' || one2many.includes(e[0]))
        .map(([value, text]) => ({ value, text }));
    },
    fineness() {
      return this.$store.state.optionsList.fineness;
    },
    activeValues() {
      const vm = this;
      const opts = vm.optionsModel;

      return {
        division: opts.division || 'm1m1',
        material1: opts.material1 || vm.$store.getters.optionDefault('material1'),
        surface: opts.surface || vm.$store.getters.optionDefault('surface'),
        fineness: opts.fineness || vm.fineness[0],
      };
    },
    requiredFields() {
      const keys = ['divisions', 'material1', 'surface'];

      /* if (this.activeValues.division === 'm1m2') {
        keys.push('material2');
      } */

      return keys;
    },
    validToNext() {
      const vm = this;
      return Object.keys(vm.activeValues)
        .filter(key => vm.requiredFields.includes(key))
        .every(key => vm.activeValues[key] !== '');
    },
  },

  watch: {
    /**
     * Добавляем ключи материалов для мультизаливки
     */
    'activeValues.division'(val) {
      const { materials } = this.$store.state.optionsList;
      const keys = Object.keys(materials);

      if (val === 'm1m2') {
        this.setOptionsModel('material1', keys[0]);
        this.setOptionsModel('material2', keys[1]);
      }
    },

    /**
     * Сбрасываем цвет золота если он не связан с типом обработки
     */
    'activeValues.surface'(val) {
      const { material1 } = this.activeValues;
      const { materialToSurfaces } = this.$store.state.optionsList;
      const one2many = materialToSurfaces[val] || ['*'];

      if (val && one2many[0] !== '*' && !one2many.includes(material1)) {
        this.setOptionsModel('material1', '');
      }
    },
  },
};
</script>
