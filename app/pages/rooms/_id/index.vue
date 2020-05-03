<template>
  <div>
    <room-name-and-link />
    <member-list />
  </div>
</template>

<script>
import RoomNameAndLink from '~/components/RoomNameAndLink'
import MemberList from '~/components/MemberList'

export default {
  components: {
    RoomNameAndLink,
    MemberList
  },
  fetch({ _store, _route }) {
    // const id = route.params.id
    // todo: idを使ってfirebaseとやりとり
  }
}
</script>
