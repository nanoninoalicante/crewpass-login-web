<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline"> Home </v-card-title>
        <v-card-text> You are logged in </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/"> Continue </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  mounted() {
    this.checkUser();
  },
  methods: {
    checkUser() {
      window.firebase.auth().onAuthStateChanged((user) => {
        console.log("location: ", this.$route);
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          console.log("user: ", user.refreshToken);
          this.$store.commit("loading", false);
          // ...
        } else {
          // User is signed out
          // ...
          console.log("user is not signed in");
          window.firebase
            .auth()
            .currentUser.getIdToken(true)
            .then((idToken) => {
              console.log("new id token: ", idToken);
              this.$store.commit("loading", false);
            });
        }
      });
    },
  },
};
</script>
