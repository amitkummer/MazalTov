<template>
  <v-card outlined width="55ch" class="my-14 mx-auto px-10 py-5">
    <v-card-title class="text-h5 mt-1"
      >Change Username <span class="ml-3 text-h6"> 📝 </span></v-card-title
    >
    <v-card-text class="mt-10">
      <v-form @submit.prevent="changeUsername">
        <v-text-field
          v-model="newUsername"
          label="New Username"
          outlined
          class="mt-4"
          :error-messages="error.errored ? error.newUsername : undefined"
        />
        <v-text-field
          v-model="password"
          :append-icon="show.password ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show.password ? 'text' : 'password'"
          label="Password"
          outlined
          class="mt-2"
          :error-messages="error.errored ? error.password : undefined"
          @click:append="show.current = !show.current"
        />
        <div class="d-flex flex-row-reverse mt-7">
          <v-btn
            text
            depressed
            outlined
            :disabled="!fieldsFilled"
            :loading="loading"
            type="submit"
          >
            Submit
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      password: null,
      newUsername: null,
      show: {
        password: false,
      },
      error: {
        errored: false,
        password: null,
        newUsername: null,
      },
      loading: false,
    }
  },
  computed: {
    fieldsFilled() {
      return this.password && this.newUsername
    },
  },
  methods: {
    async changeUsername() {
      this.loading = true
      const data = {
        current_password: this.password,
        new_username: this.newUsername,
      }
      const options = {
        headers: {
          Authorization: 'JWT ' + this.$auth.strategy.token,
        },
      }
      try {
        await this.$axios.post('/api/auth/users/set_username/', data, options)
        this.error = false
        const message = {
          type: 'success',
          text: `Username changed.`,
        }
        this.$store.dispatch('snackbar/set', message)
        this.$router.push('/')
      } catch (err) {
        const data = err.response.data
        this.error.errored = true
        if (data.new_username) {
          this.error.newUsername = data.new_username
        }
        if (data.current_password) {
          this.error.password = data.current_password
        }
      }
      this.loading = false
    },
  },
}
</script>
