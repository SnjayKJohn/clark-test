import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import questionnaire from '@/components/questionnaire/questionnaire-tile.vue'
const localVue = createLocalVue()
localVue.use(Vuex)
describe('questionnaire', () => {
  let vuetify = new Vuetify()
  const wrapper = shallowMount(questionnaire, {
    localVue,
    propsData: { questionnaire: {} },
    mocks: {
      localeLocation: (msg) => msg,
    },
    vuetify,
  })
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
  test('has data property', () => {
    expect(typeof questionnaire.data).toBe('function')
  })
  test('has QUESTIONNAIRE text', () => {
    expect(wrapper.find('.questionnaire-text').exists()).toBe(true)
  })
})
