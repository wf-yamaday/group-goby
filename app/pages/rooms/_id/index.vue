<template>
  <div>
    <room-name-and-link :name="room.name" :link="room.id" />

    <!-- ゲーム開始前の画面 -->
    <div v-if="!isStart">
      <member-list :users="users" />
      <v-card v-if="isOwner" class="my-2" light>
        <v-btn color="info" :disabled="!canStart" block @click="startGame"
          >ゲームを開始</v-btn
        >
      </v-card>
      <v-card v-else class="my-2" light>
        <v-btn color="info" block :disabled="user.isReady" @click="ready"
          >準備完了</v-btn
        >
      </v-card>
      <v-dialog v-if="!isOwner" v-model="isFirst" persistent>
        <guest-join-form :room-name="room.name" @click="joinRoom" />
      </v-dialog>
    </div>

    <!-- ゲーム開始後の画面 -->
    <div v-else>
      <thema-confirmation v-if="!allUserChecked" @click="themaChecked" />
      <timer v-if="allUserChecked" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'

import RoomNameAndLink from '~/components/RoomNameAndLink'
import MemberList from '~/components/MemberList'
import GuestJoinForm from '~/components/GuestJoinForm'
import ThemaConfirmation from '~/components/ThemaConfirmation.vue'
import Timer from '~/components/Timer'

export default {
  components: {
    RoomNameAndLink,
    MemberList,
    GuestJoinForm,
    ThemaConfirmation,
    Timer
  },
  async fetch({ store, route }) {
    await store.dispatch('setRoomRef', route.params.id)
  },
  data() {
    return {
      isFirst: true,
      isThemaShow: false
    }
  },
  computed: {
    ...mapGetters({
      room: 'getRoom',
      users: 'getUsers',
      user: 'getUser',
      isStart: 'isStart'
    }),
    ...mapState(['isOwner', 'userId']),
    canStart() {
      if (this.users.length < 2) {
        // 参加者が足りなければ始められない
        return false
      } else {
        // 一人でもisReadyがfalseなら始められない
        return !this.users.some((user) => user.isReady === false)
      }
    },
    allUserChecked() {
      return !this.users.some((user) => user.isReady === false)
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
    ready() {
      this.readyAction()
    },
    startGame() {
      if (this.canStart) {
        this.startGameAction()
        this.isThemaShow = true
      }
    },
    themaChecked() {
      if (this.isOwner) {
        this.ownerReadyAction()
      } else {
        this.readyAction()
      }
    },
    ...mapActions([
      'joinRoomAction',
      'readyAction',
      'startGameAction',
      'ownerReadyAction'
    ])
  }
}
</script>
