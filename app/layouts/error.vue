<template>
  <v-content class="black--text">
    <v-card light>
      <div class="text-center">
        <v-icon class="mt-4 mb-2" x-large>mdi-alert</v-icon>
        <p
          v-if="error.statusCode === 404"
          class="headline font-reguler pa-0 ma-0"
        >
          {{ pageNotFound }}
        </p>
        <p v-else class="headline font-reguler pa-0 ma-0">
          {{ errorMesaage }}
        </p>
        <div class="pa-2">
          <v-btn to="/" color="info" outlined block>
            トップページに戻る
          </v-btn>
        </div>
      </div>
    </v-card>
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
