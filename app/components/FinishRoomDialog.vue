<template>
  <v-dialog v-model="isShow" persistent>
    <v-card light>
      <v-card-title class="balck--text">
        主催者がRoomを閉じました．
      </v-card-title>
      <div class="pa-2">
        <v-btn color="info" outlined block to="/">トップページに戻る</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      isShow: true
    }
  }
}
</script>
