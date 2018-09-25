var postsData = require('../../../data/post-data.js')
var app = getApp()
Page({
  data: {
    isPlayingMusic: false,
  },
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
    if (postsCollected) {
      var postcollected = postsCollected[postId]
      this.setData({
        collected: postcollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false
      wx.setStorageSync('posts_Collected', postsCollected)
    }
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic : true
      })
    }
    this.setMusicMonitor()
  },

  setMusicMonitor: function() {
    var that = this
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.onPause(() => {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicPostId = null
    }),
    backgroundAudioManager.onPlay(() => {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true
      app.globalData.g_currentMusicPostId = that.data.currentPostId
    })
  },

  onCollectionTap: function(event) {
    this.getPostsCollectedSync();
    // this.getPostsCollectedAsy()
  },

  getPostsCollectedAsy: function() {
    var that = this
    wx.getStorage({
      key: 'posts_Collected',
      success: function(res) {
        var postsCollected = res.data
        var postCollected = postsCollected[that.data.currentPostId]
        // 收藏变成为收藏，未收藏变成收藏
        postCollected = !postCollected
        postsCollected[that.data.currentPostId] = postCollected
        // 更新文章是否的缓存值
        wx.setStorageSync('posts_Collected', postsCollected)
        // 更新数据绑定变量，从而实现切换图片
        that.setData({
          collected: postCollected
        })

        // this.showModal(postCollected, postsCollected)

        that.showToast(postCollected, postsCollected)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  getPostsCollectedSync: function() {
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

    // this.showModal(postCollected, postsCollected)

    this.showToast(postCollected, postsCollected)
  },



  showToast: function(postCollected, postsCollected) {
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

  showModal: function(postCollected, postsCollected) {
    //在success，fail，complete等函数中，this的指向对象改变了，所以需要在前面用一个变量来保存一下
    //this是指代上下文环境
    var that = this
    wx.showModal({
      title: '收藏',
      content: postCollected ? '收藏该文章？' : '取消收藏该文章？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: '#405f80',
      success: function(res) {
        if (res.confirm) {
          wx.setStorageSync('posts_Collected', postsCollected)
          // 更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },

  onShareTap: function(event) {
    var itemList = ['分享给好友', '分享到朋友圈', '分享到微博', '分享得QQ']
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f00',
      success: function(res) {
        //res.tapIndex 数组元素的序号，从0开始
        // res.cancel 用户点击了取消按钮
        console.log('用户' + itemList[res.tapIndex])
        console
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '用户是否取消？' + res.cancel + '现在无法实现分享',
          showCancel: true,
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      }
    })
  },

  onMusicTap: function(event) {
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    var currentPostId = this.data.currentPostId
    var postData = postsData.postList[currentPostId]
    var isPlayingMusic = this.data.isPlayingMusic
    if (isPlayingMusic) {
      backgroundAudioManager.pause
      this.setData({
        isPlayingMusic: false
      })
    } else {
      backgroundAudioManager.play
      backgroundAudioManager.title = postData.music.title
      backgroundAudioManager.coverImgUrl = postData.music.coverImgUrl
      // 设置了 src 之后会自动播放
      backgroundAudioManager.src = postData.music.url
      this.setData({
        isPlayingMusic: true
      })
    }



  }



})