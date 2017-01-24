var formidable = require('formidable');
var db = require("../model/db.js");
var md5 = require("../model/md5.js");
var fs = require("fs");
var moment = require('moment');
var MongoClient = require('mongodb').MongoClient, test = require('assert');
//首页
exports.showIndex = function (req,res,next) {
    res.render("index");
};
//编写页面
exports.showRecording = function (req, res, next) {
    if(req.session.login != "1"){
        res.send("请登陆！");
    }else {
        res.render("recording");
    }
};
exports.doRecording = function (req, res, next) {
    
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields) {
        db.getAllCount("article", function (count) {
            var allCount = count.toString();
            var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            //写入数据库
            db.insertOne("article", {
                "ID" : parseInt(allCount) + 1,
                "topic" : fields.topic,
                "publisher" : fields.publisher,
                "classify" : fields.classify,
                "content" : fields.content,
                "date" : date,
                "thumbsUp": 0,
                "visitNum" : 0
            },function (err, result) {
                if(err){
                    res.send("-1");
                    return;
                }
                res.send("1");
            });
        });
    });
};
//取得文章
exports.getArticle = function (req, res, next) {
    var page = req.query.page;
    db.find("article",{},{"pageamount":10,"page":page,"sort":{"date":-1}}, function (err, result) {
        var obj = {"allResult" : result};
        res.json(obj);
    });
};

//取得总页数
exports.getAllAmount = function (req, res, next) {
    db.getAllCount("article", function (count) {
        res.send(count.toString());
    });
};

//文章页面
exports.showArticle = function (req, res, next) {
    if(req.query.ID == undefined){
        res.send("你想干嘛？");
        return;
    }
    var aId = parseInt(req.query.ID);
    db.find("article",{"ID":aId},function (err,result) {
        if(err){
            console.log(err);
        }
        res.render("article",{
            "allResult" : result[0]
        });
    });
};

//删除文章
exports.delArticle =function (req, res, result) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var ID = parseInt(fields.ID);
        db.deleteMany("article",{"ID":ID},function (err,results) {
            if(err){
                console.log("删除文章错误:"+err);
                return
            }
            res.send("1");
        });
    });
};


//注册页面
exports.showRegister = function (req, res ,result) {
    res.render("register");
};
//执行注册
exports.doRegister = function (req, res, result) {
    //得到用户填写的东西
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        //得到表单之后做的事情
        var username = fields.username;
        var password = fields.password;
        var md5PassWord = md5(md5(password).substr(4,7) + md5(password));
        db.insertOne("user",{
            "username" : username,
            "password" : md5PassWord
        },function(err,result){
            if(err){
                res.send("-3");//服务器错误
                return;
            }
            req.session.login = "1";
            res.send("1");//注册成功，写入SESSION
        });
    });
};

//登陆页面
exports.showLogin = function (req, res ,result) {
    res.render("login");
};

//执行登陆
exports.doLogin = function (req, res, result) {
    //得到用户填写的东西
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
                res.send("1");  //登陆成功
                return;
            }else{
                res.send("-2"); //密码不匹配
            }
        });
    });

    return;
};

//无判断访问者地理位置！
exports.getAddress = function (req, res, result) {
    //得到用户填写的东西
    var form = new formidable.IncomingForm();
    var ipAddress = getClientIp(req);

    form.parse(req, function(err, fields, files) {
        var cxipAddress = fields.cxipAddress;
        var cxIsp = fields.cxIsp;
        var cxBrowser = fields.cxBrowser;
        var cxOS = fields.cxOS;
        var gdIsp = fields.gdIsp;

        db.getAllCount("Visitor", function (count) {
            var allCount = count.toString();
            var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            //写入数据库
            db.insertOne("Visitor", {
                "ID" : parseInt(allCount) + 1,
                "ipAddress" : ipAddress,
                "cxipAddress" : cxipAddress ? cxipAddress : "查询网无法查询",
                "cxIsp" : cxIsp ? cxIsp : "查询网无法定位",
                "cxBrowser" : cxBrowser ? cxBrowser :"查询网无法识别游览器",
                "cxOS" : cxOS ? cxOS :"查询网无法识别系统",
                "gdIsp" : gdIsp ? gdIsp : "高德无法定位",
                "date" : date
            },function (err, result) {
                if(err){
                    console.log("服务器错误" + err);//服务器错误
                    return;
                }
                console.log("有人访问Scott主页啦！");
                res.send("1");
            });
        });
    });
};
//无判断访问者地理位置

//访问用户数据！
exports.showUserdata = function (req, res, result) {
    if(req.session.login != "1"){
        res.send("请登陆！");
    }else {
        res.render("userdata");
    }
};
exports.getUserdata = function (req, res ,result) {
    var page = req.query.page;
    db.find("Visitor",{},{"pageamount":10,"page":page,"sort":{"date":-1}}, function (err, result) {
        var obj = {"allResult" : result};
        res.json(obj);
    });
};
exports.countUserdata = function (req, res ,result) {
    db.getAllCount("Visitor", function (count) {
        res.send(count.toString());
    });
};

exports.delUserdata = function (req, res, result) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var ID = parseInt(fields.ID);
        db.deleteMany("Visitor",{"ID":ID},function (err,results) {
            if(err){
                console.log("删除访问用户数据错误:"+err);
                return
            }
            res.send("1");
        });

    });
};
//访问用户数据
//后台页面

//JavaScript!
exports.showJavaScript = function (req, res, result) {
    res.render("JavaScript");
};

exports.getJavaScript = function (req, res, next) {
    db.find("article",{"classify":"JavaScript"},{"pageamount":10,"sort":{"date":-1}}, function (err, result) {
        if(err){
            console.log(err);
        }
        var obj = {"allResult" : result};
        res.json(obj);
    });
};
//JavaScript

//NodeJS!
exports.showNodeJS = function (req, res, result) {
    res.render("NodeJS");
};

exports.getNodeJS = function (req, res, next) {
    db.find("article",{"classify":"NodeJS"},{"pageamount":10,"sort":{"date":-1}}, function (err, result) {
        if(err){
            console.log(err);
        }
        var obj = {"allResult" : result};
        res.json(obj);
    });
};
//NodeJS

//Environment!
exports.showEnvironment = function (req, res, result) {
    res.render("Environment");
};

exports.getEnvironment = function (req, res, next) {
    db.find("article",{"classify":"Environment"},{"pageamount":10,"sort":{"date":-1}}, function (err, result) {
        if(err){
            console.log(err);
        }
        var obj = {"allResult" : result};
        res.json(obj);
    });
};
//Environment

//About!
exports.showAbout = function (req, res ,result) {
    res.render("about");
};
//About

//Comment!
exports.showComment = function (req, res ,result) {
    res.render("comment");
};
exports.doComment = function (req, res, result) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var name = fields.name;
        var email = fields.email;
        var content = fields.content;
        db.getAllCount("article", function (count) {
            var allCount = count.toString();
            var date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            db.insertOne("comment", {
                "ID" : parseInt(allCount) + 1,
                "name" : name,
                "email" : email,
                "content" : content,
                "date" : date
            },function (err, result) {
                if(err){
                    console.log("留言错误" + err);
                    return;
                }
                res.send("1");
            });
        });
    });
};
//取得评论
exports.getComment = function (req, res, next) {
    var page = req.query.page;
    db.find("comment",{},{"pageamount":10,"page":page,"sort":{"date":-1}}, function (err, result) {
        var obj = {"allResult" : result};
        res.json(obj);
    });
};

//取得评论总页数
exports.getAllCountComment = function (req, res, next) {
    db.getAllCount("comment", function (count) {
        res.send(count.toString());
    });
};
//Comment

//blog-manage!
exports.getManage = function (req, res, result) {
    if(req.session.login != "1"){
        res.send("请登陆！");
    }else {
        res.render("manage");
    }
};
//blog-manage

//addVisitorNum!
exports.addVisitorNum = function (req, res, result) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var aId = parseInt(fields.ID);
        db.find("article",{"ID":aId},function (err,result) {
            if(err){
                console.log(err);
            }
            var visitNum = result[0].visitNum;
            var ID = result[0].ID;
            db.updateMany("article",{"ID":ID},{$set:{"visitNum":visitNum+1}},function (err,results) {
                if(err){
                    console.log("游览数据错误:"+err);
                    return
                }
                res.send("1");
            });
        });
    });
};
//addVisitorNum

//addThumbsUp!
exports.addThumbsUp = function (req,res,result) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var aId = parseInt(fields.ID);
        db.find("article",{"ID":aId},function (err,result) {
            if(err){
                console.log(err);
            }
            var thumbsUp = result[0].thumbsUp;
            var ID = result[0].ID;
            db.updateMany("article",{"ID":ID},{$set:{"thumbsUp":thumbsUp+1}},function (err,results) {
                if(err){
                    console.log("点赞数据错误:"+err);
                    return
                }
                res.send("1");
            });
        });
    });
};


//addThumbsUp


//获取客户端真实ip;
function getClientIp(req) {
    var ipAddress;
    var forwardedIpsStr = req.headers['X-Forwarded-For'];//判断是否有反向代理头信息
    if (forwardedIpsStr) {//如果有，则将头信息中第一个地址拿出，该地址就是真实的客户端IP；
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {//如果没有直接获取IP；
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
}





