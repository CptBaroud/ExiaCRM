<template>
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
      <v-card style="border-radius: 20px" class="transition">
        <v-card-title>
          <v-avatar size="96">
            <v-img :src="user.avatar" min-height="64" min-width="64" />
          </v-avatar>
          <h1 v-if="!edit" class="headline">
            {{ user.name }} <span class="font-italic font-weight-light">"{{ user.username }}"</span>
          </h1>
          <v-form
            v-else
          >
            <v-text-field
              v-model="name"
              label="Nom"
              filled
              rounded
              :value="user.name"
            />
            <v-text-field
              v-model="username"
              label="Username"
              filled
              rounded
              :value="user.username"
            />
          </v-form>
          <v-spacer />
          <v-btn
            class="ml-4"
            icon
            @click="edit = !edit"
          >
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-subtitle>
          <v-divider />
        </v-card-subtitle>
        <v-card-text v-if="edit">
          <v-row
            justify="center"
          >
            <v-col cols="10">
              <h3 class="my-2">
                Changer de mot de passe
              </h3>
              <v-form class="mb-2">
                <v-text-field
                  v-model="mdp"
                  label="Ancien mot de passe"
                  filled
                  rounded
                  type="password"
                />
                <v-text-field
                  v-model="newMdp"
                  label="Nouveau mot de passe"
                  filled
                  rounded
                  type="password"
                />
                <v-spacer />
                <v-btn
                  text
                >
                  Valider
                </v-btn>
              </v-form>
              <v-spacer />
              <h3 class="my-2">
                Changer de photo de profil
              </h3>
              <v-form class="mb-2">
                <v-select
                  v-model="avatar"
                  :items="avatars"
                  :rules="required"
                  item-text="name"
                  item-value="img"
                  filled
                  rounded
                  chips
                >
                  <template v-slot:selection="data">
                    <v-chip
                      :key="JSON.stringify(data.item.name)"
                      v-bind="data.attrs"
                      :input-value="data.selected"
                      :disabled="data.disabled"
                      @click:close="data.parent.selectItem(data.item)"
                    >
                      <v-avatar
                        class="accent white--text"
                        left
                      >
                        <v-img :src="data.item.img" />
                      </v-avatar>
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                </v-select>
                <v-btn
                  text
                >
                  Valider
                </v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text v-else>
          Y'a rien à voir pour l'instant circulez <br>
          <span class="caption">
            Mais tu peux quand meme editer ton profil
          </span>
        </v-card-text>
        <v-card-actions>
          <v-row
            justify="center"
          >
            <v-col cols="10">
              <h3 class="subtitle-2 font-light">
                Lache une petite note
              </h3>
              <v-rating
                v-model="rating"
                full-icon="mdi-heart"
                empty-icon="mdi-heart-outline"
                readonly
                background-color="primary"
                color="primary"
              />
              <h6 class="overline">
                PS : j'ai déjà mis la bonne note
              </h6>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Profil',
  data () {
    return {
      edit: false,
      rating: 5,
      user: this.$auth.user[0],
      avatars: [
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-siberian-husky.png?w=660',
          name: 'Husky'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-alaskan-malamute.png?w=660',
          name: 'Malamute'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-aspin.png?w=660',
          name: 'Aspin'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-beagle.png?w=660',
          name: 'Beagle'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-chow-again.png?w=660',
          name: 'Chow'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-chow-chow.png?w=660',
          name: 'Chow-Chow'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-dachshund.png?w=660',
          name: 'Teckel'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-french-bulldog.png?w=660',
          name: 'Bulldog Français'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-german-shepperd.png?w=660',
          name: 'Berger Allemand'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-golden-retriever.png?w=660',
          name: 'Golden Retriever'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-great-dane.png?w=660',
          name: 'Dogue Allemand'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-labrador.png?w=660',
          name: 'Labrador'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-labrador.png?w=660',
          name: 'Labrador'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-pekingese.png?w=660',
          name: 'Pékinois'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-pomeranian.png?w=660',
          name: 'Spitz nain'
        },
        {
          img: 'https://luckysketch.files.wordpress.com/2017/06/chibi-poodle.png?w=660',
          name: 'Caniche'
        }
      ],
      name: this.$auth.user[0].name,
      username: this.$auth.user[0].username
    }
  }
}
</script>

<style scoped>
  .transition {
    transition: height .150s ease-in-out;
  }
</style>
