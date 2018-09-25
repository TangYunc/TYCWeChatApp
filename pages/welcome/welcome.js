// Page({
//   onContainerTap: function(event) {
//     // wx.navigateTo({
//     //   url: '../posts/post',
//     // })
//     wx.navigateTo({
//       url: '../posts/post',
//     })
//   }
// })

Page({
  onContainerTap: function (event) {
    // wx.navigateTo({
    //     url:"../posts/post"
    // });

    wx.switchTab({
      url: "../posts/post"
    });

  }
})