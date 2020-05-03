<template>
  <form>
    <v-text-field
      v-model="newRoomForm.roomName.value"
      :label="newRoomForm.roomName.label"
      :loading="isLading"
      :disabled="isLading"
    />
    <v-text-field
      v-model="newRoomForm.ownerName.value"
      :label="newRoomForm.ownerName.label"
      :loading="isLading"
      :disabled="isLading"
    />
    <v-btn color="primary" :disabled="isLading" @click="doSubmit">作成</v-btn>
  </form>
</template>

<script>
export default {
  data() {
    return {
      isLading: false,
      newRoomForm: {
        roomName: {
          value: '',
          label: 'ルーム名'
        },
        ownerName: {
          value: '',
          label: '主催者名'
        }
      }
    }
  },
  methods: {
    doSubmit() {
      this.isLading = true
      const formData = {
        roomName: this.newRoomForm.roomName.value,
        ownerName: this.newRoomForm.ownerName.value
      }
      this.isLading = false
      this.$emit('submit', formData)
    }
  }
}
</script>
