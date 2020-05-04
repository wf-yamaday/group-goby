<template>
  <div class="black--text">
    <h2>{{ name }}</h2>
    <p id="link" class="red--text font-weight-light">{{ sharedLink }}</p>
    <v-btn color="info" icon @click="copyLink">
      <v-icon dark>mdi-content-copy</v-icon>
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
