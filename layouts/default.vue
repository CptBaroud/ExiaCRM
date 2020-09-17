<template>
  <v-app
    dark
  >
    <v-app-bar
      :clipped-left="clipped"
      class="px-4 py-4"
      height="110"
      app
      color="#cf3436"
      flat
    >
      <v-spacer />
      <v-badge
        :value="notifications.length"
        color="#green"
        overlap
        bordered
      >
        <v-icon>
          mdi-bell
        </v-icon>
      </v-badge>
      <v-list v-if="$auth.loggedIn" color="#cf3436" dense rounded class="mr-8">
        <v-menu open-on-hover bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item
              v-bind="attrs"
              v-on="on"
            >
              <v-list-item-avatar>
                <v-img :src="$auth.user[0].avatar" />
              </v-list-item-avatar>
              <v-list-item-title>
                <h3>{{ $auth.user[0].username }}</h3>
              </v-list-item-title>
            </v-list-item>
          </template>
          <v-list color="#121212">
            <v-list-item
              router
              to="/profil"
            >
              <v-list-item-title>Mon compte</v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="logout"
            >
              <v-list-item-title>Deconnexion</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list>

      <v-dialog v-else v-model="dialog" persistent max-width="310">
        <template v-slot:activator="{ on }">
          <v-btn text dark v-on="on">
            Connexion
          </v-btn>
        </template>
        <v-card style="border-radius: 15px" raised>
          <v-card-title class="headline">
            <v-btn
              icon
              top
              text
              small
              right
              absolute
              @click="dialog = false"
            >
              <v-icon
                color="red"
              >
                mdi-close
              </v-icon>
            </v-btn>
            Login
          </v-card-title>
          <v-card-text class="py-4 px-6">
            <v-form>
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
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-dialog v-model="registerDialog" persistent max-width="310">
              <template v-slot:activator="{ on }">
                <v-btn text dark v-on="on">
                  S'enregistrer
                </v-btn>
              </template>
              <v-card style="border-radius: 15px" raised>
                <v-card-title class="headline">
                  <v-btn
                    icon
                    top
                    text
                    small
                    right
                    absolute
                    @click="registerDialog = false"
                  >
                    <v-icon
                      color="red"
                    >
                      mdi-close
                    </v-icon>
                  </v-btn>
                  Register
                </v-card-title>
                <v-card-text class="py-4 px-6">
                  <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="registerInfo.name"
                      label="Prenom"
                      filled
                      rounded
                      :rules="required"
                    />
                    <v-text-field
                      v-model="registerInfo.username"
                      label="Username"
                      filled
                      rounded
                      :rules="required"
                    />
                    <v-text-field
                      v-model="registerInfo.password"
                      label="Mot de passe"
                      type="password"
                      filled
                      rounded
                      :rules="required"
                    />
                    <v-text-field
                      v-model="registerInfo.questionSecrete"
                      label="Repondre a la question secrete"
                      :hint="loadQuestionSecrete()"
                      autocomplete="off"
                      filled
                      rounded
                    />
                    <v-select
                      v-model="registerInfo.avatar"
                      :items="avatars"
                      :rules="required"
                      item-text="name"
                      item-value="img"
                      filled
                      rounded
                      chips
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          :key="JSON.stringify(data.item.name)"
                          v-bind="data.attrs"
                          :input-value="data.selected"
                          :disabled="data.disabled"
                          @click:close="data.parent.selectItem(data.item)"
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
                    </v-select>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="green darken-1" text @click="register()">
                    S'enregistrer
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-spacer />
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
      color="#cf3436"
      permanent
      floating
      app
      :clipped="clipped"
      :mini-variant="miniVariant"
    >
      <v-list
        rounded
        nav
      >
        <v-spacer />
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
        <v-list-item exact class="mb-8">
          <v-list-item-content>
            <v-list-item-title>
              <h1 class="display-1 mx" />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-spacer />
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-icon>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" style="position: fixed">
        <path fill="#cf3436" fill-opacity="1" d="M0,192L48,160C96,128,192,64,288,69.3C384,75,480,149,576,154.7C672,160,768,96,864,106.7C960,117,1056,203,1152,202.7C1248,203,1344,117,1392,74.7L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
      </svg>
      <v-container class="scroll">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      clipped: false,
      miniVariant: true,
      drawer: false,
      dialog: false,
      valid: true,
      required: [
        value => !!value || 'Required.'
      ],
      requiredQuestion: [
        value => !!value
      ],
      auht: this.$auth,
      registerDialog: false,
      username: '',
      password: '',
      registerInfo: [],
      questionSecrete: 'Qui nous a malheureusement quitter en A1',
      questionsSecrete: [
        'Qui nous a malheureusement quitter en A1 ?',
        'Qui trouvais la charge de travail trop importante ?',
        'Qui est partit après s\'etre fait wasted par gurvan ?',
        'Qui a une soeur avocate ?'
      ],
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
          icon: 'mdi-view-list',
          title: 'Prosit Aller',
          to: '/prositsAller'
        },
        {
          icon: 'mdi-book-open-variant',
          title: 'Mots clés',
          to: '/keywords'
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
      notifications: [],
      title: 'PrositBoost'
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
        .then((response) => {
          if (response.data.status !== 'error') {
            this.$toast.success('Tu as été connecté avec succès')
          } else {
            this.$toast.error(response.data.message)
          }
        })
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
      if (this.$refs.form.validate()) {
        if (this.registerInfo.questionSecrete.toString().toLowerCase() === 'amiel') {
          this.dialog = false
          this.valid = true
          axios.post(process.env.API_URL + '/login/register', {
            username: this.registerInfo.username,
            name: this.registerInfo.name,
            avatar: this.registerInfo.avatar,
            password: this.registerInfo.password
          }).then(() => {
            this.$auth.loginWith('local', {
              data: {
                username: this.registerInfo.username,
                password: this.registerInfo.password
              }
            })
              .then((response) => {
                if (response.data.status !== 'error') {
                  this.$toast.success('Tu as été connecté avec succès')
                } else {
                  this.$toast.error(response.data.message)
                }
              })
              .catch((err) => {
                // eslint-disable-next-line no-console
                console.error(err)
                this.$toast.error(err)
              })
            this.$toast.success('Compte créer avec succès')
          }
          ).catch((onerror) => {
            // eslint-disable-next-line no-console
            console.error(onerror)
            this.$toast.error(onerror)
          })
        } else {
          this.$toast.warning('Quand meme la question secrete ...')
        }
      }
    },

    loadQuestionSecrete () {
      const question = Math.floor(Math.random() * this.questionsSecrete.length)
      return this.questionsSecrete[question]
    }
  }
}
</script>

<style>
  input:-webkit-autofill,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px #303030 inset !important;
  }
  input:-webkit-autofill:hover {
    -webkit-box-shadow: 0 0 0 30px #424242 inset !important;
  }
  /*Change text in autofill textbox*/
  input:-webkit-autofill {
    -webkit-text-fill-color: white !important;
  }

  .scroll::-webkit-scrollbar {
    width: 15px;
  }

  .scroll::-webkit-scrollbar-track {
    background: #202020;
    border-left: 1px solid #2c2c2c;
  }

  .scroll::-webkit-scrollbar-thumb {
    background: #3e3e3e;
    border: solid 3px #202020;
    border-radius: 7px;
  }

  .scroll::-webkit-scrollbar-thumb:hover {
    background: white;
  }
</style>
