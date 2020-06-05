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
        <v-card style="border-radius: 20px">
          <v-card-title>
            <h1 class="display-1 pb-8">
              Mots clés du prosit
            </h1>
            <v-spacer />
            <v-text-field
              v-model="search"
              label="Search"
              height="25"
              filled
              rounded
            />
          </v-card-title>
          <v-card-subtitle>
            Vous retrouvez ici les mots clés de tout les prosits
          </v-card-subtitle>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="keywords"
              :search="search"
            >
              <template v-slot:top>
                <v-dialog v-model="dialog" max-width="750px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Définitions</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row
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
                              filled
                              background-color="rgba(253, 254, 251, 0.2)"
                              rounded
                            />
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer />
                      <v-btn color="blue darken-1" text @click="dialog = false">
                        Cancel
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
              <template v-slot:item.action="{ item }">
                <v-btn
                  icon
                  @click="getWikipage(item)"
                >
                  <v-icon>
                    mdi-comment-edit-outline
                  </v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'Keywords',
  data () {
    return {
      search: '',
      dialog: false,
      headers: [
        { text: 'PA n°', value: 'num_prosit' },
        { text: 'Mot clé', value: 'name' },
        { text: 'Définition', value: 'definition' },
        { text: 'Actions', value: 'action' }
      ],
      wikiWords: []
    }
  },
  computed: {
    keywords: {
      get () {
        return this.$store.state.prosit.keywords
      }
    }
  },
  mounted () {
    this.getKwrd()
  },
  methods: {
    ...mapActions({
      editKwrd: 'prosit/editKeyword',
      getKwrd: 'prosit/getKeyword'
    }),

    getWikipage (object) {
      const out = []

      axios.get('https://fr.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=' + object.name,
        {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        })
        .then((response) => {
          if (response.data[1].length > 1) {
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
    },

    editKeyword (keyword) {
      console.dir(keyword)
      this.editKwrd(keyword).then(this.dialog = false)
    }
  }
}
</script>

<style scoped>

</style>
