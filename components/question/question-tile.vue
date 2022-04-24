<template>
  <transition name="fade" mode="out-in" appear>
    <v-card
      class="lighten-1 ma-5 question-tile"
      style="background-color: rgba(0, 0, 0, 0.15)"
    >
      <v-card-title class="question-text">
        {{ question.headline }}
      </v-card-title>
      <v-card-subtitle class="white--text">
        {{ question.description }}
      </v-card-subtitle>
      <v-card-text>
        <template v-if="question.question_type === 'text'">
          <v-textarea
            v-if="question.multiline == 'true'"
            v-model="answer"
            solo
            name="input-7-4"
            :placeholder="$t('yourAnswer')"
            @keyup="answerChanged"
          ></v-textarea>
          <v-text-field
            v-else
            v-model="answer"
            solo
            :placeholder="$t('yourAnswer')"
            @keyup="answerChanged"
          ></v-text-field>
        </template>
        <template v-else-if="question.question_type === 'multiple-choice'">
          <template v-if="question.multiple == 'true'">
            <v-checkbox
              v-for="(choice, index) in question.choices"
              :key="index"
              multiple
              v-model="answer"
              :label="choice.label"
              :value="choice.value"
              @change="answerChanged"
              hide-details
              color="white"
            >
              <template v-slot:label>
                <span class="white--text option-text">{{ choice.label }}</span>
              </template></v-checkbox
            >
          </template>
          <v-radio-group v-else v-model="answer" @change="answerChanged">
            <v-radio
              v-for="(choice, index) in question.choices"
              :key="index"
              :label="choice.label"
              :value="choice.value"
              color="white"
              class="mt-2"
            >
              <template v-slot:label>
                <span class="white--text option-text">{{ choice.label }}</span>
              </template>
            </v-radio>
          </v-radio-group>
        </template>
      </v-card-text>
    </v-card>
  </transition>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      default: {},
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      answer: null,
    }
  },
  mounted() {
    this.answer = this.question.answer
  },
  methods: {
    answerChanged() {
      this.$emit('answerChanged', this.index, this.answer)
    },
  },
}
</script>
<style lang="scss" scoped>
.question-text {
  font-size: 1.4em;
  font-weight: 600;
  color: white;
}
.option-text {
  font-size: 1.2em;
  font-weight: 500;
  color: white;
}
</style>
<style lang="scss">
.question-tile {
  i {
    color: white !important;
  }
}
</style>
