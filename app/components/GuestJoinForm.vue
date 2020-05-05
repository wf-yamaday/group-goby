<template>
  <v-card light>
    <v-card-title class="balck--text">
      {{ roomName }}に参加します．
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="formData.value"
        :color="color"
        :label="formData.label"
        :rules="formData.rules"
        :counter="16"
      />
      <v-btn :color="color" :disabled="submitDisabled" @click="handleClick"
        >参加</v-btn
      >
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    roomName: {
      type: String,
      default: 'test'
    }
  },
  data() {
    return {
      color: 'info',
      formData: {
        label: '参加者名',
        value: '',
        rules: [
          (value) => !!value || '必須です．',
          (value) =>
            (value && value.length <= 16) ||
            `${this.formData.label}は最長16文字です．`
        ]
      }
    }
  },
  computed: {
    submitDisabled() {
      return this.formData.value === ''
    }
  },
  methods: {
    handleClick() {
      this.$emit('click', this.formData.value)
    }
  }
}
</script>
