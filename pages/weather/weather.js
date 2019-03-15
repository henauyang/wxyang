// 获取全局app.js中的内容
const app = getApp();
// 引用工具文件
var util = require('../../utils/util.js');
// 引用百度地图提供的接口JS文件
var bmap = require('../../libs/bmap-wx.min.js');

Page({
  // 数据初始化
  data: {
    loadingStatus: false,
    userLocation: 0, // 0默认没有状态，1获取到用户定位，2用户拒绝提供定位信息，3无法获取正确定位
    cityInfo: {}, //城市信息
    weatherInfo: {}, //天气信息
    weatherInfoExt: {}, //天气扩展信息
    currentTime: '' // 当前时间
  },

  // 更新用户的位置获取的状态
  updateUserLocation: function (v) {
    this.setData({
      loadingStatus: true,// 加载完成，隐藏加载动画
      userLocation: v //更新当前页面的变量值
    });
  },

  // 跳转到授权页面
  gotoAuthPage: function () {
    wx.openSetting({
      fail: function () {
        wx.showModal({
          title: '操作失败',
          content: '请到微信中自行设置授权操作',
          confirmText: '知道了',
          confirmColor: '#345391',
          showCancel: false
        })
      }
    });
  },

  // 刷新当前页面（相当于下拉刷新页面）
  refreshCurrentPage: function () {
    wx.startPullDownRefresh({});
  },

  // 获取地理位置和天气的方法
  getLocationAndWeather: function () {
    var that = this;
    // 使用百度地图提供的ak标记，初始化地图数据
    var BMap = new bmap.BMapWX({
      ak: app.globalData.bmap_ak
    });
    // 失败执行的方法
    var fail = function (data) {
      if (data.errMsg == 'getLocation:fail auth deny') {
        // 更新页面状态为2，用户拒绝提供位置信息
        that.updateUserLocation(2);
      } else {
        // 更新页面状态为3，获取定位信息错误，或者定位不在大陆境内
        that.updateUserLocation(3);
      }
    };
    // 获取城市信息成功执行的方法
    var regeocoding_success = function (data) {
      // 获取地址数据
      var city_info = data.originalData.result;
      // 二次处理数据，将经纬度的数据，保留四舍五入保留五位小数
      city_info.location.lat = city_info.location.lat.toFixed(5);
      city_info.location.lng = city_info.location.lng.toFixed(5);
      // 更新页面状态为1，用户允许授权定位信息
      that.updateUserLocation(1);
      // 将相关数据，写到初始化的data数据中
      that.setData({
        cityInfo: city_info
      });
    };
    // 获取天气成功执行的方法
    var weather_success = function (data) {
      // 获取天气基本数据
      var weatherInfo = data.currentWeather[0];
      // 获取天气扩展信息
      var weatherInfoExt = data.originalData.results[0].weather_data;
      // 将天气预报数据写入定义（初始化）的变量中
      that.setData({
        weatherInfo: weatherInfo,
        weatherInfoExt: weatherInfoExt
      });
      // 天气获取成功之后，再调用其他数据（regeocoding接口有BUG，没有数据依然返回成功状态）
      // 调用接口获取城市地区信息
      BMap.regeocoding({
        fail: fail,
        success: regeocoding_success
      });
    };
    // 调用接口获取天气信息
    BMap.weather({
      fail: fail,
      success: weather_success
    });
  },

  // 加载执行
  onLoad: function () {
    app.checkUserLocation();
    // 获取当前时间，并拆分成日期和时间两部分
    var current_time = util.formatTime(new Date()).split(' ');
    // 将时间部分记录，用于判断早晚
    this.setData({
      currentTime: current_time[1]
    });
    // 调用获取天气和地理位置的方法
    this.getLocationAndWeather();
  },

  // 下拉页面执行页面刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading(); // 显示顶部刷新图标
    this.getLocationAndWeather(); // 调用获取天气和地理位置的方法
    wx.hideNavigationBarLoading(); // 隐藏导航栏加载框
    wx.stopPullDownRefresh(); // 停止下拉动作
  }

})