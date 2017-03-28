title: hexo语法：markdown基础篇
date: 2015-12-04 22:59:58
tags: markdown
categories: Hexo
---
<p><a href="http://zh.wikipedia.org/wiki/Markdown" target="_blank" rel="external">Markdown</a>是一种轻量级的「标记语言」，目标是实现「易读易写」。我使用改语言，主要的目的还是因为github的缘故。所以了解一些Markdown的一些基本语法，就是非常有必要了。<br><a id="more"></a></p>
##Markdown 常用语法
![](http://7xk19o.com1.z0.glb.clouddn.com/markdown.png)
##标题
只需要在文字前加 #。具体可以支持到1到6个#，建议在#后，最好加入一个空格，这是Mardown的标准写法。
##列表
列表主要两种类型，无序和有序。无序的只要在文字前加-或者*，有序的是使用1.,2.,3.标记。
##引用
要引用一段文字，在文字前使用标记 <code>&gt;</code> 这种尖括号（大于号）即可。
<blockquote><p>这里是引用：hope</p></blockquote>
``` bash
<blockquote><p>这里是引用：hope</p></blockquote>
```
##图片与链接
图片：
``` bash
![](){ImgCap}{/ImgCap}
```
或者：
``` bash
<img src="http://7xk19o.com1.z0.glb.clouddn.com/pythonlogo.jpg" width="600" height="300">
```
链接: 
``` bash
[标注](link)
```
http://tiramisutes.github.io/
##下载
<a id="download" href="http://tiramisutes.github.io/" target="_blank" rel="external"><i class="fa fa-download"></i><span> Download Now</span><br></a></li>
##粗体与斜体
粗体与斜体也比较简单，两个<code>*</code>或<code>_</code>包含一段文本就是粗体，一个<code>*</code>或<code>_</code>包含一段文本就是斜体<br><strong>粗体</strong>   <em>斜体</em>
##表格
``` bash
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```
**效果展示**
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

如果让标题居中，加:-------------:，右对齐-----:
##代码框
``` bash
cord if for while
```
##分割线
分割线的语法只需要三个 * 号。
***
我是分割线
***
##视频
``` bash
<iframe width="420" height="315" src="http://www.youtube.com/" frameborder="0" allowfullscreen></iframe>
```
##hexo server
hexo s启动hexo服务时报错如下：
<blockquote><p>
FATAL Port 4000 has been used. Try other port instead.
</p></blockquote>
显示hexo默认4000端口被占用；
**解决办法：**
<li>windows下检查端口是否占用并杀死该进程</li>
``` bash
netstat -ano | findstr 4000 （最后一列是pid）
tasklist | findstr pid
taskkill -PID pid -F
```
<li>或者换其他端口</li>
``` bash
hexo server --port=4001
```
Contribution from ：
http://www.jianshu.com/p/1e402922ee32
http://daringfireball.net/projects/markdown/basics