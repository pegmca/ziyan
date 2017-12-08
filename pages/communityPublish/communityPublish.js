var t = getApp();
Page({
  data: {
    publishContent: '',
    publishTitle: ''
  },
  submitData: function(){
    wx.request({
      url: 'https://wei2014.cn/addMessage',
      data:{
        title: this.data.publishTitle,
        content: this.data.publishContent,
        name: t.globalData.userName,
        icon: t.globalData.imageInfo
      },
      success: function (res) {
        console.log(res.data)
        console.log(res.data.result)

        console.log("用户名" + t.globalData.userName)
        console.log("头像" + t.globalData.imageInfo)
        if(res.data.result == 'success')
        {
          wx.showToast({
            title: "发表成功"
          })
          wx.switchTab({
            url: '../main/main'
          })
        }
        else{
          wx.showToast({
            title: "发送失败"
          })
        }
      }
    })
  },
  bindTextInput: function (e) {
    this.setData({
      publishContent: e.detail.value
    });
  },
  bindTitleInput: function (e){
    this.setData({
      publishTitle: e.detail.value
    })
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