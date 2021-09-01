<template>
  <v-card outlined width="55ch" class="my-14 mx-auto px-10 py-5">
    <v-card-title class="text-h5 mt-1"
      >Change Password <span class="ml-3 text-h6"> 🔑 </span></v-card-title
    >
    <v-card-text class="mt-10">
      <v-form @submit.prevent="changePassword">
        <v-text-field
          v-model="currentPassword"
          :append-icon="show.current ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show.current ? 'text' : 'password'"
          label="Current Password"
          outlined
          class="mt-2"
          :error-messages="error.errored ? error.current : undefined"
          @click:append="show.current = !show.current"
        />
        <v-text-field
          v-model="newPassword"
          :append-icon="show.new ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show.new ? 'text' : 'password'"
          label="New Password"
          outlined
          class="mt-4"
          :error-messages="error.errored ? error.new : undefined"
          @click:append="show.new = !show.new"
        />
        <v-text-field
          v-model="passwordConfirmation"
          :append-icon="show.confirmation ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show.confirmation ? 'text' : 'password'"
          label="Password Confirmation"
          outlined
          class="mt-4"
          :error-messages="error.errored ? error.confirmation : undefined"
          @click:append="show.confirmation = !show.confirmation"
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
      currentPassword: null,
      newPassword: null,
      passwordConfirmation: null,
      show: {
        current: false,
        new: false,
        confirmation: false,
      },
      error: {
        errored: false,
        current: null,
        new: null,
        confirmation: null,
      },
      loading: false,
    }
  },
  computed: {
    fieldsFilled() {
      return (
        this.currentPassword && this.newPassword && this.passwordConfirmation
      )
    },
  },
  methods: {
    async changePassword() {
      this.loading = true
      const data = {
        current_password: this.currentPassword,
        new_password: this.newPassword,
        re_new_password: this.passwordConfirmation,
      }
      const options = {
        headers: {
          Authorization: 'JWT ' + this.$auth.strategy.token,
        },
      }
      try {
        await this.$axios.post('/api/auth/users/set_password/', data, options)
        this.error = false
        const message = {
          type: 'success',
          text: `Password changed.`,
        }
        this.$store.dispatch('snackbar/set', message)
        this.$router.push('/')
      } catch (err) {
        const data = err.response.data
        this.error.errored = true
        if (data.new_password) {
          this.error.new = data.new_password
        }
        if (data.current_password) {
          this.error.current = data.current_password
        }
        if (data.re_new_password) {
          this.error.confirmation = data.re_new_password
        }
      }
      this.loading = false
    },
  },
}
</script>
