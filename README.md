# SimulateQQ
制作一个简单的模拟QQ系统！   
仅用来学习参考，绝对不会用于其他用处！

# 使用技术
前端：Webpack + React + TypeScript   
后端：Node.js + Express   
数据库：MongoDB

# 启动项目于浏览器
``` cmd
开启前端：npm start
开启后端：npm dev
```

### 以下是制作时的思路（简称草稿纸）
架子是用webpack搭建，前端主要代码在src目录下，后端全部代码在request目录下，打包后的文件在dist文件下。   
暂定想要实现的功能：登录注册，群聊天，好友聊天，动态，好友列表（不一定能实现）。   
保存聊天记录和离线收到消息功能因数据库存储问题暂时不能实现，只能进入群或打开聊天页之后接受消息。

NotFound表示404时的页面，暂时比较简陋，它不是重点，懒得搞他了。

数据库名称：simulateQQ   
登录的集合名称：userInfo   
登录的时候数据库内容：
 - 账号 account
 - 密码 password
 - 电子邮箱 email
 - 手机号 telephone
 - 注册时间 timeOfRegistration
 - 最后一次登录时间 lastLoginTime （废弃）  

登录的接口：
 - /login 登录

