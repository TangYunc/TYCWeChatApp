// pages/movies/more-movie/more-movie.js
var app = getApp()
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {},
    navigateTitle: '',
    requestUrl: '',
    totalCount: 0,
    isEmpty: true
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
    this.data.requestUrl = dataUrl
    util.http(dataUrl, this.callBack)
  },

  onScrollLower: function(event) {
    var nextUrl = this.data.requestUrl +
      "?start=" + this.data.totalCount + "&count=20";
    util.http(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading()
  },

  onPullDownRefresh: function(event) {
    var refreshUrl = this.data.requestUrl +
      "?star=0&count=20";
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },

  processDoubanData: function(moviesDouban) {
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
    var totleMovies = {}
    if (!this.data.isEmpty) {
      totleMovies = this.data.movies.concat(movies)
    } else {
      totleMovies = movies;
      this.data.isEmpty = false
    }
    this.setData({
      movies: movies
    });
    this.data.totalCount += 20
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },

  getMovieListData: function(url, settedKey, categoryTitle) {
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