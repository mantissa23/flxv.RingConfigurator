import { shallowMount, createLocalVue } from '@vue/test-utils';
import Layout from '~/layouts/default.vue';

const localVue = createLocalVue();

describe('App', () => {
  test('should render correctly', () => {
    const wrapper = shallowMount(Layout, { localVue });

    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper.contains('v-app-stub')).toBe(true);
    expect(wrapper.vm.$el).toMatchSnapshot();
  });
});
