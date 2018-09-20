var postsData = require('../../../data/post-data.js')
Page({

  onLoad: function(option) {
    var postId = option.id;
    var postData = postsData.postList[postId];
    // 如果在onLoad方法中，不是移不动去执行一个数据绑定
    // 则不需要使用this.setData方法
    // 只需要对this.data复制即可是实现数据绑定
    this.setData({
      postData: postData
    })
    // this.data.postData = postData;

    wx.setStorageSync('key', {game:'风暴英雄',developer:'暴雪'})
    wx.setStorageSync('key1', { game: 'LOL', developer: '拳头' })
  },
  onCollectionTap: function (event) {
    var game = wx.getStorageSync('key')
    console.log(game)
  },

  onShareTap:function(event) {
    // wx.removeStorageSync('key')
    //缓存的上限最大不能超过10MB
    wx.clearStorageSync()
  }

})