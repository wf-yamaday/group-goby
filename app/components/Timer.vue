<template>
  <v-card width="360" light align="center">
    <v-card-title class="justify-center">タイマー</v-card-title>
    <v-card-text>
      <h1 class="time">{{ minutes }}:{{ seconds }}</h1>
      <v-btn v-if="isRunning === false" @click="startTimer()">◀︎</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      timerId: '',
      timer: 180,
      duration: 180,
      minutes: 3,
      seconds: 0,
      isRunning: false
    }
  },
  created() {
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes
    this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds
  },
  mounted() {
    this.startTimer()
  },
  methods: {
    timerObj(duration) {
      this.timer = duration
      this.duration = duration
      const _this = this
      this.timerId = setInterval(function() {
        _this.minutes = parseInt(_this.timer / 60, 10)
        _this.seconds = parseInt(_this.timer % 60, 10)
        _this.minutes = _this.minutes < 10 ? '0' + _this.minutes : _this.minutes
        _this.seconds = _this.seconds < 10 ? '0' + _this.seconds : _this.seconds
        if (--_this.timer < 0) {
          _this.timer = _this.duration
          _this.resetTimer()
          _this.endTimer()
        }
      }, 1000)
    },
    startTimer() {
      this.isRunning = true
      this.timerObj(this.timer)
    },
    stopTimer() {
      this.isRunning = false
      return window.clearInterval(this.timerId)
    },
    resetTimer() {
      this.isRunning = false
      this.timer = 180 // 3min default
      this.duration = 180
      this.minutes = parseInt(this.timer / 60, 10)
      this.seconds = parseInt(this.timer % 60, 10)
      this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes
      this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds
      return window.clearInterval(this.timerId)
    },
    endTimer() {
      this.$emit('endTimer') // ここでemitしてタイマーが終わったことを検知
    }
  }
}
</script>

<style></style>
