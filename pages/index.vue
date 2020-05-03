<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card raised class="rounded-card">
        <v-card-title>
          Wsh
        </v-card-title>
        <v-card-subtitle>
          La Street
        </v-card-subtitle>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn
    }
  },
  computed: {
    ...mapGetters({
      userLoggedIn: 'auth/loggedInUser',
      isAuthenticated: 'auth/isAuthenticated'
    })
  }
}
</script>

<style>
  .rounded-card{
    border-radius:15px;
  }
</style>
