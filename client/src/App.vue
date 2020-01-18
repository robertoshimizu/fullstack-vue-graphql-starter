<template>
  <v-app style="background:#E3E3EE">
    <!-- Side Navbar -->
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-app-bar color="brown" flat dark>
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        <router-link to="/" tag="span" style="cursor:pointer">
          <h1 class="title pl-3">Surfing</h1>
        </router-link>
      </v-app-bar>    
      <v-divider></v-divider>
      
      <!-- Side Navbar links -->
      <v-list dense nav>
        <v-list-item ripple v-for="item in sideNavItems" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Signout Button -->
        <v-list-item v-if="user">
          <v-list-item-icon>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Signout</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <!-- Horizontal Navbar -->

    <v-app-bar fixed color="primary" dark>

      <!-- App Title -->
      
      <!-- Hamburguer Menu -->
      <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>

      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor:pointer">
          <h1 class="title">Surfing</h1>
        </router-link>
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
        <!-- Profile Button -->
        <v-btn text to="/profile" v-if="user">
          <v-icon class="hidden-sm-only" left>mdi-pencil</v-icon>
          Profile
        </v-btn>

        <!-- Signout Button -->
        <v-btn text v-if="user">
          <v-icon class="hidden-sm-only" left>mdi-pencil</v-icon>
          Signout
        </v-btn>

      </v-toolbar-items>

    </v-app-bar>
    <!-- App Content -->
    <main>
      <v-container class="mt-10">
        <transition name="fade" mode="out-in" :duration="250">
          <router-view/>        
        </transition>
      </v-container>      
    </main>    
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name:'App',
  data(){
    return{
      sideNav:false,
    };
  },
  computed:{
    ...mapGetters(['user']),
    horizontalNavItems(){
      let items = [
        { icon: 'mdi-chat', title: 'Posts', link: '/posts'},
        { icon: 'mdi-lock', title: 'Sign In', link: '/signin'},
        { icon: 'mdi-pencil', title: 'Sign Up', link: '/signup'}
      ];
      if (this.user) {
        items = [{ icon: 'mdi-chat', title: "Posts", link: "/posts" }];
      }
      return items;
    },
    sideNavItems(){
      let items = [
        { icon: 'mdi-chat', title: 'Posts', link: '/posts'},
        { icon: 'mdi-lock', title: 'Sign In', link: '/signin'},
        { icon: 'mdi-pencil', title: 'Sign Up', link: '/signup'}
      ];
      if (this.user) {
        items = [
          { icon: 'mdi-chat', title: "Posts", link: "/posts" },
          { icon: "mdi-chat", title: "Create Post", link: "/post/add" },
          { icon: "mdi-account", title: "Profile", link: "/profile" }
        ];
      }
      return items;
    }
  },
  methods:{
    toggleSideNav(){
      this.sideNav = !this.sideNav; // ! means turn to opposite
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>