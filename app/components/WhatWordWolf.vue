<template>
  <v-card width="360" light>
    <div class="d-flex flex-no-wrap justify-space-between">
      <div>
        <v-img width="150" height="180" src="/wolfman.png" />
      </div>
      <div>
        <v-card-title class="balck--text">Word Wolfとは？</v-card-title>
        <span>
          「異なるお題」を与えられた人（Wolf）を探し出すゲームです．
          <br />
          最低3人から始めることができます．
        </span>
      </div>
    </div>
    <v-card-actions>
      <v-btn color="info" outlined block @click="click"
        >ルールの詳細はこちら</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>
