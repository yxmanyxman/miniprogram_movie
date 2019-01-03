// pages/reading/reading.js
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
    postData: [
      {
        author_avatar: '/img/avatar/1.png',
        post_date: 'Nov 21 2018',
        post_title: '马尔多罗之歌',
        post_image: '/img/post/1.png',
        post_content: '天才、有罪的少年，美与邪恶的混合体，几代大师膜拜的偶像，留给世人的唯一一部奇书中的奇书...',
        comment: 6,
        comment_icon: '/img/icon/chat.png',
        looked: 89,
        looked_icon: '/img/icon/view.png'
      },
      {
        author_avatar: '/img/avatar/2.png',
        post_date: 'Dec 25 2018',
        post_title: '失踪的孩子',
        post_image: '/img/post/2.png',
        post_content: '“我的整个生命，只是一场为了提升社会地位的低俗斗争。”《失踪的孩子》是“那不勒斯四部曲”的第四部，小说聚焦了莉拉和埃莱娜（“我”）的壮年和晚年，为她们持续了五十多年的友谊划上了一个令人心碎的句号。',
        comment: 18,
        comment_icon: '/img/icon/chat.png',
        looked: 135,
        looked_icon: '/img/icon/view.png'
      },
      {
        author_avatar: '/img/avatar/3.png',
        post_date: 'Jan 19 2018',
        post_title: '房思琪的初恋乐园',
        post_image: '/img/post/4.png',
        post_content: '我下楼拿作文给李老师改。他掏出来，我被逼到涂在墙上。老师说了九个字：“不行的话，嘴巴可以吧。”我说了五个字：“不行，我不会。”他就塞进来。那感觉像溺水。可以说话之后，我对老师说：“对不起。”有一种功课做不好的感觉。',
        comment: 18,
        comment_icon: '/img/icon/chat.png',
        looked: 135,
        looked_icon: '/img/icon/view.png'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
