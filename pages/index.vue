<template>
  <v-layout
    align-space-between
    justify-space-between
    row
    wrap
    fill-height
    class="landing-layout">
    <!-- ################################################################# -->
    <!-- Стартовый блок -->
    <!-- Заголовок, кнопки перехода к шагам -->
    <v-flex
      xs12
      :pa-4="breakpoint.mdAndDown"
      :class="[
        'landing-layout__content',
        'landing-layout__content--head',
      ]">
      <v-layout
        justify-center
        row
        wrap
        fill-height>
        <v-flex
          xs12
          lg6
          ma-auto
          py-5>
          <v-img
            :src="require('~/assets/images/landing/1.png')"
            :max-width="517"
            height="auto"
            contain
            class="ma-auto"
            transition="slide-y-transition">
            <template #placeholder>
              <v-layout
                align-center
                justify-center
                fill-height
                ma-0>
                <v-progress-circular
                  indeterminate
                  :size="imgProgress.size"
                  :color="imgProgress.color"
                  ma-auto />
              </v-layout>
            </template>
          </v-img>
        </v-flex>
        <v-flex
          xs12
          lg6>
          <v-layout
            justify-center
            column
            fill-height
            text-xs-center
            text-lg-left>
            <div>
              <div class="display-3 font-weight-thin">
                Конструктор
              </div>
              <div class="headline font-weight-medium text-uppercase">
                обручальных колец
              </div>
            </div>

            <div class="my-4 title font-weight-thin">
              Разработай свой индивидуальный дизайн колец
            </div>

            <div class="tab-buttons">
              <v-layout
                justify-space-between
                row
                wrap>
                <v-flex
                  v-for="(val, tab) in $store.state.tabsList"
                  :key="`tab-button-${tab}`"
                  xs12
                  md6>
                  <v-btn
                    depressed
                    block
                    large
                    nuxt
                    @click="initTab(tab)">
                    {{ buttonsList[tab] }}
                  </v-btn>
                </v-flex>
              </v-layout>
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <!-- ################################################################# -->

    <!-- Буллеты с инструкциями -->
    <v-flex
      xs12
      mt-3
      :class="[
        'landing-layout__content',
        'landing-layout__content--guide',
      ]">
      <header
        v-if="breakpoint.smAndDown"
        class="headline font-weight-light text-xs-center my-3">
        Как это работает?
      </header>
      <v-container
        grid-list-xl
        fluid>
        <v-layout
          justify-space-between
          row
          wrap>
          <v-flex
            v-for="(item, i) in guideList"
            :key="`guide-list-${i}`"
            xs12
            lg4>
            <v-layout
              row
              wrap>
              <v-flex shrink>
                <v-img
                  :src="require('~/assets/images/landing/bullet.svg')"
                  :width="breakpoint.smAndDown ? 51 : 81"
                  contain>
                  <div :class="`${breakpoint.smAndDown ? 'subheading' : 'display-1'} font-weight-medium text-xs-center pa-1 primary--text`">
                    {{ i+1 }}
                  </div>
                </v-img>
              </v-flex>
              <v-flex
                grow
                xs9
                my-auto>
                <div :class="`${breakpoint.smAndDown ? 'subheading' : 'title'} font-weight-light`">
                  {{ item }}
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <!-- ################################################################# -->

    <!-- Форма синхронизации e-mail -->
    <v-flex
      xs12
      :class="[
        'landing-layout__content',
        'landing-layout__content--form-sync',
      ]">
      <v-layout
        justify-space-around
        row
        wrap
        fill-height>
        <v-flex
          xs12
          lg6
          :pa-5="breakpoint.lgAndUp"
          :px-5="breakpoint.mdAndDown"
          :pt-3="breakpoint.mdAndDown">
          <v-img
            :src="require('~/assets/images/landing/2.png')"
            :max-width="breakpoint.smAndDown ? '100%' : 790"
            height="auto"
            class="my-auto"
            contain
            transition="slide-x-transition">
            <template #placeholder>
              <v-layout
                align-center
                justify-center
                fill-height
                ma-0>
                <v-progress-circular
                  indeterminate
                  :size="imgProgress.size"
                  :color="imgProgress.color"
                  ma-auto />
              </v-layout>
            </template>
          </v-img>
        </v-flex>
        <v-flex
          xs12
          lg6
          my-auto
          px-5
          :py-5="breakpoint.lgAndUp">
          <v-layout
            column
            fill-height
            :mb-5="breakpoint.lgAndUp"
            pb-5
            text-xs-center
            text-lg-left>
            <div>
              <div class="display-3 font-weight-thin">
                Посмотреть
              </div>
              <div class="headline font-weight-light text-uppercase">
                сохраненные кольца
              </div>
            </div>

            <div class="my-4 title font-weight-light">
              Вы&nbsp;уже настроили нужные кольца в&nbsp;Feliksov и&nbsp;хотели&nbsp;бы загрузить их&nbsp;снова?
              Тогда начните с&nbsp;существующего идентификатора обручального кольца, введя указанный e-mail.
            </div>

            <div class="mt-2">
              <user-sync :link-to-app="{ name: stepRoute }" />
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <!-- ################################################################# -->

    <!-- Сертификат качества, кнопки перехода к шагам -->
    <v-flex
      xs12
      :class="[
        'landing-layout__content',
        'landing-layout__content--cert',
      ]">
      <v-layout
        justify-space-around
        row
        wrap
        fill-height>
        <v-flex
          xs12
          lg4
          offset-lg1
          offset-xl2
          order-xs2
          order-lg1
          :pa-5="breakpoint.lgAndUp"
          :px-5="breakpoint.mdAndDown"
          :py-3="breakpoint.mdAndDown">
          <v-layout
            justify-center
            column
            fill-height
            text-xs-center
            text-lg-left>
            <div>
              <div :class="`${breakpoint.mdAndDown ? 'display-1' : 'display-3'} font-weight-thin`">
                Сертификат качества
              </div>
            </div>

            <div class="my-4 title font-weight-light">
              <p>Только подлинный с&nbsp;сертификатом качества!</p>
              <p>Вы&nbsp;получите сертификат для каждого заказа, который гарантирует подлинность и&nbsp;качество нашей продукции.</p>
              <p>Пожизненная гарантия на изделия.</p>
            </div>

            <div class="tab-buttons">
              <v-layout
                justify-space-between
                row
                wrap>
                <v-flex
                  v-for="(val, tab) in $store.state.tabsList"
                  :key="`tab-button-${tab}`"
                  xs12
                  md6>
                  <v-btn
                    depressed
                    block
                    large
                    nuxt
                    @click="initTab(tab)">
                    {{ buttonsList[tab] }}
                  </v-btn>
                </v-flex>
              </v-layout>
            </div>
          </v-layout>
        </v-flex>
        <v-flex
          xs12
          lg6
          order-xs1
          order-lg2
          my-auto
          :pa-5="breakpoint.lgAndUp"
          :px-5="breakpoint.mdAndDown"
          :pt-3="breakpoint.mdAndDown">
          <v-img
            :src="require('~/assets/images/landing/3.png')"
            :max-width="breakpoint.smAndDown ? '100%' : 630"
            height="auto"
            contain
            class="ma-auto"
            transition="slide-x-transition">
            <template #placeholder>
              <v-layout
                align-center
                justify-center
                fill-height
                ma-0>
                <v-progress-circular
                  indeterminate
                  :size="imgProgress.size"
                  :color="imgProgress.color"
                  ma-auto />
              </v-layout>
            </template>
          </v-img>
        </v-flex>
      </v-layout>
    </v-flex>
    <!-- ################################################################# -->

    <!-- Контент "О бренде" -->
    <v-flex
      xs11
      mx-auto
      my-5
      py-5
      :class="[
        'landing-layout__content',
        'landing-layout__content--about-us',
      ]">
      <header class="display-2 font-weight-light text-xs-center">
        О бренде FELIKSOV
      </header>
      <article class="pt-5 title font-weight-light">
        <p>
          Создатель бренда, Алексей Феликсов, посвятил много лет ювелирному делу и&nbsp;воплотил в&nbsp;бренде FELIKSOV возможность выбора особенного ювелирного украшения для выражения искренних чувств. В&nbsp;основе имени бренда&nbsp;&mdash; FELIKSOV&nbsp;&mdash; лежит латинское слово FELIX, &laquo;СЧАСТЛИВЫЙ&raquo;. И&nbsp;это очень символично: ювелирные изделия от&nbsp;FELIKSOV созданы для того, чтобы дарить счастье.
        </p>
        <p>
          Каждое ювелирное украшение бренда FELIKSOV создаётся индивидуально в&nbsp;нашей design-студии. Каждое изделие воплощает в&nbsp;себе виртуозную работу наших ювелиров, мастеров своего дела: дизайнеров, специалистов по&nbsp;ковке, экспертов по&nbsp;бриллиантам и&nbsp;полировщиков. Они работают вместе с&nbsp;одной единственной целью&nbsp;&mdash; создать уникальное и&nbsp;индивидуальное кольцо, которое тронет сердце и&nbsp;будет подстать нашему клиенту и&nbsp;любящей паре.
        </p>
      </article>
    </v-flex>
  </v-layout>
</template>

<script>
import UserSync from '~/components/UserSync.vue';

export default {
  components: { UserSync },

  data: () => ({
    imgProgress: {
      size: 100,
      color: 'secondary',
    },

    buttonsList: {
      woman: 'Для нее',
      man: 'Для него',
    },

    guideList: [
      'Запустите конструктор или выберите варианты дизайна',
      'Настройте или измените по желанию',
      'Получите Ваше ювелирное изделие',
    ],
  }),

  computed: {
    breakpoint() {
      return this.$vuetify.breakpoint;
    },

    stepRoute() {
      return this.$store.state.steps[0].route;
    },
  },

  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.finish();
    });
  },

  methods: {
    initTab(tab) {
      this.$store.dispatch('setModelKey', tab);
      this.$router.push({ name: this.stepRoute });
    },
  },
};
</script>

<style lang="stylus" scoped>
.landing-layout
  & >>> &__content
    .headline
      font-size: 26px !important

    &--head
      background: #fae9ec

    &--guide
        // // //

    &--form-sync
      background: #f5f5f5

      .container--desktop &
        max-height: 740px

    &--cert
      background: #fae9ec

  & >>> .tab-buttons
    .container--desktop &
      max-width: 550px

    .v-btn
      background: transparent
      border: solid 1px var(--v-primary-base)
      color: var(--v-primary-base)
      border-radius: 4px

      &:hover
        background: var(--v-primary-base)
        color: var(--v-secondary-lighten5)

  & >>> .title
    line-height: 24px !important
</style>
