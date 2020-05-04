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
      async postRoom({ _ }, payload) {
        const roomsRef = db.collection('rooms')
        const res = await roomsRef.add(payload)
        return res.id
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
