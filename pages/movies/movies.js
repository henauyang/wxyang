// pages/movies/movies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../imgs/banner4.jpg',
      '../../imgs/banner5.jpg',
      '../../imgs/banner6.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    movies:[],
    hidden:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMovie();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  processSubject(subject) {
        var title = subject.title;
        var directors = subject.directors;
        var directorStr = "";
        for (var index in directors) {
          directorStr = directorStr + directors[index].name + " / ";
        }
        if (directorStr != "") {
          directorStr = directorStr.substring(0, directorStr.length - 2);
        }
        var casts = subject.casts;
        var castStr = "";
        for (var index in casts) {
          castStr = castStr + casts[index].name + " / ";
        }
        if (castStr != "") {
          castStr = castStr.substring(0, castStr.length - 2);
        }
        var genres = subject.genres;
        var genresStr = "";
        for (var index in genres) {
          genresStr = genresStr + genres[index] + " / ";
        }
        if (genresStr != "") {
          genresStr = genresStr.substring(0, genresStr.length - 2);
        }
        var year = subject.year;
        var text = "名称: " + title + "\n导演: " + directorStr + "\n主演：" + castStr + "\n类型: " + genresStr + "\n 上映年份:" + year + "(中国大陆)";
        subject.text = text;
  },
  processSubjects(subjects){
      for(var i=0;i<=subjects.length;i++){
        var subject = subjects[i];
        this.processSubject(subject);
      }
  },
  detail: function (e) {
    getApp().detail(e);
  },
  loadMovie:function(){
    var page = this;
      wx.request({
        url: 'https://douban.uieee.com/v2/movie/in_theaters',
        header: {
          'Content-Type': 'application/xml'
        },
        success:function(res){
          var subjects = res.data.subjects;
          page.processSubjects(subjects);
          page.setData({movies:subjects,hidden:true});
        }
      })
  }
})