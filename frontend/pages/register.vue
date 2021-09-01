<template>
  <v-row justify="center">
    <v-card outlined width="50ch" class="mt-16">
      <h1 class="text-h2 text-center mt-8">Register</h1>
      <v-form ref="register" @submit.prevent="register">
        <v-text-field
          v-model="username"
          label="Username"
          outlined
          class="mx-8 mt-16"
          :error-messages="error.username"
        />
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
          outlined
          class="mx-8 mt-4"
          :error-messages="error.password"
        />
        <v-text-field
          label="Password Confirmation"
          type="password"
          outlined
          class="mx-8 mt-4"
          :rules="[confirmPassword]"
        />
        <v-row justify="space-between" class="mx-8 mt-4 mb-8">
          <v-btn type="submit" color="primary" :loading="loading">
            Register
          </v-btn>
          <v-btn outlined color="grey darken-1" nuxt to="login">Login</v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data: () => {
    return {
      username: undefined,
      password: undefined,
      loading: false,
      error: {
        username: [],
        password: [],
      },
    }
  },
  methods: {
    async register() {
      this.error = { username: [], password: [] }
      if (this.$refs.register.validate()) {
        this.loading = true
        try {
          await this.$axios.post('/api/auth/users/', {
            username: this.username,
            password: this.password,
          })
          const message = {
            type: 'success',
            text: 'Registered successfully.',
          }
          this.$store.dispatch('snackbar/set', message)
          this.$router.push('/login/')
        } catch (e) {
          this.error = e.response.data
        }
        this.loading = false
      }
    },
    confirmPassword(confirmation) {
      if (this.password === confirmation) {
        return true
      }
      return 'Password confirmation should match password.'
    },
  },
}
</script>
