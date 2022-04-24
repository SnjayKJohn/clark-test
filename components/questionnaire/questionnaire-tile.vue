<template>
  <div class="mx-auto px-3 slide-in-animation">
    <v-card outlined>
      <v-list-item three-line :to="localeLocation('/' + questionnaire.id)" nuxt>
        <v-list-item-avatar tile :size="$vuetify.breakpoint.mdAndUp ? 70 : 50">
          <v-img :src="questionImage" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="questionnaire-text">
            {{ questionnaire.name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{
            questionnaire.description
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <questionnaire-status />
  </div>
</template>

<script>
import questionImage from '../../assets/img/question-mark-icon.png'
import questionnaireStatus from './questionnaire-status.vue'
export default {
  components: { questionnaireStatus },
  props: {
    questionnaire: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      questionImage,
    }
  },
}
</script>

<style lang="scss" scoped>
.slide-in-animation {
  animation: slidein 0.7s ease 1 both;
  animation-delay: 0.25s;
}
@keyframes slidein {
  from {
    transform: translateX(-20rem);
    opacity: 0;
  }

  to {
    transform: translate(0);
    opacity: 1;
  }
}
</style>
