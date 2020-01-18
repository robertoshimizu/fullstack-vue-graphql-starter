<template>
  <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="handleSigninUser">
                  <v-text-field
                    v-model="username"
                    label="Username"
                    name="username"
                    prepend-icon="mdi-face"
                    type="text" required
                  />

                  <v-text-field
                    v-model="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password" required
                  />
                  
              
                  <v-btn color="accent" type="submit">Signin</v-btn>
                      <h3>Don't have an account?
                        <router-link to="/signup">Signup</router-link>
                      </h3>          
                  
                </v-form>
              </v-card-text>
            </v-card>  
          </v-col>
        </v-row>
      </v-container>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      username: " ",
      password: " "
    };
  },
  methods: {
    handleSigninUser() {
      this.$store.dispatch("signinUser", {
        username: this.username,
        password: this.password
      });
      console.log("cliquei");
    }
  }
};
</script>