<template>
  <v-card width="360" light>
    <p class="headline text-center ma-0 pa-0 pt-2">Word Wolfとは？</p>
    <div class="text-center">
      <img width="150" height="180" src="/wolfman.png" />
      <p class="subtitile-1 ma-0 pa-0 px-4 mb-2">
        &#8220;お題が異なる一人を見つけましょう.&#8221;
      </p>
      <div class="text-left body grey--text text--darken-3 mx-4">
        <p class="ma-0 pa-0 mb-2">
          Word
          Wolfは「異なるお題」を与えられた人（Wolf）を探し出すゲームです．<br />
          最低3人から始めることができます．
        </p>
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
