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
    async doSubmit(data) {
      const payload = {
        name: data.roomName,
        owner: {
          name: data.ownerName,
          id: this.$uuid.v4(),
          isReady: true
        },
        guest: [],
        isHire: true,
        thema: [],
        isStart: false,
        isCounting: false,
        vote: null
      }
      const id = await this.$store.dispatch('postRoom', payload)
      this.$router.push('/rooms/' + id)
    }
  }
}
</script>
