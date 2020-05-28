<template>
  <v-container>
    <v-label>
      <h1 class="display-1">
        Accueil
      </h1>
    </v-label>
    <v-row
      align="start"
      justify="start"
      style="padding-left: 35px; padding-right: 35px"
    >
      <v-col
        cols="3"
        style="margin-right: 10px"
      >
        <v-card
          raised
          style="border-radius: 20px"
        >
          <v-card-title>
            Equipe actuelle
          </v-card-title>
          <v-card-subtitle>
            Equipe n°{{ numEquipe }}
          </v-card-subtitle>
          <v-list
            two-line
            rounded
          >
            <v-list-item
              v-for="(item, i) in equipe"
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
        cols="3"
        style="margin-right: 10px"
      >
        <v-card
          raised
          style="border-radius: 20px"
        >
          <v-card-title>
            Kivaferkoi
          </v-card-title>
          <v-card-subtitle>
            Prosit n°{{ prosit }}
          </v-card-subtitle>
          <v-list
            two-line
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
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col
        cols="5"
        style="margin-right: 10px"
      >
        <v-card
          raised
          style="border-radius: 20px"
        >
          <v-card-title>
            Téléchargé le dernier CER
          </v-card-title>
          <v-card-subtitle>
            {{ cer.name }}
          </v-card-subtitle>
          <v-card-text>
            <v-btn
              text
              @click="createDocx(cer)"
            >
              <v-icon>
                mdi-download
              </v-icon>
              Le telecharger
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="primary"
              class="my-2"
              large
              rounded
              nuxt
              to="/prositsAller"
            >
              Les autres
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card style="border-radius: 20px" class="my-4">
          <v-card-title>
            Liens utiles
          </v-card-title>
          <v-card-subtitle>
            Comme ça tu arrêteras de demander sur discord
          </v-card-subtitle>
          <v-card-text>
            <v-list>
              <v-list-item
                v-for="(item, i) in links"
                :key="i"
                router
                exact
              >
                <v-list-item-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <a :href="item.to" style="text-decoration: none" target="_parent">
                    <v-list-item-title v-text="item.title" />
                  </a>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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

export default {
  data () {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      links: [
        {
          icon: 'mdi-cloud-upload-outline',
          title: 'Drive',
          to: 'https://cesifr-my.sharepoint.com/personal/algaudon_cesi_fr/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Falgaudon%5Fcesi%5Ffr%2FDocuments%2FA3%202019%2D2020&originalPath=aHR0cHM6Ly9jZXNpZnItbXkuc2hhcmVwb2ludC5jb20vOmY6L2cvcGVyc29uYWwvYWxnYXVkb25fY2VzaV9mci9FZ0FvRG5GLVhrWkZoYkFUTUp2VEZyWUJFM0VZRUUyY053a19GempFdHBsVWtnP3J0aW1lPXY0N193X0FfMTBn'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      equipe: 'role/currentEquipe',
      numEquipe: 'role/equipe',
      prosit: {
        get () {
          return this.$store.state.role.numProsit
        }
      },
      picked: 'kivaferkoi/picked',
      cer: 'prosit/cer',
      promo: 'promo/promo'
    })
  },
  mounted () {
    this.getNum()
    this.getCer()
  },
  methods: {
    ...mapActions({
      getNum: 'role/getNumProsit',
      getACer: 'prosit/getCer'
    }),

    getCer () {
      this.getACer(this.prosit)
    },

    /**
     * Permet de génerer le document docx
     * a l'aide des methodes adjointes
     **/
    createDocx (object) {
      // Create document
      const doc = new Document()
      // On crée la première page
      if (object.size > 0) {
        doc.addSection({
          // Contenu de la page
          children: [
            new Paragraph({
              text: object.name,
              heading: HeadingLevel.TITLE,
              alignment: HorizontalPositionAlign.CENTER
            }),
            this.createSpace(),
            this.createSpace(),
            this.createHeading('Mots Clés'),
            this.createSpace(),
            ...object.data.keywords
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
            this.createText(object.data.context),
            this.createSpace(),
            this.createHeading('Contraintes'),
            this.createSpace(),
            ...object.data.constraints
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
            this.createText(object.data.generalisation),
            this.createSpace(),
            this.createSpace(),
            this.createHeading('Problématique'),
            this.createSpace(),
            ...object.data.problematics
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
            ...object.data.hyptothesies
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
            ...object.data.pa
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
          saveAs(buffer, object.name + '.docx')
          this.$toast.success('Le fichier à été crée avec succès')
        }).catch((e) => {
          this.$toast.error('Une erreure est survenue')
          // eslint-disable-next-line no-console
          console.error(e)
        })
      } else {
        this.$toast.error('Il n\'y a aucun prosit')
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
    }
  }
}
</script>

<style>
  .rounded-card{
    border-radius:20px;
  }
</style>
