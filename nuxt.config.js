import colors from 'vuetify/es5/util/colors'

export default {

  mode: 'universal',
  env: {
    baseUrl: 'http://localhost:8000',
    api_url: 'http://localhost:3000'
  },

  server: {
    port: 8000 // par défaut: 3000
  },

  router: {
    middleware: ['auth']
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
    '~/assets/style.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    'plugins/draggable.js',
    'plugins/vuebar.js',
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
      login: '/login',
      logout: '/login',
      user: '/profile',
      callback: '/login'
    }
  },

  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      options: {
        customProperties: true
      },
      dark: true,
      themes: {
        dark: {
          background: '#1C1C1E',
          secondary: '#242426',
          primary: '#E44634',
          accent: '#EA6D5D',
          text: '#F9F9FB',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          prussianBlue: '#1D3557',
          steelBlue: '#457B9D',
          smokyBlack: '#121212',
          pantoneGreen: '#53A548'
        },
        light: {
          background: '#F9F9FB',
          secondary: '#FFFFFF',
          primary: '#E44634',
          accent: '#EA6D5D',
          text: '#1C1C1E',
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
