<template>
  <v-container>
    <v-label>
      <h1 class="display-1">
        Panel d'Administration
      </h1>
    </v-label>
    <v-row v-if="getRight()">
      <v-col
        cols="4"
      >
        <v-card
          raised
          style="border-radius: 15px"
        >
          <v-card-title>
            Gestion des prosits
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="num"
              rounded
              label="Prosit n°"
              outlined
              @keydown.enter="editNumProsit"
            />
            <v-card
              raised
              style="border-radius: 15px"
            >
              <v-card-title>
                Equipe Actuelle
                <v-spacer />
                <v-chip>
                  n°{{ equipe }}
                </v-chip>
              </v-card-title>
              <v-list
                two-line
                rounded
              >
                <v-list-item
                  v-for="(item, i) in getEquipe(equipe)"
                  :key="i"
                >
                  <v-list-item-avatar>
                    <v-icon large>
                      {{ item.icon }}
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.role }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ item.user }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="8"
      >
        <v-data-iterator
          :items="roles"
          :items-per-page="itemsPerPage"
          :page="page"
          hide-default-footer
        >
          <template v-slot:default="props">
            <v-row>
              <v-col
                v-for="(item, i) in props.items"
                :key="i"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <v-card raised style="border-radius: 15px">
                  <v-list
                    two-line
                    rounded
                  >
                    <v-list-item
                      v-for="(temp, a) in item"
                      :key="a"
                    >
                      <v-list-item-content v-if="a === 'equipe'">
                        <v-list-item-title class="headline font-weight-bold">
                          Equipe n°{{ temp }}
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-content v-else>
                        <v-list-item-title>
                          {{ a }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{ temp }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>

          <template v-slot:footer>
            <v-row class="mt-2" align="center" justify="center">
              <span class="grey--text">Items per page</span>
              <v-menu offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn
                    dark
                    text
                    color="primary"
                    class="ml-2"
                    v-on="on"
                  >
                    {{ itemsPerPage }}
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(number, index) in itemsPerPageArray"
                    :key="index"
                    @click="updateItemsPerPage(number)"
                  >
                    <v-list-item-title>{{ number }}</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-spacer />

              <span
                class="mr-4
            grey--text"
              >
                Page {{ page }} of {{ numberOfPages }}
              </span>
              <v-btn
                fab
                dark
                small
                color="primary"
                class="mr-1"
                @click="formerPage"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn
                fab
                dark
                small
                color="primary"
                class="ml-1"
                @click="nextPage"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
      <v-col
        cols="8"
      >
        <v-card style="border-radius: 20px">
          <v-card-title>
            Users
          </v-card-title>
          <v-card-text>
            <v-data-table
              :items="users"
              :headers="headers"
            >
              <template v-slot:item.id="{ item }">
                <v-chip>
                  {{ item.id }}
                </v-chip>
              </template>
              <template v-slot:item.avatar="{ item }">
                <v-avatar>
                  <v-img :src="item.avatar" />
                </v-avatar>
              </template>
              <template v-slot:item.isAdmin="{ item }">
                <v-icon
                  v-if="item.isAdmin === 1"
                >
                  mdi-minus
                </v-icon>
                <v-icon
                  v-else
                >
                  mdi-plus
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-layout
      v-else
      justify-center
      align-center
    >
      <v-flex
        xs12
        sm8
        md6
      >
        <v-card style="border-radius: 15px" class="my-8">
          <v-card-title>
            Erreur
          </v-card-title>
          <v-card-text>
            T'as pas le droit de voir ça
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Administration',
  data () {
    return {
      num: this.numProsit,
      itemsPerPageArray: [4, 8, 11],
      itemsPerPage: 4,
      page: 1,
      controlOnStart: true,
      headers: [
        { text: 'Avatar', value: 'avatar' },
        { text: 'Id', value: 'id', align: 'start' },
        { text: 'Username', value: 'username' },
        { text: 'Name', value: 'name' },
        { text: 'Admin', value: 'isAdmin' },
        { text: 'Actions', value: 'action' }
      ]
    }
  },
  mounted () {
    this.getNumProsit()
    this.getUser()
  },
  computed: {
    ...mapGetters({
      roles: 'role/role',
      equipe: 'role/equipe'
    }),

    users: {
      get () {
        return this.$store.state.user.users
      }
    },

    numberOfPages () {
      return Math.ceil(this.roles.length / this.itemsPerPage)
    },

    alreadyPicked: {
      get () {
        return this.$store.state.kivaferkoi.alreadyPicked
      },

      set (value) {
        this.$store.commit('updateAlreadyPicked', value)
      }
    },

    numProsit: {
      get () {
        return this.$store.state.role.numProsit
      }
    }
  },
  methods: {
    ...mapActions({
      editProsit: 'role/updateNumProsit',
      getNumProsit: 'role/getNumProsit',
      getUsers: 'user/getUsers'
    }),

    getUser () {
      this.getUsers()
    },

    editNumProsit () {
      this.editProsit(this.num).then(this.$toast.success('Le numéros de prosit a été update avec succès'))
    },

    /**
     * Permet de recupêrer l'equipe actuelle en charge du prosit
     * @param num
     * @returns {[]}
     */
    getEquipe (num) {
      const out = []

      this.roles.forEach(function (item) {
        if (item.equipe !== null) {
          if (item.equipe === num) {
            out.push({
              role: 'Animateur',
              user: item.Animateur,
              icon: 'mdi-account-tie'
            })
            out.push({
              role: 'Secretaire',
              user: item.Secretaire,
              icon: 'mdi-account-edit-outline'
            })
            out.push({
              role: 'Scribe',
              user: item.Scribe,
              icon: 'mdi-account-edit'
            })
            out.push({
              role: 'Gestionaire',
              user: item.Gestionaire,
              icon: 'mdi-account-cog'
            })
          }
        }
      })
      return out
    },

    /**
     * TODO : a voir si peut etre utile

    getAllMember () {
      const name = []
      const out = []
      let temp = []
      const count = []
      const role = []
      let num = 0

      this.roles.forEach(function (item) {
        temp = Object.entries(item)
        temp.forEach(function (tempitem) {
          if (!name.includes(tempitem[1])) {
            if (tempitem[0] === 'equipe') {
              num = tempitem[1]
            }
            if (tempitem[0] !== 'equipe') {
              name.push(tempitem[1])
              role.push({ role: tempitem[0], name: tempitem[1], equipe: num })
              count.push(1)
            }
          } else {
            count[name.indexOf(tempitem[1])]++
            role.push({ role: tempitem[0], name: tempitem[1], equipe: num })
          }
        })
      })
      // eslint-disable-next-line no-console
      console.dir(name)
      // eslint-disable-next-line no-console
      console.dir(role)
      // eslint-disable-next-line no-console
      console.dir(count)
      return out
    }, */

    /**
     * Permet de passer a la page suivante du data iterator
     */
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) { this.page += 1 }
    },

    /**
     * Permet de passer a la page précedente du data iterator
     */
    formerPage () {
      if (this.page - 1 >= 1) { this.page -= 1 }
    },

    /**
     * Permet de changer le nombre d'items affiché dans le data iterator
     * @param number
     */
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },

    /**
     * Permet de checker si l'utilisateur est le scretaire ou pas
     * @param user
     * @returns {boolean}
     *  -> True si l'user est authorisé
     *  -> False si l'user ne l'est pas
     */
    getRight () {
      if (this.$auth.user !== null) {
        if (this.$auth.user[0].isAdmin) {
          return true
        }
        return false
      }
      return false
    },

    clone ({ name, avatar, username }) {
      return { name, avatar, username }
    },

    pullFunction () {
      return this.controlOnStart ? 'clone' : true
    },

    start ({ originalEvent }) {
      this.controlOnStart = originalEvent.ctrlKey
    }
  }
}
</script>

<style scoped>

</style>
