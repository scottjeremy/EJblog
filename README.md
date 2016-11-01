# EAblog
Nodejs+Mongo+jQuery+foundation Personal blog.

##这是一个开源的个人博客系统。目前只有注册和登录功能，其余功能定期更新。

个人纯碎为了练习nodejs而做出来的一个博客，希望大家喜欢。如有建议或Issues，请提交。我会仔细看每一条的建议。

##技术选型：

*后台：采用Express作为框架 Mongo作为数据库 ejs作为模板引擎  

*前台：采用jQuery库 Foundation作为前端框架

##Install

#####安装EAblog前要先安装node环境和MongoDB数据库，具体安装请自行Google。

第一步：

安装依赖包

```
  npm install
```

第二步：

启动MongoDB数据库和保存数据库的位置,url是相对路径。
```
  mongodb --dbpath url
```

第三步：

```
  node app.js
```


