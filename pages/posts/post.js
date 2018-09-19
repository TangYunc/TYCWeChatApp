Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var post_content = [
      {
        date: "Sep 19 2018",
        title: "正是虾肥蟹壮时",
        img: {
          post_img: "/images/post/crab.png",
          author_img: "/images/avatar/1.png"
        },
        img_condition: true,
        a: 1,
        b: 2,
        content: "对于自己不理解的事情要善于把自己跳出来，用旁观者的眼光去看别人怎么处理怎么经历。然后自己再进行模拟练习。虽然不能像你们所经历的那种生死恋什么的，但是，别人的故事能有所读，最后有所悟就行了",
        view_num: "112",
        collect_num: "96"
      },
      {
        date: "Sep 19 2018",
        title: "正是虾肥蟹壮时",
        img: {
          post_img: "/images/post/crab.png",
          author_img: "/images/avatar/1.png"
        },
        img_condition: true,
        a: 1,
        b: 2,
        content: "对于自己不理解的事情要善于把自己跳出来，用旁观者的眼光去看别人怎么处理怎么经历。然后自己再进行模拟练习。虽然不能像你们所经历的那种生死恋什么的，但是，别人的故事能有所读，最后有所悟就行了",
        view_num: "112",
        collect_num: "96",
      }
    ]
    
    this.setData({posts_key: post_content})
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})