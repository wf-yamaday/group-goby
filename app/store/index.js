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
      // todo: エラーハンドリング / isStart == false
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
      // todo: エラーハンドリング / payload → stateからid取得
      joinRoomAction({ _commit, state }, payload) {
        const update = state.room.guest
        update.push(payload.formData)
        db.collection('rooms')
          .doc(payload.id)
          .update({ guest: update })
      },
      async distributionThema({ _commit, state }) {
        const querySnapshot = await db.collection('themas').get()
        const themasSize = querySnapshot.size // 全テーマの数
        const randomThema = Math.floor(Math.random() * themasSize) // どのテーマを選ぶかの乱数
        const items = [] // dataの配列

        querySnapshot.forEach((Doc) => {
          items.push(Doc.data())
        })

        const thisThema = items[randomThema] // 選んだテーマ
        const wolfThemaNum = Math.floor(Math.random() * 2)
        let citizenThemaNum = 1
        if (wolfThemaNum === 1) {
          citizenThemaNum = citizenThemaNum - 1
        }
        const wolfThema = thisThema.data[wolfThemaNum] // wolfのテーマ
        const citizenThema = thisThema.data[citizenThemaNum] // 市民のテーマ

        const guest = state.room.guest // ゲストのリスト
        const owner = state.room.owner

        const guestLength = guest.length // ゲストの人数
        const wolfNumber = Math.floor(Math.random() * (guestLength + 1)) // wolfの人の番号
        if (wolfNumber === guestLength) {
          // オーナーがwolfの時
          const update = guest.map((user) => {
            return {
              ...user,
              thema: citizenThema,
              isWolf: false
            }
          })
          const ownerUpdate = {
            thema: wolfThema,
            name: owner.name,
            isWolf: true
          }
          console.log(ownerUpdate)
          db.collection('rooms')
            .doc(state.room.id)
            .update({ guest: update, owner: ownerUpdate })
        } else {
          // guestの中にwolfがいる時
          const update = guest.map((user, index) => {
            if (index === wolfNumber) {
              return {
                ...user,
                thema: wolfThema,
                isWolf: true
              }
            } else {
              return {
                ...user,
                thema: citizenThema,
                isWolf: false
              }
            }
          })
          const ownerUpdate = {
            thema: citizenThema,
            name: owner.name,
            isWolf: false
          }
          db.collection('rooms')
            .doc(state.room.id)
            .update({ guest: update, owner: ownerUpdate })
        }
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
