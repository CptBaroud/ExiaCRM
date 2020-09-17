<template>
  <v-container>
    <v-label v-if="user !== null">
      <h1 class="display-1 font-weight-medium mb-6" style="padding-left: 35px; padding-right: 35px; color: white">
        Bonjour, {{ user[0].name }}
      </h1>
    </v-label>
    <v-container
      fluid
    >
      <v-row>
        <v-col
          xl="3"
          lg="4"
          md="6"
          sm="12"
        >
          <v-card
            raised
            elevation="8"
            style="border-radius: 30px"
            min-height="575"
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
              Equipe actuelle
              <v-spacer />
              <v-chip
                disabled
                class="elevation-10"
              >
                {{ prosit }}
              </v-chip>
            </v-card-title>
            <v-card-text>
              <v-row
                class="mx-4"
                justify="center"
              >
                <v-list
                  v-for="(item, idx) in equipe"
                  :key="idx"
                >
                  <v-list-item>
                    <v-hover v-slot:default="{ hover }">
                      <v-badge
                        :elevation="hover ? 12 : 2"
                        overlap
                        bordered
                        :color="hover ? '#53B84d' : '#79B473'"
                        :value="haveRole(item.user)"
                      >
                        <v-card
                          :elevation="hover ? 12 : 2"
                          class="mx-auto"
                          style="border-radius: 20px; transition: background-color 0.2s ease-in-out"
                          :color="hover ? '#b02b23' : '#ac3931'"
                          width="225"
                        >
                          <v-card-title class="text-uppercase">
                            <v-list-item>
                              <v-list-item-avatar>
                                <v-icon x-large>
                                  {{ item.icon }}
                                </v-icon>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title>
                                  {{ item.role }}
                                </v-list-item-title>
                                <v-list-item-subtitle class="h4">
                                  {{ item.user }}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                            <v-btn
                              icon
                              bottom
                              text
                              right
                              small
                              absolute
                              disabled
                              @click="sendMessage()"
                            >
                              <v-icon small>
                                mdi-send
                              </v-icon>
                            </v-btn>
                          </v-card-title>
                        </v-card>
                      </v-badge>
                    </v-hover>
                  </v-list-item>
                </v-list>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          xl="3"
          lg="4"
          md="6"
          sm="12"
        >
          <v-card
            raised
            style="border-radius: 30px"
            min-height="575"
          >
            <v-card-title>
              <v-sheet
                color="#cf3436"
                elevation="2"
                class="mx-4 my-4"
                rounded
              >
                <v-icon large class="mx-2 my-2">
                  mdi-target-account
                </v-icon>
              </v-sheet>
              A votre tour
            </v-card-title>
            <v-card-text>
              <v-card
                flat
                style="overflow-y: auto"
                :class="scrollbarTheme"
                :style="'height:' + windowSize.y / 2.2 + 'px'"
                class="px-6"
              >
                <v-row
                  class="mx-4"
                  justify="center"
                >
                  <v-list
                    v-for="(item, idx) in picked"
                    :key="idx"
                  >
                    <v-list-item>
                      <v-hover v-slot:default="{ hover }">
                        <v-badge
                          :elevation="hover ? 12 : 2"
                          overlap
                          bordered
                          :color="hover ? '#53B84d' : '#79B473'"
                          :value="haveRole(item.name)"
                        >
                          <v-card
                            :elevation="hover ? 12 : 2"
                            class="mx-auto"
                            style="border-radius: 20px; transition: background-color 0.2s ease-in-out"
                            :color="hover ? '#b02b23' : '#ac3931'"
                            width="225"
                          >
                            <v-card-title class="text-uppercase">
                              <v-list-item>
                                <v-list-item-avatar>
                                  <v-img v-if="item.avatar.length > 1" :src="item.avatar" />
                                  <v-avatar v-else color="pantoneGreen">
                                    <span class="white--text headline">{{ item.name.substr(0, 1) }}</span>
                                  </v-avatar>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                  <v-list-item-title>
                                    {{ item.name }}
                                  </v-list-item-title>
                                  <v-list-item-subtitle class="h4">
                                    {{ item.username }}
                                  </v-list-item-subtitle>
                                  <!--<v-combobox
                                    v-model="pickedChoices[i]"
                                    :disabled="checkRight(item.name)"
                                    :items="tempSummary"
                                    filled
                                    clearable
                                    rounded
                                    small-chips
                                    @click="update({name: item.name, index: i})"
                                  /> -->
                                </v-list-item-content>
                              </v-list-item>
                              <v-btn
                                icon
                                bottom
                                text
                                right
                                small
                                absolute
                                disabled
                                @click="sendMessage()"
                              >
                                <v-icon small>
                                  mdi-send
                                </v-icon>
                              </v-btn>
                            </v-card-title>
                          </v-card>
                        </v-badge>
                      </v-hover>
                    </v-list-item>
                  </v-list>
                </v-row>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col
          xl="6"
          lg="4"
          md="6"
          sm="12"
        >
          <v-card
            min-height="575"
            max-height="575"
            raised
            elevation="4"
            style="border-radius: 30px"
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
              Prosit Aller
            </v-card-title>
            <v-card-text>
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="mx-auto"
                  :elevation="hover ? 12 : 2"
                  style="border-radius: 20px; transition: background-color 0.2s ease-in-out"
                  :color="hover ? '#101010' : '#141414' "
                  max-width="500"
                  max-height="400"
                >
                  <v-card-title>
                    <v-icon
                      large
                      left
                    >
                      mdi-file-document
                    </v-icon>
                    <span class="title font-weight-bold">{{ lastPa.name }}</span>
                  </v-card-title>

                  <v-card-text class="headline font-weight-regular">
                    <v-row
                      v-if="cer.data !== undefined"
                      align="center"
                      justify="start"
                      class="mx-2 mb-2"
                    >
                      <v-col
                        v-for="(keyword, i) in cer.data.keywords"
                        :key="i"
                        class="shrink"
                      >
                        <v-chip
                          v-if="i < 3"
                          color="#ac3931"
                        >
                          {{ keyword.name }}
                        </v-chip>
                        <v-chip
                          v-else-if="i === 3"
                          color="#ac3931"
                          :to="'/keywords?search=' + lastPa.num_prosit"
                        >
                          <v-avatar left>
                            <v-icon>mdi-more</v-icon>
                          </v-avatar>
                          {{ cer.data.keywords.length - 3 }} Autres
                        </v-chip>
                      </v-col>
                    </v-row>
                    <span class="text-weight-light my-2">
                      {{ lastPa.context }}
                    </span>
                    <br>
                    <v-list
                      class="my-2"
                      style="border-radius: 20px"
                    >
                      <v-list-item>
                        <v-list-item-title>
                          {{ lastPa.generalisation }}
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card-text>

                  <v-card-actions>
                    <v-list-item class="grow">
                      <v-list-item-avatar color="grey darken-3">
                        <v-img
                          class="elevation-6"
                          src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                        />
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title> {{ lastPa.scribe }}</v-list-item-title>
                      </v-list-item-content>

                      <v-row
                        align="center"
                        justify="end"
                      >
                        <span class="subheading mr-2">N°{{ prosit }}</span>
                        <span class="mr-1">·</span>
                        <v-btn
                          icon
                          @click="createDocx(cer)"
                        >
                          <v-icon class="mr-1">
                            mdi-download
                          </v-icon>
                        </v-btn>
                      </v-row>
                    </v-list-item>
                  </v-card-actions>
                </v-card>
              </v-hover>
            </v-card-text>
            <v-btn
              class="my-2"
              large
              absolute
              bottom
              right
              icon
              rounded
              nuxt
              to="/prositsAller"
            >
              <v-icon>
                mdi-chevron-double-right
              </v-icon>
            </v-btn>
          </v-card>
        </v-col>
        <v-col
          xl="3"
          lg="4"
          md="6"
          sm="12"
        >
          <v-card
            raised
            elevation="8"
            style="border-radius: 30px"
            class="my-4"
          >
            <v-card-title>
              <v-sheet
                color="#cf3436"
                elevation="2"
                class="mx-4 my-4"
                rounded
              >
                <v-icon large class="mx-2 my-2">
                  mdi-link
                </v-icon>
              </v-sheet>
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
      items: 4,
      loaded: false,
      windowSize: {
        x: 0,
        y: 1
      },
      links: [
        {
          icon: 'mdi-cloud-upload-outline',
          title: 'Drive',
          to: 'https://cesifr-my.sharepoint.com/personal/algaudon_cesi_fr/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Falgaudon%5Fcesi%5Ffr%2FDocuments%2FA3%202019%2D2020&originalPath=aHR0cHM6Ly9jZXNpZnItbXkuc2hhcmVwb2ludC5jb20vOmY6L2cvcGVyc29uYWwvYWxnYXVkb25fY2VzaV9mci9FZ0FvRG5GLVhrWkZoYkFUTUp2VEZyWUJFM0VZRUUyY053a19GempFdHBsVWtnP3J0aW1lPXY0N193X0FfMTBn'
        },
        {
          icon: 'mdi-discord',
          title: 'Discord',
          to: 'https://discord.gg/Zn2FAEZ'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      equipe: 'role/currentEquipe',
      numEquipe: 'role/equipe',
      prosit: 'role/numProsit',
      picked: 'kivaferkoi/picked',
      lastPa: 'prosit/lastPa',
      cer: 'prosit/cer',
      promo: 'user/user'
    }),

    scrollbarTheme () {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    }
  },
  mounted () {
    this.onResize()
    this.getNum()
    this.getPicked()
    this.getLastPa().then(() => {
      this.getCer()
    })
  },
  methods: {
    ...mapActions({
      getNum: 'role/getNumProsit',
      getPicked: 'kivaferkoi/getPicked',
      getACer: 'prosit/getCer',
      getLastPa: 'prosit/getLastPa'
    }),

    getCer () {
      this.getACer(this.lastPa.num_prosit)
    },

    /**
       * Permet de génerer le document docx
       * a l'aide des methodes adjointes
       **/
    createDocx (object) {
      // Create document
      const doc = new Document()
      // On crée la première page
      if (object.name !== undefined) {
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
    },

    haveRole (name) {
      if (this.user !== null) {
        if (this.user[0].name === name) {
          return 1
        }
      }
      return 0
    },

    sendMessage () {
      this.$toast.warning('Cette fonctionalité n\'est pas encore disponible')
    },

    /**
     * Permet de calculer la taille de l'ecran
     **/
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    }
  }
}
</script>

<style>
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
