<template>
  <section>
    <v-container class="mt-10">
      <v-row justify="center">
        <v-card max-width="50ch" class="mx-3 px-3 pt-3 pb-5" outlined>
          <v-card-title> Email & Password </v-card-title>
          <v-list>
            <v-list-item
              v-for="item in items.user"
              :key="item.title"
              nuxt
              :to="item.url"
            >
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
        <v-card max-width="50ch" class="mx-3 px-3 pt-3 pb-5" outlined>
          <v-card-title> Preferences </v-card-title>
          <v-list>
            <v-list-item
              v-for="item in items.preferences"
              :key="item.title"
              nuxt
              :to="item.url"
            >
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      items: {
        preferences: [
          {
            title: '🌈  Theme color',
            url: 'settings/theme',
          },
        ],
        user: [
          {
            title: '🔑  Change password',
            url: '/settings/user/password',
          },
          {
            title: '📝  Change username',
            url: '/settings/user/username',
          },
        ],
      },
    }
  },
}
</script>
