<template>
  <v-dialog
    v-model="dialog"
    :width="width"
    @click:outside="$store.commit('conf/changeAddTeamModal', false)"
  >
    <v-card
      rounded="lg"
      color="background"
    >
      <v-card-title>
        Créer une equipe de prosit
      </v-card-title>
      <v-card-text>
        <v-form
          ref="createTeam"
          v-model="createTeamForm"
          lazy-validation
        >
          <v-autocomplete
            v-model="createTeam.animateur"
            label="Animateur"
            :items="users"
            background-color="secondary"
            :rules="[
              v => !!v || 'Champs requis',
              v => createTeam.scribe !== v || 'Cet User à déjà un role',
              v => createTeam.secretaire !== v || 'Cet User à déjà un role',
              v => createTeam.gestionaire !== v || 'Cet User à déjà un role'
            ]"
            flat
            solo
          />
          <v-autocomplete
            v-model="createTeam.secretaire"
            label="Secretaire"
            :items="users"
            background-color="secondary"
            :rules="[
              v => !!v || 'Champs requis',
              v => createTeam.animateur !== v || 'Cet User à déjà un role',
              v => createTeam.scribe !== v || 'Cet User à déjà un role',
              v => createTeam.gestionaire !== v || 'Cet User à déjà un role'
            ]"
            flat
            solo
          />
          <v-autocomplete
            v-model="createTeam.scribe"
            label="Scribe"
            :items="users"
            background-color="secondary"
            :rules="[
              v => !!v || 'Champs requis',
              v => createTeam.animateur !== v || 'Cet User à déjà un role',
              v => createTeam.secretaire !== v || 'Cet User à déjà un role',
              v => createTeam.gestionaire !== v || 'Cet User à déjà un role'
            ]"
            flat
            solo
          />
          <v-autocomplete
            v-model="createTeam.gestionaire"
            label="gestionaire"
            :items="users"
            background-color="secondary"
            :rules="[
              v => !!v || 'Champs requis',
              v => createTeam.animateur !== v || 'Cet User à déjà un role',
              v => createTeam.scribe !== v || 'Cet User à déjà un role',
              v => createTeam.secretaire !== v || 'Cet User à déjà un role'
            ]"
            flat
            solo
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="$store.commit('conf/changeAddTeamModal', false)"
        >
          Annuler
        </v-btn>
        <v-btn
          color="primary"
          :disabled="!createTeamForm"
          @click="addTeam()"
        >
          Créer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AddTeam',
  props: {
    width: {
      type: Number,
      default: 600,
      required: false
    }
  },
  data () {
    return {
      createTeam: {
        animateur: '',
        secretaire: '',
        scribe: '',
        gestionaire: ''
      },
      createTeamForm: true
    }
  },
  computed: {
    users: {
      get () {
        return this.$store.getters['user/userDropdown']
      }
    },

    dialog: {
      get () {
        return this.$store.getters['conf/addTeamModal']
      }
    },

    team: {
      get () {
        return this.$store.getters['team/team']
      }
    }
  },
  methods: {
    addTeam () {
      if (this.$refs.createTeam.validate()) {
        this.createTeam.token = this.$auth.getToken('local')
        this.createTeam.num = this.team.length + 2
        this.$store.dispatch('team/add', this.createTeam).then(
          this.$store.commit('conf/changeAddTeamModal', false)
        )
      } else {
        this.createTeamForm = false
      }
    }
  }
}
</script>

<style scoped>

</style>
