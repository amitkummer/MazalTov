<template>
  <v-card outlined width="55ch" class="my-14 mx-auto pa-10">
    <v-row justify="center" class="my-2">
      <avatar
        :image="{ type: 'file', value: date.avatar }"
        :alt="date.name"
        class="mb-7 mt-2 mx-auto"
      />
    </v-row>
    <v-form>
      <v-text-field v-model="date.name" label="Name" outlined class="mt-2" />
    </v-form>
    <v-menu
      ref="menu"
      v-model="dateMenu"
      :close-on-content-click="false"
      :return-value.sync="date.birthday"
      transition="scale-transition"
      offset-y
      min-width="auth"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date.birthday"
          label="Birthday"
          preprend-icon="mdi-calendar"
          readonly
          outlined
          v-bind="attrs"
          class="mt-4"
          v-on="on"
        />
      </template>
      <v-date-picker v-model="date.birthday" no-title scrollable>
        <v-spacer />
        <v-btn text @click="dateMenu = false"> Cancel </v-btn>
        <v-btn text @click="$refs.menu.save(date.birthday)"> OK </v-btn>
      </v-date-picker>
    </v-menu>
    <v-file-input
      v-model="date.avatar"
      accept="image/png"
      placeholder="Avatar"
      prepend-icon="mdi-camera"
      class="mb-7"
    />
    <v-row class="my-5">
      <v-spacer> </v-spacer>
      <v-btn
        text
        depressed
        outlined
        :disabled="!requiredFieldsAreFilled"
        class="mr-3"
        @click="submit"
      >
        Submit
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      dateMenu: false,
      date: {
        name: null,
        birthday: null,
        avatar: null,
        owner: null,
        id: null,
      },
    }
  },

  computed: {
    requiredFieldsAreFilled() {
      return this.date.name && this.date.birthday
    },
  },

  methods: {
    async submit() {
      this.date.birthday = this.date.birthday + 'T08:00:00.000Z'
      let message
      try {
        await this.$store.dispatch('dates/create', {
          item: this.date,
        })
        message = {
          type: 'success',
          text: `Created a new birthday.`,
        }
      } catch (error) {
        message = {
          type: 'error',
          text: `Failed to create a new birthday ${error.message}.`,
        }
      }
      this.$store.dispatch('snackbar/set', message)
      this.$router.push('/')
    },
  },
}
</script>
