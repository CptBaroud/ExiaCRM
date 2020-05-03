<template>
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
      <v-container>
        <v-form>
          <v-text-field
            v-model="name"
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
              :key="keyword"
              class="shrink"
            >
              <v-chip
                :key="keyword"
                color="primary"
                close
                @click:close="keywords.splice(i, 1)"
              >
                {{ keyword }}
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
            outlined
            rounded
          />
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
                  {{ item }}
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
          <v-text-field
            v-model="constraint"
            placeholder="Contraintes"
            outlined
            rounded
            @keydown.enter="addConstraint(constraint)"
          />
          <v-text-field
            v-model="generalisation"
            placeholder="Généralisation"
            outlined
            rounded
          />
          <v-text-field
            v-model="problematic"
            placeholder="Problématiques"
            outlined
            rounded
          />
          <v-list
            v-if="hypothesises.length >= 1"
            color="rgb(18,18,18)"
            rounded
          >
            <v-list-item
              v-for="(item, i) in hypothesises"
              :key="i"
              exact
            >
              <v-list-item-title>
                {{ item }}
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
          <v-text-field
            v-model="hypothesis"
            placeholder="Hypothèses"
            outlined
            rounded
            @keydown.enter="addHypothesis(hypothesis)"
          />
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
                <v-chip
                  color="primary"
                >
                  {{ i +1 }}
                </v-chip>
                {{ item.name }}
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
          </draggable>
          <v-text-field
            v-model="pa"
            placeholder="Plan d'action"
            outlined
            rounded
            @keydown.enter="addPa(pa)"
          />
          <v-spacer />
          <v-btn
            @click="createPDF()"
          >
            Créer le PDF
          </v-btn>
        </v-form>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'Prosits',
  comments: {
    draggable
  },
  data () {
    return {
      editConstraints: false,
      name: 'Courbes en S',
      keywords: ['Marge brute', 'Marge opérationnelle', '.mpp', 'Revue de projet'],
      keywrd: '',
      context: 'Récupérer le projet de damien pour vérifier les points importants pour la revue de projet',
      constraints: ['Le temps', 'Fichier .mpp', 'Chaque jour de retard entraîne une pénalité de 10000€', 'Contrainte budgétaire'],
      constraint: '',
      generalisation: 'Management de projet : scenarii et indicateurs',
      problematic: 'Comment reprendre le travail de management déjà effectué pour répondre aux attentes du client ?',
      hypothesises: ['la fin de la période annoncée ne sera pas respectée', 'La charge de travaille des administrateurs est trop élevée'],
      hypothesis: '',
      paArray: [
        { name: 'Etude sur la gestion de projet', id: 0 },
        { name: 'Etude sur l’analyse de la valeur acquise', id: 1 },
        { name: 'Etude du Burndown Chart', id: 2 }
      ],
      pa: ''
    }
  },
  methods: {
    /**
     * Permet d'ajouter un mot clés
     * dans le tableau de mots clés
     * @param item
     */
    addKeyword (item) {
      this.keywords.push(item)
      this.keywrd = ''
    },

    /**
     * Permet d'ajouter une contrainte
     * dans le tableau de contraintes
     * @param item
     */
    addConstraint (item) {
      this.constraints.push(item)
      this.constraint = ''
    },

    /**
     * Permet d'ajouter une hypothèse
     * dans le tableau d'hypotheèses
     * @param item
     */
    addHypothesis (item) {
      this.hypothesises.push(item)
      this.hypothesis = ''
    },

    /**
     * Permet d'ajouter une etape au plan d'action
     * @param item
     */
    addPa (item) {
      this.paArray.push(item)
      this.paArray = ''
    },

    /**
     * Permet de générer le PDF
     * TODO - Gérer le multipages
     *      - Compter le nombre de ligne sauté par la justification
     *      - Rendre le code MOINS MOCHE
     *      - GURVAN C DLA MERDE
     */
    createPDF () {
      const start = 10
      const gap = 15
      const line = 7.5
      const lowMarg = 15
      const largeMarg = 25
      let nextRow = 0

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
          doc.text(keyword, largeMarg, nextRow)
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
          doc.text(word, largeMarg, nextRow)
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
          doc.text('- ' + word, largeMarg, nextRow)
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
      }
    }
  }
}
</script>

<style scoped>
  .rounded-card {
    border-radius: 15px;
  }
</style>
