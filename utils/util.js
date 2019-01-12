const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function StarArray(stars) {
  // 5星数据拆分组织成一个长度为5的数组，如4星:[1,1,1,1,0]
  var num = Math.round(stars);
  let array = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}

function http(url, callback, method) {
  wx.request({
    url: url,
    method: method,
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      callback(res.data);
    },
    fail(err) {
      console.log(err);
    }
  })
}

module.exports = {
  formatTime: formatTime,
  starArray: StarArray,
  http: http
}