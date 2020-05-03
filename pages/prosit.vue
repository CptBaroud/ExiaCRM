<template>
  <v-container>
    <v-label>
      <h1 class="display-1">
        Prosit Maker
      </h1>
    </v-label>
    <v-row
      align="start"
      justify="start"
    >
      <v-col
        cols="2"
        style="margin-right: 10px"
      >
        <v-card
          raised
          style="border-radius: 15px"
        >
          <v-list
            two-line
            rounded
          >
            <v-list-item
              v-for="(item, i) in getEquipe(equipe)"
              :key="i"
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
        cols="8"
      >
        <v-container>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              :rules="required"
              placeholder="Nom du Prosit"
              outlined
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
                  :key="keyword"
                  color="primary"
                  close
                  @click:close="keywords.splice(i, 1)"
                >
                  {{ keyword.name }}
                </v-chip>
              </v-col>
            </v-row>

            <v-text-field
              v-model="keywrd"
              placeholder="Mot clés"
              outlined
              rounded
              @keydown.enter="addKeyword(keywrd)"
            />

            <v-text-field
              v-model="context"
              placeholder="Contexte"
              :rules="required"
              outlined
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
                  placeholder="Contraintes"
                  outlined
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
                        @click="editConstraints = !editConstraints"
                      >
                        mdi-pencil
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
                        v-model="constraints[i]"
                      />
                      <template v-else>
                        {{ item.name }}
                      </template>
                    </v-list-item-title>
                    <v-list-item-action>
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
              placeholder="Généralisation"
              outlined
              rounded
            />

            <v-text-field
              v-model="problematic"
              :rules="required"
              placeholder="Problématiques"
              outlined
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
                  v-model="hypothesis"
                  placeholder="Hypothèses"
                  outlined
                  rounded
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
                        @click="editHypothesis = !editHypothesis"
                      >
                        mdi-pencil
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
                        v-model="hypothesises[i]"
                      />
                      <template v-else>
                        {{ item.name }}
                      </template>
                    </v-list-item-title>
                    <v-list-item-action>
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
                  placeholder="Plan d'action"
                  outlined
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
                      @click="editPa = !editPa"
                    >
                      mdi-pencil
                    </v-icon>
                  </v-list-item-action>
                </v-list-item>
                <v-divider v-if="paArray.length >= 1" />
                <draggable
                  v-if="paArray.length >= 1"
                  :list="paArray"
                  :enable="true"
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
                    <v-list-item-action>
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
        </v-container>
      </v-col>
      <v-col
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
  Document, Footer, HeadingLevel, HorizontalPositionAlign,
  Packer,
  Paragraph, TabStopPosition, TabStopType, TextRun
} from 'docx'

export default {
  name: 'PrositsV2',
  comments: {
    draggable
  },
  data () {
    return {
      valid: true,
      editConstraints: false,
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
      equipe: 'role/equipe'
    })
  },
  methods: {
    ...mapActions({
      fillPa: 'prosit/fillPa',
      uploadFile: 'file/uploadFile'
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
      this.keywords.push({ name: item })
      this.keywrd = ''
    },

    /**
       * Permet d'ajouter une contrainte
       * dans le tableau de contraintes
       * @param item
       */
    addConstraint (item) {
      this.constraints.push({ name: item })
      this.constraint = ''
    },

    /**
       * Permet d'ajouter une hypothèse
       * dans le tableau d'hypotheèses
       * @param item
       */
    addHypothesis (item) {
      this.hypothesises.push({ name: item })
      this.hypothesis = ''
    },

    /**
       * Permet d'ajouter une etape au plan d'action
       * @param item
       */
    addPa (item) {
      this.paArray.push({ name: item })
      this.pa = ''
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
      const temp = this.getEquipe(this.equipe)

      if (this.keywords.length !== 0) {
        if (this.hypothesises.length !== 0) {
          if (this.constraints.length !== 0) {
            if (this.paArray.length !== 0) {
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
                    this.createText(this.problematic),
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
                  saveAs(buffer, 'test.docx')
                  this.$toast.success('Le fichier à été crée avec succès')
                  this.saveLocalFile(buffer)
                }).catch((e) => {
                  this.$toast.error('Une erreure est survenue')
                  // eslint-disable-next-line no-console
                  console.error(e)
                })
              } else {
                this.$toast.error('Il te manque des champs à renseigner')
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
     * Permet de recupêrer l'equipe actuelle en charge du prosit
     * @param num
     * @returns {[]}
     */
    getEquipe (num) {
      const out = []

      this.roles.forEach(function (item) {
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
      })
      return out
    },

    saveLocalFile (file) {
      const formData = new FormData()
      formData.append(this.name, file)
      this.uploadFile(formData)
        .then(this.$toast.success('Le fichier à été enregistrer sur le serveur avec succès'))
        // eslint-disable-next-line no-sequences
        .catch((e) => {
          this.$toast.error('Une erreure est survenue')
          // eslint-disable-next-line no-console
          console.error(e)
        })
    }
  }
}
</script>

<style scoped>
  .rounded-card {
    border-radius: 15px;
  }
</style>
