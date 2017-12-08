// pages/comment/comment.js
var t = getApp();
Page({
  data: {
  commentValue: "",
  id: "",
  allCommentList:"",
  inputValue: "",
  time:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      id: options.id
    })
    console.log(that.data.id)
  },
  transformContent: function () {
    for (var i = 0; i < this.data.allCommentList.length; i++) {
      this.data.allCommentList[i].time = this.format(this.data.allCommentList[i].time);
    }
    this.setData({
      allCommentList: this.data.allCommentList
    });
    console.log("allCommentList" + this.data.allCommentList);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  inputComment: function (e) {
    this.setData({
      commentValue: e.detail.value
    })
    console.log(this.data.commentValue)
  },
  //给服务器数据
  sendComment: function(){
    var that = this;
    wx.request({
      url: 'https://wei2014.cn/addComment',
      data: {
        content: this.data.commentValue, 
        id: this.data.id,
        name: t.globalData.userName,
        icon: t.globalData.imageInfo
      },
      success: function (res) {
        console.log(res.data)
        console.log("收到评论"+res.data.result)

        console.log("用户名" + t.globalData.userName)
        console.log("头像" + t.globalData.imageInfo)
        if (res.data.result == 'success') {
          wx.showToast({
            title: '评论发表成功'
          });
          wx.request({
            url: 'https://wei2014.cn/getCommentsById',
            //url: 'https://yunhu123.cn/',
            data: { id: that.data.id },
            header: {},
            method: "GET",
            dataType: "json",
            success: function (res) {
              that.setData({
                allCommentList: res.data.commentList,
                inputValue: ""
              })
              console.log(res.data)
              console.log("点击发送评论后从服务器获取数据")
              console.log(that.data.allCommentList)
              that.transformContent()
              console.log("更改时间后")
              console.log(that.data.allCommentList)
            },
            fail: function (res) {
              console.log("从服务器获取数据失败")
            },
            complete: function (res) { }
          })
        }
        else {
          wx.showToast({
            title: "发送失败"
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("show")
    var that = this;
    wx.request({
      url: 'https://wei2014.cn/getCommentsById',
      //url: 'https://yunhu123.cn/',
      data: {id:this.data.id},
      header: {},
      method: "GET",
      dataType: "json",
      success: function (res) {
        that.setData({
          allCommentList: res.data.commentList
        })
        console.log("从服务器上获取的数据")
        console.log(that.data.allCommentList)
        that.transformContent()
        console.log("更改时间")
        console.log(that.data.allCommentList)
        },
        fail: function (res) {
          console.log("从服务器获取数据失败")
        },
      complete: function (res) { }
    })
  },
  add0: function (m) { return m < 10 ? '0' + m : m },
  format: function (shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
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