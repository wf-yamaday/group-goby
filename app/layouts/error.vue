<template>
  <v-content class="black--text">
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ errorMesaage }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-content>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: '内部エラーが発生しました'
    }
  },
  computed: {
    errorMesaage() {
      if (this.error.message) {
        return this.error.message
      } else {
        return this.otherError
      }
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
.v-content {
  background: #fafafa;
}
</style>
