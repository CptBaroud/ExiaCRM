<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="smokyBlack"
      flat
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        v-if="drawer"
        large
        icon
        @click="miniVariant = !miniVariant"
      >
        <v-icon v-if="!miniVariant">
          mdi-chevron-left
        </v-icon>
        <v-icon v-else>
          mdi-chevron-right
        </v-icon>
      </v-btn>
      <h1 class="display-2">
        {{ title }}
      </h1>
      <v-spacer />
      <v-list color="smokyBlack">
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://luckysketch.files.wordpress.com/2017/06/chibi-siberian-husky.png" />
          </v-list-item-avatar>
          <v-list-item-title>
            Gurvan
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      floating
      color="primary"
      app
      :clipped="clipped"
      :mini-variant="miniVariant"
    >
      <v-list>
        <v-list-item exact>
          <v-list-item-content>
            <v-list-item-title>
              <h1 class="display-1"></h1>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      color="smokyBlack"
    >
      V 0.1
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      miniVariant: false,
      drawer: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-form-textbox',
          title: 'Prosit Maker',
          to: '/prosit'
        },
        {
          icon: 'mdi-account-group',
          title: 'Kivaferkoi',
          to: '/kivaferkoi'
        },
        {
          icon: 'mdi-cog-outline',
          title: 'Administration',
          to: '/administration'
        }
      ],
      title: 'Uyhegé'
    }
  }
}
</script>
