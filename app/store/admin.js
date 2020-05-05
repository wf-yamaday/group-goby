import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '~/plugins/firebase.js'

export const state = () => ({
  categories: []
})

export const mutations = {
  ...vuexfireMutations
}

export const getters = {
  getCategories: (state) => {
    return state.categories
  }
}

export const actions = {
  setCategoriesRef: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('categories', db.collection('categories'))
  }),
  async postThema({ commit }, payload) {
    await db.collection('themas').add(payload)
  }
}
