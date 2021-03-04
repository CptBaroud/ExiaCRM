<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="2">
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-img v-if="prosit.author.avatar" :src="prosit.author.avatar" />
              <v-img v-else :src="avatar" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ prosit.author.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ prosit.author.surname }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="6">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Contexte
              </v-list-item-title>
              <v-list-item-subtitle class="subtitle-1">
                {{ prosit.context }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Id',
  data () {
    return {
      id: ''
    }
  },
  computed: {
    prosit: {
      get () {
        return this.$store.getters['prosit/prosits'].filter(object => object._id === this.$route.params.id)[0]
      }
    },

    avatar () {
      return process.env.api_url + '/images/user_homme.svg'
    }
  },
  mounted () {
    console.log(this.$route.params)
  }
}
</script>

<style scoped>

</style>
