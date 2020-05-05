<template>
  <v-layout column justify-center align-center>
    <new-thema-form
      class="ma-2"
      :categories="categories"
      @doSubmit="themaSubmit"
    />
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import NewThemaForm from '~/components/NewThemaForm'

export default {
  components: {
    NewThemaForm
  },
  async fetch({ store, route }) {
    await store.dispatch('admin/setCategoriesRef')
  },
  computed: {
    ...mapGetters({
      categories: 'admin/getCategories'
    })
  },
  methods: {
    async themaSubmit({ data, select }) {
      const payload = {
        id: select.id,
        data: [data.newThema1, data.newThema2]
      }
      await this.$store.dispatch('admin/postThema', payload)
      this.$router.push('/')
    }
  }
}
</script>
