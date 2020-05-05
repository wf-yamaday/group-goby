import Cookies from 'universal-cookie'

export default ({ route, _store, _redirect, error }) => {
  // 無効なリクエスト
  if (!(route.params && route.params.id && route.params.id.length === 20)) {
    return error({
      statusCode: '400',
      message: '無効なリクエストです'
    })
  }

  const cookies = new Cookies()
  const user = cookies.get('user')

  // cookieにuser情報がない場合
  if (!(user && user.id)) {
    console.log('[debug]:user情報ないよ')
    return
  }
  console.log('[debug]:通過')
}
