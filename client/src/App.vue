<template>
  <v-app style="background:#E3E3EE">
    <!-- Side Navbar -->

    <v-navigation-drawer app temporary fixed v-model="sideNav">

      
    </v-navigation-drawer>



    <!-- Horizontal Navbar -->

    <v-app-bar fixed color="primary" dark>

      <!-- App Title -->
      
      <!-- Hamburguer Menu -->
      <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>

      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor:pointer">Vue Share</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Search Input -->

      <v-text-field prepend-icon='mdi-magnify' placeholder="Search posts" color="accent" single-line hide-details></v-text-field>

      <v-spacer></v-spacer>

      <!-- Horizontal Navbar links -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
          <v-icon class="hidden-sm-only" left>{{ item.icon }}</v-icon>
          {{ item.title}}
        </v-btn>

      </v-toolbar-items>

    </v-app-bar>
    <!-- App Content -->
    <main>
      <v-container class="mt-4">
        <router-view/>
      </v-container>      
    </main>    
  </v-app>
</template>

<script>
export default {
  name:'App',
  data(){
    return{
      sideNav:false,
    }
  },
  computed:{
    horizontalNavItems(){
      return[
        { icon: 'mdi-chat', title: 'Posts', link: '/posts'},
        { icon: 'mdi-lock', title: 'Sign In', link: '/signin'},
        { icon: 'mdi-pencil', title: 'Sign Up', link: '/signup'}
      ]
    }
  },
  methods:{
    toggleSideNav(){
      this.sideNav = !this.sideNav;
    }
  }
}
</script>

