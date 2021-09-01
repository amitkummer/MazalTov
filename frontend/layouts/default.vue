<template>
  <v-app>
    <v-main>
      <v-toolbar color="primary" dark>
        <v-toolbar-items>
          <v-btn text nuxt to="/">
            Birthday Calendar
            <v-icon right class="ml-2"> mdi-balloon </v-icon>
          </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn v-if="this.$auth.loggedIn" text nuxt to="/settings">
            Options
          </v-btn>
          <v-btn v-if="this.$auth.loggedIn" text @click="logout">
            Logout
          </v-btn>
          <v-btn v-else text nuxt to="/login"> Login </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <Nuxt />
      <v-fade-transition>
        <v-snackbar
          v-if="message"
          :key="messageId"
          v-model="shown"
          :color="message.type"
        >
          {{ message.text }}
          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="closeSnackbar"> Close </v-btn>
          </template>
        </v-snackbar>
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    message: (state) => state.snackbar.message,
    shown: (state) => state.snackbar.shown,
    messageId: (state) => state.snackbar.messageId,
  }),
  methods: {
    closeSnackbar() {
      this.$store.dispatch('snackbar/hide')
    },
    async logout() {
      try {
        await this.$auth.logout()
        const message = {
          type: 'success',
          text: 'Logged out.',
        }
        this.$store.dispatch('snackbar/set', message)
        this.$router.push('/login')
      } catch (e) {
        const message = {
          type: 'error',
          text: e.message,
        }
        this.$store.dispatch('snackbar/set', message)
      }
    },
  },
}
</script>
