<template>
  <div>
    <v-list light>
      <v-subheader>投票結果</v-subheader>
      <v-list-item v-for="user in users" :key="user.id">
        <v-list-item-icon class="mx-2">
          <span v-show="user.isWolf">&#x1f43a;</span>
          <span v-show="!user.isWolf">&#x1f6e1;</span>
        </v-list-item-icon>
        <v-list-item-content>
          <span :class="{ 'red--text': user.isWolf }">{{ user.name }}</span>
        </v-list-item-content>
        <v-list-item-action>
          <span>票数 {{ getVoteResult(user.id) }} </span>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    users: {
      type: Array,
      default: () => {
        return [
          {
            id: 'a-1',
            name: 'ユーザー1',
            isReady: false,
            isWolf: false
          },
          {
            id: 'a-2',
            name: 'ユーザー2',
            isReady: true,
            isWolf: true
          },
          {
            id: 'a-3',
            name: 'ユーザー3',
            isReady: false,
            isWolf: false
          }
        ]
      }
    }
  },
  data() {
    return {
      wolfClass: {}
    }
  },
  computed: {
    ...mapGetters({
      getVoteResult: 'getVoteResult'
    })
  }
}
</script>
