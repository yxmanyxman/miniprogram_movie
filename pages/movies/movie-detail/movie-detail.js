const app = getApp();
const utils = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id;
    let url = app.globalData.doubanApi + 'subject/' + id;
    utils.http(url, this.getMovieDetail, 'GET');
  },
  /**
   * 获取电影详情数据
   */
  getMovieDetail: function (data) {
    console.log('详情数据:', data);
    let director = {
      avater: '',
      name: ''
    };
    const dataDirector = data.directors;
    if (dataDirector[0] !== null) {
      if (dataDirector[0].avatars != null) {
        director.avater = dataDirector[0].avatars.large
      }
      director.name = dataDirector[0].name;
    }
    let movie = {
      movieImg: data.images ? data.images.large : '',
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      genres: data.genres.join('、'),
      star: utils.starArray(data.rating.average * 5 / 10),
      score: data.rating.average,
      director: director,
      casts: utils.converToCast(data.casts),
      castInfo: utils.converToCastInfo(data.casts),
      summary: data.summary
    }
    this.setData({
      movie: movie
    });
  },

  viewMovieImg: function(e){
    const src = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],
      current: src
    })
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