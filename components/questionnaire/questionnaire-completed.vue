<template>
  <div style="z-index: 2">
    <h2 class="text-center text-h4 white--text">
      {{ $t('thanksForCompletingText') }}
      <br />
      <v-icon x-large color="white"> mdi-emoticon-happy-outline</v-icon>
    </h2>
    <v-row class="my-10">
      <v-btn
        color="white"
        outlined
        class="mx-auto"
        nuxt
        :to="localeLocation('/')"
      >
        <v-icon right dark> mdi-arrow-left-thin </v-icon>
        &nbsp;&nbsp;{{ $t('home') }}
        <v-icon right dark> mdi-home </v-icon>
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  mounted() {
    this.SET_QUESTIONNAIRE_STATUS('completed')
  },
  methods: {
    ...mapMutations(['SET_QUESTIONNAIRE_STATUS']),
  },
}
</script>

<style></style>
