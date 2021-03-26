<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="9">
        <v-data-iterator
          no-data-text="Aucuns prosits pour le moment"
          hide-default-footer
          :items="prosits"
          :search="search"
        >
          <template v-slot:header>
            <v-text-field
              v-model="search"
              flat
              solo
              :full-width="false"
              placeholder="Recherche"
              prepend-inner-icon="mdi-magnify"
              background-color="secondary"
            />
            <v-spacer />
          </template>
          <template v-slot:default="props">
            <v-row>
              <v-col
                v-for="item in props.items"
                :key="item.name"
                cols="12"
                sm="6"
                md="4"
                lg="4"
              >
                <v-hover
                  v-slot="{ hover }"
                >
                  <v-card
                    rounded="lg"
                    class="my-4"
                    style="transition: background-color 0.2s ease-in-out"
                    :color="hover ? 'primary' : 'secondary'"
                    :elevation="hover ? 6 : 0"
                  >
                    <v-card-text style="padding-bottom: 0">
                      <template v-for="(keyword, i) in item.keywords">
                        <v-chip
                          v-if="i <= 2"
                          :key="i"
                          color="accent"
                          label
                          class="my-1 mr-3"
                        >
                          {{ keyword.name }}
                        </v-chip>
                      </template>
                      <v-chip
                        v-if="item.keywords.length >= 2 && item.keywords.length >= 3"
                        color="background"
                        label
                        class="ml-2"
                        style="color: var(--var-text-base)"
                      >
                        + {{ item.keywords.length - 3 }} autres ...
                      </v-chip>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title class="mb-2">
                            {{ item.title }}
                          </v-list-item-title>
                          <v-list-item-subtitle style="display: inline-block" class="text-truncate">
                            {{ item.context }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card-text>
                    <v-card-actions style="padding-top: 0">
                      <v-list-item>
                        <v-list-item-avatar>
                          <v-img v-if="item.author.avatar" :src="item.author.avatar" />
                          <v-img v-else :src="avatar" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ item.author.name }} {{ item.author.surname }}
                          </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn
                            v-if="hover"
                            text
                            :to="'/prosits/' + item._id"
                            nuxt
                          >
                            En voir plus
                          </v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-card-actions>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      search: ''
    }
  },
  computed: {
    prosits: {
      get () {
        return this.$store.getters['prosit/prosits']
      }
    },

    avatar () {
      return process.env.api_url + '/images/user_homme.svg'
    }
  }
}
</script>

<style scoped>

</style>
