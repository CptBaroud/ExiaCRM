<template>
  <v-container>
    <v-label>
      <h1 class="display-1">
        Kivaferkoi
      </h1>
    </v-label>
    <v-row>
      <v-col
        :cols="checkRight() ? 2 : 1"
      >
        <v-card
          v-if="checkRight()"
          raised
          style="border-radius: 30px"
        >
          <v-card-title>
            <v-sheet
              color="#cf3436"
              elevation="2"
              class="mx-4 my-4"
              rounded
            >
              <v-icon large class="mx-2 my-2">
                mdi-database-settings
              </v-icon>
            </v-sheet>
            Gestion
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="toPick"
              label="Nombre de personnes à pick"
              rounded
              outlined
              @keydown.enter="tirage"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="3"
      >
        <v-card
          raised
          style="border-radius: 30px"
        >
          <v-card-title>
            <v-sheet
              color="#cf3436"
              elevation="2"
              class="mx-4 my-4"
              rounded
            >
              <v-icon large class="mx-2 my-2">
                mdi-shield-account
              </v-icon>
            </v-sheet>
            Déjà tiré
          </v-card-title>
          <v-card-text>
            <v-card
              flat
              style="overflow-y: auto"
              :class="scrollbarTheme"
              :style="'height:' + windowSize.y / 1.6 + 'px'"
              class="px-6"
            >
              <v-row
                class="mx-4"
                justify="center"
              >
                <v-list
                  v-for="(item, idx) in alreadyPicked"
                  :key="idx"
                >
                  <v-list-item>
                    <v-hover v-slot:default="{ hover }">
                      <v-badge
                        :elevation="hover ? 12 : 2"
                        overlap
                        bordered
                        :color="hover ? '#53B84d' : '#79B473'"
                        :value="haveRole(item.user)"
                      >
                        <v-card
                          :elevation="hover ? 12 : 2"
                          class="mx-auto"
                          style="border-radius: 20px; transition: background-color 0.2s ease-in-out"
                          :color="hover ? '#b02b23' : '#ac3931'"
                          width="225"
                        >
                          <v-card-title class="text-uppercase">
                            <v-list-item>
                              <v-list-item-avatar>
                                <v-img v-if="item.avatar.length > 1" :src="item.avatar" />
                                <v-avatar v-else color="pantoneGreen">
                                  <span class="white--text headline">{{ item.name.substr(0, 1) }}</span>
                                </v-avatar>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title>
                                  {{ item.name }}
                                </v-list-item-title>
                                <v-list-item-subtitle class="h4">
                                  {{ item.username }}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                            <v-btn
                              icon
                              bottom
                              text
                              right
                              small
                              absolute
                              disabled
                              @click="sendMessage()"
                            >
                              <v-icon small>
                                mdi-send
                              </v-icon>
                            </v-btn>
                          </v-card-title>
                        </v-card>
                      </v-badge>
                    </v-hover>
                  </v-list-item>
                </v-list>
              </v-row>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="3"
      >
        <v-card
          raised
          style="border-radius: 30px"
        >
          <v-card-title>
            <v-sheet
              color="#cf3436"
              elevation="2"
              class="mx-4 my-4"
              rounded
            >
              <v-icon large class="mx-2 my-2">
                mdi-account-question
              </v-icon>
            </v-sheet>
            Pas encore été tiré
          </v-card-title>
          <v-card-text>
            <v-card
              flat
              style="overflow-y: auto"
              :class="scrollbarTheme"
              :style="'height:' + windowSize.y / 1.6 + 'px'"
              class="px-6"
            >
              <v-row
                class="mx-4"
                justify="center"
              >
                <v-list
                  v-for="(item, idx) in notYetPicked"
                  :key="idx"
                >
                  <v-list-item>
                    <v-hover v-slot:default="{ hover }">
                      <v-badge
                        :elevation="hover ? 12 : 2"
                        overlap
                        bordered
                        :color="hover ? '#53B84d' : '#79B473'"
                        :value="haveRole(item.user)"
                      >
                        <v-card
                          :elevation="hover ? 12 : 2"
                          class="mx-auto"
                          style="border-radius: 20px; transition: background-color 0.2s ease-in-out"
                          :color="hover ? '#b02b23' : '#ac3931'"
                          width="225"
                        >
                          <v-card-title class="text-uppercase">
                            <v-list-item>
                              <v-list-item-avatar>
                                <v-img v-if="item.avatar.length > 1" :src="item.avatar" />
                                <v-avatar v-else color="pantoneGreen">
                                  <span class="white--text headline">{{ item.name.substr(0, 1) }}</span>
                                </v-avatar>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title>
                                  {{ item.name }}
                                </v-list-item-title>
                                <v-list-item-subtitle class="h4">
                                  {{ item.username }}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                            <v-btn
                              icon
                              bottom
                              text
                              right
                              small
                              absolute
                              disabled
                              @click="sendMessage()"
                            >
                              <v-icon small>
                                mdi-send
                              </v-icon>
                            </v-btn>
                          </v-card-title>
                        </v-card>
                      </v-badge>
                    </v-hover>
                  </v-list-item>
                </v-list>
              </v-row>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="3"
      >
        <v-card
          raised
          style="border-radius: 30px"
        >
          <v-card-title>
            <v-sheet
              color="#cf3436"
              elevation="2"
              class="mx-4 my-4"
              rounded
            >
              <v-icon large class="mx-2 my-2">
                mdi-target-account
              </v-icon>
            </v-sheet>
            A votre tour
          </v-card-title>
          <v-card-text>
            <v-card
              flat
              style="overflow-y: auto"
              :class="scrollbarTheme"
              :style="'height:' + windowSize.y / 1.6 + 'px'"
              class="px-6"
            >
              <v-row
                class="mx-4"
                justify="center"
              >
                <v-list
                  v-for="(item, idx) in picked"
                  :key="idx"
                >
                  <v-list-item>
                    <v-hover v-slot:default="{ hover }">
                      <v-badge
                        :elevation="hover ? 12 : 2"
                        overlap
                        bordered
                        :color="hover ? '#53B84d' : '#79B473'"
                        :value="haveRole(item.user)"
                      >
                        <v-card
                          :elevation="hover ? 12 : 2"
                          class="mx-auto"
                          style="border-radius: 20px; transition: background-color 0.2s ease-in-out"
                          :color="hover ? '#b02b23' : '#ac3931'"
                          width="225"
                        >
                          <v-card-title class="text-uppercase">
                            <v-list-item>
                              <v-list-item-avatar>
                                <v-img v-if="item.avatar.length > 1" :src="item.avatar" />
                                <v-avatar v-else color="pantoneGreen">
                                  <span class="white--text headline">{{ item.name.substr(0, 1) }}</span>
                                </v-avatar>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title>
                                  {{ item.name }}
                                </v-list-item-title>
                                <v-list-item-subtitle class="h4">
                                  {{ item.username }}
                                </v-list-item-subtitle>
                                <!--<v-combobox
                                  v-model="pickedChoices[i]"
                                  :disabled="checkRight(item.name)"
                                  :items="tempSummary"
                                  filled
                                  clearable
                                  rounded
                                  small-chips
                                  @click="update({name: item.name, index: i})"
                                /> -->
                              </v-list-item-content>
                            </v-list-item>
                            <v-btn
                              icon
                              bottom
                              text
                              right
                              small
                              absolute
                              disabled
                              @click="sendMessage()"
                            >
                              <v-icon small>
                                mdi-send
                              </v-icon>
                            </v-btn>
                          </v-card-title>
                        </v-card>
                      </v-badge>
                    </v-hover>
                  </v-list-item>
                </v-list>
              </v-row>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        v-if="!checkRight()"
        cols="1"
      />
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Kivaferoi',
  data () {
    return {
      toPick: 0,
      windowSize: {
        x: 0,
        y: 1
      },
      pickedChoices: [],
      tempSummary: []
    }
  },
  watch: {
    pickedChoices (val) {
      if (this.tempSummary.length !== this.summary.length - this.pickedChoices.length) {
        this.tempSummary.splice(this.tempSummary.indexOf(val.toString()), 1)
      }
    }
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters({
      alreadyPicked: 'kivaferkoi/alreadyPicked',
      notYetPicked: 'kivaferkoi/notYetPicked',
      picked: 'kivaferkoi/picked',
      summary: 'prosit/summary',
      lastPa: 'prosit/lastPa'
    }),

    scrollbarTheme () {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    }
  },
  mounted () {
    this.onResize()
    this.getAlreadyPicked()
    this.getNotYetPicked()
    this.getPicked()
    this.getLastPa().then((response) => {
      this.getSum(response[0].id)
    })
    this.socket = this.$nuxtSocket({
      channel: '/test'
    })
    /* Listen for events: */
    this.socket
      .on('EventTest', (msg, cb) => {
        console.dir(msg)
        console.dir(cb)
      })
  },
  methods: {
    ...mapActions({
      getLastPa: 'prosit/getLastPa',
      getSummary: 'prosit/getSummary',
      getRandom: 'kivaferkoi/getRandom',

      // Actions relatives a AP
      getAlreadyPicked: 'kivaferkoi/getAlreadyPicked',
      clearAlreadyPicked: 'kivaferkoi/clearAlreadyPicked',
      fillAlreadyPicked: 'kivaferkoi/fillAlreadyPicked',

      // Actions relatives a NP
      getNotYetPicked: 'kivaferkoi/getNotYetPicked',
      clearPicked: 'kivaferkoi/clearPicked',
      fillPicked: 'kivaferkoi/fillPicked',

      // Actins relatives a P
      getPicked: 'kivaferkoi/getPicked',
      clearNotYetPicked: 'kivaferkoi/clearNotYetPicked',
      fillNotYetPicked: 'kivaferkoi/fillNotYetPicked'
    }),

    /**
     * Permet de calculer la taille de l'ecran
     **/
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },

    /**
     * Permet de mettre la petite notification
     **/
    haveRole (name) {
      if (this.$auth.user[0].name === name) {
        return 1
      } else {
        return 0
      }
    },

    /**
     * Permet de faire la requete permettant de recuper le Plan d'action du dernier prosit
     * ATTENTION bien attendre que la responde de getLastPa (Récupération du dernier PA)
     * est bien été effectuée
     **/
    getSum (prosit) {
      this.getSummary(prosit).then((response) => {
        response.forEach((item) => {
          this.tempSummary.push(item.name)
        })
      })
    },

    /**
     * Permet de faire le tirage du kivaferkoi
     * Dans un premier temps on tigger le chgmt au niveau des store
     * Puis on push les data sur la base de données
     */
    tirage () {
      // Si l'utilsateur est bien connecter
      if (this.$auth.user != null) {
        // Si l'utilisateur est bien admin
        if (this.$auth.user[0].isAdmin) {
          // Si le nombre d'user a pick est bien inférieur au nombnre de personnes à tiré
          if (this.toPick <= this.getAllSize()) {
            this.getRandom(this.toPick).then(() => {
              // On applique les changements des store a la base MySQL
              // On clear la table AP
              this.clearAlreadyPicked().then((response) => {
                if (response.data.status !== 'Erreur') {
                  // Si le clear est passer on push les nv tab dans la base
                  this.fillAlreadyPicked(this.alreadyPicked).then((response) => {
                    if (response.data.status !== 'Erreur') {
                      this.$toast.success('La table à été update')
                    } else {
                      this.$toast.error(response.data.message)
                    }
                  })
                } else {
                  this.$toast.error('Le clear de la table AP n\'est pas passer')
                }
              })

              // On applique les changements des store a la base MySQL
              // On clear la table NP
              this.clearNotYetPicked().then((response) => {
                if (response.data.status !== 'Erreur') {
                  // Si le clear est passer on push le nv tab
                  this.fillNotYetPicked(this.notYetPicked).then((response) => {
                    if (response.data.status !== 'Erreur') {
                      this.$toast.success('La table à été update')
                    } else {
                      this.$toast.error(response.data.message)
                    }
                  })
                } else {
                  this.$toast.error('Le clear de la table AP n\'est pas passer')
                }
              })

              // On applique les changements des store a la base MySQL
              // On clear la table P
              this.clearPicked().then((response) => {
                if (response.data.status !== 'Erreur') {
                  // Si le clear est passer on push le nv tab
                  this.fillPicked(this.picked).then((response) => {
                    if (response.data.status !== 'Erreur') {
                      this.$toast.success('La table à été update')
                    } else {
                      this.$toast.error(response.data.message)
                    }
                  })
                } else {
                  this.$toast.error('Le clear de la table AP n\'est pas passer')
                }
              })
            })
          } else {
            this.$toast.error('Le nonbre est trop grand')
            this.toPick = null
          }
        } else {
          this.$toast.warning('T\'as pas le droit de faire ça ^^')
        }
      } else {
        this.$toast.warning('T\'as pas le droit de faire ça ^^')
      }
    },

    /**
     * Compte le nombre d'utilisateur totaux
     * @returns {number}
     */
    getAllSize () {
      return this.alreadyPicked.length + this.notYetPicked.length
    },

    /**
     * Permet de checker les droits de l'user connecter
     * @returns {boolean}
     */
    checkRight () {
      if (this.$auth.user !== null && this.$auth.loggedIn) {
        if (this.$auth.user[0].isAdmin) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },

    update (value) {
      console.dir(value)
    }
  }
}
</script>

<style scoped>
.light::-webkit-scrollbar {
  width: 15px;
}

.light::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.light::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.light::-webkit-scrollbar-thumb:hover {
  background: black;
}

.dark::-webkit-scrollbar {
  width: 15px;
}

.dark::-webkit-scrollbar-track {
  background: #202020;
}

.dark::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #202020;
  border-radius: 7px;
}

.dark::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>
