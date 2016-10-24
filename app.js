var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.render('success');
});

app.use(express.static('public'));

app.listen(3000);



