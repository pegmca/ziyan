// HTTP 模块同时支持 Express 和 WebSocket
const http = require('http'); 
// 引用 express 来支持 HTTP Server 的实现
const express = require('express');
// 引用 wafer-session 支持小程序会话
const waferSession = require('wafer-node-session'); 
// 使用 MongoDB 作为会话的存储
const MongoStore = require('connect-mongo')(waferSession); 
// 引入配置文件
const config = require('./config'); 
// 引入 WebSocket 服务实现
const websocket = require('./websocket');

// 创建一个 express 实例
const app = express();

var ObjectID = require('mongodb').ObjectID;

var mongodb = require("mongodb");
var monk = require('monk');
var db = monk('localhost/test');




var getMessageList = function(request, response) {
    var collection = db.get('message');
        collection.find({},{sort:{"meta.upDateAt":-1}},function(err,docs){
	    if(err) response.json({'result':'fail', 'errMessage':err});
            else response.json({'result':'success', 'errMessage':err, 'messageList' : docs});
        });

};
app.get('/getMessageList',getMessageList);

var getMessageListByPage = function(request, response) {
    var collection = db.get('message');
    var page = request.query['page'];
    var size = 10;
    var start = (page-1)*size
    //console.log(page + " " + start + " " + end);
	if(page) {
            collection.find({},{sort:{"meta.upDateAt":-1},skip:start,limit:size},function(err,docs){
                if(err) response.json({'result':'fail', 'errMessage':err});
                else response.json({'result':'success', 'errMessage':err, 'messageList' : docs});
	    })
        }
	else {
    	    response.json({'result':'fail', 'errMessage':'输入页码'});
        }
};
app.get('/getMessageListByPage',getMessageListByPage);

var addMessage = function(request,response) {
        var collection = db.get('message');
        console.log(request.query);
        var name = request.query['name'];
        var title = request.query['title'];
        var content = request.query['content'];
        var icon = request.query['icon'];
        if(name && title && content && icon) {
            collection.insert({ 'icon' : icon,'name': name , 'title': title , 'content': content ,'meta':{'createAt':Date.now(),'upDateAt':Date.now()}}, function (err, doc) {
  	        if (err) throw err;
                response.json({result:"success"});
            });
        }else {
            response.json({resule:"fail"});
        }
        // console.log(name+title+content);
        // response.end();
}
app.get('/addMessage',addMessage)

var addComment = function(request,response) {
	var collection = db.get('messageComments');
        var id = request.query['id'];
	var content = request.query['content'];
	var name = request.query['name'];
        var icon = request.query['icon'];
	var comment = {};
       	if(id && comment && name && icon) {
	    comment.author = {};
	    comment.author.name = name;
	    comment.author.icon = icon;
	    comment.content = content;
	    comment.time = Date.now();
	    console.log(comment);

            collection.update({ 'id' : id},{$push:{"conments":comment}},{upsert:true}, function (err, doc) {
  	        if (err) throw err;
                collection = db.get('message');	
	        //collection.update({'id':id},{$set:{"meta.updateAt":Date.now}},{upsert:true},function(err,doc){
		 collection.update({'_id':id},{$set:{"meta.upDateAt":Date.now()}},{upsert:true},function (err, doc){
		if(err) throw err;
		response.json({result:"success",time:"have updated"});
		})
            });
        }else {
            response.json({resule:"fail"});
        }
	

}
app.get('/addComment',addComment);

var updatePraise = function(request, response) {
	var collection = db.get('messageComments');
	var praise = request.query['praise'];
	var id = request.query['id'];
	var isPraise = request.query['isPraise'];
	var icon = request.query['icon'];
	var name = request.query['name'];
	if(praise &&　id && name && icon && isPraise) {
	    collection.update({'id':　id},{$set:{"praise":praise}},{upsert:true},function (err, doc){
	    if(err) throw err;
	    collection = db.get('commentPraise');
	    collection.update({'icon':icon,'name':name,'id':id},{$set: {'isPraise':isPraise}},{upsert:true},function(err,doc){
	        if(err) throw err;
		response.json({result:"success"});
	    })
	  //  response.json({result:"success"});
	});
	}
	else {
	   response.json({result:"fail"});
	}
	
}
app.get('/updatePraise',updatePraise)



var getPraise = function(request,response) {
	var collection = db.get('messageComments');
	var id = request.query['id']
	var icon = request.query['icon']
	var name = request.query['name']
	if(id && icon && name) {
	    collection.find({'id':　id},function (err, doc){
	    if(err) throw err;
	    console.log(doc)
	    var praiseNum = doc[0].praise;
	    collection = db.get('commentPraise');
	    console.log(id);
	    console.log(icon);
            console.log(name);
	    collection.find({'id':id,'icon':icon,'name':name},{},function(err,doc) {
		if(err) throw err;
		//console.log('++)
		//console.log(doc==null)
		if(doc.length == 0)
		response.json({result:"success",praise:praiseNum})
		else
	        response.json({result:"success",praise:praiseNum,isPraise:doc[0].isPraise});
	    })
	    //response.json({result:"success",praise:doc[0].praise});
	    //console.log(doc)
	});
	}
	else {
	   response.json({result:"fail"});
	}
}
app.get('/getPraise',getPraise)

var getMessageById = function(request, response) {
     var collection = db.get('message');
     var id = request.query['id'];
     collection.findOne({'_id':id},function(err,docs){
         if(err) response.json({'result':'fail', 'errMessage':err});
         else response.json({'result':'success', 'errMessage':err, 'messageList' : docs});
     });
    
}
app.get('/getMessageById' , getMessageById)

var getCommentsById = function(request, response) { 
     var collection = db.get('messageComments');
     var id = request.query['id'];
     collection.findOne({'id':id},function(err,docs){
         if(err) response.json({'result':'fail', 'errMessage':err});
         else response.json({'result':'success', 'errMessage':err, 'commentList' : docs.conments});
	console.log(typeof docs)
	console.log(docs.conments)
     });

}
app.get('/getCommentsById' , getCommentsById)
// 在路由 /me 下，输出会话里包含的用户信息
app.use('/me', (request, response, next) => { 
    response.json(request.session ? request.session.userInfo : { noBody: true }); 
    if (request.session) {
        console.log(`Wafer session success with openId=${request.session.userInfo.openId}`);
    }
}); 


// 在路由 /me 下，输出会话里包含的用户信息
app.use('/me2', (request, response, next) => { 
    response.json("121"); 
}); 


// 实现一个中间件，对于未处理的请求，都输出 "Response from express"
app.use((request, response, next) => {
    response.write('Response from express');
    response.end();
});

// 创建 HTTP Server 而不是直接使用 express 监听
const server = http.createServer(app);



// 启动 HTTP 服务
server.listen(config.serverPort);

// 输出服务器启动日志
console.log(`Server listening at http://127.0.0.1:${config.serverPort}`);
