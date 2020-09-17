<template>
  <v-container>
    <v-layout
      column
      justify-center
      align-center
    >
      <v-flex
        xs13
        sm8
        md8
      >
        <v-card style="border-radius: 30px" max-width="775">
          <v-card-title class="mx-4 ">
            <v-sheet
              color="#cf3436"
              elevation="2"
              class="mx-4 my-4"
              rounded
            >
              <v-icon large class="mx-2 my-2">
                mdi-book-open-variant
              </v-icon>
            </v-sheet>
            Mots clés
            <v-spacer />
            <v-text-field
              v-model="search"
              class="pt-8"
              label="Search"
              height="25"
              filled
              rounded
              clearable
            />
          </v-card-title>
          <v-card-subtitle class="mx-4">
            Vous retrouvez ici les mots clés de tout les prosits
            <v-row
              align="center"
              justify="start"
            >
              <v-col
                v-for="(prosit, i) in allPa"
                :key="i"
                class="shrink"
              >
                <v-chip
                  color="smokyBlack"
                  @click="search = prosit.num_prosit.toString()"
                >
                  {{ prosit.num_prosit }}. {{ prosit.name }}
                </v-chip>
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-card-text>
            <v-card
              flat
              style="overflow-y: auto"
              :class="scrollbarTheme"
              :style="'height:' + windowSize.y / 1.75 + 'px'"
              class="px-6"
            >
              <v-data-table
                class="mx-4 my-4"
                :headers="headers"
                :items="keywords"
                :search="search"
                :loading="done"
              >
                <template v-slot:item.action="{ item }">
                  <v-btn
                    icon
                    @click="getWikipage(item)"
                  >
                    <v-icon v-if="item.definiton.length === 0">
                      mdi-comment-edit-outline
                    </v-icon>
                    <v-icon v-else>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </template>
                <template v-slot:item.definiton="{ item }">
                  <p class="truncate">
                    {{ item.definiton }}
                  </p>
                </template>
                <template v-slot:top>
                  <v-dialog v-model="dialog" max-width="750px" scrollable>
                    <v-flex class="overflow-y-auto" :class="scrollbarTheme">
                      <v-card>
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

                        <v-card-title>
                          <span class="headline">Définitions</span>
                        </v-card-title>

                        <v-card-text>
                          <v-row
                            class="overflow-y-auto"
                            :class="scrollbarTheme"
                            align="center"
                            justify="start"
                          >
                            <v-col
                              v-for="(keyword, i) in wikiWords"
                              :key="i"
                              cols="12"
                              class="shrink"
                            >
                              <v-chip
                                color="smokyBlack"
                                class="mb-2"
                                @click="editKeyword(keyword)"
                              >
                                {{ keyword.name }}
                              </v-chip>
                              <v-textarea
                                v-model="keyword.definition"
                                auto-grow
                                filled
                                background-color="rgba(253, 254, 251, 0.2)"
                                rounded
                                counter
                                hint="En vrais essaye de faire quelque chose de court quand meme"
                              />
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-dialog>
                </template>
              </v-data-table>
            </v-card>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Keywords',
  data () {
    return {
      search: '',
      dialog: false,
      done: true,
      headers: [
        { text: 'PA n°', value: 'num_prosit' },
        { text: 'Mot clé', value: 'name' },
        { text: 'Définition', value: 'definiton', width: 250 },
        { text: 'Actions', value: 'action' }
      ],
      wikiWords: [],
      windowSize: {
        x: 0,
        y: 1
      }
    }
  },
  computed: {
    ...mapGetters({
      allPa: 'prosit/allPa',
      keywords: 'prosit/keywords',
      lastPa: 'prosit/lastPa'
    }),

    scrollbarTheme () {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    }
  },
  mounted () {
    this.getKeywords()
    this.getAllPa()
    this.getLastPa()
    if (Object.keys(this.$route.query).length >= 1) {
      this.search = this.$route.query.search
    } else {
      this.search = this.lastPa.num_prosit?.toString()
    }
    this.onResize()
  },
  methods: {
    ...mapActions({
      editKwrd: 'prosit/editKeyword',
      getKwrd: 'prosit/getKeyword',
      getAllPa: 'prosit/getAllPa',
      getLastPa: 'prosit/getLastPa'
    }),

    /**
     * Permet de calculer la taille de l'ecran
     **/
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },

    getKeywords () {
      this.getKwrd()
      setTimeout(() => {
        this.done = false
      }, 700)
    },

    getWikipage (object) {
      const out = []
      if (object.definiton.length === 0) {
        axios.get('https://fr.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=' + object.name,
          {
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            }
          })
          .then((response) => {
            if (response.data[1].length >= 1) {
              response.data[1].forEach(function (item) {
                axios.get('https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&origin=*&titles=' + item,
                  {
                    headers: {
                      'Content-Type': 'application/json; charset=UTF-8'
                    }
                  }).then((response) => {
                  const key = Object.keys(response.data.query.pages)[0]

                  out.push({
                    id: object.id,
                    name: item,
                    definition: response.data.query.pages[key].extract,
                    num_prosit: object.num_prosit
                  })
                })
              })
              this.wikiWords = out
              this.dialog = true
            } else {
              this.$toast.warning('Il n\'y a aucune page wikipédia correspondante malheureusement')
            }
          }).catch((onerror) => {
          // eslint-disable-next-line no-console
            console.error(onerror)
          })
      } else {
        this.wikiWords = []
        this.wikiWords.push({
          id: object.id,
          name: object.name,
          definition: object.definiton,
          num_prosit: object.num_prosit
        })
        this.dialog = true
      }
    },

    editKeyword (keyword) {
      console.dir(keyword)
      this.editKwrd(keyword).then(this.dialog = false)
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
    border-left: 1px solid #2c2c2c;
  }

  .dark::-webkit-scrollbar-thumb {
    background: #3e3e3e;
    border: solid 3px #202020;
    border-radius: 7px;
  }

  .dark::-webkit-scrollbar-thumb:hover {
    background: white;
  }

  .truncate {
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
