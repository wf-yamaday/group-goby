<template>
  <div class="black--text">
    <h2>{{ name }}</h2>
    <code id="link">{{ link }}</code>
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
