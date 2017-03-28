title: 如何向google提交sitemap
date: 2015-07-29 22:23:44
tags: sitemap
categories: Hexo
---
Sitemap 可方便管理员通知搜索引擎他们网站上有哪些可供抓取的网页。向google提交自己hexo博客的sitemap有助于让别人更好地通过google搜索到自己的博客。
下面来说一下具体步骤:
##第一步 生成自己的sitemap文件：<a style="line-height: 1.5;" href="https://www.xml-sitemaps.com/" target="_blank">xml-sitemaps.</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/sitemap.png)
生成后点击红框那下载自己的sitemaps.xml文件
![](http://7xk19o.com1.z0.glb.clouddn.com/sitemap2.png)
##第二步 向google提交你的网页
用自己的google帐号登陆Webmaster Central的网页
``` bash
https://www.google.com/webmasters/verification/home?hl=en
```
点击ADD A SITE
输入网页url点击continue
![](http://7xk19o.com1.z0.glb.clouddn.com/1.png)
##第三步 google验证网页所有权
进入验证所有权的页面
可以选择上传一个html文件到你的网页的方式来验证
如下图
![](http://7xk19o.com1.z0.glb.clouddn.com/2.png)
![](http://7xk19o.com1.z0.glb.clouddn.com/3.png)
也可以选择其他方法也就是html tag
如下图
![](http://7xk19o.com1.z0.glb.clouddn.com/6.png)
大致的意思就是在主页的head里面加一条meta标签
在自己的主页加了google指定的meta标签以后
回来此页点击verify按钮即完成验证
![](http://7xk19o.com1.z0.glb.clouddn.com/4.png)
##第四步 google网站站长上传sitemap
点击以下链接
``` bash
https://www.google.com/webmasters/tools
```
由于之前在第2步已经向google提交了你的网页
所以这里能看到自己网页的缩略图
![](http://7xk19o.com1.z0.glb.clouddn.com/5.png)
这里直接点击红色框的部分
就会进入site dashboard
点击sitemap这一项
进入后点击ADD/TEST SITEMAP这个按钮
然后输入你的sitemap.xml的link
按submit sitemap按钮即可
下面就会告诉你有多少个url被indexed
##第五步 测试sitemaps
<a style="line-height: 1.5;" href="https://www.google.com/webmasters/tools/sitemap-details?hl=en&siteUrl=http%3A%2F%2Ftiramisutes.github.io%2F&sitemapUrl=http%3A%2F%2Ftiramisutes.github.io%2Fsitemap.xml&gwtPl=L3dlYm1hc3RlcnMvdG9vbHMvc2l0ZW1hcC1saXN0P2hsPWVuJnNpdGVVcmw9aHR0cDovL3RpcmFtaXN1dGVzLmdpdGh1Yi5pby8jTUFJTl9UQUI9MCZDQVJEX1RBQj0tMQ%3D%3D#CARD_TAB=-1" target="_blank">点击 Test Sitemap 进行测试</a>

![](http://7xk19o.com1.z0.glb.clouddn.com/test-sitemaps.png)
测试成功结果如下：
![](http://7xk19o.com1.z0.glb.clouddn.com/test-sitemap2.png)

