<template>
  <div>
    <v-card light class="my-2">
      <div class="text-center">
        <v-card-text>
          <div v-if="isWolfJudged">
            <p class="display-1 py-2">市民の勝利です!!</p>
            <img width="170" height="140" src="/citizen.png" />
          </div>
          <div v-else>
            <p class="display-1 pt-2">Wolfの勝利です!!</p>
            <img width="150" height="180" src="/wolfman.png" />
          </div>
        </v-card-text>
      </div>
    </v-card>
    <v-card>
      <v-list light>
        <v-subheader>投票結果</v-subheader>
        <v-list-item v-for="user in users" :key="user.id">
          <v-list-item-content>
            <v-list-group>
              <template v-slot:activator>
                <v-list-item-icon class="mx-2">
                  <span v-show="user.isWolf">&#x1f43a;</span>
                  <span v-show="!user.isWolf">&#x1f6e1;</span>
                </v-list-item-icon>
                <v-list-item-title :class="{ 'red--text': user.isWolf }">
                  {{ user.name }}
                </v-list-item-title>
                <v-spacer></v-spacer>
              </template>
              <v-list-item>
                <span class="pl-10">{{ user.thema }}</span>
              </v-list-item>
            </v-list-group>
          </v-list-item-content>

          <v-list-item-action>
            <span>票数 {{ getVoteResult(user.id) }}</span>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
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
      getVoteResult: 'getVoteResult',
      isWolfJudged: 'isWolfJudged'
    })
  }
}
</script>
