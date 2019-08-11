<template>
  <v-container
    fluid
    pa-0
  >
    <v-slide-y-transition
      class="layout row wrap"
      group
      tag="div"
    >
      <v-flex
        key="diamonds"
        xs12
      >
        <v-item-group :value="diamondsPattern">
          <v-container
            fluid
            grid-list-md
            pa-0
          >
            <v-layout
              align-space-around
              justify-center
              wrap
              row
              fill-height
            >
              <v-flex
                v-for="val in diamondPatternList"
                :key="`diamond-pattern-${val}`"
                xs12
                sm6
              >
                <v-item
                  :class="{
                    'v-item': true,
                    'v-item--active': val === diamondsPattern,
                    'py-4': true,
                  }"
                  :value="val"
                >
                  <v-card
                    slot-scope="{ active, toggle }"
                    v-ripple="{ class: 'secondary--text' }"
                    flat
                    ripple
                    hover
                    @click="
                      toggle();
                      if (diamondsPattern !== val) {
                        setOptionsModel('diamondsPattern', val);
                        setOptionsModel('diamondsAmount', optionDefault('diamondsAmount'));
                        setOptionsModel('diamondsRows', optionDefault('diamondsRows'));
                      }"
                  >
                    <div
                      :class="{
                        'caption text-xs-center ma-1 mb-3': true,
                        'font-weight-bold primary--text': active,
                      }"
                    >
                      {{ val === 'none' ? 'Без камней' : '&nbsp;' }}
                    </div>

                    <v-img
                      class="ma-auto"
                      :max-width="110"
                      :src="require(`~/assets/images/diamonds/${val}.png`)"
                      transition="slide-y-transition"
                    >
                      <template #placeholder>
                        <v-layout
                          fill-height
                          align-center
                          justify-center
                          ma-0
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-2"
                          />
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
        v-if="diamondsPattern !== 'none'"
        key="selections"
        xs12
      >
        <v-card>
          <v-container
            fluid
            grid-list-xl
          >
            <v-layout
              wrap
              align-center
            >
              <v-flex
                v-if="false"
                xs12
                sm6
                d-flex
              >
                <v-select
                  :items="mockDiamondSizeList"
                  clearable
                  label="Размер бриллианта"
                >
                  <template
                    slot="selection"
                    slot-scope="{ item }"
                  >
                    {{ item }}&nbsp;<small>ct.</small>
                  </template>
                </v-select>
              </v-flex>

              <v-flex
                v-if="false"
                xs12
                sm6
                d-flex
              >
                <v-select
                  :items="mockDiamondQuantityList"
                  label="Качество бриллианта"
                >
                </v-select>
              </v-flex>

              <v-flex
                xs12
                sm6
                d-flex
              >
                <v-select
                  :items="diamondsAmountList"
                  :value="diamondsAmount"
                  clearable
                  label="Кол-во бриллиантов"
                  @change="value => setOptionsModel('diamondsAmount', value)"
                >
                </v-select>
              </v-flex>

              <v-flex
                v-if="availableRows"
                xs12
                sm6
                d-flex
              >
                <v-select
                  label="Кол-во рядов"
                  :value="diamondsRows"
                  :items="[1, 2]"
                  clearable
                  @change="value => setOptionsModel('diamondsRows', value)"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>

      <!--
      <v-flex
        v-if="diamondsPattern !== 'none'"
        key="stones-amount"
        xs12
        mt-5>
        <v-slider
          :disabled="encircled"
          :value="diamondsAmount"
          thumb-label="always"
          ticks="always"
          :min="1"
          :max="15"
          :step="diamondsRows"
          hint="Выберите кол-во камней"
          persistent-hint
          always-dirty
          @change="val => setOptionsModel('diamondsRows', val)"></v-slider>
      </v-flex>
      -->

      <!--
      <v-flex
        v-if="diamondsPattern !== 'none'"
        key="switch"
        xs12>
        <v-switch
          v-model="encircled"
          class="align-end justify-end my-0 body-2"
          label="По всей окружности"
          color="secondary"></v-switch>
      </v-flex>

      <v-flex
        v-if="diamondsPattern === 'section'"
        key="rows"
        class="justify-space-between"
        xs12>
        <v-flex
          xs4
          offset-xs8>
          <v-select
            background-color="white"
            label="Кол-во рядов"
            :items="[1, 2]"
            @change="value => setOptionsModel('diamondsRows', value)"></v-select>
        </v-flex>
      </v-flex>
      -->
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import _range from 'lodash-es/range';
import stepMixin from '~/utils/mixins/step';

export default {
  mixins: [stepMixin],

  data: () => ({
    mockDiamondSizeList: [
      0.05,
      0.06,
      0.07,
      0.08,
      0.09,
      0.010,
      0.015,
      0.020,
      0.025,
    ],

    mockDiamondQuantityList: [
      'G/SI',
      'G/VSI',
      'G/IF',
    ],
  }),

  computed: {
    diamondPatternList() {
      return this.$store.state.optionsList.diamondPatterns;
    },

    diamondsPattern() {
      return this.optionValue('diamondsPattern') || this.optionDefault('diamondsPattern');
    },

    diamondsAmount() {
      return this.optionValue('diamondsAmount') || this.optionDefault('diamondsAmount');
    },

    diamondsRows() {
      return this.optionValue('diamondsRows') || this.optionDefault('diamondsRows');
    },

    sizeX() {
      return this.optionValue('sizeX') || this.optionDefault('sizeX');
    },

    encircled: {
      get() {
        return (this.optionsModel.diamondsMode || 'user') === 'max';
      },
      set(val) {
        this.setOptionsModel('diamondsMode', val === true ? 'max' : 'user');
      },
    },

    validToNext() {
      return this.diamondsPattern !== '';
    },

    availableRows() {
      return this.sizeX >= 4 && this.diamondsPattern === 'section';
    },

    diamondsAmountList() {
      const vm = this;
      const ring = vm.$store.getters.renderParams(vm.modelKey);
      const total = Number(vm.$v3dProxy.call(['gems', 'getNumberGems', [ring, 'max']]).number);
      const rows = Number(vm.diamondsRows) || 1;
      const result = total * rows;
      const value = v => 2 * Math.floor(v / 2) + (rows > 1 && rows & 1 ? 1 : 0);

      return [
        { text: `Вокруг всего кольца (${value(result)})`, value: value(total) },
        { text: `Половина кольца (${value(result / 2)})`, value: value(total / 2) },
        { text: `Треть кольца (${value(result / 3)})`, value: value(total / 3) },
        ...(_range(rows, result, rows).map(v => ({ text: v, value: v / rows }))),
      ];
    },
  },
};
</script>
