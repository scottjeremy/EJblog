var express = require("express");
var app = express();
var router = require("./routers/router.js");
var session = require('express-session');

//使用session
app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true
}));

//模板引擎
app.set("view engine","ejs");
//静态文件
app.use(express.static("./public"));
//首页
app.get("/",router.showIndex);
//注册页面
app.get("/regist", router.showResite);
//执行注册
app.post("/doregist",router.doregister);
//登陆页面
app.get("/login", router.showLogin);
//执行登陆
app.post("/dologin", router.doLogin);

app.listen(3000);


