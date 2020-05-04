<template>
  <v-card light :loading="loadingColor" :disabled="isLoading">
    <v-card-title class="justify-center">今回のお題</v-card-title>
    <v-card-text>
      <p class="display-1 text-center">{{ thema }}</p>
      <v-btn v-show="!isLoading" :color="color" outlined block @click="click"
        >確認完了</v-btn
      >
      <p class="overline text-center mt-2">
        参加者全員がお題を確認したらゲームを開始します．
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    thema: {
      type: String,
      default: 'ドラえもん'
    }
  },
  data() {
    return {
      isLoading: false,
      color: 'info'
    }
  },
  computed: {
    loadingColor() {
      if (this.isLoading) {
        return this.color
      } else {
        return false
      }
    }
  },
  methods: {
    click() {
      this.isLoading = true
      this.$emit('click')
    }
  }
}
</script>
