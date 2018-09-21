var postsData = require('../../../data/post-data.js')
Page({

  onLoad: function(option) {
    var postId = option.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    // 如果在onLoad方法中，不是移不动去执行一个数据绑定
    // 则不需要使用this.setData方法
    // 只需要对this.data复制即可是实现数据绑定
    this.setData({
      postData: postData
    })
    // this.data.postData = postData;

    var postsCollected = wx.getStorageSync('posts_Collected')
    if (postsCollected){
      var postcollected = postsCollected[postId]
      this.setData({
        collected: postcollected
      })
    }else {
      var postsCollected = {};
      postsCollected[postId] = false
      wx.setStorageSync('posts_Collected', postsCollected)
    }
    

  },
  onCollectionTap: function (event) {
    var postsCollected = wx.getStorageSync('posts_Collected')
    var postCollected = postsCollected[this.data.currentPostId]
    // 收藏变成为收藏，未收藏变成收藏
    postCollected = !postCollected
    postsCollected[this.data.currentPostId] = postCollected
    // 更新文章是否的缓存值
    wx.setStorageSync('posts_Collected', postsCollected)
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消收藏',
      icon: 'success',
      duration: 1000,
      mask: true,
    })
  },

  onShareTap:function(event) {
    
  }

})