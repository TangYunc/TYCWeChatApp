Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var post_content = [{
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
        date: "Sep 18 2018",
        title: "比例.林恩的中场故事",
        img: {
          post_img: "/images/post/bl.png",
          author_img: "/images/avatar/2.png"
        },
        img_condition: true,
        a: 1,
        b: 2,
        content: "安慰别人时你说出的话都是真理 你像神一样告诫他要看开点 你一定觉得自己很了不起能看透这么多东西 可当事情发生在你头上你就完全不知道该怎么办了吧 那些真理在此时看来都他妈是狗屁 当时你觉得他小题大做经不起打击 等到同样的痛苦光临你的时候 你才明白到底有多痛 安慰别人的话对自己从来就没用",
        view_num: "12",
        collect_num: "6",
      }
    ]

    this.setData({
      posts_key: post_content
    })
    console.log('onLoad')
  }
})