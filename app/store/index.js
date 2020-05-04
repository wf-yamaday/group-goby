import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '~/plugins/firebase.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      rooms: [],
      room: null,
      isOwner: false,
      user: ''
    },
    mutations: {
      ...vuexfireMutations
    },
    actions: {
      setRoomsRef: firestoreAction(({ bindFirestoreRef }, ref) => {
        bindFirestoreRef('rooms', ref)
      }),
      // roomIdからfirestoreのドキュメントを取得する関数
      // todo: エラーハンドリング
      setRoomRef: firestoreAction(async ({ bindFirestoreRef }, roomId) => {
        await bindFirestoreRef('room', db.collection('rooms').doc(roomId))
      }),
      // todo: エラーハンドリング
      async postRoom({ _commit }, payload) {
        const res = await db.collection('rooms').add(payload)
        return res.id
      },
      // todo: エラーハンドリング
      isStartToTrue({ _commit, state }) {
        db.collection('rooms')
          .doc(state.room.id)
          .update({ isStart: true })
      },
      joinRoomAction({ _commit, state }, payload) {
        const update = state.room.guest
        update.push(payload.formData)
        db.collection('rooms')
          .doc(payload.id)
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
      }
    }
  })
}
export default createStore
