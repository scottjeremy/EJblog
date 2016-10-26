var express = require('express');
var app = express();
var formidable = require('formidable');
var db = require("./model/db.js");
var md5 = require("./model/md5.js");


app.set("view engine", "ejs");

//注册页面
app.get('/register', function(req, res, next){
    res.render('register');
});

//执行页面
app.get("/doregister", function (req, res) {
    var name = req.query.name;
    var pwd = req.query.password;
    //console.log("node服务器接收到了请求："+ name+ "+"+ password )

    //加密
    pwd = md5(md5(pwd).substr(4,7)+md5(pwd));


    db.insertOne("user", {
        "name" : name,
        "password" : password
    },function (err,result) {
        if(err){
            res.send("-1");
        }

        res.send(result);
    })



});

app.use(express.static('public'));

app.listen(3000);



