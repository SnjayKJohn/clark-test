<template>
  <div>
    <v-btn text class="my-2" @click="showSelectLanguageDialog = true" icon>
      <v-icon class="white--text"> mdi-translate</v-icon>
    </v-btn>
    <language-settings-dialog
      v-if="showSelectLanguageDialog"
      :dialog="showSelectLanguageDialog"
      @close-dialog="showSelectLanguageDialog = false"
    />
  </div>
</template>

<script>
import languageSettingsDialog from '../dialog/language-settings-dialog.vue'
export default {
  components: { languageSettingsDialog },
  data() {
    return {
      showSelectLanguageDialog: false,
    }
  },
  props: {
    isBtn: false,
  },
}
</script>

<style></style>
