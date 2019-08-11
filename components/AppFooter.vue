<template>
  <v-footer
    :app="$vuetify.breakpoint.mdAndUp"
    class="py-2">
    <v-flex
      xs12
      md6>
      <v-btn
        color="secondary"
        small
        flat
        target="_blank"
        href="https://feliksov.ru">
        <v-icon
          v-if="!$vuetify.breakpoint.xs"
          left
          v-text="$vuetify.icons['open-in-new']"></v-icon> На сайт feliksov.ru
      </v-btn>
    </v-flex>

    <v-flex
      xs12
      md6
      text-xs-right
      class="grey--text">
      &copy; {{ new Date().getFullYear() }} — Feliksov
    </v-flex>
  </v-footer>
</template>
