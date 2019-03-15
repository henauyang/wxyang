
Page({
  data:{
    // text:"这是一个页面"
    inputVal:"",
    movies:[],
    hidden:true,
    modalHidden:true
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
processSubject(subject){
    var title = subject.title;
    var directors = subject.directors;
    var directorStr = "";
    for(var index in directors){
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

processSubjects(subjects) {
  for (var i = 0; i < subjects.length; i++) {
    var subject = subjects[i];
    this.processSubject(subject);
  }
},
  bindKeyInput:function(e){
    this.setData({inputVal:e.detail.value});
  },
  search:function(){
      if(this.data.inputVal==""){
        this.setData({modalHidden:false})
        return;
     }
      this.setData({hidden:false});
      var page =this;
      wx.request({
        url: 'https://douban.uieee.com/v2/movie/search?q='+page.data.inputVal,
        header: {
            'Content-Type': 'application/xml'
        },
        success: function(res) {
          var subjects= res.data.subjects;
          page.processSubjects(subjects);
          page.setData({movies:subjects,hidden:true}); 
        }
    })
  },
  hideModal:function(){
    this.setData({modalHidden:true})
  },
  detail:function(e){
    getApp().detail(e);
  },
})