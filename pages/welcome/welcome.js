Page({
  onTap: function() {
    console.log('onTap，在这里出现一个系统的bug，有时候在触发点击事件的时候，会出现，点击一次调用两次onTap函数。解决方案，将小程序完全退出后再次进入就好了')
  }
})