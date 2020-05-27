import { getNav } from '../../api/home'

Page({
  data: {
    navs: []
  },
  onLoad() {
    getNav()
  },
  clickSearch(e) {
    console.log(e)
  }
})