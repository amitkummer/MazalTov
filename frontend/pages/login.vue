<template>
  <v-row justify="center">
    <v-card outlined width="50ch" class="mt-16">
      <h1 class="text-h2 text-center mt-8">Login</h1>
      <v-form @submit.prevent="login">
        <v-text-field
          v-model="username"
          label="Username"
          outlined
          class="mx-8 mt-16"
          :error="error"
        />
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          outlined
          class="mx-8 mt-4"
          :error-messages="
            error ? ['Username or password are incorrect.'] : undefined
          "
        />
        <v-row justify="space-between" class="mx-8 mt-4 mb-8">
          <v-btn type="submit" color="primary" :loading="loading">
            Login
          </v-btn>
          <v-btn outlined color="grey darken-1" nuxt to="register"
            >Sign Up</v-btn
          >
        </v-row>
      </v-form>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data: () => {
    return {
      username: '',
      password: '',
      error: false,
      loading: false,
    }
  },
  methods: {
    async login() {
      this.loading = true
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password,
          },
        })
        this.error = false
        const message = {
          type: 'success',
          text: `Welcome back, ${this.username}!`,
        }
        this.$store.dispatch('snackbar/set', message)
        this.$router.push('/')
      } catch (e) {
        this.error = true
      }
      this.loading = false
    },
  },
}
</script>
