<template>
  <div>
    <h2>カテゴリの選択</h2>
    <form>
      <v-select
        v-model="selectedPlan"
        item-text="label"
        item-value="value"
        :items="categories"
        label="カテゴリ選択"
        solo
        return-object
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
