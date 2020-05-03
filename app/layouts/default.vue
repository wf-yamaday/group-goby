<template>
  <v-app dark>
    <v-app-bar :color="color" fixed app>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :color="color" fixed app>
      <span>&copy; {{ new Date().getFullYear() }} - Group Goby</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'GW 2020 Hackathon',
      color: 'info'
    }
  }
}
</script>

<style scoped>
.v-content {
  background: #fafafa;
}
</style>
