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
        <v-card style="border-radius: 20px" max-width="750">
          <v-card-title>
            Test
          </v-card-title>
          <v-card-text>
            <v-form>
              <template v-for="(item, i) in element">
                <template v-if="item.component === 'Textfield'">
                  <v-text-field
                    :key="i"
                    v-model="item.value"
                    :label="item.label"
                    :placeholder="item.placeholder"
                    filled
                    rounded
                  />
                </template>
                <template v-else>
                  <v-textarea
                    :key="i"
                    v-mode="item.value"
                    :label="item.label"
                    :placeholder="item.placeholder"
                    filled
                    rounded
                    auto-grow
                  />
                </template>
              </template>
              <v-btn
                rounded
                @click="get()"
              >
                Get
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-dialog v-model="dialog" persistent max-width="325">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  rounded
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  Ajouter un champ
                </v-btn>
              </template>
              <v-card style="border-radius: 20px">
                <v-card-title>
                  <span class="headline">Ajouter un champ</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="dialog_data.label"
                          filled
                          rounded
                          placeholder="Label"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="dialog_data.placeholder"
                          filled
                          rounded
                          placeholder="Placeholder"
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-autocomplete
                          v-model="dialog_data.type"
                          :items="['Textfield', 'Textarea']"
                          label="Type"
                          filled
                          rounded
                          required
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="red darken-1" text @click="dialog = false">
                    Fermer
                  </v-btn>
                  <v-btn color="green darken-1" text @click="add(dialog_data)">
                    Ajouter
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn
              rounded
              @click="addToFireBase()"
            >
              +
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from 'static/firebase'
import { rtdb } from 'static/rtdb'

export default {
  name: 'Test',
  data () {
    return {
      element: [
        {
          component: 'Textfield',
          placeholder: 'Ceci est un placeholder',
          name: 'T1',
          value: ''
        }
      ],
      dialog: false,
      dialog_data: {},
      firebase: 'documents',
      template: []
    }
  },
  firestore: {
    template: db.collection('template')
  },
  mounted () {
    console.dir(this.selectTemplate())
  },
  methods: {
    add (data) {
      this.element.push({
        component: data.type,
        placeholder: data.placeholder,
        label: data.label,
        value: ''
      })
      setTimeout(() => {
        this.dialog_data = {}
        this.dialog = false
      }, 200)
    },

    addToFireBase () {
      this.$firestoreRefs.template.add(
        {
          component: 'textfield',
          placeholder: '',
          label: '',
          value: ''
        }
      )
    },

    get () {
      this.element.forEach((item) => {
        console.log(item.value)
      })
    },

    selectTemplate () {
      rtdb.ref('template').once()
    }
  }
}
</script>

<style scoped>

</style>
