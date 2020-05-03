<template>
  <div>
    <h1>firestore contents here</h1>
    <ul>
      {{
        rooms
      }}
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '~/plugins/firebase.js'

export default {
  created() {
    this.$store.dispatch('setRoomsRef', db.collection('rooms'))
  },
  computed: {
    ...mapGetters({ rooms: 'getRooms' })
  }
}
</script>

<style></style>
