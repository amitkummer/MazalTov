<template>
  <v-card outlined width="55ch" class="my-14 mx-auto pa-10">
    <v-row justify="center" class="my-2">
      <avatar :image="avatarImage" :alt="date.name" class="mb-7 mt-2" />
    </v-row>
    <v-form>
      <v-text-field v-model="date.name" label="Name" outlined class="mt-2" />
    </v-form>
    <v-menu
      ref="menu"
      v-model="dateMenu"
      :close-on-content-click="false"
      :return-value.sync="dateString"
      transition="scale-transition"
      offset-y
      min-width="auth"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="dateString"
          label="Birthday"
          preprend-icon="mdi-calendar"
          readonly
          outlined
          v-bind="attrs"
          class="mt-4"
          v-on="on"
        />
      </template>
      <v-date-picker v-model="dateString" no-title scrollable>
        <v-spacer />
        <v-btn text @click="dateMenu = false"> Cancel </v-btn>
        <v-btn text @click="$refs.menu.save(dateString)"> OK </v-btn>
      </v-date-picker>
    </v-menu>
    <v-file-input
      v-model="imageField"
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
        :disabled="!fieldsChanged"
        class="mr-3"
        @click="edit"
      >
        Submit
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
export default {
  async asyncData({ store, params, error }) {
    await store.dispatch('dates/refresh')
    const dates = store.state.dates.list
    const id = parseInt(params.id)
    const date_ = dates.find((date) => date.id === id)
    if (!date_) {
      error({
        statusCode: 404,
        message: `Birthday with id ${id} does not exist.`,
      })
      return {}
    }
    const date = JSON.parse(JSON.stringify(date_))
    const originalDate = JSON.parse(JSON.stringify(date_))
    const dateString = date.birthday.substr(0, 10)
    return { date, dateString, dateMenu: false, originalDate }
  },
  data() {
    return {
      imageField: null, // File object
    }
  },
  computed: {
    fieldsChanged() {
      return (
        this.date.name !== this.originalDate.name ||
        this.dateString !== this.originalDate.birthday.substr(0, 10) ||
        this.imageField !== null
      )
    },
    avatarImage() {
      if (this.imageField) {
        return {
          type: 'file',
          value: this.imageField,
        }
      }
      return { type: 'url', value: this.date.avatar }
    },
  },
  methods: {
    async edit() {
      const date = JSON.parse(JSON.stringify(this.date))
      date.birthday = this.dateString + 'T08:00:00.000Z'
      if (this.imageField) {
        date.avatar = this.imageField
      } else if (date.avatar) {
        const url = date.avatar.replace('http://localhost:8000', '/api/images')
        const response = await this.$axios.get(url, {
          responseType: 'arraybuffer',
        })
        date.avatar = new File([response.data], getLastComponent(url))
      }
      await this.$store.dispatch('dates/update', {
        item: date,
        id: date.id,
      })
      const message = {
        type: 'success',
        text: 'Edited person information successfully.',
      }
      this.$store.dispatch('snackbar/set', message)
      this.$router.push('/')
    },
  },
}

function getLastComponent(url) {
  const components = url.split('/')
  return components[components.length - 1]
}
</script>
