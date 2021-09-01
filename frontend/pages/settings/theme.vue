<template>
  <color-picker :title="primaryTitle" :subtitle="primarySubtitle" />
</template>

<script>
export default {
  data() {
    return {
      primaryTitle: 'Primary Color',
      primarySubtitle:
        'Used for things like the top navigation bar and sometimes buttons.',
    }
  },
  methods: {
    submit() {},
  },
}
</script>
