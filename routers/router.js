var formidable = require('formidable');
var db = require("../model/db.js");
var md5 = require("../model/md5.js");
//首页
exports.showIndex = function (req,res,next) {
    res.render("index",{
        "login" : req.session.login == "1" ? true : false,
        "username" :req.session.login == "1" ? req.session.username : ""
    });
};
//注册页面
exports.showResite = function (req, res, next) {
    res.render("regist");
};
//登陆页面
exports.showLogin = function (req, res, next) {
    res.render("login");
};
//执行注册
exports.doregister = function (req,res,next) {
    //得到用户填写的东西
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //得到表单之后做的事情
        var username = fields.username;
        var password = fields.password;
        //console.log(username + password);
        //查询数据库中是不是有这个人
        db.find("user",{
            "username" : username
        },function(err,result){
            if(err){
                res.send("-3"); //服务器被占用
                return;
            }
            if(result.length != 0){
                res.send("-1"); //用户名被占用
                return;
            }
            //设置md5加密
            password = md5(md5(password).substr(4,7) + md5(password));
            db.insertOne("user",{
                "username" : username,
                "password" : password
            },function(err,result){
                if(err){
                    res.send("-3");//服务器错误
                    return;
                }
                req.session.login = "1";
                req.session.username = username;
                res.send("1");//注册成功，写入SESSION


            });
            //res.send("1");
        });
        //保存
    });


};
//执行登陆
exports.doLogin = function (req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        var username = fields.username;
        var password = fields.password;
        password = md5(md5(password).substr(4,7) + md5(password));

        //检索数据库，按登录名检索数据库，查看密码是否匹配
        db.find("user",{"username":username},function(err,result){
            if(err){
                res.send("-3");//服务器错误
                return
            }
            if(result.length == 0){
                res.send("-1");  //-2没有这个人
                return;
            }
            var dbpassword = result[0].password;
            //要对用户这次输入的密码，进行相同的加密操作。然后与
            //数据库中的密码进行比对
            if(password == dbpassword){
                req.session.login = "1";
                req.session.username = username;
                res.send("1");  //登陆成功
                return;
            }else{
                res.send("-2"); //密码不匹配
            }
        });
    });

    return;
};


