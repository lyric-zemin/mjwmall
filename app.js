import { state } from './utils/store'
import { checkLogin } from './utils/auth'

App({
  onLaunch() {
    checkLogin()
  },
  store: state
})