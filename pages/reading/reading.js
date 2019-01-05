// pages/reading/reading.js
var postData_ = require('../../data/mock-data.js');
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgRoll: [
      '/img/iqiyi.png',
      '/img/vr.png',
      '/img/wx.png'
    ],
    autoplay: true,
    dots: true,
    postData: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad() {
      this.setData({
        postData: postData_.readingData
      });
    },
    // 跳转到文章详情页
    gotoReadingDetail(e) {
      let postId = e.currentTarget.dataset.postid;
      console.log(postId);
      wx.navigateTo({
        url: 'reading-detail/reading-detail',
      })
    }
  }
})
