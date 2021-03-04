<template>
  <h1>Test</h1>
  <!--<v-container
    fluid
    align="center"
  >
    <v-row
      align="start"
      justify="start"
    >
      <v-col
        cols="1"
      />
      <v-col
        cols="2"
        xl="2"
        lg="3"
        md="3"
        sm="7"
        xs="9"
      >
        <v-card
          raised
          style="border-radius: 30px;"
        >
          <v-card-title>
            <v-sheet
              color="#cf3436"
              elevation="2"
              class="mx-4 my-4"
              rounded
            >
              <v-icon large class="mx-2 my-2">
                mdi-account-group
              </v-icon>
            </v-sheet>
            Equipe
          </v-card-title>
          <v-card-text>
            <v-list
              two-line
              rounded
            >
              <v-list-item
                v-for="(item, idx) in equipe"
                :key="idx"
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
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="7"
        xl="7"
        lg="7"
        md="7"
        sm="9"
        xs="9"
      >
        <v-card
          style="border-radius: 30px"
          raised
        >
          <v-card-title>
            <v-sheet
              color="#cf3436"
              elevation="2"
              class="mx-4 my-4"
              rounded
            >
              <v-icon large class="mx-2 my-2">
                mdi-view-list
              </v-icon>
            </v-sheet>
            Prosit Maker
          </v-card-title>
          <v-card-text
            class="px-6 py-6"
          >
            <v-card
              flat
              style="overflow-y: auto"
              :class="scrollbarTheme"
              :style="'height:' + windowSize.y / 1.65 + 'px'"
              class="px-6"
            >
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    v-model="name"
                    :rules="required"
                    :disabled="!getRight()"
                    placeholder="Nom du Prosit"
                    filled
                    background-color="rgba(253, 254, 251, 0.2)"
                    rounded
                  />

                  <v-row
                    align="center"
                    justify="start"
                  >
                    <v-col
                      v-for="(keyword, i) in keywords"
                      :key="i"
                      class="shrink"
                    >
                      <v-chip
                        v-if="getRight()"
                        color="smokyBlack"
                        close
                        @click:close="keywords.splice(i, 1)"
                      >
                        {{ keyword.name }}
                      </v-chip>
                      <v-chip
                        v-else
                        color="smokyBlack"
                      >
                        {{ keyword.name }}
                      </v-chip>
                    </v-col>
                  </v-row>

                  <v-text-field
                    v-model="keywrd"
                    placeholder="Mots clés"
                    :disabled="!getRight()"
                    hint="Merci de ne pas faire d'abréviations / de coller les mots clées (ex : Pb d'optimisation / décisions) PS: je sais qui est scribe je te retrouverais si tu suis pas ces instructions"
                    filled
                    background-color="rgba(253, 254, 251, 0.2)"
                    rounded
                    @keydown.enter="addKeyword(keywrd)"
                  />

                  <v-textarea
                    v-model="context"
                    :disabled="!getRight()"
                    placeholder="Contexte"
                    :rules="required"
                    filled
                    background-color="rgba(253, 254, 251, 0.2)"
                    rounded
                  />

                  <v-row
                    align="start"
                    justify="start"
                  >
                    <v-col
                      cols="6"
                    >
                      <v-textarea
                        v-model="constraint"
                        :disabled="!getRight()"
                        placeholder="Contraintes"
                        filled
                        background-color="rgba(253, 254, 251, 0.2)"
                        rounded
                        auto-grow
                        @keydown.enter="addConstraint(constraint)"
                      />
                    </v-col>
                    <v-col
                      cols="6"
                    >
                      <v-list
                        :color="constraints.length < 1 ? '#1E1E1E' : '#292929'"
                        style="border-radius: 30px"
                        rounded
                      >
                        <v-list-item>
                          <v-list-item-title />
                          <v-list-item-action>
                            <v-icon
                              v-if="!editConstraints"
                              @click="editConstraints = !editConstraints"
                            >
                              mdi-pencil
                            </v-icon>
                            <v-icon
                              v-else
                              color="pantoneGreen"
                              @click="editConstraints = !editConstraints"
                            >
                              mdi-check
                            </v-icon>
                          </v-list-item-action>
                        </v-list-item>
                        <v-list-item
                          v-for="(item, i) in constraints"
                          :key="i"
                          exact
                        >
                          <v-list-item-title>
                            <v-textarea
                              v-if="editConstraints"
                              v-model="constraints[i].name"
                              class="pt-4"
                              auto-grow
                              filled
                              rounded
                            />
                            <template v-else>
                              {{ item.name }}
                            </template>
                          </v-list-item-title>
                          <v-list-item-action
                            v-if="getRight()"
                          >
                            <v-icon
                              color="primary"
                              @click="constraints.splice(i, 1)"
                            >
                              mdi-close
                            </v-icon>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>

                  <v-text-field
                    v-model="generalisation"
                    :rules="required"
                    :disabled="!getRight()"
                    placeholder="Généralisation"
                    filled
                    background-color="rgba(253, 254, 251, 0.2)"
                    rounded
                  />

                  <v-row
                    align="start"
                    justify="start"
                  >
                    <v-col
                      cols="6"
                    >
                      <v-textarea
                        v-model="problematic"
                        :disabled="!getRight()"
                        placeholder="Problématique"
                        filled
                        rounded
                        auto-grow
                        background-color="rgba(253, 254, 251, 0.2)"
                        @keydown.enter="addProblematic(problematic)"
                      />
                    </v-col>
                    <v-col
                      cols="6"
                    >
                      <v-list
                        :color="problematics.length < 1 ? '#1E1E1E' : '#292929'"
                        style="border-radius: 30px"
                        rounded
                      >
                        <v-list-item>
                          <v-list-item-title />
                          <v-list-item-action>
                            <v-icon
                              v-if="!editProblematics"
                              @click="editProblematics = !editProblematics"
                            >
                              mdi-pencil
                            </v-icon>
                            <v-icon
                              v-else
                              color="pantoneGreen"
                              @click="editProblematics = !editProblematics"
                            >
                              mdi-check
                            </v-icon>
                          </v-list-item-action>
                        </v-list-item>
                        <v-list-item
                          v-for="(item, i) in problematics"
                          :key="i"
                          exact
                        >
                          <v-list-item-title>
                            <v-textarea
                              v-if="editProblematics"
                              v-model="problematics[i].name"
                              auto-grow
                              filled
                              rounded
                            />
                            <template v-else>
                              {{ item.name }}
                            </template>
                          </v-list-item-title>
                          <v-list-item-action
                            v-if="getRight()"
                          >
                            <v-icon
                              color="primary"
                              @click="problematics.splice(i, 1)"
                            >
                              mdi-close
                            </v-icon>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>

                  <v-row
                    align="start"
                    justify="start"
                  >
                    <v-col
                      cols="6"
                    >
                      <v-textarea
                        v-model="hypothesis"
                        :disabled="!getRight()"
                        placeholder="Hypothèses"
                        filled
                        rounded
                        auto-grow
                        background-color="rgba(253, 254, 251, 0.2)"
                        @keydown.enter="addHypothesis(hypothesis)"
                      />
                    </v-col>
                    <v-col
                      cols="6"
                    >
                      <v-list
                        :color="hypothesises.length < 1 ? '#1E1E1E' : '#292929'"
                        style="border-radius: 30px"
                        rounded
                      >
                        <v-list-item>
                          <v-list-item-title />
                          <v-list-item-action>
                            <v-icon
                              v-if="!editHypothesis"
                              @click="editHypothesis = !editHypothesis"
                            >
                              mdi-pencil
                            </v-icon>
                            <v-icon
                              v-else
                              color="pantoneGreen"
                              @click="editHypothesis = !editHypothesis"
                            >
                              mdi-check
                            </v-icon>
                          </v-list-item-action>
                        </v-list-item>
                        <v-list-item
                          v-for="(item, i) in hypothesises"
                          :key="i"
                          exact
                        >
                          <v-list-item-title>
                            <v-textarea
                              v-if="editHypothesis"
                              v-model="hypothesises[i].name"
                              auto-grow
                              filled
                              rounded
                            />
                            <template v-else>
                              {{ item.name }}
                            </template>
                          </v-list-item-title>
                          <v-list-item-action
                            v-if="getRight()"
                          >
                            <v-icon
                              color="primary"
                              @click="hypothesises.splice(i, 1)"
                            >
                              mdi-close
                            </v-icon>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>

                  <v-row
                    align="start"
                    justify="start"
                  >
                    <v-col
                      cols="6"
                    >
                      <v-textarea
                        v-model="pa"
                        :disabled="!getRight()"
                        placeholder="Plan d'action"
                        filled
                        rounded
                        auto-grow
                        background-color="rgba(253, 254, 251, 0.2)"
                        @keydown.enter="addPa(pa)"
                      />
                    </v-col>
                    <v-col
                      cols="6"
                    >
                      <v-list
                        :color="paArray.length < 1 ? '#1E1E1E' : '#292929'"
                        style="border-radius: 30px"
                        rounded
                      >
                        <v-list-item>
                          <v-list-item-title />
                          <v-list-item-action>
                            <v-icon
                              v-if="!editPa"
                              @click="editPa = !editPa"
                            >
                              mdi-pencil
                            </v-icon>
                            <v-icon
                              v-else
                              color="pantoneGreen"
                              @click="editPa = !editPa"
                            >
                              mdi-check
                            </v-icon>
                          </v-list-item-action>
                        </v-list-item>
                        <draggable
                          v-if="paArray.length >= 1"
                          :list="paArray"
                          :enable="getRight()"
                          class="list-group"
                          ghost-class="ghost"
                          :color="problematics.length < 1 ? '#1E1E1E' : '#292929'"
                          style="border-radius: 30px"
                          rounded
                          @start="dragging = true"
                          @end="dragging = false"
                        >
                          <v-list-item
                            v-for="(item, i) in paArray"
                            :key="i"
                            exact
                          >
                            <v-list-item-title>
                              <v-textarea
                                v-if="editPa"
                                v-model="paArray[i].name"
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
                                {{ item.name }}
                              </template>
                            </v-list-item-title>
                            <v-list-item-action
                              v-if="getRight()"
                            >
                              <v-icon
                                color="primary"
                                @click="paArray.splice(i, 1)"
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
                <v-spacer />
                <v-btn
                  v-if="getRight()"
                  color="primary"
                  class="my-2"
                  large
                  rounded
                  :disabled="!valid"
                  @click="createDocx"
                >
                  <v-icon>
                    mdi-file-word
                  </v-icon>
                  DOC
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>-->
</template>

<!--<script>
import draggable from 'vuedraggable'
import { saveAs } from 'file-saver'
import { mapActions, mapGetters } from 'vuex'
import {
  Document,
  Footer,
  HeadingLevel,
  HorizontalPositionAlign,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun
} from 'docx'

export default {
  name: 'PrositsV2',
  comments: {
    draggable
  },
  data () {
    return {
      valid: true,
      windowSize: {
        x: 0,
        y: 1
      },
      user: this.$auth.user,
      editConstraints: false,
      editProblematics: false,
      editHypothesis: false,
      editPa: false,
      required: [
        value => !!value || 'Required.'
      ],
      name: '',
      keywords: [],
      keywrd: '',
      context: '',
      constraints: [],
      constraint: '',
      generalisation: '',
      problematics: [],
      problematic: '',
      hypothesises: [],
      hypothesis: '',
      paArray: [],
      pa: ''
    }
  },
  computed: {
    ...mapGetters({
      roles: 'role/role',
      equipe: 'role/currentEquipe',
      numProsit: 'role/numProsit'
    }),

    scrollbarTheme () {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    }
  },
  mounted () {
    this.getNumProsit()
    this.onResize()
  },
  methods: {
    ...mapActions({
      fillPa: 'prosit/fillPa',
      addCer: 'prosit/addCer',
      getNumProsit: 'role/getNumProsit',
      updateNumProsit: 'role/updateNumProsit'
    }),

    /**
     * Permet de calculer la taille de l'ecran
     **/
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },

    /**
     * Permet de clear tout les eléments
     * de texte et d'affichage
     **/
    clearAll () {
      this.valid = true
      this.name = ''
      this.keywords = []
      this.keywrd = ''
      this.context = ''
      this.constraints = []
      this.constraint = ''
      this.generalisation = ''
      this.problematic = ''
      this.problematics = []
      this.hypothesises = []
      this.hypothesis = ''
      this.paArray = []
      this.pa = ''
    },

    clearConstraints () {
      this.constraint = ''
    },

    /**
       * Permet d'ajouter un mot clés
       * dans le tableau de mots clés
       * @param item
       */
    addKeyword (item) {
      if (item.length !== 0) {
        if (item.toString().includes('/') || item.toString().includes(' ')) {
          this.$toast.warning('Je crois avoir dis qlq chose sur les mots clés')
        }
        this.keywords.push({ name: item, definition: '', num_prosit: this.numProsit })
        this.keywrd = ''
      } else {
        this.$toast.warning('Le champ mot clé est vide')
      }
    },

    /**
       * Permet d'ajouter une contrainte
       * dans le tableau de contraintes
       * @param item
       */
    addConstraint (item) {
      if (item.length !== 0) {
        this.constraints.push({ name: item, num_prosit: this.numProsit })
        this.constraint = ''
      } else {
        this.$toast.warning('Le champ contrainte est vide')
      }
    },

    /**
     * Permet d'ajouter une contrainte
     * dans le tableau de contraintes
     * @param item
     */
    addProblematic (item) {
      if (item.length !== 0) {
        this.problematics.push({ name: item, num_prosit: this.numProsit })
        this.problematic = ''
      } else {
        this.$toast.warning('Le champ problématique est vide')
      }
    },

    /**
       * Permet d'ajouter une hypothèse
       * dans le tableau d'hypotheèses
       * @param item
       */
    addHypothesis (item) {
      if (item.length !== 0) {
        this.hypothesises.push({ name: item, num_prosit: this.numProsit })
        this.hypothesis = ''
      } else {
        this.$toast.warning('Le champ hypothèse est vide')
      }
    },

    /**
       * Permet d'ajouter une etape au plan d'action
       * @param item
       */
    addPa (item) {
      if (item.length !== 0) {
        this.paArray.push({ name: item, num_prosit: this.numProsit })
        this.pa = ''
      } else {
        this.$toast.warning('Le champ pa est vide')
      }
    },

    /**
     * Permet de génerer le document docx
     * a l'aide des methodes adjointes
     **/
    createDocx () {
      // Create document
      const doc = new Document()
      // On recupere les roles
      const temp = this.equipe

      if (this.keywords.length !== 0) {
        if (this.hypothesises.length !== 0) {
          if (this.constraints.length !== 0) {
            if (this.paArray.length !== 0) {
              if (this.problematics.length !== 0) {
                if (this.$refs.form.validate()) {
                  this.valid = true
                  this.fillPa(this.paArray)
                  // On crée la première page
                  doc.addSection({
                    // Footer de la page
                    footers: {
                      default: new Footer({
                        children: [new Paragraph({
                          text: 'Animateur : ' + temp[0].user + ' / Secretaire : ' + temp[1].user + ' / Scribe : ' + temp[2].user + ' / Gestionaire : ' + temp[3].user
                        })]
                      })
                    },
                    // Contenu de la page
                    children: [
                      new Paragraph({
                        text: this.name,
                        heading: HeadingLevel.TITLE,
                        alignment: HorizontalPositionAlign.CENTER
                      }),
                      this.createSpace(),
                      this.createSpace(),
                      this.createHeading('Mots Clés'),
                      this.createSpace(),
                      ...this.keywords
                        .map((education) => {
                          const arr = []
                          arr.push(
                            this.createListItem(education.name)
                          )
                          return arr
                        })
                        .reduce((prev, curr) => prev.concat(curr), []),
                      this.createSpace(),
                      this.createSpace(),
                      this.createHeading('Contexte'),
                      this.createSpace(),
                      this.createText(this.context),
                      this.createSpace(),
                      this.createHeading('Contraintes'),
                      this.createSpace(),
                      ...this.constraints
                        .map((item) => {
                          const arr = []
                          arr.push(
                            this.createListItem(item.name)
                          )
                          return arr
                        })
                        .reduce((prev, curr) => prev.concat(curr), []),
                      this.createSpace(),
                      this.createSpace(),
                      this.createHeading('Généralisation'),
                      this.createSpace(),
                      this.createText(this.generalisation),
                      this.createSpace(),
                      this.createSpace(),
                      this.createHeading('Problématique'),
                      this.createSpace(),
                      ...this.problematics
                        .map((item) => {
                          const arr = []
                          arr.push(
                            this.createListItem(item.name)
                          )
                          return arr
                        })
                        .reduce((prev, curr) => prev.concat(curr), []),
                      this.createSpace(),
                      this.createSpace(),
                      this.createHeading('Hypothèses'),
                      this.createSpace(),
                      ...this.hypothesises
                        .map((item) => {
                          const arr = []
                          arr.push(
                            this.createListItem(item.name)
                          )
                          return arr
                        })
                        .reduce((prev, curr) => prev.concat(curr), []),
                      this.createSpace(),
                      this.createSpace(),
                      this.createHeading('Plan d\'action'),
                      this.createSpace(),
                      ...this.paArray
                        .map((item) => {
                          const arr = []
                          arr.push(
                            this.createListItem(item.name)
                          )
                          return arr
                        })
                        .reduce((prev, curr) => prev.concat(curr), [])
                    ]
                  })

                  // On utlise File-Saver pour enregistrer le document
                  Packer.toBlob(doc).then((buffer) => {
                    saveAs(buffer, this.name + '.docx')
                    this.$toast.success('Le fichier à été crée avec succès')
                    this.addCer(this.createObject()).then(() => {
                      this.clearAll()
                      this.updateNumProsit(this.numProsit + 1)
                    })
                  }).catch((e) => {
                    this.$toast.error('Une erreure est survenue')
                    // eslint-disable-next-line no-console
                    console.error(e)
                  })
                } else {
                  this.$toast.error('Il te manque des champs à renseigner')
                }
              } else {
                this.$toast.error('Il n\' y a aucune problématique')
              }
            } else {
              this.$toast.error('Il n\' y a aucune étape dans le plan d\'action')
            }
          } else {
            this.$toast.error('Il n\' y a aucune contrainte')
          }
        } else {
          this.$toast.error('Il n\' y a aucune Hypothèse')
        }
      } else {
        this.$toast.error('Il n\' y a aucun mots clés')
      }
    },

    /*
     * Sert a faire un retour a la ligne
     */
    createSpace () {
      return new Paragraph({
        children: [
          new TextRun({
            text: '',
            size: 20
          })
        ]
      })
    },

    /*
     * Sert a générer un titre
     */
    createHeading (text) {
      return new Paragraph({
        children: [
          new TextRun({
            text,
            size: 28,
            allCaps: true
          })
        ]
      })
    },

    /*
     * Sert a générer un texte
     */
    createText (text) {
      return new Paragraph({
        children: [
          new TextRun({
            text,
            size: 22
          })
        ]
      })
    },

    /*
     * Sert à générer un element de la liste
     */
    createListItem (text) {
      return new Paragraph({
        tabStops: [
          {
            type: TabStopType.RIGHT,
            position: TabStopPosition.MAX
          }
        ],
        children: [
          new TextRun({
            text,
            bold: false,
            size: 22
          })
        ]
      })
    },

    /**
     * Permet de créer l'objet a envoyer
     **/
    createObject () {
      const out = []

      // On push le nom
      out.push({ numProsit: this.numProsit })
      out.push({ name: this.name })
      out.push({ generalisation: this.generalisation })
      out.push({ context: this.context })
      out.push({ scribe: this.equipe[2].user })
      out.push({ animateur: this.equipe[0].user })
      out.push({ secretaire: this.equipe[1].user })
      out.push({ gestionaire: this.equipe[3].user })

      // On push les items de Keywords
      if (this.keywords.length !== 0) {
        const temp = []
        this.keywords.forEach(function (item) {
          temp.push(item)
        })
        out.push({ keyword: temp })

        // On push les items de constraints
        if (this.constraints.length !== 0) {
          const temp = []
          this.constraints.forEach(function (item) {
            temp.push(item)
          })
          out.push({ constraints: temp })

          // On push les items de hypothesises
          if (this.hypothesises.length !== 0) {
            const temp = []
            this.hypothesises.forEach(function (item) {
              temp.push(item)
            })
            out.push({ hypothesises: temp })

            // On push les items de problematics
            if (this.problematics.length !== 0) {
              const temp = []
              this.problematics.forEach(function (item) {
                temp.push(item)
              })
              out.push({ problematics: temp })

              // On push les items de problematics
              if (this.paArray.length !== 0) {
                const temp = []
                this.paArray.forEach(function (item) {
                  temp.push(item)
                })
                out.push({ pa: temp })
              }
            }
          }
        }
      }

      return {
        numProsit: out[0].numProsit,
        name: out[1].name,
        generalisation: out[2].generalisation,
        context: out[3].context,
        keywords: out[8].keyword,
        animateur: out[5].animateur,
        secretaire: out[6].secretaire,
        scribe: out[4].scribe,
        gestionaire: out[7].gestionaire,
        constraints: out[9].constraints,
        hypothesises: out[10].hypothesises,
        problematics: out[11].problematics,
        pa: out[12].pa
      }
    },

    /**
     * Permet de checker si l'utilisateur est le scretaire ou pas
     * @param user
     * @returns {boolean}
     *  -> True si l'user est authorisé
     *  -> False si l'user ne l'est pas
     */
    getRight () {
      if (this.$auth.user !== null && this.$auth.loggedIn) {
        if (this.equipe[2].user === this.$auth.user[0].name || this.$auth.user[0].isAdmin) {
          return true
        }
        return false
      }
      return false
    }
  }
}
</script> -->

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
