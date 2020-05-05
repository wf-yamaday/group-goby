<template>
  <v-card light>
    <v-list light>
      <v-subheader>参加者リスト</v-subheader>
      <p class="caption px-3">
        Wolfだと思う人を選択して投票ボタンを押してください．
      </p>
      <v-list-item-group v-model="select">
        <v-list-item v-for="user in users" :key="user.id">
          <v-list-item-content>{{ user.name }}</v-list-item-content>
        </v-list-item>
      </v-list-item-group>
      <div class="ma-2">
        <v-btn
          color="info"
          :loading="isLoading"
          :disabled="submitDisabled"
          block
          @click="doSubmit"
        >
          投票
        </v-btn>
        <p v-show="isLoading" class="overline text-center mt-2">
          参加者全員が投票を終えたら，結果を表示します．
        </p>
      </div>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default: () => {
        return [
          {
            id: 'a-1',
            name: 'ユーザー1',
            isReady: false
          },
          {
            id: 'a-2',
            name: 'ユーザー2',
            isReady: true
          },
          {
            id: 'a-3',
            name: 'ユーザー3',
            isReady: false
          }
        ]
      }
    }
  },
  data() {
    return {
      select: -1,
      isLoading: false
    }
  },
  computed: {
    submitDisabled() {
      return this.select === -1
    }
  },
  methods: {
    doSubmit() {
      this.isLoading = true
      this.$emit('doSubmit', this.users[this.select].id)
    }
  }
}
</script>
