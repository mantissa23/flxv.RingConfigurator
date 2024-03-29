import { validationMixin } from 'vuelidate';

const touchMap = new WeakMap();

export default {
  mixins: [validationMixin],

  data: () => ({}),

  methods: {
    delayTouch($v) {
      $v.$reset();
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v));
      }
      touchMap.set($v, setTimeout($v.$touch, 1000));
    },
  },
};
