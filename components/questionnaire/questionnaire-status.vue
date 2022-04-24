<template>
  <p class="text-right text-subtitle-2 mt-1">
    <span v-if="questionnaire.status === 'completed'" class="success--text">
      <v-icon color="success"> mdi-check</v-icon> {{ $t('completed') }}
    </span>
    <span
      v-else-if="questionnaire.status === 'incomplete'"
      class="warning--text"
    >
      <v-icon color="warning"> mdi-clock-outline</v-icon>
      {{ $t('notCompleted') }}
    </span>
    <span v-else class="info--text">
      <v-icon color="info"> mdi-information-outline </v-icon>
      {{ $t('notAttended') }}
    </span>
  </p>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['questionnaire']),
  },
}
</script>

<style></style>
