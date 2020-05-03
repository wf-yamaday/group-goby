<template>
  <v-card width="360" light>
    <v-card-text>
      <v-card-title class="headline">
        Roomを新規作成
      </v-card-title>
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
        <v-btn
          color="primary"
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
      this.$emit('submit', formData)
      this.$router.push('/rooms/test')
    }
  }
}
</script>
