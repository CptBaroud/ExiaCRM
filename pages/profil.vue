<template>
  <v-container class="mt-2" :class="$vuetify.theme.dark ? 'card-background-dark' : 'card-background-light'">
    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center mt-4">
        <v-card
          color="secondary"
          class="rounded-card"
          flat
          widt="600"
        >
          <v-card-text>
            <v-list style="background: transparent">
              <div class="mb-8">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>
                      mdi-account-settings
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      Parmètres du compte
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Modifier votre nom, prénom ..
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-row>
                  <v-col md="12" lg="6">
                    <v-text-field
                      v-model="name"
                      filled
                      rounded
                      placeholder="Prénom"
                    />
                  </v-col>
                  <v-col md="12" lg="6">
                    <v-text-field
                      v-model="surname"
                      filled
                      rounded
                      placeholder="Nom"
                    />
                  </v-col>
                </v-row>

                <v-list-item class="mb-4">
                  <v-list-item-avatar style="border: solid var(--v-primary-base) 2px" size="96">
                    <v-img v-if="avatar" :src="avatar" />
                    <v-icon v-else>
                      mdi-account
                    </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-form
                      ref="uploadProfilePictureForm"
                      v-model="uploadProfilPictureValid"
                      lazy-validation
                    >
                      <v-file-input
                        v-model="uploadProfilPictureItem"
                        style="max-width: 356px"
                        accept="image/png, image/jpeg, image/bmp"
                        rounded
                        hide-details
                        filled
                      />
                    </v-form>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn
                      class="ml-4"
                      rounded
                      color="primary"
                      :disabled="!uploadProfilPictureValid"
                      @click="uploadPicture"
                    >
                      Modifier
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>

                <v-text-field
                  v-model="phone"
                  filled
                  rounded
                  placeholder="Numéro de telephone"
                />
              </div>
              <div class="mb-8">
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>
                      mdi-lock
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>
                      Paramètres de sécurité
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      Modifier votre mot de passe, votre adresse de connexion ..
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="changePasswordItem.old"
                      filled
                      rounded
                      type="password"
                      placeholder="Mot de passe actuel"
                      style="max-width: 356px"
                    />
                    <v-btn
                      text
                      rounded
                      color="primary"
                    >
                      Mot de passe oublié ?
                    </v-btn>
                  </v-col>
                  <v-col md="12" lg="6">
                    <v-text-field
                      v-model="changePasswordItem.new"
                      filled
                      rounded
                      placeholder="Nouveau mot de passe"
                    />
                  </v-col>
                  <v-col md="12" lg="6">
                    <v-text-field
                      v-model="changePasswordItem.verifyNew"
                      filled
                      rounded
                      placeholder="Confirmer le nouveau mot de passe"
                    />
                  </v-col>
                </v-row>
                <v-text-field
                  v-model="mail"
                  filled
                  rounded
                  placeholder="Adresse Mail"
                  append-icon="mdi-check"
                />
              </div>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
      v-model="uploadProfilPictureDialog"
      width="350"
    >
      <v-card
        class="rounded-card"
        color="secondary"
      >
        <v-card-title class="mb-4">
          Changer de photo de profil
        </v-card-title>
        <v-card-text>
          <v-form
            ref="uploadProfilePictureForm"
            v-model="uploadProfilPictureValid"
            lazy-validation
          >
            <v-file-input
              v-model="uploadProfilPictureItem"
              accept="image/png, image/jpeg, image/bmp"
              rounded
              filled
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            rounded
            color="primary"
          >
            Changer
          </v-btn>
          <v-btn
            text
            rounded
            @click="uploadProfilPictureDialog = false"
          >
            Annuler
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'Profil',
  data () {
    return {
      uploadProfilPictureDialog: false,
      uploadProfilPictureItem: {},
      uploadProfilPictureValid: false,

      changePasswordItem: {
        old: '',
        new: '',
        verifyNew: ''
      },

      windowSize: {
        x: 0,
        y: 1
      }
    }
  },
  computed: {
    notification: {
      get () {
        return this.$store.getters['notification/notification']
      }
    },

    name: {
      get () {
        return this.$auth.user.name
      },
      set (value) {
        this.$store.dispatch('agent/updateData', { token: this.$auth.getToken('local'), _id: this.$auth.user._id, name: value })
      }
    },

    surname: {
      get () {
        return this.$auth.user.surname
      },
      set (value) {
        this.$store.dispatch('agent/updateData', { token: this.$auth.getToken('local'), _id: this.$auth.user._id, surname: value })
      }
    },

    phone: {
      get () {
        return this.$auth.user.phone
      },
      set (value) {
        this.$store.dispatch('agent/updateData', { token: this.$auth.getToken('local'), _id: this.$auth.user._id, phone: value })
      }
    },

    mail: {
      get () {
        return this.$auth.user.mail
      },
      set (value) {
        this.$store.dispatch('agent/updateData', { token: this.$auth.getToken('local'), _id: this.$auth.user._id, mail: value })
      }
    },

    avatar: {
      get () {
        return this.$auth.user.avatar
      },
      set (value) {
        this.$store.dispatch('agent/updateData', { token: this.$auth.getToken('local'), _id: this.$auth.user._id, avatar: value })
      }
    }
  },
  mounted () {
    this.onResize()
  },
  methods: {
    /**
     * Permet de calculer la taille de l'ecran
     **/
    onResize () {
      this.windowSize = {
        x: window.innerWidth,
        y: window.innerHeight
      }
    },

    uploadPicture () {
      const agent = this.$auth.user
      delete agent.password

      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })

      toBase64(this.uploadProfilPictureItem).then((response) => {
        this.$store.dispatch('agent/updateProfilePicture', {
          token: this.$auth.getToken('local'),
          type: this.uploadProfilPictureItem.type,
          name: this.uploadProfilPictureItem.name,
          _id: this.$auth.user._id,
          file: response
        })
      })
    }
  }
}
</script>

<style scoped>
>>> .v-text-field--enclosed .v-input__append-inner {
  padding-top: 0 !important;
}
</style>
