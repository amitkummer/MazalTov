<template>
  <v-avatar size="100" color="primary lighten-1">
    <v-img v-if="base64Src" :src="base64Src" max-height="100" max-width="100" />
    <span v-else-if="alt" class="white--text text-h5">
      {{ imageText }}
    </span>
    <v-icon v-else dark size="4ch"> mdi-help </v-icon>
  </v-avatar>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      default() {
        return {
          type: 'url', // can be 'url' or 'file' (js File object)
          value: null,
        }
      },
    },
    alt: {
      type: String,
      default: null,
    },
  },
  async fetch() {
    if (this.image.value === null) {
      return
    }
    let data
    if (this.image.type === 'url') {
      const url = `/${this.image.value}`
      try {
        const response = await this.$axios.get(url, {
          responseType: 'arraybuffer',
        })
        data = response.data
      } catch (e) {
        console.log(e)
      }
    } else if (this.image.type === 'file') {
      data = await this.image.value.arrayBuffer()
    }
    const base64Image = Buffer.from(data).toString('base64')
    this.base64Src = `data:image/png;base64, ${base64Image}`
  },
  data() {
    return {
      base64Src: null,
    }
  },
  computed: {
    imageText() {
      const words = this.alt.split(' ')
      if (words.length === 0) {
        return ''
      }
      const firstLetters = words.map((word) =>
        word[0] ? word[0].toUpperCase() : ''
      )
      return firstLetters.reduce(
        (previousWord, currentLetter) => previousWord + currentLetter
      )
    },
  },
  watch: {
    image: '$fetch',
  },
}
</script>
