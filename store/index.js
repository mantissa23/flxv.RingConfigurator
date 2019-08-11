import _has from 'lodash-es/has';
import _keys from 'lodash-es/keys';
import _toPairs from 'lodash-es/toPairs';
import createPersistedState from 'vuex-persistedstate';

// Env
const {
  PERSISTED_STORE = 1
} = process.env;

// Render
const RENDER_PARAMS = {
  size: 15,
  division: 'm1m1',
  shape: {
    name: 'a',
    sizeX: 5,
    sizeY: 1.5,
  },
  material1: {
    name: 'none',
    fineness: '585',
    color: 'yellow',
    surface: 'polished',
  },
  material2: {
    name: 'none',
    fineness: '585',
    color: 'yellow',
    surface: 'polished',
  },
  grooves: {
    name: 'none',
    number: 1,
    surface: 'polished',
    width: 1,
  },
  diamonds: {
    name: 'name',
    cut: 'round',
    size: 0,
    quality: 'name',
    mode: 'user',
    stones: 1,
    rows: 1,
    position: 'none',
  },
};

// Mutations
const SET_VAPP_THEME = 'SET_VAPP_THEME';
const SET_USER_SYNCED = 'SET_USER_SYNCED';
const ADD_BREADCRUMB = 'ADD_BREADCRUMB';
const SET_MODEL_KEY = 'SET_MODEL_KEY';
const SET_RESET_MODE = 'SET_RESET_MODE';
const SET_OPTIONS_MODEL = 'SET_OPTIONS_MODEL';
const RESET_OPTIONS_MODEL = 'RESET_OPTIONS_MODEL';
const SET_WEIGHT_ON_SIZE = 'SET_WEIGHT_ON_SIZE';

export const plugins = +PERSISTED_STORE ? [
  createPersistedState({
    paths: [
      'userSynced',
      'optionsModel',
    ],
  }),
] : [];

export const state = () => ({
  /**
   * Тема vuetify
   @type {String}
    */
  vAppTheme: 'light',

  /**
   * Состояние синхронизации параметров кольца с сервером
   @type {Boolean}
    */
  userSynced: false,

  /**
   * Режим сброса
   @type {Boolean}
    */
  resetMode: false,

  /**
   * Хлебные крошки
   @type {Array}
    */
  breadcrumb: [],

  /**
   * Страницы шагов
   * @type {Object}
   */
  steps: [{
      route: 'profile-type',
      title: 'Выберите профиль колец',
    },
    {
      route: 'dimensions',
      title: 'Выберите размеры кольца',
    },
    {
      route: 'metall',
      title: 'Выберите комбинацию металлов',
    },
    {
      route: 'grooves',
      title: 'Выберите вариант насечек',
    },
    {
      route: 'diamonds',
      title: 'Выберите наличие бриллиантов',
    },
    {
      route: 'rings-params',
      title: 'Параметры Ваших колец',
    },
  ],

  /**
   * Табы модификаторы
   * @type {Object}
   */
  tabsList: {
    // both :'Для обоих',
    woman: 'Ее кольцо',
    man: 'Его кольцо',
  },

  /**
   * Опции кольца
   * @type {Object}
   */
  optionsList: {
    // Типы профиля
    profileTypes: ['A', 'C', 'D', 'J'],

    // Ширина профиля
    profileX: ['2', '2.5', '3', '3.5', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5',
      '10'
    ],

    // Высота профиля
    profileY: ['1', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '2'],

    // Комбинации
    divisions: {
      m1m1: '1',
      m1m2: '1/2',
    },

    // Материалы
    materials: {
      yellow: 'Желтое золото',
      white: 'Белое золото',
    },

    // Типы обработки
    surfaces: {
      polished: 'Полирование',
      matt: 'Продолное матирование',
      mattCross: 'Поперечное матирование',
      rhodium: 'Родаж',
    },

    // Связь материалов с обработкой one2many
    materialToSurfaces: {
      yellow: ['polished', 'matt', 'mattCross'],
      white: ['*'],
    },

    // Пробы
    fineness: ['585', '750'],

    // Насечки
    grooves: {
      none: 'Без насечек',
      u: 'U-образные',
      v: 'V-образные',
      s: 'Квадратные',
    },

    // Расположение бриллиантов
    diamondPatterns: ['none', 'flush', 'section', 'channel'],

    // Опции для расположений
    diamondOptions: {
      section: {
        rows: 1
      },
    },

    // Размеры колец
    sizes: ['15', '15.5', '16', '16.5', '17', '17.5', '18', '18.5', '19', '19.5', '20', '20.5', ''],
  },

  /**
   * Модель опций кольца
   * @type {Object}
   */
  optionsModel: {},

  /**
   * Опции по умолчанию
   * @type {Object}
   */
  optionsDefault: {
    profileType: {
      man: 'a',
      woman: 'a'
    },
    ringSize: {
      man: '20',
      woman: '17'
    },
    sizeX: {
      man: '5',
      woman: '3'
    },
    sizeY: {
      man: '1.6',
      woman: '1.2'
    },
    division: {
      man: 'm1m1',
      woman: 'm1m1',
    },
    material1: {
      man: 'yellow',
      woman: 'yellow',
    },
    material2: {
      man: 'yellow',
      woman: 'yellow',
    },
    surface: {
      man: 'polished',
      woman: 'polished'
    },
    fineness: {
      man: '585',
      woman: '585'
    },
    grooves: {
      man: 'none',
      woman: 'none'
    },
    diamondsPattern: {
      man: 'none',
      woman: 'none'
    },
    diamondsAmount: {
      man: 1,
      woman: 1
    },
    diamondsRows: {
      man: 1,
      woman: 1
    },
  },

  /**
   * Ключ модели
   * @type {String}
   */
  modelKey: 'woman',

  /**
   * Вес по размеру (рус. размер * ширину)
   * @type {Object}
   */
  weightOnSize: {},

  /**
   * Цены материалов
   * @Type {Object}
   */
  costs: {
    gold: 4500,
    diamond: 1200,
  },
});

export const mutations = {
  [ADD_BREADCRUMB](state, payload) {
    state.breadcrumb.push(payload);
  },

  [SET_VAPP_THEME](state, payload) {
    state.vAppTheme = payload;
  },

  [SET_USER_SYNCED](state, payload) {
    state.userSynced = payload;
  },

  [SET_MODEL_KEY](state, payload) {
    state.modelKey = payload;
  },

  [SET_RESET_MODE](state, payload) {
    state.resetMode = payload;
  },

  [SET_OPTIONS_MODEL](state, payload) {
    const {
      name,
      data
    } = payload;
    const modelKey = payload.modelKey || state.modelKey;

    const options = k => ({
      ...(state.optionsModel[k] || {}),
      ...{
        [name]: data,
      },
    });

    state.optionsModel = {
      ...state.optionsModel,
      both: {
        ...(state.optionsModel.both || {}),
        ...(modelKey === 'both' ? options('both') : {}),
      },
      woman: {
        ...(state.optionsModel.woman || {}),
        ...(['both', 'woman'].includes(modelKey) ? options('woman') : {}),
      },
      man: {
        ...(state.optionsModel.man || {}),
        ...(['both', 'man'].includes(modelKey) ? options('man') : {}),
      },
    };
  },

  [RESET_OPTIONS_MODEL](state, payload) {
    if (typeof payload === 'undefined') {
      payload = state.optionsDefault;
    }

    for (const [modelKey, options] of _toPairs(state.optionsModel)) {
      _keys(options).filter(opt => _has(payload, [opt, modelKey]))
        .forEach(opt => state.optionsModel[modelKey][opt] = payload[opt][modelKey]);
    }
  },

  [SET_WEIGHT_ON_SIZE](state, payload) {
    state.weightOnSize = payload;
  }
};

export const actions = {
  /**
   * Задает статус синхронизации данных юзера
   * @param {Boolean}
   */
  setUserSynced({
    commit
  }, payload) {
    commit(SET_USER_SYNCED, payload);
  },
  /**
   * Задает ключ модели
   * @param {String}
   */
  setModelKey({
    commit
  }, payload) {
    commit(SET_MODEL_KEY, payload);
  },

  /**
   * Задает модель опций кольца
   * @param {String}
   */
  setOptionsModel({
    commit
  }, payload) {
    const {
      name,
      data,
      modelKey = null
    } = payload;
    commit(SET_RESET_MODE, false);
    commit(SET_OPTIONS_MODEL, {
      name,
      data,
      modelKey
    });
  },

  /**
   * Сбрасывает модель опций кольца в значения по умолчанию или payload
   * @param {Object}
   */
  resetOptionsModel({
    commit
  }, payload) {
    commit(SET_RESET_MODE, true);
    commit(RESET_OPTIONS_MODEL, payload);
  },

  /**
   * Задает соотношения размеров к весу
   * @param {Object}
   */
  setWeightOnSize({
    commit
  }, payload) {
    commit(SET_WEIGHT_ON_SIZE, payload);
  },
};

export const getters = {
  // @TODO:  optionValue('KEY', 'default val')

  /**
   * Параметр текущего ключа или из аргумента
   * @param {String}
   * @param {String}
   * @returns {String}
   */
  optionValue: (state) => (option, modelKey = undefined) =>
    (state.optionsModel[modelKey || state.modelKey] || {})[option],

  /**
   * Параметр по умолчанию
   * @param {String}
   * @param {String}
   * @returns {String}
   */
  optionDefault: (state) => (option, modelKey) => {
    const {
      optionsDefault
    } = state;
    return (optionsDefault[option] || {})[modelKey || state.modelKey] || (optionsDefault[option] || {}).both || '';
  },

  /**
   * Параметры рендера для v3d
   * @param {String}
   */
  renderParams: (state, getters) => key => {
    const {
      optionsModel
    } = state;
    const param = n => (optionsModel[key] || optionsModel.both || {})[n] || getters.optionDefault(n, key) || '';

    return {
      ...RENDER_PARAMS,

      ...{
        size: param('ringSize') || RENDER_PARAMS.size,
        division: param('division') || RENDER_PARAMS.division,
        shape: {
          ...RENDER_PARAMS.shape,
          name: (param('profileType') || RENDER_PARAMS.shape.name).toLowerCase(),
          sizeX: param('sizeX') || RENDER_PARAMS.shape.sizeX,
          sizeY: param('sizeY') || RENDER_PARAMS.shape.sizeY,
        },
        material1: {
          ...RENDER_PARAMS.material1,
          color: param('material1') || RENDER_PARAMS.material1.color,
          surface: param('surface') || RENDER_PARAMS.material1.surface,
          fineness: param('fineness') || RENDER_PARAMS.material1.fineness,
        },
        material2: {
          ...RENDER_PARAMS.material2,
          color: param('material2') || RENDER_PARAMS.material2.color,
          surface: param('surface') || RENDER_PARAMS.material2.surface,
          fineness: param('fineness') || RENDER_PARAMS.material2.fineness,
        },
        grooves: {
          ...RENDER_PARAMS.grooves,
          name: param('grooves') || RENDER_PARAMS.grooves.name,
        },
        // TMP
        diamonds: {
          ...RENDER_PARAMS.diamonds,
          stones: param('diamondsAmount') || RENDER_PARAMS.diamonds.stones,
          position: param('diamondsPattern') || RENDER_PARAMS.diamonds.position,
          mode: param('diamondsMode') || RENDER_PARAMS.diamonds.mode,
          ...(state.optionsList.diamondOptions[param('diamondsPattern')] || {}),
          rows: param('diamondsRows') || RENDER_PARAMS.diamonds.rows,
        },
      },
    };
  },

  /**
   * Форматированные опции
   * @param {String}
   * @returns {Object}
   */
  formattedOptions: (state, getters) => key => {
    const {
      optionsList,
      optionsModel
    } = state;
    const renderParams = getters.renderParams(key);
    const options = {
      ...{
        profileType: renderParams.shape.name,
        sizeX: renderParams.shape.sizeX,
        sizeY: renderParams.shape.sizeY,
        material1: renderParams.material1.color,
        fineness: renderParams.material1.fineness,
        grooves: renderParams.grooves.name,
        ringSize: renderParams.size,
        diamonds: renderParams.diamonds,
      },
      ...(optionsModel.both || {}),
      ...(optionsModel[key] || {}),
    };

    return {
      profile: options.profileType.toUpperCase(),
      sizeX: options.sizeX || 0,
      sizeY: options.sizeY || 0,
      material: optionsList.materials[options.material1],
      fineness: options.fineness,
      grooves: optionsList.grooves[options.grooves],
      ringSize: options.ringSize,
      diamonds: options.diamonds.position === 'none' ? 'Без камней' : 'Инкрустация бриллиантами',
    };
  },

  /**
   * Цена изделия
   * @param {String}
   * @returns {String}
   */
  itemCost: (state, getters) => key => {
    const x = getters.optionValue('sizeX', key) || getters.optionDefault('sizeX', key) || 0;
    const size = getters.optionValue('ringSize', key) || getters.optionDefault('ringSize', key) || 0;
    const diamondsAmount = getters.optionValue('diamondsAmount', key) || 0;
    const diamondsRows = getters.optionValue('diamondsRows', key) || 0;
    const weight = (state.weightOnSize[size] || {})[x * size] || 0;
    const cost = (weight * state.costs.gold) + (diamondsAmount * diamondsRows * state.costs.diamond);

    return Number(cost.toFixed(0));
  },
};
