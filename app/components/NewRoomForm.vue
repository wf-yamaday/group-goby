<template>
  <v-card width="360" light>
    <v-card-title class="headline">
      Roomを新規作成
    </v-card-title>
    <v-card-text>
      <form>
        <v-text-field
          v-model="newRoomForm.roomName.value"
          :color="color"
          :label="newRoomForm.roomName.label"
          :loading="isLading"
          :disabled="isLading"
          :rules="newRoomForm.roomName.rules"
          :counter="16"
        />
        <v-text-field
          v-model="newRoomForm.ownerName.value"
          :color="color"
          :label="newRoomForm.ownerName.label"
          :loading="isLading"
          :disabled="isLading"
          :rules="newRoomForm.ownerName.rules"
          :counter="16"
        />
        <v-btn
          :color="color"
          :disabled="submitDisabled"
          :loading="isLading"
          @click="doSubmit"
        >
          作成
        </v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      isLading: false,
      color: 'info',
      newRoomForm: {
        roomName: {
          value: '',
          label: 'ルーム名',
          rules: [
            (value) => !!value || '必須です．',
            (value) =>
              (value && value.length <= 16) ||
              `${this.newRoomForm.roomName.label}は最長16文字です．`
          ]
        },
        ownerName: {
          value: '',
          label: '主催者名',
          rules: [
            (value) => !!value || '必須です．',
            (value) =>
              (value && value.length <= 16) ||
              `${this.newRoomForm.ownerName.label}は最長16文字です．`
          ]
        }
      }
    }
  },
  computed: {
    submitDisabled() {
      const flag =
        this.newRoomForm.roomName.value === '' ||
        this.newRoomForm.ownerName.value === ''
      return flag
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
      this.$emit('doSubmit', formData)
    }
  }
}
</script>
