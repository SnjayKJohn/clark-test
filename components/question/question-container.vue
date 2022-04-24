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
                min-width="150px"
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
                min-width="150px"
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
                min-width="150px"
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
    if (!this.questionnaire.status) this.SET_QUESTIONNAIRE_STATUS('incomplete')
    this.setNextNode()
  },
  computed: {
    ...mapState(['questionnaire']),
    ...mapGetters(['getQuestionIndex', 'questions']),
  },
  methods: {
    ...mapMutations([
      'RECORD_ANSWER',
      'SET_QUESTIONNAIRE_STATUS',
      'SET_NEXT',
      'SET_PREVIOUS',
    ]),
    checkValidAnswer() {
      const answer = this.questions[this.model]?.answer
      this.isValidAnswer = Array.isArray(answer) ? answer.length : answer
    },
    handleAnswerChange(index, answer) {
      this.RECORD_ANSWER({ index, answer })
      this.setNextNode()
    },
    setNextNode() {
      this.checkValidAnswer()
      const question = this.questions[this.model]
      if (question?.jumps?.length) {
        const jumpToItem = question.jumps.find((el) =>
          el.conditions.find((condition) => condition.value == question.answer)
        )
        if (jumpToItem?.destination?.id) {
          this.SET_NEXT({ index: this.model, next: jumpToItem.destination.id })
        }
      } else {
        const next = this.questions[this.model + 1]
        this.SET_NEXT({
          index: this.model,
          next: next?.identifier || false,
        })
      }
    },
    handleNext() {
      this.setNextNode()
      const prev = this.questions[this.model].identifier
      this.model = this.getQuestionIndex(this.questions[this.model].next)
      this.SET_PREVIOUS({ index: this.model, previous: prev })
      this.setNextNode()
    },
    handlePrevious() {
      this.model = this.getQuestionIndex(this.questions[this.model].previous)
      this.setNextNode()
    },
  },
}
</script>
