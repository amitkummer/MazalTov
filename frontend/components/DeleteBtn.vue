<template>
  <v-dialog v-model="dialog" width="50ch">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="grey darken-2"
        plain
        class="ml-2 rounded-lg"
        v-bind="attrs"
        v-on="on"
      >
        Remove
      </v-btn>
    </template>
    <v-card height="20ch" class="pt-4">
      <v-card-title class="text-h6">
        <span class="mx-auto"> Are your sure you want to delete this? </span>
      </v-card-title>
      <v-card-actions class="mt-4">
        <span class="mx-auto">
          <v-btn color="primary" class="mr-4" depressed @click="deleteDate">
            Yes
          </v-btn>
          <v-btn color="grey darken-2" outlined @click="dialog = false">
            No
          </v-btn>
        </span>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    async deleteDate() {
      this.dialog = false
      await this.$store.dispatch('dates/delete', { id: this.id })
    },
  },
}
</script>
