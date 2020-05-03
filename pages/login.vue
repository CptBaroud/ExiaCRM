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
          Login
        </v-card-title>
        <v-text-field
          v-model="username"
          outlined
          rounded
        />
        <v-text-field
          v-model="password"
          type="password"
          outlined
          rounded
        />
        <v-card-actions>
          <v-btn @click="login">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async login () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        }).catch((e) => {
          // eslint-disable-next-line no-console
          console.error(e)
          this.$toast.error('Failed Logging In', { icon: 'mdi-error' })
        })
        if (this.$auth.loggedIn) {
          this.$toast.success('Successfully Logged In', { icon: 'done' })
        }
      } catch (e) {
        this.$toast.error('Username or Password wrong', { icon: 'error' })
      }
    }
  }
}
</script>

<style>
  .rounded-card{
    border-radius:15px;
  }
</style>
