import { getNav, getBanner, getBrand } from '../../api/home'

Page({
  data: {
    navs: [],
    banners: [],
    brands: []
  },
  onLoad() {
    this.getData()
  },
  getData() {
    Promise.all([getNav(), getBanner(), getBrand()]).then(res => {
      const [{ data: navs }, { data: banners }, { data: brands }] = res
      this.setData({
        navs,
        banners,
        brands
      })
    })
  },
  clickSearch(e) {
    console.log(e)
  }
})