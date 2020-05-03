<template>
  <v-list light>
    <v-subheader>参加者リスト</v-subheader>
    <v-list-item-group v-model="select">
      <v-list-item v-for="user in users" :key="user.id">
        <v-list-item-content>{{ user.name }}</v-list-item-content>
      </v-list-item>
    </v-list-item-group>
    <div class="ma-2">
      <v-btn
        color="primary"
        :loading="isLoading"
        :disabled="submitDisabled"
        block
        @click="doSubmit"
      >
        投票
      </v-btn>
    </div>
  </v-list>
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
      this.isLoading = false
      this.$emit('doSubmit', this.users[this.select].id)
    }
  }
}
</script>
