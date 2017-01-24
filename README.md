# EAblog
Nodejs+MongoDB+jQuery+Bootstrap Personal blog.

##这是一个开源的个人博客系统。

个人纯碎为了练习nodejs而做出来的一个博客，给个Star就是我最大的动力！如有建议或Issues，请提交。我会仔细看每一条的建议。

##技术选型：

*后台：采用Express作为框架 MongoDB作为数据库 ejs作为模板引擎  

*前台：采用jQuery库 Bootstrap作为前端UI框架
 
##功能

*文章：发布文章，文章分类，删除文章 获取访问用户的地理位置（采用CX网和高德的API）

##小小细节：博客后台管理登陆是采用了双重MD5加密，不过最近听朋友说MD5早已经给人破解了，解了，了。。

##Install

#####安装EAblog前要先安装node环境和MongoDB数据库，具体安装请自行Google。

#####作为例子，我已经写入一些数据可提供使用观看。数据位置在data文件夹内

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
#登陆后台 帐号：123123 密码：123123
