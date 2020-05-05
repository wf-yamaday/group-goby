<template>
  <v-app>
    <v-app-bar :color="color" fixed flat app>
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
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      title: 'GW 2020 Hackathon',
      color: 'info'
    }
  },
  computed: {
    ...mapGetters({
      room: 'getRoom'
    })
  },
  head() {
    const title = this.room ? this.room.name : 'GW 2020 Hackathon'
    return {
      title
    }
  }
}
</script>

<style scoped>
.v-content {
  background: #fafafa;
}
</style>
