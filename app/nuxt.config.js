import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@f_keychi_ktk' },
      { hid: 'og:type', property: 'og:type', content: 'artcle' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: '2020お家ハッカソンgroup-goby'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://gw-2020-hackathon-goby.web.app/'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          'リモート飲みのときに最適 ！通話しながらWeb情でひらけば，簡単に「Word wolf」を楽しむことができます！'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: './static/wolfman.png'
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'リモートでで「Word wolf」!'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/transitions.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // Firestoreプラグイン
    '~/plugins/firebase.js',
    '~/plugins/vuetify',
    '~/plugins/vue-uuid.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  env: {
    FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
    FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
    FIREBASE_DATABASEURL: process.env.FIREBASE_DATABASEURL,
    FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
