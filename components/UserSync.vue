<template>
  <v-layout
    row
    wrap>
    <v-flex xs12>
      <v-alert
        :value="isSynced"
        transition="slide-y-transition"
        type="success">
        Ваши изделия успешно синхронизированы.

        <v-btn @click.prevent="reset">
          <v-icon
            left
            v-text="$vuetify.icons['edit-page']"></v-icon>
          Изменить e-mail
        </v-btn>

        <v-btn
          v-if="linkToApp"
          nuxt
          :to="linkToApp">
          Перейти в конструктор
          <v-icon
            right
            v-text="$vuetify.icons['open-in-app']"></v-icon>
        </v-btn>
      </v-alert>

      <v-slide-y-transition>
        <form
          v-if="!isSynced"
          name="user-sync"
          novalidate
          @submit.prevent="submit">
          <v-layout
            row
            wrap>
            <v-flex grow>
              <v-text-field
                v-model.trim="$v.email.$model"
                label="Укажите свой e-mail"
                :prepend-inner-icon="$vuetify.icons['at']"
                required
                clearable
                @input="$v.email.$touch()"></v-text-field>
            </v-flex>
            <v-flex shrink>
              <v-btn
                :id="submitButtonId"
                :disabled="$v.$invalid"
                :class="`px-${$v.$invalid ? 3 : 5}`"
                large
                type="submit"
                color="primary">
                {{ submitButtonText }}
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-slide-y-transition>
    </v-flex>

    <v-snackbar
      v-model="snackbar.value"
      :color="snackbar.color"
      right
      top
      @click="snackbar.value = false">
      <div>
        {{ snackbar.message }}
      </div>
    </v-snackbar>
    </form>
  </v-layout>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import formMixin from '~/utils/mixins/form';

export default {
  mixins: [formMixin],
  props: {
    /**
     * Сброс состояния на старте
     * @type {Boolean}
     */
    resetIsSynced: {
      type: Boolean,
      default: false,
    },

    /**
     * Адрес запроса
     * @type {String}
     */
    apiUrl: {
      type: String,
      default: '/site/user/input/',
    },

    /**
     * Путь к конструктору
     * @type {Object|String}
     */
    linkToApp: {
      type: [Object, String],
      default: null,
    },

    /**
     * ID кнопки отправки формы
     * @type {String}
     */
    submitButtonId: {
      type: String,
      default: 'user-sync-submitter',
    },

    /**
     * Текст кнопки отправки формы
     * @type {String}
     */
    submitButtonText: {
      type: String,
      default: 'Синхронизировать',
    },
  },
  data: () => ({
    email: '',

    snackbar: {
      value: false,
      message: '',
      color: 'info',
    },
  }),

  validations: {
    email: { required, email },
  },

  computed: {
    /**
     * Состояние синхронизации
     * @returns {Boolean}
     */
    isSynced() {
      return this.$store.state.userSynced;
    },
  },

  watch: {
    /* isSynced(val) {
      if (val === false) {
        this.snackbar.message = 'Синхронизация отменена';
        this.snackbar.value = true;
      }
    }, */
  },

  beforeMount() {
    if (this.resetIsSynced) {
      this.reset();
    }
  },

  methods: {
    /**
     * Сброс синхронизации
     */
    reset() {
      this.$store.dispatch('setUserSynced', false);
    },

    /**
     * Отправка запроса
     */
    async submit() {
      const vm = this;

      vm.$v.$touch();

      if (!vm.$v.$invalid) {
        const data = await vm.$axios.$get(vm.apiUrl, {
          params: {
            email: vm.$v.email.$model,
            optionsModel: '...want to POST'
            /* optionsModel: {
              man: vm.$store.getters.renderParams('man'),
              woman: vm.$store.getters.renderParams('woman'),
            }, */
          },
        });

        console.log(data);

        vm.$store.dispatch('setUserSynced', true);
      }
    },
  },
};
</script>
