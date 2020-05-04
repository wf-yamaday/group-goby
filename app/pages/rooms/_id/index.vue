<template>
  <div>
    <room-name-and-link :name="room.name" :link="room.id" />
    <member-list :users="users" />
    <v-card v-if="isOwner" class="my-2" light>
      <v-btn color="info" :disabled="!canStart" block>ゲームを開始</v-btn>
    </v-card>
    <v-card v-else class="my-2" light>
      <v-btn color="info" block>準備完了</v-btn>
    </v-card>
    <v-dialog v-if="!isOwner" v-model="isFirst" persistent>
      <guest-join-form :room-name="room.name" @click="joinRoom" />
    </v-dialog>
    <div class="black--text">
      <!-- {{ room }} -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

import RoomNameAndLink from '~/components/RoomNameAndLink'
import MemberList from '~/components/MemberList'
import GuestJoinForm from '~/components/GuestJoinForm'

export default {
  components: {
    RoomNameAndLink,
    MemberList,
    GuestJoinForm
  },
  async fetch({ store, route }) {
    await store.dispatch('setRoomRef', route.params.id)
  },
  data() {
    return {
      isFirst: true
    }
  },
  computed: {
    ...mapGetters({ room: 'getRoom', users: 'getUsers' }),
    ...mapState(['isOwner']),
    canStart() {
      if (this.users.length < 2) {
        // 参加者が足りなければ始められない
        return false
      } else {
        // 一人でもisReadyがfalseなら始められない
        return !this.users.some((user) => user.isReady === false)
      }
    }
  },
  methods: {
    joinRoom(guestName) {
      const payload = {
        id: this.$route.params.id,
        formData: {
          name: guestName,
          id: this.$uuid.v4(),
          isReady: false
        }
      }
      this.joinRoomAction(payload)
      this.isFirst = false
    },
    ...mapActions(['joinRoomAction'])
  }
}
</script>
