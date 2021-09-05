import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    host: '0.0.0.0',
    port: 80
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    ['@nuxtjs/vuetify', {}],
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/proxy',
  ],
  proxy: {
    '/images': 'http://images',
    '/api': 'http://backend'
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: '/'
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access',
          maxAge: 5 * 60,
          global: true,
          type: 'JWT',
        },
        refreshToken: {
          property: 'refresh',
          data: 'refresh',
          maxAge: 60 * 60 * 24,
        },
        user: {
          property: 'username',
        },
        endpoints: {
          login: {
            url: '/api/auth/jwt/create/',
            method: 'post',
          },
          refresh: {
            url: '/api/auth/jwt/refresh/',
            method: 'post',
          },
          user: {
            url: '/api/auth/users/me/',
            method: 'get',
          },
          logout: '/api/auth/token/logout/',
        },
      },
    },
  }
}
