import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  env: {
    baseUrl: 'http://localhost:8000'
  },

  server: {
    port: 8000 // par défaut: 3000
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'PrositBoost',
    title: 'PrositBoost',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    'plugins/draggable.js',
    'plugins/vuebar.js',
    'plugins/firestore.js',
    'plugins/rtdb.js'
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
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Plugin pour les notifs
    'vue-toastification/nuxt',
    'nuxt-socket-io'
  ],

  io: {
    // module options
    sockets: [{
      name: 'main',
      url: 'http://localhost:3000',
      default: true
    }]
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://localhost:3000'
  },

  /*
  ** Auth module configuration
  ** See https://axios.nuxtjs.org/options
  */
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login/', method: 'post', propertyName: 'token' },
          logout: { url: '/login/', method: 'delete' },
          user: { url: '/users/getuser', method: 'get', propertyName: 'user' }
        },
        // tokenRequired: true,
        tokenType: ''
      }
    },
    redirect: {
      login: '/',
      logout: '/login',
      user: '/profile',
      callback: '/login'
    }
  },

  router: {
    //middleware: ['isAdmin']
  },

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
          primary: '#E63946',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          prussianBlue: '#1D3557',
          steelBlue: '#457B9D',
          smokyBlack: '#121212',
          pantoneGreen: '#53A548'
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      config.node = {
        fs: 'empty'
      }
    }
  }
}
