<template>
  <v-layout
    row
    py-5>
    <v-flex
      xs12
      text-xs-center>
      <div class="flex display-4 font-weight-black">
        {{ error.statusCode }}
      </div>
      <div class="headline">
        {{ errorStatusMessage }}
      </div>

      <v-btn
        depressed
        small
        nuxt
        to="/">
        на главную
      </v-btn>

      <v-divider
        inset
        class="mt-4 mb-2" />

      <div class="overline grey--text text--darken-1">
        {{ error.message }}
      </div>

      <!-- <v-btn color="warning" class="mt-5" nuxt to="/">На главную</v-btn> -->
    </v-flex>
  </v-layout>
</template>

<script>
const statusMessages = {
  0: 'Упс! Что-то сломалось :(',
  404: 'К сожалению, такой страницы у нас нет :('
};
export default {
  props: {
    error: {
      type: Object,
      default: () => ({
        message: 'Unknown',
      }),
    },
  },

  computed: {
    errorStatusMessage() {
      const { statusCode = 0 } = this.error;
      return statusMessages[statusCode] || statusMessages['0'];
    },
  },

  mounted() {
    this.$store.commit('SET_VAPP_THEME', 'dark');
  },

  beforeDestroy () {
    this.$store.commit('SET_VAPP_THEME', 'light');
  }
};
</script>
