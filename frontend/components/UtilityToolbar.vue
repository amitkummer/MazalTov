<template>
  <section>
    <v-row justify="center" class="mt-10 mb-5">
      <v-btn
        color="primary lighten-1"
        class="mb-5"
        fab
        elevation="2"
        @click="$router.push('birthdays/create')"
      >
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>
      <span class="input-md mt-2 ml-5">
        <v-select
          v-model="sortOrder"
          :items="sortOptions"
          rounded
          outlined
          dense
          filled
          background-color="grey lighten-5"
          label="Sort Order"
          @input="$emit('update:sortOrder', $event)"
        />
      </span>
      <span class="input-sm ml-5 mt-2">
        <v-text-field
          placeholder="Name"
          rounded
          outlined
          dense
          filled
          append-icon="mdi-magnify"
          background-color="grey lighten-5"
          @input="$emit('update:searchString', $event)"
        />
      </span>
    </v-row>
  </section>
</template>

<script>
export default {
  props: {
    sortOrder: {
      type: String,
      default: null,
    },
    sortOptions: {
      type: Array,
      default() {
        return null
      },
    },
  },
}
</script>

<style lang="scss">
.input {
  &-sm {
    width: 20ch;
  }
  &-md {
    width: 27ch;
  }
}
</style>
