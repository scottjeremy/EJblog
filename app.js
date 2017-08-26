var express      = require("express");
var app          = express();
var router       = require("./routers/router.js");
var path         = require('path');
var bodyParser   = require('body-parser');
var ejs          = require('ejs');
var ueditor      = require('ueditor');
var session = require('express-session');
//require('./proxy');

//使用session
app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true
}));


app.use(bodyParser.json());

app.use(express.static("./public"));

//ueditor
app.use("/libs/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {

    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;

        var imgname = req.ueditor.filename;

        var img_url = '/upload';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }

    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/upload';
        res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片
    }

    // 客户端发起其它请求
    else {

        res.setHeader('Content-Type', 'application/json');
        res.redirect('/libs/ueditor/nodejs/config.json')
    }

}));
//模板引擎
app.set("view engine","ejs");

//首页
app.get("/",router.showIndex);
//编写页面
app.get("/recording", router.showRecording);
//执行保存
app.post("/doRecording", router.doRecording);

//取得文章
app.post("/getArticle", router.getArticle);
//取得总页数
app.post("/getAllAmount", router.getAllAmount);
//文章页面
app.get("/article", router.showArticle);
//删除文章
app.post("/delArticle", router.delArticle);

//注册页面
app.get("/register", router.showRegister);
app.post("/doRegister",router.doRegister);

//登陆页面
app.get("/login", router.showLogin);
app.post("/doLogin", router.doLogin);

//分类文章
//javascript!
app.get("/JavaScript",router.showJavaScript);
app.post("/getJavaScript", router.getJavaScript);
//javascript

//NodeJS!
app.get("/NodeJS",router.showNodeJS);
app.post("/getNodeJS", router.getNodeJS);
//NodeJS

//Environment!
app.get("/Environment", router.showEnvironment);
app.post("/getEnvironment", router.getEnvironment);
//Environment

//About!
app.get("/About", router.showAbout);
//About

//Comment!
app.get("/Comment", router.showComment);
app.post("/doComment", router.doComment);
app.post("/getComment", router.getComment);
app.post("/getAllCountComment", router.getAllCountComment);
//Comment

//后台页面
app.get("/manage",router.getManage);

//访问用户数据！
app.get("/userdata", router.showUserdata);
app.post("/getUserdata", router.getUserdata);
app.post("/countUserdata", router.countUserdata);
app.post("/delUserdata", router.delUserdata);
//访问用户数据

//后台页面!

//获取用户地理位置
app.post("/getAddress", router.getAddress);

//VisitorNum(游览数)
app.post("/addVisitorNum", router.addVisitorNum);

//addThumbsUp(点赞数)
app.post("/addThumbsUp", router.addThumbsUp);

console.log("Server running");





app.listen(3000);
