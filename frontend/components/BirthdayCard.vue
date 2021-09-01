<template>
  <v-slide-y-reverse-transition>
    <v-card width="57ch" class="mb-7 pa-2 rounded-lg" outlined>
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title>
            {{ date.name }}
          </v-card-title>
          <v-card-text>
            {{ daysUntilString(date.birthday) }}
            <span class="font-weight-light">
              ({{ date.birthday.toLocaleString().split(',')[0] }})
            </span>
          </v-card-text>
          <v-row class="mx-4 mb-5 mt-3">
            <v-btn
              height="4ch"
              color="grey darken-1"
              outlined
              nuxt
              :to="`birthdays/edit/${date.id}`"
              class="mt-1 rounded-lg"
            >
              Edit
            </v-btn>
            <delete-btn :id="date.id"> </delete-btn>
          </v-row>
        </div>
        <avatar
          :image="{ type: 'url', value: date.avatar }"
          :alt="date.name"
          class="mr-4 my-auto"
        ></avatar>
      </div>
    </v-card>
  </v-slide-y-reverse-transition>
</template>

<script>
import { getDaysUntilDate } from '@/assets/utils.js'

export default {
  props: {
    date: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    daysUntilString(date) {
      const daysUntil = getDaysUntilDate(date)
      switch (daysUntil) {
        case 0:
          return 'Happens today!'
        case 1:
          return 'Happens tomorrow!'
        default:
          return `Happens in ${daysUntil} days`
      }
    },
  },
}
</script>
