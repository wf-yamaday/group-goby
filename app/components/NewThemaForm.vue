<template>
  <v-card width="360" light>
    <v-card-title class="--text">Themaを新規作成</v-card-title>
    <v-card-text>
      <form>
        <v-text-field
          v-model="newThema.newThema1.value"
          :color="color"
          :label="newThema.newThema1.label"
          :loading="isLading"
          :disabled="isLading"
        />
        <v-text-field
          v-model="newThema.newThema2.value"
          :color="color"
          :label="newThema.newThema2.label"
          :loading="isLading"
          :disabled="isLading"
        />
        <v-select
          v-model="selectedPlan"
          item-text="label"
          item-value="value"
          :items="categories"
          label="カテゴリ選択"
          solo
          return-object
        />
        <v-btn
          :color="color"
          :disabled="submitDisabled"
          :loading="isLading"
          @click="doSubmit"
          >作成</v-btn
        >
      </form>
    </v-card-text>
  </v-card>
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
      newThema: {
        newThema1: {
          value: '',
          label: 'テーマ1'
        },
        newThema2: {
          value: '',
          label: 'テーマ2'
        }
      },
      selectedPlan: {
        id: '3ofwWE3XvWvlmY52BplE',
        label: 'IT'
      }
    }
  },
  computed: {
    submitDisabled() {
      const flag =
        this.newThema.newThema1.value === '' ||
        this.newThema.newThema2.value === ''
      return flag
    }
  },
  methods: {
    doSubmit() {
      this.isLading = true
      const formData = {
        newThema1: this.newThema.newThema1.value,
        newThema2: this.newThema.newThema2.value
      }
      this.$emit('doSubmit', { data: formData, select: this.selectedPlan })
    }
  }
}
</script>
