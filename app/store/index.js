import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '~/plugins/firebase.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      rooms: [],
      room: null,
      isOwner: false,
      userId: ''
    },
    mutations: {
      ...vuexfireMutations,
      setUserId(state, userId) {
        state.userId = userId
      },
      setIsOwner(state) {
        state.isOwner = true
      }
    },
    actions: {
      setRoomsRef: firestoreAction(({ bindFirestoreRef }, ref) => {
        bindFirestoreRef('rooms', ref)
      }),
      // roomIdからfirestoreのドキュメントを取得する関数
      // todo: isStartがfalseのroomのみ取得できる
      // todo: エラーハンドリング
      setRoomRef: firestoreAction(async ({ bindFirestoreRef }, roomId) => {
        await bindFirestoreRef('room', db.collection('rooms').doc(roomId))
      }),
      // todo: エラーハンドリング
      async postRoom({ commit }, payload) {
        const res = await db.collection('rooms').add(payload)
        commit('setIsOwner')
        return res.id
      },
      // todo: トランザクション
      // isStartがfalseの時だけ呼び出せ
      joinRoomAction({ commit, state }, payload) {
        const update = state.room.guest
        update.push(payload.formData)
        db.collection('rooms')
          .doc(payload.id)
          .update({ guest: update })
        commit('setUserId', payload.formData.id)
      },
      // todo: トランザクション
      // 要リファクタリング(userIdのstateが散っている)
      readyAction({ _commit, state }, userId) {
        const guest = state.room.guest
        const update = guest.map((user) => {
          if (user.id !== userId) {
            return user
          } else {
            return {
              ...user,
              isReady: true
            }
          }
        })
        db.collection('rooms')
          .doc(state.room.id)
          .update({ guest: update })
      }
    },
    getters: {
      getRooms: (state) => {
        return state.rooms
      },
      getRoom: (state) => {
        return state.room
      },
      // state.roomのowner, guestを配列化して取り出すgetter関数
      getUsers: (state) => {
        const users = [state.room.owner]
        return users.concat(state.room.guest)
      },
      isStart: (state) => {
        return state.room.isStart
      },
      // userIdから自分の状態を取得
      getUser: (state) => {
        if (state.isOwner) {
          return state.room.owner
        }
        const user = state.room.guest.find((user) => user.id === state.userId)
        if (user === undefined) {
          return { isReady: false }
        } else {
          return user
        }
      }
    }
  })
}
export default createStore
