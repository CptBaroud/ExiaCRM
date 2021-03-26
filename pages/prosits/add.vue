<template>
  <v-container class="mt-2" :class="$vuetify.theme.dark ? 'card-background-dark' : 'card-background-light'">
    <v-row class="d-flex align-start justify-start">
      <v-col cols="4" class="d-flex justify-end">
        <v-card
          color="background"
          flat
        >
          <v-card-title class="text-h4 pt-8 d-flex justify-end" style="color: var(--v-text-base)">
            Créer un prosit
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card
          rounded="lg"
          color="background"
          flat
        >
          <v-card-text>
            <v-form
              ref="addPrositForm"
              v-model="addPrositValid"
              lazy-validation
            >
              <v-text-field
                v-model="addProsit.title"
                label="Titre"
                background-color="secondary"
                flat
                solo
                style="max-width: 414px"
                :rules="[rules.required]"
                @keydown="emitMessage({type: 'title', data: addProsit.title})"
              />

              <template>
                <v-chip
                  v-for="(item, i) in addProsit.keywords"
                  :key="i"
                  :class="i === 0 ? 'mr-2' : 'mx-2'"
                  class="my-4"
                  color="primary"
                  label
                  close
                  @click:close="removeElement(addProsit.keywords, i)"
                >
                  {{ item }}
                </v-chip>
              </template>

              <v-text-field
                v-model="addKeyword"
                label="Mot clé"
                background-color="secondary"
                flat
                solo
                style="max-width: 414px"
                @keypress.enter="pushElement(addProsit.keywords, addKeyword, 'addKeyword')"
              />

              <v-text-field
                v-model="addProsit.context"
                label="Contexte"
                background-color="secondary"
                flat
                solo
                style="max-width: 414px"
                :rules="[rules.required]"
              />

              <v-row style="padding-top: 0">
                <v-col cols="5">
                  <v-textarea
                    v-model="addConstraints"
                    label="Contrainte"
                    background-color="secondary"
                    auto-grow
                    flat
                    solo
                    @keypress.enter="pushElement(addProsit.contraints, addConstraints, 'addConstraints')"
                  />
                </v-col>
                <v-col cols="7">
                  <v-list v-if="addProsit.contraints.length > 0" color="background">
                    <v-list-item>
                      <v-list-item-content />
                      <v-list-item-action>
                        <v-btn icon small @click="editConstraints = !editConstraints">
                          <v-icon v-if="!editConstraints">
                            mdi-pencil
                          </v-icon>
                          <v-icon v-else>
                            mdi-check
                          </v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                    <template v-for="(item, i) in addProsit.contraints">
                      <v-list-item v-if="!editConstraints" :key="i">
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ item }}
                          </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn icon small color="primary" @click="removeElement(addProsit.contraints, i)">
                            <v-icon>
                              mdi-close
                            </v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                      <v-text-field
                        v-else
                        :key="i"
                        v-model="addProsit.contraints[i]"
                        flat
                        solo
                        background-color="secondary"
                      />
                    </template>
                  </v-list>
                </v-col>
              </v-row>

              <v-text-field
                v-model="addProsit.generalization"
                label="Généralisation"
                background-color="secondary"
                flat
                solo
                style="max-width: 414px"
                :rules="[rules.required]"
              />

              <v-row style="padding-top: 0">
                <v-col cols="5">
                  <v-textarea
                    ref="textarea"
                    v-model="addProblematics"
                    label="Problématique"
                    background-color="secondary"
                    auto-grow
                    flat
                    solo
                    @keypress.enter="pushElement(addProsit.problematics, addProblematics, 'addProblematics')"
                  />
                </v-col>
                <v-col cols="7">
                  <v-list v-if="addProsit.problematics.length > 0" color="background">
                    <v-list-item>
                      <v-list-item-content />
                      <v-list-item-action>
                        <v-btn icon small @click="editProblematics = !editProblematics">
                          <v-icon v-if="!editProblematics">
                            mdi-pencil
                          </v-icon>
                          <v-icon v-else>
                            mdi-check
                          </v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                    <template v-for="(item, i) in addProsit.problematics">
                      <v-list-item v-if="!editConstraints" :key="i">
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ item }}
                          </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn icon small color="primary" @click="removeElement(addProsit.problematics, i)">
                            <v-icon>
                              mdi-close
                            </v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                      <v-text-field
                        v-else
                        :key="i"
                        v-model="addProsit.problematics[i]"
                        flat
                        solo
                        background-color="secondary"
                      />
                    </template>
                  </v-list>
                </v-col>
              </v-row>

              <v-row style="padding-top: 0">
                <v-col cols="5">
                  <v-textarea
                    v-model="addHypothesies"
                    label="Hypothèse"
                    background-color="secondary"
                    auto-grow
                    flat
                    solo
                    @keypress.enter="pushElement(addProsit.hypotesies, addHypothesies, 'addProblematics')"
                  />
                </v-col>
                <v-col cols="7">
                  <v-list v-if="addProsit.hypotesies.length > 0" color="background">
                    <v-list-item>
                      <v-list-item-content />
                      <v-list-item-action>
                        <v-btn icon small @click="editHypoethesies = !editHypoethesies">
                          <v-icon v-if="!editHypoethesies">
                            mdi-pencil
                          </v-icon>
                          <v-icon v-else>
                            mdi-check
                          </v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                    <template v-for="(item, i) in addProsit.hypotesies">
                      <v-list-item v-if="!editHypoethesies" :key="i">
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ item }}
                          </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn icon small color="primary" @click="removeElement(addProsit.hypotesies, i)">
                            <v-icon>
                              mdi-close
                            </v-icon>
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                      <v-text-field
                        v-else
                        :key="i"
                        v-model="addProsit.hypotesies[i]"
                        flat
                        solo
                        background-color="secondary"
                      />
                    </template>
                  </v-list>
                </v-col>
              </v-row>

              <v-row style="padding-top: 0">
                <v-col cols="5">
                  <v-textarea
                    v-model="addSummary"
                    label="Plan d'action"
                    background-color="secondary"
                    auto-grow
                    flat
                    solo
                    @keypress.enter="pushElement(addProsit.summary, addSummary, 'addSummary')"
                  />
                </v-col>
                <v-col cols="7">
                  <v-list v-if="addProsit.summary.length > 0" color="background">
                    <v-list-item>
                      <v-list-item-content />
                      <v-list-item-action>
                        <v-btn icon small @click="editSummary = !editSummary">
                          <v-icon v-if="!editSummary">
                            mdi-pencil
                          </v-icon>
                          <v-icon v-else>
                            mdi-check
                          </v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                    <draggable
                      :list="addProsit.summary"
                      class="list-group"
                      ghost-class="ghost"
                      style="border-radius: 30px"
                      rounded
                      @start="dragging = true"
                      @end="dragging = false"
                    >
                      <v-list-item
                        v-for="(item, i) in addProsit.summary"
                        :key="i"
                        exact
                      >
                        <v-list-item-title>
                          <v-textarea
                            v-if="editSummary"
                            v-model="addProsit.summary[i]"
                            auto-grow
                            filled
                            rounded
                          />
                          <template v-else>
                            <v-chip
                              color="primary"
                            >
                              {{ i + 1 }}
                            </v-chip>
                            {{ item }}
                          </template>
                        </v-list-item-title>
                        <v-list-item-action>
                          <v-icon
                            color="primary"
                            @click="removeElement(addProsit.summary, i)"
                          >
                            mdi-close
                          </v-icon>
                        </v-list-item-action>
                      </v-list-item>
                    </draggable>
                  </v-list>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              large
              color="primary"
              :disabled="!addPrositValid"
              style="color: var(--v-text_inversed-base)"
              @click="createProsit"
            >
              Créer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Add',
  middleware ({ store, redirect }) {
    if (store.$auth.user.role < 2 || store.state.team.currentTeam.scribe._id !== store.$auth.user._id) {
      store.$toast.warning('L\'accès à cette page est reservée aux administrateurs et à l\'actuel scribe pour l\'instant')
      redirect('/')
    } else if (store.$auth.user.role < 2) {
      store.$toast.warning('L\'accès à cette page est reservée aux administrateurs et à l\'actuel scribe pour l\'instant')
      redirect('/')
    }
  },
  data () {
    return {
      // Element a push dans un tabelau dans addProsit
      addKeyword: '',
      addSummary: '',
      addConstraints: '',
      addProblematics: '',
      addHypothesies: '',

      // boolean pour edit les contraintes etc....
      editConstraints: false,
      editProblematics: false,
      editHypoethesies: false,
      editSummary: false,

      // Element d'ajout du prosit
      addPrositValid: false,
      addProsit: {
        keywords: [],
        contraints: [],
        problematics: [],
        hypotesies: [],
        summary: []
      },

      // Regles de validation
      rules: {
        required: value => !!value || 'Requis'
      }
    }
  },
  mounted () {
    // On ecoute le socket
    this.socket = this.$nuxtSocket({
      name: 'main'
    })

    this.socket.on('news', (msg) => {
      console.log(msg)
    })

    this.socket.on('prosit', (msg) => {
      console.log(msg)
    })
  },
  methods: {
    emitMessage (data) {
      console.log(data)
      this.socket.emit('prosit', data, (resp) => {
        console.log(resp)
      })
    },

    pushElement (array, element, ref) {
      this.emitMessage({ type: 'push', array, element })
      array.push(element)
      this.$data[ref] = ''
    },

    removeElement (array, elementIndex) {
      this.emitMessage({ type: 'remove', array, elementIndex })
      array.splice(elementIndex, 1)
    },

    createProsit () {
      // On récupère les données
      const prosit = this.addProsit
      // On ajoute l'auteur
      prosit.author = this.$auth.user._id

      // Si tout les champs sont valide
      if (this.$refs.addPrositForm.validate()) {
        this.$store.dispatch('prosit/add', {
          prosit,
          token: this.$auth.getToken('local')
        })
          .then((response) => {
            // la reponse prend du temps à arriver donc on bloque le boutton
            this.addPrositValid = false
            if (response.status === 200) {
              this.$router.push('/')
            }
          })
          .catch((e) => {
            // eslint-disable-next-line no-console
            console.error(e)
          })
      }
    }
  }
}
</script>

<style scoped>
.card-background-light {
  background-image: url('../../assets/svg/add_light.svg');
  background-size: 42em;
  background-position: right 105% bottom 76%;
  position: relative;
}

.card-background-dark {
  background-image: url('../../assets/svg/add_dark.svg');
  background-size: 42em;
  background-position: right 105% bottom 76%;
  position: relative;
}
</style>
