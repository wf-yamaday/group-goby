<template>
  <v-list light>
    <v-subheader>参加者リスト</v-subheader>
    <v-list-item v-for="user in users" :key="user.id">
      <v-list-item-content>{{ user.name }}</v-list-item-content>
      <v-list-item-action>
        <v-icon v-show="user.isReady">mdi-check-circle</v-icon>
        <span v-show="!user.isReady">waiting ...</span>
      </v-list-item-action>
    </v-list-item>
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
  }
}
</script>
