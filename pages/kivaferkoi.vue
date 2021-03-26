<template>
  <v-container :class="$vuetify.theme.dark ? 'card_background_dark' : 'card_background_light'" style="min-height: 800px">
    <v-text-field
      v-if="$auth.user.role >= 2"
      v-model="toPick"
      flat
      solo
      placeholder="Nombre de personnes a tiré au sort"
      background-color="secondary"
      @keypress.enter="shuffle"
    />
    <v-row class="d-flex justify-center ">
      <v-col cols="3">
        <v-card
          color="secondary"
          rounded="lg"
          flat
        >
          <v-card-title>
            Les tirés au sort
          </v-card-title>
          <v-card-text>
            <v-list color="secondary">
              <v-list-item v-for="(item, i) in kivaferkoi.picked" :key="i">
                <v-list-item-avatar>
                  <v-img class="avatar" :src="item.avatar ? item.avatar : avatar" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.surname }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          color="secondary"
          rounded="lg"
          flat
        >
          <v-card-title>
            Pas encore tirés au sort
          </v-card-title>
          <v-card-text>
            <v-list color="secondary">
              <v-list-item v-for="(item, i) in kivaferkoi.notYetPicked" :key="i">
                <v-list-item-avatar>
                  <v-img class="avatar" :src="item.avatar ? item.avatar : avatar" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.surname }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          color="secondary"
          rounded="lg"
          flat
        >
          <v-card-title>
            Déjà tirés au sort
          </v-card-title>
          <v-card-text>
            <v-list color="secondary">
              <v-list-item v-for="(item, i) in kivaferkoi.alreadyPicked" :key="i">
                <v-list-item-avatar>
                  <v-img class="avatar" :src="item.avatar ? item.avatar : avatar" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ item.surname }}
                  </v-list-item-subtitle>
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
export default {
  name: 'Kivaferoi',
  data () {
    return {
      toPick: 0,
      windowSize: {
        x: 0,
        y: 1
      }
    }
  },
  computed: {
    kivaferkoi: {
      get () {
        return this.$store.getters['kivaferkoi/kivaferkoi']
      }
    },

    avatar () {
      return process.env.api_url + '/images/user_homme.svg'
    }
  },
  mounted () {

  },
  methods: {
    /**
     * Permet de calculer la taille de l'ecran
     **/
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },

    shuffle () {
      this.$store.dispatch('kivaferkoi/shuffle', { size: this.toPick, token: this.$auth.getToken('local') })
    }
  }
}
</script>

<style scoped>
.card_background_light {
  background-image: url('../assets/svg/kivaferkoi_light.svg');
  background-size: 42em;
  background-position: right 105% bottom -22%;
  position: relative;
}

.card_background_dark {
  background-image: url('../assets/svg/kivaferkoi_dark.svg');
  background-size: 42em;
  background-position: right 105% bottom -22%;
  position: relative;
}

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
