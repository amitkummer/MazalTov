<template>
  <section>
    <v-card outlined class="mx-auto mt-14 pl-4 pb-2 pt-2" width="38ch">
      <v-card-title> {{ title }} </v-card-title>
      <v-card-subtitle class="mt-1">
        {{ subtitle }}
      </v-card-subtitle>
      <v-card-text>
        <v-color-picker
          v-model="$vuetify.theme.themes.light.primary"
          class="mt-3 mr-9"
          flat
          hide-canvas
          hide-inputs
          hide-sliders
          show-swatches
          swatches-max-height="300"
        />
        <div class="d-flex flex-row-reverse pr-1 mt-10">
          <v-btn
            text
            depressed
            outlined
            :disabled="!primaryChanged"
            class="mr-8"
            @click="$emit('update:primaryColor', $event)"
          >
            Submit
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },
    subtitle: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      originalPrimary: null,
    }
  },
  computed: {
    primaryChanged() {
      return this.$vuetify.theme.themes.light.primary !== this.originalPrimary
    },
  },
  created() {
    this.originalPrimary = this.$vuetify.theme.themes.light.primary
  },
}
</script>
