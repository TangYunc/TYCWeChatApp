var app = getApp()
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inTheatersUrl = app.globalData.doubanBase + 'v2/movie/in_theaters'
    var comingSoonUrl = app.globalData.doubanBase + 'v2.movie/coming_soon'
    var top250Url = app.globalData.doubanBase + 'v2/movie/top250'
    this.getMovieListData(inTheatersUrl)
    // this.getMovieListData(comingSoonUrl)
    // this.getMovieListData(top250Url)
  },

  getMovieListData: function(url) {
    var that = this
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data)
        that.processDoubanData(res.data)
      }
    })
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
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    this.setData({
      movies: movies
    })
  },
})