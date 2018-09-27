var app = getApp()
Page({
  data:{
    inTheaters: {},
    comingSoon: {},
    top250:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var inTheatersUrl = app.globalData.doubanBase + 'v2/movie/in_theaters'
    var comingSoonUrl = app.globalData.doubanBase + 'v2.movie/coming_soon'
    var top250Url = app.globalData.doubanBase + 'v2/movie/top250'
    this.getMovieListData(inTheatersUrl,'inTheaters')
    this.getMovieListData(comingSoonUrl,'comingSoon')
    this.getMovieListData(top250Url,'top250')
  },

  getMovieListData: function(url,settedKey) {
    var that = this
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data)
        that.processDoubanData(res.data, settedKey)
      }
    })
  },
  processDoubanData: function (moviesDouban, settedKey) {
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
    var readyData = {}
    readyData[settedKey] = { movies: movies}
    this.setData(readyData)
  },
})