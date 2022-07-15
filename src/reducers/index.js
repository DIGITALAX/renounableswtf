import user from './user.reducer'
import modals from './modals.reducer'
import global from './global.reducer'
import crypto from './crypto.reducer'
import tokenURIInfo from './token.uri.info.reducer'

export default {
  user: user.reducer,
  modals: modals.reducer,
  global: global.reducer,
  crypto: crypto.reducer,
  tokenURIInfo: tokenURIInfo.reducer
}
