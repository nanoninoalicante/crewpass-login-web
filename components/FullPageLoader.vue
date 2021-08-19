<template>
  <v-overlay :value="loading" z-index="99" color="white">
    <v-progress-circular
      indeterminate
      size="70"
      color="black lighten-2"
      width="6"
    ></v-progress-circular>
  </v-overlay>
</template>
<script>
export default {
  name: "FullPageLoader",
  props: {
    loading: {
      default: () => false,
      type: Boolean,
    },
  },
};
</script>
<style>
.home-links a {
  margin-right: 1rem;
}
</style>
