title: R-Data-Science
Total word: WordCount
Read time: Min2Read
date: 2016-09-29 13:39:15
tags: function
categories: R
---
本内容是基于<a href="http://r4ds.had.co.nz/" target="_blank">**R for Data Science**</a>的学习总结；
![](http://7xk19o.com1.z0.glb.clouddn.com/cover.png)
##ggplot2的数据可视化
###基本绘图
ggplot2画图基本模型如下：
``` bash
ggplot(data = <DATA>) +    #生成一个空的图
  <GEOM_FUNCTION>(mapping = aes(<MAPPINGS>))  #增加一个图层，其中涉及参数仅用于这一图层
```
GEOM_FUNCTION可划分为展示单变量，两个变量和三变量，连续型或离散型变量；
在ggplot2 中每一个**GEOM_FUNCTION**函数都包含有一个<code>mapping</code>参数对应于<code>aes(x,y,size,shape,color,alpha)</code>，以上参数对应值均为DATA数据中的变量，若需要手动设置，将参数写于aes外，此时的参数对应值如下：
<li>color="颜色英语单词"</li>
<li>size=数字</li>
<li>shape=如下代表数字</li>
![](http://7xk19o.com1.z0.glb.clouddn.com/unnamed-chunk-13-1.png)
其中shape图形中的外边界由colour指定(0到18)。内部填充由fill指定。
**ggplot()中设置的aes相当于全局参数，为简化代码可将共有变量在ggplot中设置。若某一图层指定参数与次全局指定冲突，则在该图层使用geom指定的参数。基于这样的处理过程可以在不同的图层中指定不同的数据。**
``` bash
ggplot(data = mpg, mapping = aes(x = displ, y = hwy)) + 
  geom_point(mapping = aes(color = class)) + 
  geom_smooth(data = dplyr::filter(mpg, class == "subcompact"), se = FALSE) ##se为是否展示置信区间
```
###stat (statistical transformation)
每一个geom都会默认指定一个stat来对数据进行统计转换，如geom_bar()默认stat是count，即geom_bar(..,stat="count")。
![](http://7xk19o.com1.z0.glb.clouddn.com/visualization-stat-bar.png)
![](http://7xk19o.com1.z0.glb.clouddn.com/stat.png)
###坐标系统
![](http://7xk19o.com1.z0.glb.clouddn.com/visualization-coordinate-systems.png)
