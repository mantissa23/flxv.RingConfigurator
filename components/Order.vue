<template>
  <v-container
    grid-list-xs
    pa-0
    ma-0>
    <v-slide-y-transition
      class="layout row wrap"
      group
      tag="div">
      <v-flex
        v-if="syncFormVisibility"
        key="sync-form"
        xs12>
        <user-sync
          :reset-is-synced="true"
          submit-button-text="Сохранить" />
      </v-flex>
      <v-flex
        v-if="orderNum !== 0"
        key="order-alert"
        xs12>
        <v-alert
          :value="true"
          type="success">
          Спасибо! Ваш заказ успешно оформлен.
          Номер заказа
          <span class="title pl-1">
            №{{ orderNum }}
          </span>
        </v-alert>
      </v-flex>
      <v-flex
        v-if="orderNum === 0 && orderFormVisibility"
        key="order-form"
        xs12>
        <form
          name="order-create"
          novalidate
          @submit.prevent="submit">
          <v-layout
            row
            wrap>
            <v-flex xs6>
              <v-text-field
                v-model.trim="$v.phone.$model"
                :prepend-inner-icon="$vuetify.icons['phone-android']"
                :disabled="loading"
                label="Ваш телефон"
                mask="(###) ###-##-##"
                placeholder="(000) 000-00-00"
                prefix="+7"
                required
                clearable
                @input="$v.phone.$touch()"></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                v-model.trim="$v.name.$model"
                :disabled="loading"
                :prepend-inner-icon="$vuetify.icons['user-check']"
                label="Ваше имя"
                required
                clearable
                @input="$v.name.$touch()"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-btn
                type="submit"
                color="primary"
                large
                block
                :loading="loading"
                :disabled="$v.$invalid || loading">
                Отправить
                <v-icon
                  right
                  v-text="$vuetify.icons['send']"></v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
      <v-flex
        v-if="!orderFormVisibility"
        key="sync-switcher"
        xs12
        sm6>
        <v-btn
          color="white"
          large
          block
          :disabled="syncFormVisibility"
          @click.prevent="syncFormVisibility = true">
          Сохранить мои изделия
          <v-icon
            right
            v-text="$vuetify.icons['save-move']"></v-icon>
        </v-btn>
      </v-flex>

      <v-flex
        v-if="!orderFormVisibility"
        key="order-switcher"
        xs12
        sm6>
        <v-btn
          color="primary"
          large
          block
          @click.prevent="orderFormVisibility = true">
          Оформить заказ
          <v-icon
            right
            v-text="$vuetify.icons['progress-check']"></v-icon>
        </v-btn>
      </v-flex>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import UserSync from '~/components/UserSync.vue';
import formMixin from '~/utils/mixins/form';

export default {
  components: {
    UserSync,
  },

  mixins: [formMixin],

  props: {
    /**
     * Адрес запроса
     * @type {String}
     */
    apiUrl: {
      type: String,
      default: '/site/order/constructor/create/',
    },
  },

  data: () => ({
    loading: false,

    phone: '',
    name: '',

    /**
     * Видимость формы синхронизации
     * @type {Boolean}
     */
    syncFormVisibility: false,

    /**
     * Видимость формы оформления
     * @type {Boolean}
     */
    orderFormVisibility: false,

    /**
     * Номер оформленного заказа
     * @type {Number}
     */
    orderNum: 0,
  }),

  validations: {
    phone: { required },
    name: { required },
  },

  methods: {
    submit() {
      const vm = this;

      vm.$v.$touch();

      if (!vm.$v.$invalid) {
        vm.loading = true;
        vm.send();
      }
    },

    async send() {
      const vm = this;
      const params = {
        user: {
          phone: vm.$v.phone.$model,
          name: vm.$v.name.$model,
        },
        optionsModel: {
          man: vm.$store.getters.renderParams('man'),
          woman: vm.$store.getters.renderParams('woman'),
        },
      };
      const data = await vm.$axios.$post(vm.apiUrl, { params });

      vm.loading = false;
      vm.orderNum = parseInt(data.order_id, 0);
    },
  },
};
</script>
