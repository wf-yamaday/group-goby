import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '~/plugins/firebase.js'

export const state = () => ({
  rooms: [],
  room: null,
  isOwner: false,
  userId: ''
})

export const mutations = {
  ...vuexfireMutations,
  setUserId(state, userId) {
    state.userId = userId
  },
  setIsOwner(state) {
    state.isOwner = true
  }
}

export const actions = {
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
    commit('setUserId', payload.owner.id)
    return res.id
  },
  setCategoriesRef: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('categories', db.collection('categories'))
  }),
  // todo: エラーハンドリング
  startGameAction({ _commit, dispatch, state }, select) {
    const ownerUpdata = {
      ...state.room.owner,
      isReady: false
    }
    const guestUpdate = state.room.guest.map((user) => {
      return { ...user, isReady: false }
    })
    db.collection('rooms')
      .doc(state.room.id)
      .update({ isStart: true, owner: ownerUpdata, guest: guestUpdate })
    // 各ユーザーにテーマをセット
    console.log(select.id)
    dispatch('distributionThema', select.id)
  },
  // todo: エラーハンドリング / payload → stateからid取得
  // todo: トランザクション
  // isStartがfalseの時だけ呼び出せ
  joinRoomAction({ commit, state }, payload) {
    const update = state.room.guest.concat()
    update.push(payload.formData)
    db.collection('rooms')
      .doc(payload.id)
      .update({ guest: update })
    commit('setUserId', payload.formData.id)
  },
  async distributionThema({ _commit, state }, category) {
    let querySnapshot = await db.collection('themas').get()
    if (category) {
      querySnapshot = await db
        .collection('themas')
        .where('id', '==', category)
        .get()
    }
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
        ...owner,
        thema: wolfThema,
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
        ...owner,
        thema: citizenThema,
        isWolf: false
      }
      db.collection('rooms')
        .doc(state.room.id)
        .update({ guest: update, owner: ownerUpdate })
    }
  },
  // todo: トランザクション
  readyAction({ _commit, state }) {
    const guest = state.room.guest
    const update = guest.map((user) => {
      if (user.id !== state.userId) {
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
  },
  ownerReadyAction({ _commit, state }) {
    const ownerUpdata = {
      ...state.room.owner,
      isReady: true
    }
    db.collection('rooms')
      .doc(state.room.id)
      .update({ owner: ownerUpdata })
  },
  // todo: エラーハンドリング
  deleteRoom({ _commit, state }) {
    db.collection('rooms')
      .doc(state.room.id)
      .delete()
  },
  voteWolfAction({ _commit, state }, selectUserId) {
    const updateVote = [
      ...state.room.vote,
      { key: state.userId, select: selectUserId }
    ]
    console.log(updateVote)
    db.collection('rooms')
      .doc(state.room.id)
      .update({
        vote: updateVote
      })
  }
}

export const getters = {
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
  },
  getCategories: (state) => {
    return state.categories
  },
  isVoted: (state) => {
    if (!state.room.vote) {
      return false
    }
    return state.room.vote.some((item) => item.key === state.userId)
  },
  getVoteResult: (state) => (id) => {
    if (state.room.vote.length === 0) {
      return -1
    }
    return state.room.vote.filter((item) => {
      return item.select === id
    }).length
  },
  // 勝敗判定関数 return true => wolfの負け
  isWolfJudged: (state) => {
    const users = getters.getUsers(state)

    const wolfUser = users.find((user) => user.isWolf)

    const getVoteResult = getters.getVoteResult(state)
    const voteResult = users.map((user) => {
      return {
        id: user.id,
        voteNum: getVoteResult(user.id)
      }
    })
    const judgeUsers = voteResult.filter(
      (user) =>
        user.voteNum ===
        Math.max.apply(null, [...voteResult.map((user) => user.voteNum)])
    )

    return judgeUsers.some((user) => user.id === wolfUser.id)
  }
}
