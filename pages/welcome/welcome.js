Page({
  onContainerTap: function(event) {
    console.log('onContainerTap')
  },
  onSubTap: function (event) {
    console.log('onSubTap')
  },

  onUnload:function(){
    console.log('welcome page is onUnload')
  },

  onHide:function(){
    console.log('welcome page is onHide')
  }
})