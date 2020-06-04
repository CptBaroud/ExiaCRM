<template>
  <v-container>
    <v-label>
      <h1 class="display-1">
        Kivaferkoi
      </h1>
    </v-label>
    <v-row>
      <v-col
        cols="3"
      >
        <v-card
          raised
          style="border-radius: 15px"
        >
          <v-card-title>
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
          style="border-radius: 15px"
        >
          <v-card-title>
            Déjà tiré
          </v-card-title>
          <v-card-text>
            <v-card
              raised
              style="border-radius: 15px"
            >
              <v-list
                two-line
                rounded
              >
                <v-list-item
                  v-for="(item, i) in alreadyPicked"
                  :key="i"
                >
                  <v-list-item-avatar>
                    <v-img v-if="item.avatar.length > 1" :src="item.avatar" />
                    <v-avatar v-else color="steelBlue">
                      <span class="white--text headline">{{ item.name.substr(0, 1) }}</span>
                    </v-avatar>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.username }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.name }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="3"
      >
        <v-card
          raised
          style="border-radius: 15px"
        >
          <v-card-title>
            Pas encore été tiré
          </v-card-title>
          <v-card-text>
            <v-card
              raised
              style="border-radius: 15px"
            >
              <v-list
                two-line
                rounded
              >
                <v-list-item
                  v-for="(item, i) in notYetPicked"
                  :key="i"
                >
                  <v-list-item-avatar>
                    <v-img v-if="item.avatar.length > 1" :src="item.avatar" />
                    <v-avatar v-else color="steelBlue">
                      <span class="white--text headline">{{ item.name.substr(0, 1) }}</span>
                    </v-avatar>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.username }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.name }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="3"
      >
        <v-card
          raised
          style="border-radius: 15px"
        >
          <v-card-title>
            A votre tour
          </v-card-title>
          <v-card-text>
            <v-card
              raised
              style="border-radius: 15px"
            >
              <v-list
                three-line
                rounded
              >
                <v-list-item
                  v-for="(item, i) in picked"
                  :key="i"
                >
                  <v-list-item-avatar>
                    <v-img v-if="item.avatar.length > 1" :src="item.avatar" />
                    <v-avatar v-else color="pantoneGreen">
                      <span class="white--text headline">{{ item.name.substr(0, 1) }}</span>
                    </v-avatar>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.username }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.name }}
                    </v-list-item-subtitle>
                    <!-- <v-list-item-content>
                      <v-combobox
                        v-model="item.pa"
                        :disabled="checkRight(item.name)"
                        :items="pa"
                        filled
                        rounded
                      />
                    </v-list-item-content> -->
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
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
      item1: ''
    }
  },
  computed: {
    ...mapGetters({
      alreadyPicked: 'kivaferkoi/alreadyPicked',
      notYetPicked: 'kivaferkoi/notYetPicked',
      picked: 'kivaferkoi/picked',
      pa: 'prosit/pa'
    })
  },
  mounted () {
    this.getAlreadyPicked()
    this.getNotYetPicked()
    this.getPicked()
  },
  methods: {
    ...mapActions({
      getRandom: 'kivaferkoi/getRandom',
      getPicked: 'kivaferkoi/getPicked',

      // Actions relatives a AP
      getAlreadyPicked: 'kivaferkoi/getAlreadyPicked',
      clearAlreadyPicked: 'kivaferkoi/clearAlreadyPicked',
      fillAlreadyPicked: 'kivaferkoi/fillAlreadyPicked',

      // Actions relatives a NP
      getNotYetPicked: 'kivaferkoi/getNotYetPicked',
      clearPicked: 'kivaferkoi/clearPicked',
      fillPicked: 'kivaferkoi/fillPicked',

      // Actins relatives a P
      clearNotYetPicked: 'kivaferkoi/clearNotYetPicked',
      fillNotYetPicked: 'kivaferkoi/fillNotYetPicked'
    }),

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

    checkRight (user) {
      if (this.$auth.user !== null) {
        return user === this.$auth.user.name
      }
      return false
    }
  }
}
</script>

<style scoped>

</style>
