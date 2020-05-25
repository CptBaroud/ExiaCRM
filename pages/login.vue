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
      <v-card raised style="border-radius: 15px" class="my-4 mx-4">
        <v-card-title class="py-8 px-4">
          Bienvenue sur le CRM des A3 du CESI de Saint-Nazaire
        </v-card-title>
        <v-card-subtitle>
          Mais la t'es pas connecté donc tu vas pas pouvoir faire grand chose
        </v-card-subtitle>
        <v-card-actions>
          <v-layout
            column
            justify-center
            align-center
          >
            <v-flex>
              <v-btn @click="$nuxt.$children[2].dialog = true">
                Login
              </v-btn>
            </v-flex>
          </v-layout>
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

    }
  }
}
</script>

<style>
  .rounded-card{
    border-radius:15px;
  }
</style>
