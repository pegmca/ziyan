// pages/login/login.js
var t = getApp();
Page({
  data: {
    imageInfo: "../../image.png",
    userName: "匿名用户",
    isLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    //this.globalData.userName = "hello";
    //var s = that.globalData.userName;

  },

  loginwx: function() {
    var that = this
    if(that.data.isLogin == false)
    {
      wx.getUserInfo({
        success: function (res) {
          var userInfo = res.userInfo
          var nickName = userInfo.nickName  //用户名
          var avatarUrl = userInfo.avatarUrl  //头像
          //var gender = userInfo.gender //性别 0：未知、1：男、2：女
          //var province = userInfo.province
         // var city = userInfo.city
          //var country = userInfo.country
          console.log("获取登录用户的所有信息")
          console.log(res.userInfo)
          // wx.showToast({
          //   title: nickName,
          // });
          that.setData({
            imageInfo: avatarUrl,
            userName: nickName,
            hasUserInfo: true,
            isLogin: true,
          })
          t.globalData.imageInfo = avatarUrl;//全局变量表示登录用户头像
          t.globalData.userName = nickName;//登录用户名
        },
        fail: function (res) {
          wx.showModal({
            title: '提示',
            content: '获取用户信息失败，这将影响您使用小程序，是否重新设置授权？',
            showCancel: true,
            cancelText: "否",
            confirmText: "是",
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({
                  success: function (res) {
                    console.log(res)
                    if (res.authSetting['scope.userInfo'] === true) {
                      wx.getUserInfo({
                        success: function (res) {
                          console.log("重新登录成功")
                          var userInfo = res.userInfo
                          var nickName = userInfo.nickName  //用户名
                          var avatarUrl = userInfo.avatarUrl  //头像
                          console.log("获取登录用户的所有信息")
                          console.log(res.userInfo)
                          that.setData({
                            imageInfo: avatarUrl,
                            userName: nickName,
                            hasUserInfo: true,
                            isLogin: true,
                          })
                          t.globalData.imageInfo = avatarUrl;//全局变量表示登录用户头像
                          t.globalData.userName = nickName;//登录用户名
                        }
                      })  
                  }
                  }
                })
              } else if (res.cancel) {
                console.log('用户取消授权个人信息');
              }
            }
          })
        }
      })
    }
    else if (that.data.isLogin == true)
    {
      wx.showToast({
        title: '无需重新登录',
        duration: 1000, //持续的时间
      })
    }
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