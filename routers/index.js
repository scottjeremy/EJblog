var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    //这里就是生成你默认页面的代码
    //下面这句的意思是用一个叫做index的模板生成页面
    res.render('index', { title: 'Chat' });
});

module.exports = router;
