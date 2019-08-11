<template>
  <p>
    Профиль
    <v-chip
      label
      small
      :color="chip.color.bg"
      :text-color="chip.color.text">
      {{ formatted.profile }}
    </v-chip>,
    ширина <span>{{ formatted.sizeX }}</span> мм,
    высота <span>{{ formatted.sizeY }}</span> мм,
    <nobr>
      <v-chip
        label
        small
        :color="chip.color.bg"
        :text-color="chip.color.text">
        {{ formatted.material }}
      </v-chip>
      <strong>{{ formatted.fineness }}</strong> пробы,
    </nobr>
    <nobr>
      <strong>{{ formatted.grooves }}</strong>.
    </nobr>
    {{ formatted.diamonds }}.
    Размер
    <v-chip
      label
      small
      :color="chip.color.bg"
      :text-color="chip.color.text">
      {{ formatted.ringSize }}
    </v-chip>
  </p>
</template>

<script>
export default {
  props: {
    /**
     * Ключ модели
     * @type {String}
     */
    modelKey: {
      type: String,
      default: 'both',
    },

    /**
     * Параметры чипов
     * @type {Object}
     */
    chip: {
      type: Object,
      default: () => ({
        color: {
          bg: 'pink lighten-5',
          text: 'primary',
        }
      }),
    },
  },
  computed: {
    formatted() {
      return this.$store.getters.formattedOptions(this.modelKey);
    },
  },
};
</script>
