//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '/imgs/banner1.jpg',
      '/imgs/1.gif',
      '/imgs/banner3.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    /**小消息提示**/
    imgUrls2: [
      '公告：小应用大作用小程序正式上线！',
      '公告：天气和搜索电影已经优化可以正常访问了哦!!',
      '公告：有什么建议想要什么功能也可以和我留言哦！！'
    ],
    indicatorDots2: false,
    autoplay2: true,
    interval2: 3000,
    duration2: 1000,
    onLoad: function () {
    }
  }
})
