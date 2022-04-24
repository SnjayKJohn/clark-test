<template>
  <v-dialog persistent v-model="dialog" width="450">
    <v-card style="border-radius: 8px">
      <v-card-title
        class="font-weight-bold d-block mb-4"
        style="background-color: #f4f8ff"
      >
        {{ $t('languageSettings') }}
      </v-card-title>
      <v-form ref="form">
        <v-card-text class="pb-0 mx-auto" style="max-width: 200px">
          <v-radio-group v-model="selectedLocale">
            <v-radio
              v-for="locale in $i18n.locales"
              :key="locale.code"
              :label="locale.label"
              :value="locale.code"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions class="d-flex flex-column px-6 py-3">
          <v-btn block large color="primary" @click="handleChangeLanguage">
            {{ $t('save') }}
          </v-btn>
          <v-btn block plain class="mt-1 mx-0" @click="handleClose">
            {{ $t('cancel') }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  props: {
    dialog: {
      default: false,
    },
  },
  data() {
    return {
      selectedLocale: '',
    }
  },
  mounted() {
    this.selectedLocale = this.$i18n.locale
  },

  methods: {
    ...mapActions('department', ['getDepartments', 'transferDepartment']),
    handleChangeLanguage() {
      try {
        this.$i18n.setLocale(this.selectedLocale)
        this.handleClose()
      } catch (error) {
        console.error(error)
      } finally {
      }
    },
    handleClose() {
      this.$emit('close-dialog')
    },
  },
}
</script>

<style></style>
