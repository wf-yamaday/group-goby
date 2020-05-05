import Cookies from 'universal-cookie'

export default ({ route, store, _redirect, error }) => {
  // 無効なリクエスト
  if (!(route.params && route.params.id && route.params.id.length === 20)) {
    return error(badRequest)
  }

  const cookies = new Cookies()
  const roomId = cookies.get('roomId')
  const user = cookies.get('user')

  // roomIDがない場合
  if (!roomId) {
    return
  }

  // roomIdがパスと一致しない場合
  if (roomId !== route.params.id) {
    cookies.remove('roomId')
    return
  }

  // cookieにuser情報がない場合
  if (!(user && user.id)) {
    return error(badRequest)
  }

  // vuexの状態を更新
  if (user.isOwner) {
    store.commit('setIsOwner')
  }
  store.commit('setUserId', user.id)
}

const badRequest = {
  statusCode: '400',
  message: '無効なリクエストです'
}
