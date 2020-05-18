<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      height="115"
      app
      color="#C72E38"
      flat
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        v-if="drawer"
        large
        icon
        @click="miniVariant = !miniVariant"
      >
        <v-icon v-if="!miniVariant">
          mdi-chevron-left
        </v-icon>
        <v-icon v-else>
          mdi-chevron-right
        </v-icon>
      </v-btn>
      <h1 class="display-2">
        {{ title }}
      </h1>
      <v-spacer />
      <v-list v-if="$auth.loggedIn" color="#C72E38" dense>
        <v-hover
          v-slot:default="{ hover }"
          open-delay="200"
        >
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="$auth.user[0].avatar" />
            </v-list-item-avatar>
            <v-list-item-title>
              <h3>{{ $auth.user[0].username }}</h3>
            </v-list-item-title>
            <v-btn
              v-if="hover"
              class="ml-2"
              text
              dark
              small
              @click="logout"
            >
              Deconnexion
            </v-btn>
          </v-list-item>
        </v-hover>
      </v-list>

      <v-dialog v-else v-model="dialog" persistent max-width="310">
        <template v-slot:activator="{ on }">
          <v-btn text dark v-on="on">
            Connexion
          </v-btn>
        </template>
        <v-card style="border-radius: 15px" raised class="mt-8">
          <v-card-title class="headline">
            <v-btn
              fab
              color="red"
              top
              x-small
              right
              absolute
              @click="dialog = false"
            >
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
            Login
          </v-card-title>
          <v-card-text class="py-4 px-6">
            <v-text-field
              v-model="username"
              label="Username"
              filled
              rounded
            />
            <v-text-field
              v-model="password"
              label="Mot de passe"
              type="password"
              filled
              rounded
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-dialog v-model="registerDialog" persistent max-width="310">
              <template v-slot:activator="{ on }">
                <v-btn text dark v-on="on">
                  S'enregistrer
                </v-btn>
              </template>
              <v-card style="border-radius: 15px" raised class="mt-8">
                <v-card-title class="headline">
                  <v-btn
                    fab
                    color="red"
                    top
                    x-small
                    right
                    absolute
                    @click="registerDialog = false"
                  >
                    <v-icon>
                      mdi-close
                    </v-icon>
                  </v-btn>
                  Register
                </v-card-title>
                <v-card-text class="py-4 px-6">
                  <v-text-field
                    v-model="registerInfo.name"
                    label="Nom"
                    filled
                    rounded
                  />
                  <v-text-field
                    v-model="registerInfo.username"
                    label="Username"
                    filled
                    rounded
                  />
                  <v-text-field
                    v-model="registerInfo.password"
                    label="Mot de passe"
                    type="password"
                    filled
                    rounded
                  />
                  <v-combobox
                    v-model="registerInfo.avatar"
                    :items="avatars"
                    filled
                    rounded
                  >
                    <template v-slot:selection="data">
                      <v-chip
                        :key="JSON.stringify(data.item.name)"
                        v-bind="data.attrs"
                        :input-value="data.selected"
                        :disabled="data.disabled"
                        @click:close="data.parent.selectItem(data.item.name)"
                      >
                        <v-avatar
                          class="accent white--text"
                          left
                        >
                          <v-img :src="data.item.img" />
                        </v-avatar>
                        {{ data.item.name }}
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="green darken-1" text @click="register()">
                    S'enregistrer
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn color="green darken-1" text @click="login()">
              Se Connecter
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="registerDialog" persistent max-width="310" />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      floating
      color="primary"
      app
      :clipped="clipped"
      :mini-variant="miniVariant"
    >
      <v-list>
        <v-list-item exact>
          <v-list-item-content>
            <v-list-item-title>
              <h1 class="display-1" />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style="position: fixed">
        <path fill="#C72E38" fill-opacity="1" d="M0,288L60,256C120,224,240,160,360,149.3C480,139,600,181,720,170.7C840,160,960,96,1080,90.7C1200,85,1320,139,1380,165.3L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
      </svg>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      color="smokyBlack"
    >
      V 0.1
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      miniVariant: false,
      drawer: false,
      dialog: false,
      auht: this.$auth,
      registerDialog: false,
      username: '',
      password: '',
      registerInfo: [],
      avatars: [
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-siberian-husky.png?w=660',
          name: 'Husky'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-alaskan-malamute.png?w=660',
          name: 'Malamute'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-aspin.png?w=660',
          name: 'Aspin'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-beagle.png?w=660',
          name: 'Beagle'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-chow-again.png?w=660',
          name: 'Chow'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-chow-chow.png?w=660',
          name: 'Chow-Chow'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-dachshund.png?w=660',
          name: 'Teckel'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-french-bulldog.png?w=660',
          name: 'Bulldog Français'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-german-shepperd.png?w=660',
          name: 'Berger Allemand'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-golden-retriever.png?w=660',
          name: 'Golden Retriever'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-great-dane.png?w=660',
          name: 'Dogue Allemand'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-labrador.png?w=660',
          name: 'Labrador'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-labrador.png?w=660',
          name: 'Labrador'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-pekingese.png?w=660',
          name: 'Pékinois'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-pomeranian.png?w=660',
          name: 'Spitz nain'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-poodle.png?w=660',
          name: 'Caniche'
        }
      ],
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-form-textbox',
          title: 'Prosit Maker',
          to: '/prosit'
        },
        {
          icon: 'mdi-account-group',
          title: 'Kivaferkoi',
          to: '/kivaferkoi'
        },
        {
          icon: 'mdi-cog-outline',
          title: 'Administration',
          to: '/administration'
        }
      ],
      title: 'Uyhegé'
    }
  },
  methods: {
    login () {
      this.$auth.loginWith('local', {
        data: {
          username: this.username,
          password: this.password
        }
      })
        .then(this.$toast.success('Tu as été connecté avec succès'))
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err)
          this.$toast.error(err)
        })
    },

    logout () {
      this.$auth.logout()
    },

    register () {
      this.dialog = false
      this.$axios.post(process.env.API_URL + '/login/register', {
        username: this.registerInfo.username,
        name: this.registerInfo.name,
        avatar: this.registerInfo.avatar.img,
        password: this.registerInfo.password
      }).then(() => {
        this.$auth.loginWith('local', {
          data: {
            username: this.registerInfo.username,
            password: this.registerInfo.password
          }
        })
          .then(
            this.$toast.success('Tu as été connecté avec succès')
          )
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.error(err)
            this.$toast.error(err)
          })
      }
      ).catch((onerror) => {
        // eslint-disable-next-line no-console
        console.error(onerror)
        this.$toast.error(onerror)
      })
    }
  }
}
</script>
