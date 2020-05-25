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
        md6
      >
        <v-card style="border-radius: 15px">
          <v-card-title>
            <h1 class="display-1 pb-8">
              Prosits Aller
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
            Vous retrouvez ici tout les prosits aller présents dans la base de données
          </v-card-subtitle>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="prosit"
              :search="search"
            >
              <template v-slot:item.download=" { item }">
                <v-btn
                  icon
                  @click="createDocx(item.num_prosit)"
                >
                  <v-icon>
                    mdi-download
                  </v-icon>
                </v-btn>
              </template>
              <template v-slot:item.num_prosit="{ item }">
                <v-chip
                  color="#B82831"
                >
                  {{ item.num_prosit }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import {
  Document,
  HeadingLevel,
  HorizontalPositionAlign,
  Packer,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun
} from 'docx'
import { saveAs } from 'file-saver'
import axios from 'axios'

export default {
  name: 'PrositsAller',
  data () {
    return {
      editConstraints: false,
      search: '',
      headers: [
        { text: 'PA n°', value: 'num_prosit', align: 'start' },
        { text: 'Nom du prosit', value: 'name' },
        { text: 'Scribe', value: 'scribe' },
        { text: 'Actions', value: 'download' }
      ]
    }
  },
  computed: {
    prosit: ({
      get () {
        return this.$store.state.prosit.allPa
      }
    })
  },
  mounted () {
    this.getAllPa()
  },
  methods: {
    ...mapActions({
      getAllPa: 'prosit/getAllPa'
    }),

    getCer (numProsit) {
      return new Promise((resolve) => {
        axios.get(process.env.API_URL + '/prosit/' + numProsit)
          .then((response) => {
            resolve(response.data)
          }).catch(() => {
            this.$toast.error('Une erreur est survenue pendant la récupération du Prosit n°' + numProsit)
          })
      })
    },

    /**
     * Permet de génerer le document docx
     * a l'aide des methodes adjointes
     **/
    createDocx (numProsit) {
      this.getCer(numProsit).then((response) => {
        console.dir(response)
        // Create document
        const doc = new Document()
        // On crée la première page
        if (response != null) {
          doc.addSection({
            // Contenu de la page
            children: [
              new Paragraph({
                text: response.name,
                heading: HeadingLevel.TITLE,
                alignment: HorizontalPositionAlign.CENTER
              }),
              this.createSpace(),
              this.createSpace(),
              this.createHeading('Mots Clés'),
              this.createSpace(),
              ...response.keywords
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
              this.createText(response.context),
              this.createSpace(),
              this.createHeading('Contraintes'),
              this.createSpace(),
              ...response.constraints
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
              this.createText(response.generalisation),
              this.createSpace(),
              this.createSpace(),
              this.createHeading('Problématique'),
              this.createSpace(),
              ...response.problematics
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
              ...response.hyptothesies
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
              ...response.pa
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
            saveAs(buffer, response.name + '.docx')
            this.$toast.success('Le fichier à été crée avec succès')
          }).catch((e) => {
            this.$toast.error('Une erreure est survenue')
            // eslint-disable-next-line no-console
            console.error(e)
          })
        } else {
          this.$toast.error('Il n\'y a aucun prosit')
        }
      })
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
    }
  }
}
</script>

<style scoped>

</style>
