<template>
  <v-container class="d-flex align-center" style="min-height: 800px" :class="$vuetify.theme.dark ? 'card_login_background_dark' : 'card_login_background_light'">
    <v-card
      class="rounded-card"
      style="background: transparent"
      flat
    >
      <v-card-title>
        <img width="256" height="128" :src="logo" alt="Login">
      </v-card-title>
      <v-card-text class="px-8 py-8">
        <v-form>
          <v-text-field
            ref="mail"
            v-model="mail"
            filled
            rounded
            label="Mail"
          />
          <v-text-field
            ref="password"
            v-model="password"
            filled
            rounded
            type="password"
            label="Mot de passe"
          />
        </v-form>
      </v-card-text>
      <v-card-actions class="mb-4">
        <v-spacer />
        <v-btn
          rounded
          elevation="0"
          color="primary"
          @click="login()"
        >
          Se connecter
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      mail: '',
      password: '',
      windowSize: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    logo () {
      return this.$vuetify.theme.dark ? process.env.api_url + '/images/logodark.svg' : process.env.api_url + '/images/logolight.svg'
    }
  },
  mounted () {
    this.onResize()
  },
  methods: {
    /**
     * Permet de calculer la taille de l'ecran
     **/
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },

    login () {
      this.$auth.loginWith('local', {
        data: {
          mail: this.mail,
          password: this.password
        }
      })
        .then((response) => {
          if (response.status === 200) {
            this.$toast.success('Tu as été connecté avec succès')
          } else {
            this.$toast.error(response.data.message)
          }
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err)
          this.$toast.error(err.message)
        })
    }
  }
}
</script>

<style scoped>

</style>
