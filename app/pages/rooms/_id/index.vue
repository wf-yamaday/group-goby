<template>
  <div>
    <room-name-and-link :name="room.name" :link="room.id" />

    <!-- ゲーム開始前の画面 -->
    <div v-if="!isStart">
      <member-list :users="users" />
      <v-card v-if="isOwner" class="my-2" light>
        <v-card-text>
          <select-category :categories="categories" />
          <v-btn color="info" :disabled="!canStart" block @click="startGame"
            >ゲームを開始</v-btn
          >
        </v-card-text>
      </v-card>
      <v-card v-else class="my-2" color="grey lighten-5" flat light>
        <v-btn color="info" block :disabled="user.isReady" @click="ready"
          >準備完了</v-btn
        >
        <p v-show="user.isReady" class="overline text-center mt-2">
          参加者全員の準備が完了し，主催者がゲームを開始するまでお待ちください．
        </p>
      </v-card>
      <v-dialog v-if="!isOwner" v-model="isFirst" persistent>
        <guest-join-form :room-name="room.name" @click="joinRoom" />
      </v-dialog>
    </div>

    <!-- ゲーム開始後の画面 -->
    <div v-else>
      <thema-confirmation
        v-if="!allUserChecked"
        :thema="user.thema"
        @click="themaChecked"
      />
      <div v-if="allUserChecked">
        <timer v-if="!isVoteFormShow && !allUserVoted" @endTimer="endTimer" />
        <vote-wolf-form
          v-show="isVoteFormShow && !allUserVoted"
          :users="users"
          @doSubmit="voteWolf"
        />
        <vote-result v-if="allUserVoted" :users="users" />
      </div>
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
import VoteWolfForm from '~/components/VoteWolfForm'
import VoteResult from '~/components/VoteResult'
import SelectCategory from '~/components/SelectCategory'

export default {
  components: {
    RoomNameAndLink,
    MemberList,
    GuestJoinForm,
    ThemaConfirmation,
    Timer,
    VoteWolfForm,
    VoteResult,
    SelectCategory
  },
  async fetch({ store, route }) {
    await store.dispatch('setRoomRef', route.params.id)
    await store.dispatch('admin/setCategoriesRef')
  },
  data() {
    return {
      isFirst: true,
      isThemaShow: false,
      isVoteFormShow: false
    }
  },
  computed: {
    ...mapGetters({
      room: 'getRoom',
      users: 'getUsers',
      user: 'getUser',
      isStart: 'isStart',
      categories: 'admin/getCategories'
    }),
    ...mapState(['isOwner', 'userId']),
    canStart() {
      if (this.users.length < 3) {
        // 参加者が足りなければ始められない
        return false
      } else {
        // 一人でもisReadyがfalseなら始められない
        return !this.users.some((user) => user.isReady === false)
      }
    },
    allUserChecked() {
      return !this.users.some((user) => user.isReady === false)
    },
    allUserVoted() {
      return this.users.length === this.room.vote.length
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
    startGame(categiryId) {
      if (this.canStart) {
        this.startGameAction(categiryId)
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
    endTimer() {
      this.isVoteFormShow = true
    },
    voteWolf(selectUserId) {
      this.voteWolfAction(selectUserId)
    },
    ...mapActions([
      'joinRoomAction',
      'readyAction',
      'startGameAction',
      'ownerReadyAction',
      'voteWolfAction'
    ])
  }
}
</script>
