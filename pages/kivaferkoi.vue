<template>
  <v-container>
    <v-label>
      <h1 class="display-1">
        Kivaferkoi
      </h1>
    </v-label>
    <v-row>
      <v-col
        cols="3"
      >
        <v-card
          raised
          style="border-radius: 15px"
        >
          <v-card-title>
            Gestion
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="toPick"
              label="Nombre de personne à pick"
              rounded
              outlined
              @keydown.enter="tirage"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="3"
      >
        <v-card
          raised
          style="border-radius: 15px"
        >
          <v-card-title>
            Déjà tiré
          </v-card-title>
          <v-card-text>
            <v-card
              raised
              style="border-radius: 15px"
            >
              <v-list
                two-line
                rounded
              >
                <v-list-item
                  v-for="(item, i) in alreadyPicked"
                  :key="i"
                >
                  <v-list-item-avatar>
                    <v-img v-if="item.avatar.length > 1" :src="item.avatar" />
                    <v-avatar v-else color="primary">
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
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="3"
      >
        <v-card
          raised
          style="border-radius: 15px"
        >
          <v-card-title>
            Pas encore été tiré
          </v-card-title>
          <v-card-text>
            <v-card
              raised
              style="border-radius: 15px"
            >
              <v-list
                two-line
                rounded
              >
                <v-list-item
                  v-for="(item, i) in notYetPicked"
                  :key="i"
                >
                  <v-list-item-avatar>
                    <v-img v-if="item.avatar.length > 1" :src="item.avatar" />
                    <v-avatar v-else color="steelBlue">
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
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="3"
      >
        <v-card
          raised
          style="border-radius: 15px"
        >
          <v-card-title>
            A votre tour
          </v-card-title>
          <v-card-text>
            <v-card
              raised
              style="border-radius: 15px"
            >
              <v-list
                three-line
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
                    <v-list-item-content>
                      <v-combobox
                        v-model="item.pa"
                        :disabled="checkRight(item.name)"
                        :items="pa"
                        filled
                        rounded
                      />
                    </v-list-item-content>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Kivaferoi',
  data () {
    return {
      toPick: 0,
      item1: ''
    }
  },
  computed: {
    ...mapGetters({
      alreadyPicked: 'kivaferkoi/alreadyPicked',
      notYetPicked: 'kivaferkoi/notYetPicked',
      picked: 'kivaferkoi/picked',
      pa: 'prosit/pa'
    })
  },
  methods: {
    ...mapActions({
      getRandom: 'kivaferkoi/getRandom'
    }),

    tirage () {
      console.dir(this.$auth)
      if (this.$auth.user[0].isAdmin) {
        if (this.toPick <= this.getAllSize()) {
          this.getRandom(this.toPick)
        } else {
          this.$toast.error('Le nonbre est trop grand')
          this.toPick = null
        }
      } else {
        this.$toast.warning('T\'a pas le droit de faire ça ^^')
      }
    },

    getAllSize () {
      return this.alreadyPicked.length + this.notYetPicked.length
    },

    checkRight (user) {
      if (this.$auth.user !== null) {
        return user === this.$auth.user.name
      }
      return false
    }
  }
}
</script>

<style scoped>

</style>
