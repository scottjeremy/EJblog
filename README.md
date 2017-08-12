# EJblog
Nodejs(Express)+MongoDB+jQuery+Bootstrap Personal blog.

顾名思义   Express (E)    jQuery(J)

## 这是一个开源的个人博客系统。

个人纯碎为了练习nodejs而做出来的一个博客，给个Star就是我最大的动力！

该系统已停止更新维护，等我有机会接触NodeJS再来写关于NodeJS的博客。

## 用Node.JS+MongoDB搭建个人博客系列 逐行代码分析：

### [用Node.JS+MongoDB搭建个人博客（成品展示）](http://www.cnblogs.com/scottjeremy/p/7027790.html)

### [用Node.JS+MongoDB搭建个人博客（安装环境）（一）](http://www.cnblogs.com/scottjeremy/p/6993480.html)

### [用Node.JS+MongoDB搭建个人博客（app.js接口文件）（二）](http://www.cnblogs.com/scottjeremy/p/7238131.html)

### [用Node.JS+MongoDB搭建个人博客（model目录）（三）](http://www.cnblogs.com/scottjeremy/p/7245802.html)

### [用Node.JS+MongoDB搭建个人博客（万众期待的router.js）（四）](http://www.cnblogs.com/scottjeremy/p/7238941.html)

### [用Node.JS+MongoDB搭建个人博客（页面模板）（五）（结束）](http://www.cnblogs.com/scottjeremy/p/7250684.html)

## 技术选型：

* 后台：采用Express作为框架 MongoDB作为数据库 ejs作为模板引擎  

* 前台：采用jQuery库 Bootstrap作为前端UI框架
 
## 功能

* 文章：发布文章，文章分类，删除文章 获取访问用户的地理位置（采用CX网和高德的API）

## 目录结构：

```
data  数据库文件夹
model 模块目录
---- db.js      封装了对数据库的操作（增删改查）
---- md5.js     封装了md5加密函数
---- setting.js 封装了对数据库的接口
node_modules 项目依赖包
public 静态资源目录
routers 路由目录
---- router.js  对请求接口的统一处理
views 模板目录
app.js 入口文件
package.json 文件依赖配置包
```

## Install

##### 安装EJblog前要先安装node环境和MongoDB数据库，具体安装请自行Google。

##### 作为例子，我已经写入一些数据可提供使用观看。数据位置在data文件夹内

第一步：

安装依赖包

```
  npm install
```

第二步：

启动MongoDB数据库和保存数据库的位置,url是相对路径。
```
  mongod --dbpath url
```

第三步：

```
  node app.js
```
#### 登陆后台 帐号：123123 密码：123123
