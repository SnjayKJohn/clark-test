<template>
  <div>
    <bg-animate>
      <questionnaire-completed v-if="isCompleted" />
      <question-container v-else @completed="isCompleted = true" />
    </bg-animate>
  </div>
</template>
<script>
import BgAnimate from '../components/common/bg-animate.vue'
import QuestionContainer from '../components/question/question-container.vue'
import QuestionnaireCompleted from '../components/questionnaire/questionnaire-completed.vue'
export default {
  transition: {
    name: 'home',
    mode: 'out-in',
  },
  components: { BgAnimate, QuestionContainer, QuestionnaireCompleted },
  data() {
    return {
      isCompleted: false,
    }
  },
}
</script>
