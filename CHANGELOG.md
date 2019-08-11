﻿# Changelog

> All notable changes to this project will be documented in this file.
>
> The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
> and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

---

## [1.0.4] - 2019-07-12
### Added
- Добавлен env.TABS_ROUTING - роутинг для табов (w/m)
- Добавлена Jest среда тестирования

### Changed
- Улучшения и рефакторинг компонента Embed3d
- Фикс адаптива в футере (AppFooter) и pages/profile-type, pages/profile-size

---

## [1.0.3] - 2019-07-11
### Added
- Добавлена главная страница pages/index (vuetify & vuelidate)

### Changed
- Переписан компонент Order (vuetify & vuelidate)
- Переписан компонент UserSync (vuetify & vuelidate)
- Обновлен компонент RingParams (добавлены v-chip)
- Переписан шаблон layouts/default
- Обновлен шаблон layouts/error
- Обновлен шаблон layouts/step
- Обновлены страницы шагов

### Removed
- Шаблон layouts/landing

---

## [1.0.2] - 2019-07-10
### Added
- Добавлен плагин vuelidate
- Добавлены комманды очистки clean-build, clean-npm (rimraf)
- Добавлены миксин для шаблонов (layout.js)
- Добавлены компонент для футера - AppFooter

### Changed
- Обновлен шаг diamonds (логика из 614 задачи)
- Обновлен linter & prettier
- Обновлен конфиг переменных окружения и режима работы (.env.[mode].local)
- Обновлен главный стор (роутинг шагов), userSynced сохраняется в PersistedState
- Обновлены миксин для шагов (step.js)
- Обновлены миксин для форм (form.js) - добавлен vuelidate
- Обновлены плагин vuetify, добавлены иконки mid, поправлены цвета темы
- В компонент Loading добавлен таймаут

### Removed
- Модуль @nuxtjs/dotenv

---

## [1.0.1.alpha2] - 2019-07-03
### Added
- Завершено портирование шагов на vuetify
  - Компоненты (Embed3d, RingParams)
  - Лейаут шагов формы (layouts/step.vue)
  - Все страницы шагов (pages/*)
- Загрузка nuxt конфига для среды сборки (config.development)
- Загрузка локального env конфига для среды сборки (.env.development)
- Плагин vuelidate (выключен)
- Плагин lodash-es (не грузится сразу)

### Changed
- Настройка eslint & prettier

### Removed
- Удалены все стили pcss

---

## [1.0.1.alpha1] - 2019-07-01
### Added
- Портирование на vuetify
  - Лейаут по умолчанию (теперь для шагов задается layout: 'step')
  - Лейаут ошибки
  - Лейаут шагов формы
  - Страницы (profile-type)
- Иконки (шрифт) для vuetify - materialdesignicons (@mdi/font)
- Иконка static/favicon.ico

### Changed
- Обновлены и добавлены некоторые зависимости pkg
- Настройка линтинга (правила)

---

## [0.9.9] - 2019-06-28
### Added
- Переход на stylus (~/assets/style/app.styl)
- Стартовое портирование лейаутов и страниц на vuetify
- В плагин vuetify добален объект цветов для темы + опции "на вырост"

### Changed
- Nuxt обновлен до 2.8.1
- Настройка линтинга (правила, игнор)

### Removed
- Выпиливание старых стилей (pcss, normalize, element-ui, etc)

## [0.9.8] - 2019-06-27
### Added
- CHANGELOG.md
- Прокси api запросов
- Плагин для axios
- Статический анализ после build
- Временная логика для шага с камнями (pages/diamonds)

### Changed
- Запросы в компонентах форм синхронизации и заказа

### Removed
- комманды *:rr в package.scripts
- env.AXIOS_URL

---

## [0.9.7] - 2019-06-24
### Added
- Спиннер для канваса

---

## [0.9.6] - 2019-06-22
### Added
- Примесь для форм - utils/mixins/form
- Форма (имя, тел.) в компоненте Order

### Fixed
- Отправка optionsModel в формах

---

## [0.9.5] - 2019-06-19
### Added
- Vuetify (a la carte)
- Stylus - assets/style/app.styl
- Опции шагов по умолчанию state.optionsDefault

---

## [0.9.4] - 2019-06-18
### Added
- Компонент для синхронизации - UserSync
- Компонент для оформления заказа - Order

---

## [0.9.3] - 2019-06-14
### Changed
- Рефакторинг и оптимизация приложения (v3d прокси, шаги, стор, компоненты)
- Убран режим "Оба кольца"
- Главная страница приложения теперь в layouts/landing (pages/index)

### Fixed
- Связи материала и обработки на шаге metall

---

## [0.9.2] - 2019-06-11
### Added
- Поддержка старого кода в плагине v3d прокси

---

## [0.9.1] - 2019-06-11
### Added
- v3d прокси плагин
- Nuxt.js App