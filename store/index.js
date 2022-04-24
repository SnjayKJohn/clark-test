import mock from '../assets/mock/questionnaire.json'

export const state = () => ({
  questionnaire: mock.questionnaire,
  currentQuestionIndex: 0,
})

export const mutations = {
  SET_QUESTIONNAIRE_STATUS: function (state, status) {
    state.questionnaire.status = status
  },
  SET_CURRENT_QUESTION_INDEX: function (state, currentQuestionIndex) {
    state.currentQuestionIndex = currentQuestionIndex
  },
  RECORD_ANSWER: function (state, { index, answer }) {
    state.questionnaire.questions[index].answer = answer
  },
  SET_NEXT: function (state, { index, next }) {
    state.questionnaire.questions[index].next = next
  },
  SET_PREVIOUS: function (state, { index, previous }) {
    state.questionnaire.questions[index].previous = previous
  },
}
export const actions = {
  setalert({ commit, showSpinner }) {
    commit('SET_SPINNER', showSpinner)
  },
}
export const getters = {
  questions(state) {
    return state.questionnaire.questions
  },
  getQuestionIndex(state) {
    return function (id) {
      return state.questionnaire.questions.findIndex(
        (el) => el.identifier == id
      )
    }
  },
}
