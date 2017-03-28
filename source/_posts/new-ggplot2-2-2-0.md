title: ggplot2 2.2.0更新简要
Total word: WordCount
Read time: Min2Read
date: 2016-10-06 13:04:09
tags: ggplot2
categories: R
---
**ggplot2**迎来更新，最新版本为2.2.0，同时也带来一些功能上是改进，详细原文见：<a href="https://blog.rstudio.org/2016/09/30/ggplot2-2-2-0-coming-soon/" target="_blank">ggplot2 2.2.0 coming soon!</a>
**最新版安装：**
``` bash
install.packages("devtools")
devtools::install_github("hadley/ggplot2")
```
主要更新内容如下：
##Subtitles and captions（副标题和题注）
``` bash
ggplot(mpg, aes(displ, hwy)) +
  geom_point(aes(color = class)) +
  geom_smooth(se = FALSE, method = "loess") +
  labs(
    title = "Fuel efficiency generally decreases with engine size",
    subtitle = "Two seaters (sports cars) are an exception because of their light weight",
    caption = "Data from fueleconomy.gov"
  )
```
![](https://rstudioblog.files.wordpress.com/2016/09/unnamed-chunk-3-1.png?w=490)
注：title现在默认为左对齐，想要居中，设置<span class="myCode">theme(plot.title = element_text(hjust = 0.5))</span>
##Facets分面
个人认为这个功能在ggplot2中效果不眨地，效果也不好，还不如坐标轴截断实际，但文章中认为坐标轴截断不科学-……—
##坐标轴修改
###改变坐标轴位置
``` bash
ggplot(mpg, aes(displ, hwy)) + 
  geom_point() + 
  scale_x_continuous(position = "top") + 
  scale_y_continuous(position = "right")
```
###添加双坐标轴sec.axis
``` bash
ggplot(mpg, aes(displ, hwy)) + 
  geom_point() + 
  scale_y_continuous(
    "mpg (US)", 
    sec.axis = sec_axis(~ . * 1.20, name = "mpg (UK)")
  )
```
##主题
还记得以前画图时坐标轴间那挥之不去的空白吗，Now，他将不复存在。
###箭头坐标轴element_line()
``` bash
#定义箭头
arrow <- arrow(length = unit(0.4, "cm"), type = "closed")

ggplot(mpg, aes(displ, hwy)) + 
  geom_point() + 
  theme_minimal() + 
  theme(
    axis.line = element_line(arrow = arrow)
  )
```
###图例修改
图例可以与图形区对齐和添加外框。
``` bash
ggplot(mpg, aes(displ, hwy, shape = drv, colour = fl)) + 
  geom_point() + 
  theme(
    legend.justification = "top", 
    legend.box.margin = margin(3, 3, 3, 3, "mm"), 
    legend.box.background = element_rect(colour = "grey50")
  )
```
注：panel.margin and legend.margin 重命名为 panel.spacing and legend.spacing 。
##bars型图修改
新增<code>geom_col()</code>函数，相当于<code>geom_bar(stat = "identity")</code>。