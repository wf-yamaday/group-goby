<template>
  <div>
    <p class="title black--text ma-0 pa-0 py-2">テーマのカテゴリを選択</p>
    <form>
      <v-select
        v-model="selectedPlan"
        item-text="label"
        item-value="value"
        :items="categories"
        label="カテゴリ選択"
        solo
        return-object
        :color="color"
        :menu-props="{ offsetY: true, light: true, color: color }"
        light
        @change="getSelect"
      />
    </form>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => [{ label: 'IT', id: '3ofwWE3XvWvlmY52BplE' }]
    }
  },
  data() {
    return {
      isLading: false,
      color: 'info',
      selectedPlan: {
        id: '3ofwWE3XvWvlmY52BplE',
        label: 'IT'
      }
    }
  },
  methods: {
    getSelect() {
      this.$emit('doSubmit', this.selectedPlan)
    }
  }
}
</script>
