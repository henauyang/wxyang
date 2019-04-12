// 历史的今天
const API_URL_L = "https://blogs.jabari.cn/todayOnhistory/queryEvent"
const API_URL_D = "https://blogs.jabari.cn/todayOnhistory/queryDetail"

// 获取列表
function fetchEvents(today) {
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: API_URL_L,
      data: {
        date: today
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: resolve,
      fail: reject
    })
  })
  return promise
}

function getEvents() {
  var tmpDate = new Date()
  var today = tmpDate.getMonth() + 1
  today = today + '/' + tmpDate.getDate()
  return fetchEvents(today)
    .then(function (res) {
      // console.log(res.data.result)
      return res.data.result
    })
    .catch(function (err) {
      console.log(err)
      return []
    })
}

// 获取详细内容
function fetchDetail(e_id) {
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: API_URL_D,
      data: {
        e_id: e_id
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: resolve,
      fail: reject
    })
  })
  return promise
}

function getDetail(e_id) {
  return fetchDetail(e_id)
    .then(function (res) {
      return res.data.result
    })
    .catch(function (err) {
      console.log(err)
      return []
    })
}
// -------------
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  getEvents: getEvents,
  getDetail: getDetail
}
