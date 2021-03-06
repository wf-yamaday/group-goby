<template>
  <div>
    <room-name-and-link :name="room.name" :link="room.id" />

    <!-- ゲーム開始前の画面 -->
    <div v-if="!isStart">
      <member-list :users="users" />
      <v-card v-if="isOwner" class="my-2" light>
        <v-card-text>
          <select-category :categories="categories" @doSubmit="getSelected" />
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
      <div v-if="!isOwner && isFirst" persistent>
        <guest-join-form :room-name="room.name" @click="joinRoom" />
      </div>
    </div>

    <!-- ゲーム開始後の画面 -->
    <div v-else>
      <thema-confirmation
        v-if="!allUserChecked"
        :thema="user.thema"
        @click="themaChecked"
      />
      <!-- 参加者全員の準備完了後 -->
      <div v-if="allUserChecked">
        <timer v-if="!isVoting && !allUserVoted" @endTimer="endTimer" />
        <vote-wolf-form
          v-if="isVoting && !allUserVoted"
          :users="users"
          @doSubmit="voteWolf"
        />
        <vote-result v-if="allUserVoted" :users="users" />
        <v-card
          v-if="allUserVoted"
          class="my-2"
          color="grey lighten-5"
          flat
          light
        >
          <div v-if="isOwner" persistent>
            <p>
              <v-btn color="info" block @click="restartGame"
                >ゲームを続ける</v-btn
              >
            </p>
            <p>
              <v-btn color="error" outlined block @click="finishGame"
                >ゲームを終了する</v-btn
              >
            </p>
          </div>
          <div v-else>
            <p class="overline text-center mt-2">
              主催者が操作するまでお待ちください．
            </p>
          </div>
        </v-card>
      </div>
    </div>

    <!-- ゲームが終了(ルームを退出)するとき-->
    <div v-if="isFinished">
      <finish-room-dialog />
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
import FinishRoomDialog from '~/components/FinishRoomDialog'

export default {
  middleware: 'vuex-cookie',
  components: {
    RoomNameAndLink,
    MemberList,
    GuestJoinForm,
    ThemaConfirmation,
    Timer,
    VoteWolfForm,
    VoteResult,
    SelectCategory,
    FinishRoomDialog
  },
  async fetch({ store, route }) {
    const room = store.dispatch('setRoomRef', route.params.id)
    const categories = store.dispatch('setCategoriesRef')
    await Promise.all([room, categories])
  },
  data() {
    return {
      isVoteFormShow: false,
      selectedCategory: {
        id: '3ofwWE3XvWvlmY52BplE',
        label: 'IT'
      }
    }
  },
  computed: {
    ...mapGetters({
      room: 'getRoom',
      users: 'getUsers',
      user: 'getUser',
      isStart: 'isStart',
      isVoting: 'isVoting',
      categories: 'getCategories'
    }),
    ...mapState(['isOwner', 'userId']),
    isFirst() {
      return this.userId === ''
    },
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
    },
    isFinished() {
      return this.room.isFinish
    }
  },
  methods: {
    async joinRoom(guestName) {
      const payload = {
        id: this.$route.params.id,
        formData: {
          name: guestName,
          id: this.$uuid.v4(),
          isReady: false
        }
      }
      await this.joinRoomAction(payload)
    },
    ready() {
      this.readyAction()
    },
    startGame() {
      if (this.canStart) {
        this.startGameAction(this.selectedCategory)
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
      if (this.isOwner) {
        this.isVotingToTrueAction()
      }
    },
    voteWolf(selectUserId) {
      this.voteWolfAction(selectUserId)
    },
    getSelected(category) {
      this.selectedCategory = category
    },
    restartGame() {
      this.restartRoom()
    },
    finishGame() {
      this.finishRoom()
      this.$router.push('/')
    },
    ...mapActions([
      'joinRoomAction',
      'readyAction',
      'startGameAction',
      'ownerReadyAction',
      'isVotingToTrueAction',
      'voteWolfAction',
      'finishRoom',
      'restartRoom'
    ])
  }
}
</script>
