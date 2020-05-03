import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

const createStore = () => {
  return new Vuex.Store({
    state: {
      rooms: []
    },
    mutations: {
      ...vuexfireMutations
    },
    actions: {
      setRoomsRef: firestoreAction(({ bindFirestoreRef }, ref) => {
        bindFirestoreRef('rooms', ref)
      })
    },
    getters: {
      getRooms: (state) => {
        return state.rooms
      }
    }
  })
}

export default createStore
