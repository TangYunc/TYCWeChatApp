// pages/movies/more-movie/more-movie.js
var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {},
    navigateTitle: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var category = options.category
    this.data.navigateTitle = category
    var dataUrl = ""
    switch (category) {
      case '正在热映':
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters"
      break;
      case '即将上映':
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon"
        break;
      case '豆瓣Top250':
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250"
        break;
    }
    util.http(dataUrl, this.callBack)
  },

  processDoubanData: function (moviesDouban){
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx]
      var title = subject.title
      if (this.length >= 6) {
        title = title.substring(0, 6) + '...'
      }
      var temp = {
        starts: util.convertToStarsArray(subject.rating.starts),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    this.setData({
      movies: movies
    });
  },

  getMovieListData: function (url, settedKey, categoryTitle) {
    var that = this
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data)
        that.processDoubanData(res.data, settedKey, categoryTitle)
      }
    })
  },

  onReady: function(options) {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
    })
  }
})