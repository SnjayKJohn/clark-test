<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="!showBackBtn"
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="localeLocation(item.to)"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> {{ $t(item.title) }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="primary">
      <v-btn v-if="showBackBtn" icon @click="$router.back()"
        ><v-icon color="white"> mdi-chevron-left</v-icon>
      </v-btn>
      <v-app-bar-nav-icon
        v-else
        @click.stop="drawer = !drawer"
        class="white--text"
      />

      <v-toolbar-title class="white--text">{{
        $t('questionnaire')
      }}</v-toolbar-title>
      <v-spacer />
      <translation-btn />
    </v-app-bar>
    <v-main>
      <v-container class="pa-0" style="max-width: 100%">
        <Nuxt />
      </v-container>
    </v-main>

    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import translationBtn from '../components/common/translation-btn.vue'
export default {
  components: { translationBtn },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-comment-question',
          title: 'questionnaires',
          to: '/',
        },
        {
          icon: 'mdi-account-question',
          title: 'help',
          to: '/help',
        },
      ],
      title: 'Questionnaire',
    }
  },
  computed: {
    showBackBtn() {
      return this.$nuxt.$route.params?.id
    },
  },
}
</script>
