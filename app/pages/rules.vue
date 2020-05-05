<template>
  <v-card light>
    <div class="text-center">
      <p class="headline text-center ma-0 pa-0 pt-2">Word Wolfのルール</p>
      <img width="150" height="180" src="/wolfman.png" />
      <p class="subtitile-1 ma-0 px-4 mb-0">
        &#8220;お題が異なる一人を見つけましょう.&#8221;
      </p>
    </div>
    <div class="text-left pa-2">
      <p class="title px-4 my-2">&#x1f43a;. 与えられるお題について</p>
      <p class="px-4">
        参加者全員にお題が与えられます．<span class="font-weight-bold"
          >ただし参加者の中で一人だけ与えられているお題が異なります．</span
        ><br />異なるお題が与えられている参加者が<span class="font-weight-bold"
          >Wolf</span
        >となります．その他の参加者は<span class="font-weight-bold">市民</span
        >となります．お題が与えられた段階では自分がどちらかはわかりません．
      </p>

      <p class="title px-4 my-2">&#x1f43a;. 会話をしましょう</p>
      <p class="px-4">
        制限時間内で与えられたお題について会話をしましょう． Wolfと市民に<span
          class="font-weight-bold"
          >お題には何らかの共通性</span
        >があります．<br />
        会話を通して<span class="font-weight-bold"
          >「自分がWolfかもしれない&#x1f625;」，「あの人がWolfかな&#x1f914;」</span
        >と考えてみましょう．
      </p>

      <p class="title px-4 my-2">&#x1f43a;. Wolfの投票</p>
      <p class="px-4">
        会話が終了したら参加者はWolfだと思う参加者についての投票を行います．
      </p>
      <p class="subtitle-1 font-weight-medium px-4 mb-2">
        &#x2694; Wolfの勝利条件
      </p>
      <p class="px-4">
        投票の結果で<span class="font-weight-bold"
          >市民の誰かが最多票を獲得した場合</span
        >にWolfの勝利となります．
      </p>
      <p class="subtitle-1 font-weight-medium px-4 mb-2">
        &#x1f6e1;市民の勝利条件
      </p>
      <p class="px-4">
        投票の結果で<span class="font-weight-bold"
          >Wolfの人が最多票を獲得した場合</span
        >に市民の勝利となります．
      </p>

      <p class="title px-4 my-2">&#x1f43a;. 実際にやってみましょう！</p>
      <p class="px-4">
        トップページから主催者としてRoomを作成しましょう．Room作成後に共有リンクから友達をRoomに招待して一緒に遊ぶことができます．
      </p>
      <v-btn color="info" outlined block @click="click"
        >トップページに戻る</v-btn
      >
    </div>
  </v-card>
</template>

<script>
export default {
  methods: {
    click() {
      this.$router.push('/')
    }
  }
}
</script>
