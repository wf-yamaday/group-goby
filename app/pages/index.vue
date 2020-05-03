<template>
  <v-layout column justify-center align-center>
    <what-word-wolf class="ma-2" />
    <new-room-form class="ma-2" @doSubmit="doSubmit" />
  </v-layout>
</template>

<script>
import { db } from '~/plugins/firebase.js'
import WhatWordWolf from '~/components/WhatWordWolf'
import NewRoomForm from '~/components/NewRoomForm'

export default {
  components: {
    WhatWordWolf,
    NewRoomForm
  },
  methods: {
    async doSubmit(data) {
      const body = {
        name: data.roomName,
        owner: {
          name: data.ownerName,
          id: this.$uuid.v4()
        },
        guest: [],
        isHire: true,
        thema: [],
        isStart: false,
        isCounting: false,
        vote: null
      }
      const roomsRef = db.collection('rooms')
      const res = await roomsRef.add(body)
      console.log(res)
      this.$router.push('/rooms/' + res.id)
    }
  }
}
</script>
