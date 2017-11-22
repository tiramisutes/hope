title: myself ggplot2 learning tip (再学ggplot2： 遗漏细节)
date: 2016-03-09 13:44:37
tags: ggplot2
categories: R
---
<p><img src="http://7xk19o.com1.z0.glb.clouddn.com/20111210_WOC210.gif" width="500" height="250"></p>
原图：http://www.economist.com/node/21541178
##ggplot2绘图语法结构：
``` bash
ggplot(data = <default data set>, 
       aes(x = <default x axis variable>,
           y = <default y axis variable>,
           ... <other default aesthetic mappings>),
       ... <other plot defaults>) +

       geom_<geom type>(aes(size = <size variable for this geom>, 
                      ... <other aesthetic mappings>),
                  data = <data for this point geom>,
                  stat = <statistic string or function>,
                  position = <position string or function>,
                  color = <"fixed color specification">,
                  <other arguments, possibly passed to the _stat_ function) +

  scale_<aesthetic>_<type>(name = <"scale label">,
                     breaks = <where to put tick marks>,
                     labels = <labels for tick marks>,
                     ... <other options for the scale>) +

  theme(plot.background = element_rect(fill = "gray"),
        ... <other theme elements>)
```
##Geometric Objects(geom_XX) and Aesthetics (aes())
``` bash
geom_<tab>查看所有Geometric Objects（几何学对象）
```
##Statistical Transformations（统计变换）
统计变换 （stat_） 比如求均值，求方差等，当我们需要展示出某个变量的某种统计特征的时候，需要用到统计变换。
每一个<code>geom_XX</code>都有一个默认的统计量，可通过<code>args(geom_XX)</code>查看（<code>args(stat_bin)</code>）例如<code>geom_bar</code>的默认统计量是<code>stat_count</code>,表示进行计数。什么意思呢？举例如下：
``` bash
> library(ggplot2)
> df <- data.frame(trt = c("a","a", "b", "c"), outcome = c(2.3,5, 1.9, 3.2))
> df
  trt outcome
1   a     2.3
2   a     5.0
3   b     1.9
4   c     3.2
> ##stat()
> ggplot(df, aes(trt, outcome)) +
  geom_bar()
Error: stat_count() must not be used with a y aesthetic.
#成功报错，因为第一句aes()中我们指定了y轴为outcome，即一个x轴的trt值对应一个y轴的outcome值，而geom_bar()
#中stat_count要进行计数，即计数trt中相同值出现的次数.最终y轴指定的outcome与需要表示的count值冲突，报错。
##解决：
> ggplot(df, aes(trt)) +
  geom_bar()
```
![](http://7xk19o.com1.z0.glb.clouddn.com/count.png)
如果想要表示相同trt值相加后的对应值，修改stat=indentity即可。
``` bash
> ggplot(df, aes(trt, outcome)) +
+   geom_bar(stat = "identity")
```
![](http://7xk19o.com1.z0.glb.clouddn.com/indentity.png)
ggplot2中包含的统计变换有如下多种：
![](http://7xk19o.com1.z0.glb.clouddn.com/stat.png)
更多参见：https://www.zhihu.com/question/24779017
##Scales
### 控制<code>aes()</code>映射
Aesthetic (<code>aes()</code>) 映射仅仅是告诉一个变量应该映射到一个aesthetic，但并没有说明如何映射？例如，当我们用<code>aes(shape=x)</code>去映射一个变量到shape时，并没有说明用什么shape；同样的，<code>aes(color=z)</code>并无说明用什么颜色；通常在我们未定义这些时ggplot2会自动用默认值，而我们可以通过<em>scale</em>来修改这些值。
在ggplot2中scales包括：
<li>position</li>
<li>color and fill</li>
<li>size</li>
<li>shape</li>
<li>line type</li>
<li>x,y</li>
### 修改方式
``` bash
scale_<aesthetic>_<type>(name,limits,breaks,labels)
通过键入scale_<tab>查看全部可修改函数。
```
特殊scale函数有额外参数，例如对颜色的修改<code>scale_color_continuous</code>函数有<code>low</code>和<code>high</code>参数。
``` bash
scale_x_discrete(name="State Abbreviation") +
scale_color_continuous(name="",
                         breaks = c(19751, 19941, 20131),
                         labels = c(1971, 1994, 2013),
                         low = "blue", high = "red")
```
![](http://7xk19o.com1.z0.glb.clouddn.com/modifyScales3.png)
## Faceting
### 分面: 一页多图
<code>facet_wrap()</code>：对数据分类只能应用一个标准，例<code>facet_wrap(~State, ncol = 10))</code>,按State分组后每行设置10个小图依次画出全部。
<code>facet_grid()</code>：多个标准对数据进行分组绘图,<code>facet_grid(color~cut，margins=TRUE)</code>，波浪号前为小图分行标准，后面为分列标准，margins指用于分面的包含每个变量元素所有数据的数据组，相当于每个小图一个title。
## Themes
### 主题
更多ggplot2主题演示如下：
http://docs.ggplot2.org/dev/vignettes/themes.html
https://github.com/jrnold/ggthemes
### 修改主题默认值
``` bash
theme_minimal() +
  theme(text = element_text(color = "turquoise"))
```
### 自定义主题
``` bash
theme_new <- theme_bw() +
  theme(plot.background = element_rect(size = 1, color = "blue", fill = "black"),
        text=element_text(size = 12, family = "Serif", color = "ivory"),
        axis.text.y = element_text(colour = "purple"),
        axis.text.x = element_text(colour = "red"),
        panel.background = element_rect(fill = "pink"),
        strip.background = element_rect(fill = muted("orange")))

p5 + theme_new
```
## 关于晕晕的aes()
<li><strong>任何与数据向量顺序相关，需要逐个指定的参数都必须写在aes里</strong></li>
<li>什么？还是搞不清该放aes里面还是外面？那就记着想统一整个图层时就放到aes外，想分成不同组调整，并且已经有一个与x、y长度一致的分组变量了，那就放到aes里</li>
##其他总结
<li>加注释，所有注释的实现都是通过annotate函数实现的，geom_text()是兼职的。</li>
<li>theme函数最妙的地方是将对于数据相关的美学调整和与数据无关的美学调整分离，将数据处理与数据美学分开，数据美学与数据无关的调整分开。</li>


