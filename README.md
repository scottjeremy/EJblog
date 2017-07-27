# EJblog
Nodejs(Express)+MongoDB+jQuery+Bootstrap Personal blog.

顾名思义   Express (E)    jQuery(J)

## 这是一个开源的个人博客系统。

个人纯碎为了练习nodejs而做出来的一个博客，给个Star就是我最大的动力！如有建议或Issues，请提交。我会仔细看每一条的建议尽量把这个项目做得更好。

## 技术选型：

*后台：采用Express作为框架 MongoDB作为数据库 ejs作为模板引擎  

*前台：采用jQuery库 Bootstrap作为前端UI框架
 
## 功能

*文章：发布文章，文章分类，删除文章 获取访问用户的地理位置（采用CX网和高德的API）

目录结构：

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
