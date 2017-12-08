// pages/main/main.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    allrecdata: "",
    test: "",
    time: "",
    icon:  ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(this.data.content)
    this.data.allrecdata = []
    //console.log(this.data.content)
  },
  //跳转到发布帖子页面
  publish: function () {
    wx.navigateTo({
      url: '../communityPublish/communityPublish'
    })
    console.log(this.data.allrecdata)
  },
  onReady: function () {
    //console.log("title111111:"+this.data.title);
  },
  //获取时间
  transformContent: function(){
    for (var i = 0; i < this.data.allrecdata.length;i++) {
       this.data.allrecdata[i].meta.upDateAt = this.format(this.data.allrecdata[i].meta.upDateAt);
    }
    this.setData({
      allrecdata : this.data.allrecdata
    });
    console.log("allrecdata"+this.data.allrecdata);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  //获取服务器数据
  onShow: function () {
    //console.log("title:"+this.data.title)
    var that = this;
    wx.request({
      url: 'https://wei2014.cn/getMessageList',
      //url: 'https://yunhu123.cn/',
      data: { page: 1 },
      header: {},
      method: "GET",
      dataType: "json",
      success: function (res) {
        that.setData({
          allrecdata: res.data.messageList,
        });
        that.setData({
          time: that.format(that.data.allrecdata[0].meta.upDateAt)

        });
        that.transformContent()
        
        console.log(that.data.allrecdata[0].meta.upDateAt)
        var d = new Date(that.data.allrecdata[0].meta.upDateAt)
        console.log()
        console.log("从服务器获取数据成功")
        console.log(that.data.allrecdata)
      },
      fail: function (res) { 
        console.log("从服务器获取数据失败")
      },
      complete: function (res) { },
    })
  },
  //更改时间格式
  add0: function (m){return m< 10 ? '0' + m : m },
  format: function (shijianchuo)
{
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+ '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
  },
  /*显示所有的内容*/
  showallcontent: function(e){
    var nowtitle = e.currentTarget.dataset.title
    var nowname = e.currentTarget.dataset.name
    var nowcontent = e.currentTarget.dataset.content
    var nowicon = e.currentTarget.dataset.icon
    var nowtime = e.currentTarget.dataset.time
    var nowid = e.currentTarget.dataset.id
    console.log(nowtitle)
    console.log(nowname)
    console.log(nowcontent)
    console.log(nowicon)
    console.log(nowtime)
    wx.navigateTo({
      url: '../allcontent/allcontent?title='+nowtitle+'&name='+nowname+'&content='+nowcontent+'&icon='+nowicon+'&time='+nowtime+'&id='+nowid
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