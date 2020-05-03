<template>
  <v-layout column justify-center align-center>
    <what-word-wolf class="ma-2" />
    <new-room-form class="ma-2" @doSubmit="doSubmit" />
  </v-layout>
</template>

<script>
import WhatWordWolf from '~/components/WhatWordWolf'
import NewRoomForm from '~/components/NewRoomForm'

export default {
  components: {
    WhatWordWolf,
    NewRoomForm
  },
  methods: {
    doSubmit(data) {
      console.log(data)
      // this.$router.push('/rooms/test')
    }
  }
}
</script>
