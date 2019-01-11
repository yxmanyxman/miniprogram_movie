// pages/movies/movies.js
const app = getApp();
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
    const inTheatersUrl = app.globalData.movieApi + "Showtime/LocationMovies.api?locationId=366";
    const comingSoonUrl = app.globalData.movieApi + "Movie/MovieComingNew.api?locationId=366";
    const sellingUrl = app.globalData.movieApi + "PageSubArea/HotPlayMovies.api?locationId=366";
    this.getMovieIndexData(inTheatersUrl, 'intheater');
    this.getMovieIndexData(comingSoonUrl, 'comingsoon');
    this.getMovieIndexData(sellingUrl, 'selling');
  },

  getMovieIndexData: function(url, type) {
    const that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.handleMoviesData(res.data, type);
      },
      fail(err) {
        console.log(err);
      }
    })
  },

  handleMoviesData: function(data, type) {
    let resData = [];
    if (type === 'intheater') {
      resData = data.ms;
    } else if (type === 'comingsoon') {
      resData = data.moviecomings;
    } else {
      resData = data.movies;
    }
    resData.length = 3;

    // 组织首页所需数据
    let movies = [];
    let movie = {
      title : '',
      coverimg : '',
      movieid : '',
      average : ''
    };

    for (var idx in resData) {
      const subject = resData[idx];
      if (type === 'intheater') {
        movie = {
          title: subject.tCn,
          coverimg: subject.img,
          movieid: subject.id,
          average: subject.r >0 ? subject.r : 0
        }
      } else if (type === 'comingsoon') {
        movie = {
          title: subject.title,
          coverimg: subject.image,
          movieid: subject.id,
          average: subject.r ? subject.r : 0
        }
      } else {
        movie = {
          title: subject.titleCn,
          coverimg: subject.img,
          movieid: subject.movieId,
          average: subject.ratingFinal > 0 ? subject.ratingFinal :0
        }
      }
      if (movie.title.length >= 6) {
        let title = movie.title.substring(0, 6) + '...';
        movie.title = title;
      }
      movies.push(movie);
    }
    var readyData = {};
    readyData[type] = {
      movies: movies,
      type: type === 'intheater' ? '正在热映' : type ==='comingsoon'? '即将上映':'正在售票'
    };
    this.setData(readyData);
    // console.log('全局：',this.data);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})