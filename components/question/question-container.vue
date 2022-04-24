<template>
  <div>
    <p class="text-center white--text">
      <!-- <v-avatar color="primary lighten-1" size="56" class="mb-2">
        <span class="white--text"
          >{{ model + 1 }}/{{ questions.length }}</span
        ></v-avatar
      >
      <br /> -->
      <v-progress-linear
        color="light-blue"
        height="10"
        :value="((model + 1) / questions.length) * 100"
        striped
        class="mt-2"
      ></v-progress-linear>
    </p>
    <v-row
      justify="center"
      align="center"
      class="ma-0"
      style="position: absolute; z-index: 2; width: 100%"
    >
      <v-col cols="12" sm="8" md="8">
        <div>
          <v-carousel
            v-model="model"
            hide-delimiter-background
            hide-delimiters
            :show-arrows="false"
            height="60vh"
            :cycle="false"
            touchless
          >
            <v-carousel-item
              v-for="(question, index) in questions"
              :key="question.identifier"
            >
              <question-tile
                :question="question"
                :index="index"
                class="my-4"
                @answerChanged="handleAnswerChange"
              />
            </v-carousel-item>
          </v-carousel>
          <v-row v-if="questions[model]">
            <v-col class="d-flex">
              <v-btn
                color="white"
                class="ma-2 white--text mr-auto"
                :disabled="!questions[model].previous"
                outlined
                min-width="130px"
                @click="handlePrevious"
              >
                <v-icon left dark> mdi-chevron-left </v-icon>
                {{ $t('previous') }}
              </v-btn>
            </v-col>
            <v-col class="d-flex">
              <v-btn
                v-if="questions[model].next === false"
                color="white"
                class="ma-2 white--text ml-auto"
                :disabled="!isValidAnswer"
                outlined
                min-width="130px"
                @click="$emit('completed')"
              >
                {{ $t('finish') }}

                <v-icon right dark> mdi-chevron-right </v-icon>
              </v-btn>
              <v-btn
                v-else
                color="white"
                class="ma-2 white--text ml-auto"
                :disabled="!isValidAnswer"
                outlined
                min-width="130px"
                @click="handleNext"
              >
                {{ $t('next') }}
                <v-icon right dark> mdi-chevron-right </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import questionTile from './question-tile.vue'
export default {
  components: { questionTile },
  data() {
    return {
      model: 0,
      isValidAnswer: false,
    }
  },
  mounted() {
    this.model = this.currentQuestionIndex || 0
    if (!this.questionnaire.status) this.SET_QUESTIONNAIRE_STATUS('incomplete')
    this.setNextNode()
  },
  computed: {
    ...mapState(['questionnaire', 'currentQuestionIndex']),
    ...mapGetters(['getQuestionIndex', 'questions']),
    currentQuestion() {
      return this.questions[this.model]
    },
  },
  methods: {
    ...mapMutations([
      'RECORD_ANSWER',
      'SET_QUESTIONNAIRE_STATUS',
      'SET_CURRENT_QUESTION_INDEX',
      'SET_NEXT',
      'SET_PREVIOUS',
    ]),
    checkValidAnswer() {
      if (this.currentQuestion.required) {
        const answer = this.currentQuestion?.answer
        this.isValidAnswer = Array.isArray(answer)
          ? answer.length
          : typeof answer === 'string'
          ? answer.trim()
          : answer
      } else {
        this.isValidAnswer = true
      }
    },
    handleAnswerChange(index, answer) {
      this.RECORD_ANSWER({ index, answer })
      this.setNextNode()
    },
    setNextNode() {
      this.checkValidAnswer()
      const next = this.questions[this.model + 1]
      this.SET_NEXT({
        index: this.model,
        next: next?.identifier || false,
      })
      if (this.currentQuestion?.jumps?.length) {
        const jumpToItem = this.currentQuestion.jumps.find((el) =>
          el.conditions.find(
            (condition) => condition.value == this.currentQuestion.answer
          )
        )
        if (jumpToItem?.destination?.id) {
          this.SET_NEXT({ index: this.model, next: jumpToItem.destination.id })
        }
      }
    },
    handleNext() {
      this.setNextNode()
      const prev = this.currentQuestion.identifier
      this.model = this.getQuestionIndex(this.currentQuestion?.next)
      this.SET_PREVIOUS({ index: this.model, previous: prev })
      this.SET_CURRENT_QUESTION_INDEX(this.model)
      this.setNextNode()
    },
    handlePrevious() {
      this.model = this.getQuestionIndex(this.currentQuestion?.previous)
      this.SET_CURRENT_QUESTION_INDEX(this.model)
      this.setNextNode()
    },
  },
}
</script>
