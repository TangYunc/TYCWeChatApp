var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    containerShow: true,
    searchPanelShow: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inTheatersUrl = app.globalData.doubanBase + 'v2/movie/in_theaters' + '?start=0&count=3'
    var comingSoonUrl = app.globalData.doubanBase + 'v2.movie/coming_soon' + '?start=0&count=3'
    var top250Url = app.globalData.doubanBase + 'v2/movie/top250' + '?start=0&count=3'
    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },

  onMoreTap: function(event) {
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: "more-movie/more-movie?category=" + category
    })
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
        that.processDoubanData(res.data, settedKey, categoryTitle)
      }
    })
  },
  onCancelImgTap: function(event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {}
    })
  },
  onBindFocus: function(event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },

  processDoubanData: function(moviesDouban, settedKey, categoryTitle) {
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
    var readyData = {}
    readyData[settedKey] = {
      movies: movies,
      categoryTitle: categoryTitle
    }
    this.setData(readyData)
  },
})