<template>
  <v-container>
    <v-layout
      align-center
      column
      justify-center
    >
      <v-flex
        md13
        sm13
        xs13
      >
        <v-card style="border-radius: 20px" width="850" max-height="800" min-height="790">
          <v-card-title>
            <h1 class="display-1 pb-8">
              Chat
            </h1>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                cols="4"
              >
                <v-card style="max-height: 42em; min-height: 42em" class="overflow-y-auto px-8" :class="scrollbarTheme" flat>
                  <v-skeleton-loader
                    :loading="false"
                    type="list-item-avatar-two-line, list-item-avatar-two-line, list-item-avatar-two-line, list-item-avatar-two-line, list-item-avatar-two-line, list-item-avatar-two-line, list-item-avatar-two-line, list-item-avatar-two-line, list-item-avatar-two-line"
                    transition-group="scale"
                  >
                    <v-list v-for="(item, i) in users" :key="i" two-line rounded>
                      <v-list-item
                        v-if="isConnectedUser(item.name)"
                        exact
                        active-class="elevation-8"
                        @click="changeConv(item)"
                      >
                        <v-list-item-avatar>
                          <v-avatar>
                            <v-img :src="item.avatar" />
                          </v-avatar>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ item.name }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            <span class="caption text-right">{{ item.username }}</span>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-skeleton-loader>
                </v-card>
              </v-col>
              <v-col
                cols="8"
              >
                <v-card style="max-height: 48em; min-height: 48em" flat>
                  <v-card-text style="max-height: 42em; min-height: 42em" class="overflow-y-auto px-8" :class="scrollbarTheme">
                    <v-list v-for="(item, i) in conversation" :key="i">
                      <v-list-item
                        v-if="isConnectedUser(item.author)"
                        two-line
                      >
                        <v-list-item-avatar>
                          <v-avatar>
                            <v-img :src="item.avatar" />
                          </v-avatar>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-card
                            style="border-radius: 20px"
                            color="prussianBlue"
                            :max-width="item.text.length*9"
                            min-width="75"
                            elevation="4"
                          >
                            <v-card-text class="font-weight-light" style="color: white">
                              {{ item.text }}
                            </v-card-text>
                          </v-card>
                          <v-list-item-subtitle>
                            <span class="caption text-right"> {{ item.author }} : {{ item.emited }}</span>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item
                        v-else
                        two-line
                      >
                        <v-list-item-avatar>
                          <v-avatar>
                            <v-img :src="item.avatar" />
                          </v-avatar>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-card
                            style="border-radius: 20px"
                            color="steelBlue"
                            :max-width="item.text.length*9"
                            min-width="75"
                            elevation="4"
                          >
                            <v-card-text class="h1 font-weight-light" style="color: white">
                              {{ item.text }}
                            </v-card-text>
                          </v-card>
                          <v-list-item-subtitle>
                            <span class="caption text-right"> {{ item.author }} : {{ item.emited }}</span>
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                  <v-card-actions class="px-8">
                    <v-text-field
                      v-model="chat"
                      filled
                      rounded
                      append-icon="mdi-send"
                      @keypress.enter="sendMessage(chat)"
                    />
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-card style="border-radius: 20px" width="850" max-height="800" min-height="790">
          <v-card-title>
            <h1 class="display-1 pb-8">
              Chat
            </h1>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                cols="4"
              >
                <v-card style="max-height: 42em; min-height: 42em" class="overflow-y-auto px-8" :class="scrollbarTheme" flat>
                  <v-list v-for="(item, i) in users" :key="i" two-line rounded>
                    <v-list-item
                      v-if="isConnectedUser(item.name)"
                      exact
                      active-class="elevation-8"
                      @click="changeConv(item)"
                    >
                      <v-list-item-avatar>
                        <v-avatar>
                          <v-img :src="item.avatar" />
                        </v-avatar>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          <span class="caption text-right">{{ item.username }}</span>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
              <div
                cols="8"
              >
                <v-card style="max-height: 48em; min-height: 48em" flat>
                  <v-card-text style="max-height: 42em; min-height: 42em" class="overflow-y-auto px-8" :class="scrollbarTheme">
                    <v-container v-for="(item, i) in conversation" :key="i">
                      <div
                        v-if="isConnectedUser(item.author)"
                      >
                        <v-list-item
                          two-line
                        >
                          <v-list-item-avatar>
                            <v-avatar>
                              <v-img :src="item.avatar" />
                            </v-avatar>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-card
                              style="border-radius: 20px"
                              color="prussianBlue"
                              :max-width="item.text.length*9"
                              min-width="75"
                              elevation="4"
                            >
                              <v-card-text class="font-weight-light" style="color: white">
                                {{ item.text }}
                              </v-card-text>
                            </v-card>
                            <v-list-item-subtitle>
                              <span class="caption text-right"> {{ item.author }} : {{ item.emited }}</span>
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </div>
                      <div
                        v-else
                        class="d-flex flex-row-reverse"
                      >
                        <v-list-item
                          two-line
                        >
                          <v-list-item-avatar>
                            <v-avatar>
                              <v-img :src="item.avatar" />
                            </v-avatar>
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-card
                              style="border-radius: 20px"
                              color="steelBlue"
                              :max-width="item.text.length*9"
                              min-width="75"
                              elevation="4"
                            >
                              <v-card-text class="h1 font-weight-light" style="color: white">
                                {{ item.text }}
                              </v-card-text>
                            </v-card>
                            <v-list-item-subtitle>
                              <span class="caption text-right"> {{ item.author }} : {{ item.emited }}</span>
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </div>
                    </v-container>
                  </v-card-text>
                  <v-card-actions class="px-8">
                    <v-text-field
                      v-model="chat"
                      filled
                      rounded
                      append-icon="mdi-send"
                      @keypress.enter="sendMessage(chat)"
                    />
                  </v-card-actions>
                </v-card>
                </v-col>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Chat',
  data () {
    return {
      chat: '',
      done: true,
      conversation: [],
      reveiver: {},
      message: [
        {
          receiver: 'Franso',
          conversation: [
            {
              id: 0,
              conversation_id: 0,
              author: 'Gurvan',
              text: 'Hello comment vas tu ?',
              avatar: 'https://luckysketch.files.wordpress.com/2017/06/chibi-alaskan-malamute.png?w=660',
              emited: '14:13'
            },
            {
              id: 1,
              conversation_id: 0,
              author: 'Franso',
              text: 'Bien et toi ?',
              avatar: 'https://luckysketch.files.wordpress.com/2017/06/chibi-beagle.png?w=660',
              emited: '14:14'
            },
            {
              id: 2,
              conversation_id: 0,
              author: 'Franso',
              text: 'Test de texte qui est un peu long pour voir comment se comporte le systme de taille des messagesTest de texte qui est un peu long pour voir comment se comporte le systme de taille des messages',
              avatar: 'https://luckysketch.files.wordpress.com/2017/06/chibi-beagle.png?w=660',
              emited: '14:14'
            },
            {
              id: 3,
              conversation_id: 0,
              author: 'Franso',
              text: 'Bien et toi ?',
              avatar: 'https://luckysketch.files.wordpress.com/2017/06/chibi-beagle.png?w=660',
              emited: '14:14'
            },
            {
              id: 4,
              conversation_id: 0,
              author: 'Franso',
              text: 'Bien et toi ?',
              avatar: 'https://luckysketch.files.wordpress.com/2017/06/chibi-beagle.png?w=660',
              emited: '14:14'
            }
          ]
        }
      ]
    }
  },
  computed: {
    scrollbarTheme () {
      return this.$vuetify.theme.dark ? 'dark' : 'light'
    },

    users: {
      get () {
        return this.$store.state.user.users
      }
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    ...mapActions({
      getUsers: 'user/getUsers'
    }),

    getUser () {
      this.done = false
      this.getUsers().then(() => {
        setTimeout(() => {
          this.done = false
        }, 700)
      })
    },

    isConnectedUser (name) {
      return name !== this.$auth.user[0].name
    },

    sendMessage (text) {
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      }

      this.conversation.push({
        author: this.$auth.user[0].name,
        text,
        avatar: this.$auth.user[0].avatar,
        emited: new Intl.DateTimeFormat('fr-FR', options).format(Date.now())
      })

      this.chat = ''
    },

    getConv (user) {
      let out = {}

      this.message.some((item) => {
        if (item.receiver === user.username) {
          out = { conversation: item.conversation }
        }
      })

      return out
    },

    changeConv (user) {
      const data = this.getConv(user)

      if (Object.keys(data).length === 0) {
        this.message.push({
          receiver: user,
          conversation: []
        })
      } else {
        this.conversation = data.conversation
      }
    }
  }
}
</script>

<style scoped>
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
    border-left: 1px solid #2c2c2c;
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
