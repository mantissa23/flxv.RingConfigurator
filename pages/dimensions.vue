<template>
  <v-container
    class="step-container"
    fluid
    pa-0
    :grid-list-lg="breakpoint.mdAndDown"
  >
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        sm6
        lg4
        offset-sm0
        offset-lg4
      >
        <v-combobox
          box
          background-color="grey lighten-4"
          label="Ширина профиля"
          :items="profileX"
          :value="valueX"
          @change="value => setOptionsModel('sizeX', value)"
        >
          <template
            slot="item"
            slot-scope="{ item }"
          >
            {{ item }}&nbsp;<small>мм</small>
          </template>
          <template
            slot="selection"
            slot-scope="{ item }"
          >
            {{ item }}&nbsp;<small>мм</small>
          </template>
        </v-combobox>
      </v-flex>

      <v-flex
        xs12
        sm6
        lg4
        offset-sm0
        offset-lg4
        :my-4="breakpoint.lgAndUp"
      >
        <v-combobox
          box
          background-color="white"
          label="Высота профиля"
          :items="profileY"
          :value="valueY"
          @change="value => setOptionsModel('sizeY', value)"
        >
          <template
            slot="item"
            slot-scope="{ item }"
          >
            {{ item }}&nbsp;<small>мм</small>
          </template>
          <template
            slot="selection"
            slot-scope="{ item }"
          >
            {{ item }}&nbsp;<small>мм</small>
          </template>
        </v-combobox>
      </v-flex>

      <v-flex xs12>
        <v-subheader
          class="subheading px-0"
          color="brown"
        >
          Размер {{ modelKey === 'man' ? 'мужского' : 'женского' }} кольца
        </v-subheader>

        <v-tabs
          color="brown lighten-5"
          show-arrows
          :value="activeSize"
          @change="val => setSize(modelKey, val)"
        >
          <v-tabs-slider color="primary" />

          <v-tab
            v-for="n in sizes"
            :key="`size-${n}`"
            :href="`#${n}`"
          >
            {{ n === '' ? 'не знаю размер' : n }}
          </v-tab>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import stepMixin from '~/utils/mixins/step';

export default {
  mixins: [stepMixin],

  computed: {
    profileX() {
      return this.$store.state.optionsList.profileX;
    },
    profileY() {
      return this.$store.state.optionsList.profileY;
    },
    valueX() {
      return this.optionsModel.sizeX || this.$store.getters.optionDefault('sizeX');
    },
    valueY() {
      return this.optionsModel.sizeY || this.$store.getters.optionDefault('sizeY');
    },
    sizes() {
      return this.$store.state.optionsList.sizes;
    },
    noSize() {
      return this.sizes[this.sizes.length - 1];
    },
    defaultSize() {
      return this.$store.getters.optionDefault('ringSize', this.modelKey);
    },
    activeSize() {
      return this.optionsModel.ringSize || this.$store.getters.optionDefault('ringSize') || vm.noSize;
    },
    validToNext() {
      return this.valueX !== '' && this.valueY !== '';
    },
  },

  methods: {
    setSize(modelKey, data) {
      this.$store.dispatch('setOptionsModel', {
        name: 'ringSize',
        data,
        modelKey,
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.step-container
  position: relative

  .container--desktop &
    background: url('~assets/images/size/repeat.png') repeat-x 0 25px

    &:before,
    &:after
      content: ''
      position: absolute
      top: 25px
      width: 221px
      height: 185px
      z-index: 1

    &:before
      left: 0
      background: url('~assets/images/size/left.png') no-repeat

    &:after
      right: 0
      background: url('~assets/images/size/right.png') no-repeat

    & > .layout
      position: relative
      z-index: 2
      background: url('~assets/images/size/center.png') no-repeat 50% 25px
</style>
