<template>
  <v-container>
    <v-label>
      <h1 class="display-1">
        Panel d'Administration
      </h1>
    </v-label>
    <v-row>
      <v-col
        cols="3"
      >
        <v-card>
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
                    <v-img v-if="item.avatar.length > 1" :src="item.avatar" />
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
        cols="6"
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
    </v-row>
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
      page: 1
    }
  },
  computed: {
    ...mapGetters({
      roles: 'role/role',
      equipe: 'role/equipe',
      numProsit: 'role/numProsit'
    }),

    numberOfPages () {
      return Math.ceil(this.roles.length / this.itemsPerPage)
    }
  },
  methods: {
    ...mapActions({
      editProsit: 'role/updateProsit'
    }),

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
              avatar: 'https://luckysketch.files.wordpress.com/2017/06/chibi-siberian-husky.png'
            })
            out.push({
              role: 'Secretaire',
              user: item.Secretaire,
              avatar: 'https://luckysketch.files.wordpress.com/2017/06/chibi-siberian-husky.png'
            })
            out.push({
              role: 'Scribe',
              user: item.Scribe,
              avatar: 'https://luckysketch.files.wordpress.com/2017/06/chibi-siberian-husky.png'
            })
            out.push({
              role: 'Gestionaire',
              user: item.Gestionaire,
              avatar: 'https://luckysketch.files.wordpress.com/2017/06/chibi-siberian-husky.png'
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
    }
  }
}
</script>

<style scoped>

</style>
