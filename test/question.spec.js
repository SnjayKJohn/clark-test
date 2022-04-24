import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import question from '@/components/question/question-tile.vue'
const localVue = createLocalVue()
localVue.use(Vuex)
describe('question', () => {
  const wrapper = shallowMount(question, {
    localVue,
    propsData: { question: {}, index: 0 },
  })
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
  test('does a wrapper exist', () => {
    expect(wrapper.exists()).toBe(true)
  })
  test('has data property', () => {
    expect(typeof question.data).toBe('function')
  })
  test('has QUESTION text', () => {
    expect(wrapper.find('.question-text').exists()).toBe(true)
  })
})
