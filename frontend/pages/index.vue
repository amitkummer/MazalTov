<template>
  <v-container>
    <utility-toolbar
      :sort-order.sync="sortOrder"
      :sort-options="sortOptions"
      @update:searchString="searchString = $event"
    />
    <v-row justify="center" class="flex-column" align-content="center">
      <birthday-card
        v-for="date in filteredDates"
        :key="date.id"
        :date="date"
      />
    </v-row>
  </v-container>
</template>

<script>
import Fuse from 'fuse.js/dist/fuse.basic.esm.min'

export default {
  middleware: 'auth',
  async asyncData({ store }) {
    await store.dispatch('dates/refresh')
    return {}
  },
  data() {
    return {
      searchString: null,
      sortOrder: 'Closest Date First',
      sortOptions: [
        'Closest Date First',
        'Furthest Date First',
        'Alphabetically (A-Z)',
      ],
    }
  },
  computed: {
    dates() {
      const dates = copyDatesList(this.$store.state.dates.list)
      switch (this.sortOrder) {
        case 'Closest Date First':
          dates.sort((date1, date2) => date2.birthday - date1.birthday)
          break
        case 'Furthest Date First':
          dates.sort((date1, date2) => date1.birthday - date2.birthday)
          break
        case 'Alphabetically (A-Z)':
          dates.sort((date1, date2) => date1.name.localeCompare(date2.name))
          break
      }
      return dates
    },
    filteredDates() {
      const options = {
        keys: ['name'],
        shouldSort: 'false',
      }
      if (!this.dates) {
        return []
      }
      if (!this.searchString) {
        return this.dates
      }
      const fuse = new Fuse(this.dates, options)
      const result = fuse.search(this.searchString)
      return result.map((match) => match.item)
    },
  },
}
function copyDatesList(list) {
  if (!list) {
    return []
  }
  const copy = JSON.parse(JSON.stringify(list))
  for (const item of copy) {
    item.birthday = new Date(item.birthday)
  }
  return copy
}
</script>
