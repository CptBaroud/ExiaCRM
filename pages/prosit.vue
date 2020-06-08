<template>
  <v-container fluid align="center">
    <v-label>
      <h1 class="display-1 mb-4">
        Prosit Maker
      </h1>
    </v-label>
    <v-row
      align="start"
      justify="start"
    >
      <v-col
        cols="2"
        xl="2"
        lg="3"
        md="3"
        sm="7"
        xs="9"
        class="mx-6"
      >
        <v-card
          raised
          style="border-radius: 15px;"
        >
          <v-list
            two-line
            rounded
          >
            <v-list-item
              v-for="(item, idx) in equipe"
              :key="idx"
            >
              <v-list-item-avatar>
                <v-img :src="item.avatar" />
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
      </v-col>
      <v-col
        cols="7"
        xl="7"
        lg="7"
        md="7"
        sm="9"
        xs="9"
      >
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
              cols="4"
            >
              <v-text-field
                v-model="constraint"
                :disabled="!getRight()"
                placeholder="Contraintes"
                filled
                background-color="rgba(253, 254, 251, 0.2)"
                rounded
                @keydown.enter="addConstraint(constraint)"
              />
            </v-col>
            <v-col
              cols="8"
            >
              <v-list
                v-if="constraints.length >= 1"
                color="rgb(18,18,18)"
                rounded
              >
                <v-list-item>
                  <v-list-item-title>
                    Editer
                  </v-list-item-title>
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
                <v-divider />
                <v-list-item
                  v-for="(item, i) in constraints"
                  :key="i"
                  exact
                >
                  <v-list-item-title>
                    <v-text-field
                      v-if="editConstraints"
                      v-model="constraints[i].name"
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
              cols="4"
            >
              <v-text-field
                v-model="problematic"
                :disabled="!getRight()"
                placeholder="Problématique"
                filled
                rounded
                background-color="rgba(253, 254, 251, 0.2)"
                @keydown.enter="addProblematic(problematic)"
              />
            </v-col>
            <v-col
              cols="8"
            >
              <v-list
                v-if="problematics.length >= 1"
                color="rgb(18,18,18)"
                rounded
              >
                <v-list-item>
                  <v-list-item-title>
                    Editer
                  </v-list-item-title>
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
                <v-divider />
                <v-list-item
                  v-for="(item, i) in problematics"
                  :key="i"
                  exact
                >
                  <v-list-item-title>
                    <v-text-field
                      v-if="editProblematics"
                      v-model="problematics[i].name"
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
              cols="4"
            >
              <v-text-field
                v-model="hypothesis"
                :disabled="!getRight()"
                placeholder="Hypothèses"
                filled
                rounded
                background-color="rgba(253, 254, 251, 0.2)"
                @keydown.enter="addHypothesis(hypothesis)"
              />
            </v-col>
            <v-col
              cols="8"
            >
              <v-list
                v-if="hypothesises.length >= 1"
                color="rgb(18,18,18)"
                rounded
              >
                <v-list-item>
                  <v-list-item-title>
                    Editer
                  </v-list-item-title>
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
                <v-divider />
                <v-list-item
                  v-for="(item, i) in hypothesises"
                  :key="i"
                  exact
                >
                  <v-list-item-title>
                    <v-text-field
                      v-if="editHypothesis"
                      v-model="hypothesises[i].name"
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
              cols="4"
            >
              <v-text-field
                v-model="pa"
                :disabled="!getRight()"
                placeholder="Plan d'action"
                background-color="rgba(253, 254, 251, 0.2)"
                filled
                rounded
                @keydown.enter="addPa(pa)"
              />
            </v-col>
            <v-col
              cols="8"
            >
              <v-list-item v-if="paArray.length >= 1">
                <v-list-item-title>
                  Editer
                </v-list-item-title>
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
              <v-divider v-if="paArray.length >= 1" />
              <draggable
                v-if="paArray.length >= 1"
                :list="paArray"
                :enable="getRight()"
                class="list-group"
                ghost-class="ghost"
                @start="dragging = true"
                @end="dragging = false"
              >
                <v-list-item
                  v-for="(item, i) in paArray"
                  :key="i"
                  exact
                >
                  <v-list-item-title>
                    <v-text-field
                      v-if="editPa"
                      v-model="paArray[i].name"
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
            </v-col>
          </v-row>
        </v-form>
        <!-- <v-card v-else raised style="border-radius: 15px">
          <v-card-title>
            Prosit Aller
          </v-card-title>
          <v-card-text>
            <template class="my-4">
              <h3>Mots clés </h3>
              <v-row
                align="center"
                justify="start"
              >
                <v-col
                  v-for="keyword in keywords"
                  :key="keyword"
                  class="shrink"
                >
                  <v-chip
                    :key="keyword"
                    color="primary"
                  >
                    {{ keyword.name }}
                  </v-chip>
                </v-col>
              </v-row>
            </template>
            <template>
              <h3>Contexte </h3>
              {{ context }}
            </template>
            <template>
              <h3>Contraintes </h3>
              <v-list
                v-if="constraints.length >= 1"
                rounded
              >
                <v-list-item
                  v-for="item in constraints"
                  :key="item"
                  exact
                >
                  <v-list-item-title>
                    {{ item.name }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </template>
            <template>
              <h3>Généralisation</h3>
              {{ generalisation }}
            </template>
            <template>
              <h3>Contraintes</h3>
              <v-list
                v-if="constraints.length >= 1"
                rounded
              >
                <v-list-item
                  v-for="item in constraints"
                  :key="item"
                  exact
                >
                  <v-list-item-title>
                    {{ item.name }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </template>
            <template>
              <h3>Hypothèses</h3>
              <v-list
                v-if="hypothesises.length >= 1"
                rounded
              >
                <v-list-item
                  v-for="item in hypothesises"
                  :key="item"
                  exact
                >
                  <v-list-item-title>
                    {{ item.name }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </template>
            <template>
              <h3>Plan d'action</h3>
              <v-list
                v-if="paArray.length >= 1"
                rounded
              >
                <v-list-item
                  v-for="item in paArray"
                  :key="item"
                  exact
                >
                  <v-list-item-title>
                    {{ item.name }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </template>
          </v-card-text>
        </v-card> -->
      </v-col>
      <v-col
        v-if="getRight()"
        cols="1"
        align-self="end"
      >
        <v-btn
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
        <v-btn
          color="primary"
          class="my-2"
          large
          rounded
          :disabled="!valid"
          @click="createPDF"
        >
          <v-icon>
            mdi-file-pdf
          </v-icon>
          PDF
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
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
      pa: '',
      test: {
        num_arete: '',
        num_jour: '',
        plage_horaire: '',
        num_periode: '',
        nb_vehicles: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      roles: 'role/role',
      equipe: 'role/currentEquipe',
      numProsit: 'role/numProsit'
    })
  },
  mounted () {
    this.getNumProsit()
  },
  methods: {
    ...mapActions({
      fillPa: 'prosit/fillPa',
      addCer: 'prosit/addCer',
      getNumProsit: 'role/getNumProsit',
      updateNumProsit: 'role/updateNumProsit'
    }),

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

    /**
       * Permet d'ajouter un mot clés
       * dans le tableau de mots clés
       * @param item
       */
    addKeyword (item) {
      if (item.length !== 0) {
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

    /** Depecreated
       * Permet de générer le PDF
       * TODO - Gérer le multipages
       *      - Compter le nombre de ligne sauté par la justification
       *      - Rendre le code MOINS MOCHE
       *      - GURVAN C DLA MERDE
       *      - Update ne marche plus a cause de la génération du DOCX
       */
    createPDF () {
      const start = 10
      const gap = 15
      const line = 7.5
      const lowMarg = 15
      const largeMarg = 25
      let nextRow = 0

      if (this.keywords.length !== 0) {
        if (this.hypothesises.length !== 0) {
          if (this.constraints.length !== 0) {
            if (this.paArray.length !== 0) {
              if (process.client) {
                const JsPDF = require('jspdf')
                const doc = new JsPDF('p', 'mm')
                doc.setFont('helvetica')

                // eslint-disable-next-line no-console
                console.dir(doc.getFontSize())
                // Le titre
                doc.text(this.name, 100, start, { align: 'center' })

                // On update la hauteur de la prochaine ligne pour pas réécrire sur le titre
                nextRow = start + gap
                // Les mots clés
                doc.setFontSize(15)
                doc.text('Mots clés : ', lowMarg, nextRow)

                doc.setFontSize(13)
                this.keywords.forEach(function (keyword, i) {
                  nextRow += (i + line)
                  doc.text(keyword.name, largeMarg, nextRow)
                })
                // On saute une ligne
                nextRow += gap
                // Les mots clés
                doc.setFontSize(15)
                doc.text('Contexte : ', lowMarg, nextRow)

                // On va à la ligne
                nextRow += line
                // Les mots clés
                doc.setFontSize(13)
                doc.text(this.context, largeMarg, nextRow, {
                  maxWidth: 170,
                  align: 'justify'
                })

                // On saute deux lignes
                nextRow += gap
                // Les mots clés
                doc.setFontSize(15)
                doc.text('Contraintes : ', lowMarg, nextRow)
                doc.setFontSize(13)
                this.constraints.forEach(function (word, i) {
                  nextRow += (i + line)
                  doc.text(word.name, largeMarg, nextRow)
                })

                // On saute deux lignes
                nextRow += gap
                // Les mots clés
                doc.setFontSize(15)
                doc.text('Généralisation : ', lowMarg, nextRow)
                // On va à la ligne
                nextRow += line
                // Les mots clés
                doc.setFontSize(13)
                doc.text(this.generalisation, largeMarg, nextRow, {
                  maxWidth: 180,
                  align: 'justify'
                })

                // On saute deux lignes
                nextRow += gap
                // Les mots clés
                doc.setFontSize(15)
                doc.text('Problématique : ', lowMarg, nextRow)
                // On va à la ligne
                nextRow += line
                // Les mots clés
                doc.setFontSize(13)
                doc.text(this.problematic, largeMarg, nextRow, {
                  maxWidth: 180,
                  align: 'justify'
                })

                // On saute deux lignes
                nextRow += gap
                // Les mots clés
                doc.setFontSize(15)
                doc.text('Hypothèses : ', lowMarg, nextRow)
                doc.setFontSize(13)
                this.hypothesises.forEach(function (word, i) {
                  nextRow += (i + line)
                  doc.text('- ' + word.name, largeMarg, nextRow)
                })

                // On saute deux lignes
                nextRow += gap
                // Les mots clés
                doc.setFontSize(15)
                doc.text('Plan d\'action : ', lowMarg, nextRow)
                doc.setFontSize(13)
                this.paArray.forEach(function (word, i) {
                  nextRow += (i + line)
                  doc.text((i + 1) + ' - ' + word.name, largeMarg, nextRow)
                })

                doc.save(name)
                this.clearAll()
              } else {
                // eslint-disable-next-line no-console
                console.error('Une erreure est survenue pendant la création du PDF')
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
</script>

<style scoped>
  .rounded-card {
    border-radius: 15px;
  }
</style>
