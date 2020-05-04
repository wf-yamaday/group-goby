<template>
  <v-layout column justify-center align-center>
    <h1>Sample Timer</h1>
    <timer class="ma-2" />
  </v-layout>
</template>

<script>
import Timer from '~/components/Timer'

export default {
  components: {
    Timer
  }
}
</script>

<style></style>
