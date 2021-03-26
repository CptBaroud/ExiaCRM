<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-card
          rounded="lg"
          color="secondary"
        >
          <v-card-title>
            Equipes
            <v-spacer />
            <v-btn
              text
              color="primary"
              @click="$store.commit('conf/changeAddTeamModal', true)"
            >
              Ajouter
            </v-btn>
          </v-card-title>
          <v-card-text v-if="teams">
            <v-virtual-scroll
              :class="scrollbarTheme"
              :items="teams"
              height="450"
              item-height="75"
            >
              <template v-slot:default="{ item }">
                <v-list-item :key="item._id" color="primary">
                  <v-list-item-content>
                    <v-list-item-title>
                      Equipe n°{{ item.num }}
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-row class="avatars">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-avatar class="avatars__item" v-bind="attrs" v-on="on">
                            <v-img class="avatar" :src="item.animateur.avatar ? item.animateur.avatar : avatar" />
                          </v-avatar>
                        </template>
                        <span>Animateur : {{ item.animateur.name }}</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-avatar class="avatars__item" v-bind="attrs" v-on="on">
                            <v-img class="avatar" :src="item.scribe.avatar ? item.scribe.avatar : avatar" />
                          </v-avatar>
                        </template>
                        <span>Scribe : {{ item.scribe.name }}</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-avatar class="avatars__item" v-bind="attrs" v-on="on">
                            <v-img class="avatar" :src="item.secretaire.avatar ? item.secretaire.avatar : avatar" />
                          </v-avatar>
                        </template>
                        <span>Secretaire : {{ item.secretaire.name }}</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-avatar class="avatars__item" v-bind="attrs" v-on="on">
                            <v-img class="avatar" :src="item.gestionaire.avatar ? item.gestionaire.avatar : avatar" />
                          </v-avatar>
                        </template>
                        <span>Gestionaire : {{ item.gestionaire.name }}</span>
                      </v-tooltip>
                    </v-row>
                  </v-list-item-action>
                </v-list-item>
              </template>
            </v-virtual-scroll>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          rounded="lg"
          color="secondary"
        >
          <v-card-title>
            Conf
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="numProsit"
              flat
              solo
              background-color="secondary"
            />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card
          rounded="lg"
          color="secondary"
        >
          <v-card-title>
            Utilisateurs
          </v-card-title>
          <v-card-text>
            <v-virtual-scroll
              :class="scrollbarTheme"
              :items="users"
              item-height="80"
              height="450"
            >
              <template v-slot:default="{ item }">
                <v-list-item :key="item._id">
                  <v-list-item-avatar size="64">
                    <v-img class="avatar" :src="item.avatar ? item.avatar : avatar" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.name }} <span class="text--secondary"> {{ item.surname }} </span>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <v-btn v-if="!item.password" x-small icon @click="createAccount(item._id)">
                        <v-icon>
                          mdi-mail
                        </v-icon>
                      </v-btn>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-virtual-scroll>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialogue de création d'une equipe-->
    <add-team
      :width="450"
    />
  </v-container>
</template>

<script>
import addTeam from '@/components/addTeam'

export default {
  name: 'Administration',
  components: {
    addTeam
  },
  middleware ({ store, redirect }) {
    if (store.$auth.user.role < 2) {
      store.$toast.warning('L\'accès à cette page est reservée aux administrateurs')
      redirect('/')
    }
  },
  data () {
    return {}
  },
  computed: {
    teams: {
      get () {
        return this.$store.getters['team/team']
      }
    },

    users: {
      get () {
        return this.$store.getters['user/users']
      }
    },

    numProsit: {
      get () {
        return this.$store.getters['conf/conf'].numProsit
      },

      set (value) {
        if (value !== '') {
          this.$store.dispatch('conf/updateNumProsit', { token: this.$auth.getToken('local'), value }).then((resp) => {
            this.$store.commit('team/getCurentTeam', resp.numProsit)
          })
        }
      }
    },

    avatar () {
      return process.env.api_url + '/images/user_homme.svg'
    },

    scrollbarTheme () {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    }
  },
  mounted () {
  },
  methods: {
    createAccount (id) {
      this.$store.dispatch('user/createAccount', { token: this.$auth.getToken('local'), user: id })
    }
  }
}
</script>

<style scoped>
.light::-webkit-scrollbar {
  width: 15px;
}

.light::-webkit-scrollbar-track {
  background: #F8F8F8;
  border-left: 1px solid #F8F8F8;
}

.light::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #F8F8F8;
  border-radius: 7px;
}

.light::-webkit-scrollbar-thumb:hover {
  background: black;
}

.dark::-webkit-scrollbar {
  width: 15px;
  border-radius: 20px;
}

.dark::-webkit-scrollbar-track {
  background: #2C2C2C;
  border-left: 1px solid #2c2c2c;
}

.dark::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #2C2C2C;
  border-radius: 7px;
}

.dark::-webkit-scrollbar-thumb:hover {
  background: white;
}

.avatars {
  display: flex;
  list-style-type: none;
  margin: auto;
  padding: 0px;
  flex-direction: row;
}

.avatars__item {
  background-color: var(--v-background-base);
  border: 2px solid var(--v-primary-base);
  border-radius: 100%;
  color: #ffffff;
  display: block;
  font-family: sans-serif;
  font-size: 12px;
  font-weight: 100;
  height: 45px;
  width: 45px;
  line-height: 45px;
  text-align: center;
  transition: margin 0.1s ease-in-out;
  overflow: hidden;
  margin-left: -10px;
}

.avatars__item:first-child {
  z-index: 5;
}

.avatars__item:nth-child(2) {
  z-index: 4;
}

.avatars__item:nth-child(3) {
  z-index: 3;
}

.avatars__item:nth-child(4) {
  z-index: 2;
}

.avatars__item:nth-child(5) {
  z-index: 1;
}

.avatars__item:last-child {
  z-index: 0;
}
</style>
