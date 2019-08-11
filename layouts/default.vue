<template>
  <v-app :dark="isDark">
    <v-content>
      <v-container
        fluid
        pa-0
        ma-0
        grid-list-md
        :class="{ ...breakpointCssModifiers }">
        <transition
          name="page-transition"
          mode="out-in">
          <nuxt />
        </transition>
      </v-container>
    </v-content>

    <AppFooter />
  </v-app>
</template>

<script>
import layoutMixin from '~/utils/mixins/layout';

export default {
  mixins: [layoutMixin],
};
</script>
