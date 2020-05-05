<template>
  <div class="black--text pb-2">
    <p class="headline mt-1 mb-0">
      {{ name }}
    </p>
    <p id="link" class="red--text text--darken-3 font-weight-light mb-1">
      {{ sharedLink }}
    </p>
    <v-btn color="info" small outlined @click="copyLink">
      <v-icon small>mdi-content-copy</v-icon>
      コピー
    </v-btn>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: 'テストルーム'
    },
    link: {
      type: String,
      default: 'http://localhost:3000'
    }
  },
  data() {
    return {
      snackbar: false,
      text: '',
      timeout: 700
    }
  },
  computed: {
    sharedLink() {
      const baseUrl = 'https://gw-2020-hackathon-goby.web.app/rooms/'
      return `${baseUrl}${this.link}`
    }
  },
  methods: {
    copyLink() {
      const text = this.$el.querySelector('#link').textContent
      navigator.clipboard
        .writeText(text)
        .then(() => {
          this.text = '共有リンクをコピーしました'
          this.snackbar = true
        })
        .catch(() => {
          this.text = '共有リンクをコピーできませんでした'
          this.snackbar = true
        })
    }
  }
}
</script>

<style scoped>
#link {
  text-decoration: underline;
}
</style>
