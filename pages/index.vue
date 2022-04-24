<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="py-4 px-2 justify-center" flat>
        <v-list>
          <v-list-item-group color="indigo">
            <questionnaire-tile :questionnaire="questionnaire" />
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapState } from 'vuex'
import questionnaireTile from '../components/questionnaire/questionnaire-tile.vue'
export default {
  components: { questionnaireTile },
  computed: {
    ...mapState(['questionnaire']),
  },
}
</script>
