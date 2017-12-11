// pages/allcontent/allcontent.js
var t = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title:[],
    name:[],
    content:[],
    icon:'',
    time: [],
    praise: 0,
    imgPraise: "/images/before.png",
    id: [],
    isPrise: "no"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      title: options.title,
      name: options.name,
      content: options.content,
      icon: options.icon,
      time: options.time,
      id: options.id
    })
    if(that.data.icon == 'undefined')
    {
      that.setData({
        icon: '',
       
      })
      console.log("22"+that.data.icon)
      console.log("登录状态"+that.data.isPrise)
    }
    if (that.data.isPrise == 'undefined')
    {
      that.setData({
        isPraise:'no'

      })
    }
    console.log(that.data.title)
    console.log(that.data.name)
    console.log(that.data.content)
    console.log(that.data.icon)
    console.log(that.data.time)
    console.log(that.data.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  //点击评论
  inputComment: function(e){
    var nowid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../comment/comment?id='+nowid
    })
    console.log(this.data.allrecdata)
  },
  //点击赞的图标
  changeImg: function(){
    if (this.data.isPraise == undefined) this.data.isPraise ='no'

      var that = this;
      if (that.data.isPraise == "no" && t.globalData.imageInfo != "" && t.globalData.userName !="匿名用户"){
      that.setData({
        imgPraise: "/images/after.png",
        isPraise: "yes",
        praise: that.data.praise+1
      })
      }
      else if (that.data.isPraise == "yes" && t.globalData.userName != "匿名用户")
      {
        that.setData({
          imgPraise: "/images/before.png",
          isPraise: "no",
          praise: that.data.praise - 1
        })
      }
      else if (t.globalData.imageInfo == "" || t.globalData.imageInfo == '../../image.png')
      {
        wx.showModal({
          title: '未登录',
          content: '无法点赞',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
      if (t.globalData.imageInfo !="../../image.png") // 不是匿名用户
      {
        console.log("进入更新")
        console.log("给服务器的状态"+that.data.isPraise)
          wx.request({
            url: 'https://wei2014.cn/updatePraise',
            data: {
              id: that.data.id,
              praise: that.data.praise,
              icon: t.globalData.imageInfo,
              name: t.globalData.userName,
              isPraise: that.data.isPraise
            },
            header: {},
            method: "GET",
            dataType: "json",
            success: function (res) {
              console.log("收到后台数据")
              console.log(res.data)
            },
            fail: function (res)
            {
              console.log("未收到")
              console.log(res.data)
            }
        })
      }
  },
  onShow: function () {
    var that = this;
    wx.request({
      url: 'https://wei2014.cn/getPraise',
      //url: 'https://yunhu123.cn/',
      data: { id: this.data.id, name: t.globalData.userName, icon: t.globalData.imageInfo},
      header: {},
      method: "GET",
      dataType: "json",
      success: function (res) {
        console.log(res.data)
        var resPraise;
        var resIsPraise;
        if (res.data.praise!=null) {
          resPraise = parseInt(res.data.praise); //得到服务器的赞数
        }else {
          resPraise = 0
        }
        // if (res.data.isPraise == 'undefined')
        // {
        //   res.data.isPraise = "no";
        // }
        resIsPraise = res.data.isPraise;
        console.log(res.data);
        console.log("显示获取服务器状态"+resIsPraise)
        that.setData({
          praise: resPraise,//赋给本地变量
          isPraise: resIsPraise
        })
        if(that.data.isPraise == "yes")
        {
          that.setData({
            imgPraise: "/images/after.png",
          })
        }
        else if (that.data.isPraise == "no")
        {
          that.setData({
            imgPraise: "/images/before.png",
          })
        }
        console.log("从服务器获取赞成功")

      },
      fail: function (res) {
        console.log("从服务器获取数据失败")
      },
      complete: function (res) { }
    })
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