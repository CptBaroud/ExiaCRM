<template>
  <v-container v-if="prosit">
    <v-row class="d-flex justify-center">
      <v-col cols="2">
        <v-card
          rounded="lg"
          color="secondary"
          flat
        >
          <v-card-title>
            Auteur
          </v-card-title>
          <v-card-text>
            <v-list color="secondary">
              <v-list-item>
                <v-list-item-avatar>
                  <v-img v-if="prosit.author.avatar" :src="prosit.author.avatar" />
                  <v-img v-else :src="avatar" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ prosit.author.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ prosit.author.surname }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          flat
          color="background"
        >
          <v-card-title>
            <v-list color="background" width="800">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="text-h4 mb-2">
                    {{ prosit.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <template v-for="(item, i) in prosit.keywords">
              <v-chip
                :key="i"
                :color="!!item.def ? 'pantoneGreen' : 'primary'"
                label
                class="my-1 mr-3"
                close-icon="mdi-bookmark-check-outline"
                :close="!!item.def"
                @click="loadKeyword(item)"
              >
                {{ item.name }}
              </v-chip>
            </template>
          </v-card-title>
          <v-card-text>
            <v-list color="background">
              <v-list-item class="mb-4">
                <v-list-item-content>
                  <v-list-item-title class="text-h6 mb-2">
                    • Contexte
                  </v-list-item-title>
                  <v-list-item-subtitle class="subtitle-1">
                    {{ prosit.context }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="mb-4">
                <v-list-item-content>
                  <v-list-item-title class="text-h6 mb-2">
                    • Contraintes
                  </v-list-item-title>
                  <v-list-item-subtitle v-for="(item, i) in prosit.constraints" :key="i" class="subtitle-1 mb-1">
                    {{ item }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="mb-4">
                <v-list-item-content>
                  <v-list-item-title class="text-h6 mb-2">
                    • Généralisation
                  </v-list-item-title>
                  <v-list-item-subtitle class="subtitle-1">
                    {{ prosit.generalization }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="mb-4">
                <v-list-item-content>
                  <div v-if="typeof prosit.problematics === Array">
                    <v-list-item-title class="text-h6 mb-2">
                      • Problématiques
                    </v-list-item-title>
                    <v-list-item-subtitle v-for="(item, i) in prosit.problematics" :key="i" class="subtitle-1 mb-1">
                      {{ item }}
                    </v-list-item-subtitle>
                  </div>
                  <div v-else>
                    <v-list-item-title class="text-h6 mb-2">
                      • Problématique
                    </v-list-item-title>
                    <v-list-item-subtitle class="subtitle-1">
                      {{ prosit.problematics[0] }}
                    </v-list-item-subtitle>
                  </div>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="mb-4">
                <v-list-item-content>
                  <v-list-item-title class="text-h6 mb-2">
                    • Hypothèses
                  </v-list-item-title>
                  <v-list-item-subtitle v-for="(item, i) in prosit.hypotesies" :key="i" class="subtitle-1 mb-1">
                    {{ item }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item class="mb-4">
                <v-list-item-content>
                  <v-list-item-title class="text-h6 mb-2">
                    • Plan d'action
                  </v-list-item-title>
                  <v-list-item-subtitle v-for="(item, i) in prosit.summary" :key="i" class="subtitle-1 mb-1">
                    {{ item }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="prussianBlue"
              style="color: var(--v-text_dark-base)"
              @click="createDocx"
            >
              <v-icon class="mr-2">
                mdi-microsoft-word
              </v-icon>
              Docx
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          color="secondary"
          rounded="lg"
          flat
        >
          <v-card-title>
            Prosits
          </v-card-title>
          <v-card-text>
            <v-data-iterator
              no-data-text="Aucuns prosits pour le moment"
              hide-default-footer
              :items="prosits"
              :items-per-page="3"
              :page="prositsPage"
            >
              <template v-slot:item="data">
                <v-hover
                  v-slot="{ hover }"
                >
                  <v-card
                    rounded="lg"
                    class="my-4"
                    style="transition: background-color 0.2s ease-in-out"
                    :color="hover ? 'primary' : 'background'"
                    :elevation="hover ? 6 : 0"
                  >
                    <v-card-text style="padding-bottom: 0">
                      <template v-for="(item, i) in data.item.keywords">
                        <v-chip
                          v-if="i <= 2"
                          :key="i"
                          color="accent"
                          label
                          :class="i === 0 ? 'mr-2' : 'mx-2'"
                          class="my-1"
                        >
                          {{ item.name }}
                        </v-chip>
                      </template>
                      <v-chip
                        v-if="data.item.keywords.length >= 2 && data.item.keywords.length >= 3"
                        color="secondary"
                        label
                        class="ml-2"
                      >
                        + {{ data.item.keywords.length - 3 }} autres ...
                      </v-chip>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="mb-2">
                            {{ data.item.title }}
                          </v-list-item-title>
                          <v-list-item-subtitle style="display: inline-block" class="text-truncate">
                            {{ data.item.context }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card-text>
                    <v-card-actions style="padding-top: 0">
                      <v-list-item>
                        <v-list-item-avatar>
                          <v-img v-if="data.item.author.avatar" :src="data.item.author.avatar" />
                          <v-img v-else :src="avatar" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ data.item.author.name }} {{ data.item.author.surname }}
                          </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn
                            v-if="hover"
                            text
                            :to="'/prosits/' + data.item._id"
                            nuxt
                          >
                            En voir plus
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-card-actions>
                  </v-card>
                </v-hover>
              </template>
              <template v-slot:footer>
                <v-pagination
                  v-model="prositsPage"
                  color="primary"
                  :length="prositsLength"
                />
              </template>
            </v-data-iterator>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
      v-model="keywordDialog"
      width="750"
      :fullscreen="$vuetify.breakpoint.mobile"
    >
      <v-card
        color="secondary"
        rounded="lg"
      >
        <v-card-title>
          {{ keyword.name }}
        </v-card-title>
        <v-card-text>
          <span v-if="keyword.definitions.length >= 1">
            <template v-for="(item, i) in keyword.definitions">
              <span
                :key="i"
              >
                <v-textarea
                  v-model="keyword.definitions[i]"
                  background-color="background"
                  auto-grow
                  flat
                  solo
                />
                <v-spacer />
                <v-btn
                  color="prussianBlue"
                  @click="choseDef(item)"
                >
                  Choisir
                </v-btn>
              </span>
            </template>
          </span>
          <span v-else>
            <v-textarea
              v-model="keyword.def"
              background-color="background"
              auto-grow
              flat
              solo
            />
          </span>
          <v-btn
            color="prussianBlue"
            @click="choseDef(keyword.def)"
          >
            Choisir
          </v-btn>
        </v-card-text>
        <v-btn
          absolute
          elevation="0"
          top
          right
          icon
          color="primary"
          @click="keywordDialog = false"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { saveAs } from 'file-saver'
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
  name: 'Id',
  data () {
    return {
      keyword: {
        definitions: []
      },
      keywordDialog: false,
      prositsPage: 1
    }
  },
  computed: {
    prosit: {
      get () {
        return this.$store.getters['prosit/prosits'].filter(object => object._id === this.$route.params.id)[0]
      }
    },

    prosits: {
      get () {
        return this.$store.getters['prosit/prosits'].filter(object => object._id !== this.$route.params.id)
      }
    },

    avatar () {
      return process.env.api_url + '/images/user_homme.svg'
    },

    prositsLength () {
      return Math.floor(this.prosits.length / 3)
    }
  },
  mounted () {
    this.$store.dispatch('prosit/fetch', this.$auth.getToken('local'))
  },
  methods: {
    /**
     * Permet de load les définitions du mot clé
     * @param item
     */
    loadKeyword (item) {
      this.keyword = Object.assign({}, item)
      this.keywordDialog = true
    },

    /**
     * Choisis une defintition et la definie comme celle active
     * - On récupère l'id du prosit pour update le store
     **/
    choseDef (item) {
      this.$store.dispatch('prosit/chooseDef', {
        _idProsit: this.prosit._id,
        _id: this.keyword._id,
        def: item
      }).then((resp) => {
        if (resp.status === 200) {
          this.keywordDialog = false
        }
      })
    },

    /**
     * A voir pour le faire sur le backend
     **/
    createDocx () {
      // Create document
      const doc = new Document()
      // On recupere les roles - TODO : L'implémenter
      // const temp = this.equipe

      // On crée la première page
      doc.addSection({
        // Footer de la page
        footers: {
          default: new Footer({
            children: [new Paragraph({
              // text: 'Animateur : ' + temp[0].user + ' / Secretaire : ' + temp[1].user + ' / Scribe : ' + temp[2].user + ' / Gestionaire : ' + temp[3].user
              text: 'Scribe : ' + this.prosit.author.name
            })]
          })
        },
        // Contenu de la page
        children: [
          new Paragraph({
            text: this.prosit.title,
            heading: HeadingLevel.TITLE,
            alignment: HorizontalPositionAlign.CENTER
          }),
          this.createSpace(),
          this.createSpace(),
          this.createHeading('Mots Clés'),
          this.createSpace(),
          ...this.prosit.keywords
            .map((item) => {
              const arr = []
              if (item.def) {
                arr.push(
                  this.createListItem(item.name + ' : ' + item.def)
                )
              } else {
                arr.push(
                  this.createListItem(item.name)
                )
              }
              return arr
            })
            .reduce((prev, curr) => prev.concat(curr), []),
          this.createSpace(),
          this.createSpace(),
          this.createHeading('Contexte'),
          this.createSpace(),
          this.createText(this.prosit.context),
          this.createSpace(),
          this.createHeading('Contraintes'),
          this.createSpace(),
          ...this.prosit.constraints
            .map((item) => {
              const arr = []
              arr.push(
                this.createListItem(item)
              )
              return arr
            })
            .reduce((prev, curr) => prev.concat(curr), []),
          this.createSpace(),
          this.createSpace(),
          this.createHeading('Généralisation'),
          this.createSpace(),
          this.createText(this.prosit.generalization),
          this.createSpace(),
          this.createSpace(),
          this.createHeading('Problématique'),
          this.createSpace(),
          ...this.prosit.problematics
            .map((item) => {
              const arr = []
              arr.push(
                this.createListItem(item)
              )
              return arr
            })
            .reduce((prev, curr) => prev.concat(curr), []),
          this.createSpace(),
          this.createSpace(),
          this.createHeading('Hypothèses'),
          this.createSpace(),
          ...this.prosit.hypotesies
            .map((item) => {
              const arr = []
              arr.push(
                this.createListItem(item)
              )
              return arr
            })
            .reduce((prev, curr) => prev.concat(curr), []),
          this.createSpace(),
          this.createSpace(),
          this.createHeading('Plan d\'action'),
          this.createSpace(),
          ...this.prosit.summary
            .map((item) => {
              const arr = []
              arr.push(
                this.createListItem(item)
              )
              return arr
            })
            .reduce((prev, curr) => prev.concat(curr), [])
        ]
      })

      // On utlise File-Saver pour enregistrer le document
      Packer.toBlob(doc).then((buffer) => {
        saveAs(buffer, this.prosit.title + '.docx')
        this.$toast.success('Le fichier à été crée avec succès')
      }).catch((e) => {
        this.$toast.error('Une erreure est survenue')
        // eslint-disable-next-line no-console
        console.error(e)
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
