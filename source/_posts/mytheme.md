title: ggplot2 fine drawing using mytheme
date: 2015-07-31 22:45:06
tags: mytheme
categories: R
---
ggplot2本身自带了很漂亮的主题格式，如theme_gray和theme_bw。但是在工作用图上，很多时候对图表格式配色字体等均有明文的规定。ggplot2允许我们事先定制好图表样式，我们可以生成如mytheme或者myline这样的有明确配色主题的对象，到时候就可以定制保存图表模板或者格式刷，直接在生成的图表里引用格式刷型的主题配色，就可以快捷方便的更改图表内容，保持风格的统一了。
##画图前的准备：自定义ggplot2格式刷
``` bash
library(ggplot2)
library(dplyr)
library(RColorBrewer)
library(tidyr)
library(grid)
#定义好字体
windowsFonts(CA=windowsFont("Calibri"))
#事先定制好要加图形的形状、颜色、主题等
#定制主题，要求背景全白，没有边框。然后所有的字体都是某某颜色
mytheme<-theme_bw()+theme(legend.position="right",
                          panel.border=element_blank(),
                          panel.grid.major=element_line(linetype="dashed"),
                          panel.grid.minor=element_blank(),
                          plot.title=element_text(size=15,
                                                  colour="#003087",
                                                  family="CA"),
                          legend.text=element_text(size=9,colour="#003087",
                                                   family="CA"),
                          legend.key=element_blank(),
                          axis.text=element_text(size=10,colour="#003087",
                                                 family="CA"),
                          strip.text=element_text(size=12,colour="#EF0808",
                                                  family="CA"),
                          strip.background=element_blank()

                        )
#饼图主题
pie_theme=mytheme+theme(axis.text=element_blank(),
                        axis.ticks=element_blank(),
                        axis.title=element_blank(),
                        panel.grid.major=element_blank())
#定制线的大小
myline_blue<-geom_line(colour="#085A9C",size=2)
myline_red<-geom_line(colour="#EF0808",size=2)
myarea=geom_area(colour=NA,fill="#003087",alpha=.2)
mypoint=geom_point(size=3,shape=21,colour="#003087",fill="white")
mybar=geom_bar(fill="#0C8DC4",stat="identity")
#然后是配色（主要是图形配色），考虑到样本的多样性，可以事先设定颜色，如3种颜色或7种颜色的组合，如果想要用原来默认主题颜色则这部分注释掉即可
mycolour_3<-scale_fill_manual(values=c("#085A9C","#EF0808","#526373"))
mycolour_7<-scale_fill_manual(values=c("#085A9C","#EF0808","#526373",
"#FFFFE7","#FF9418","#219431","#9C52AD"))
mycolour_line_7<-scale_color_manual(values=c("#085A9C","#EF0808","#526373",
                                             "#0C8DC4","#FF9418","#219431","#9C52AD"))
#定制标题
mytitle<-labs(title = "hope 实例")
```
###载入例子数据
``` bash
require(ggplot2)
data(diamonds)
set.seed(42)
small <- diamonds[sample(nrow(diamonds), 1000), ]
head(small)
```
###不用自定义格式画图
``` bash
ggplot(small)+geom_bar(aes(x=clarity, fill=cut))+coord_polar()
```
![](http://7xk19o.com1.z0.glb.clouddn.com/Rplot01.jpeg)
###利用自定义格式画图
``` bash
ggplot(small)+geom_bar(aes(x=clarity, fill=cut))+coord_polar()+ mytheme + mytitle
```
![](http://7xk19o.com1.z0.glb.clouddn.com/Rplot.jpeg)
##画图前的准备：数据塑形利器dplyr/tidyr
在R里，则是用一些常用的包，如dplyr及tidyr，基本用的都是reshape2+plyr的组合对数据进行重塑再造.
###载入数据，数据来源: <a style="line-height: 1.5;" href="http://www.yucezhe.com/product?name=tick-data-push" target="_blank">股票的成交明细.</a>
``` bash
> data<-read.table("gupiao.txt",header=TRUE)
> head(data)
     Time Price BuySell Volume     Money
1 9:25:08 18.03    0.00  73520 132557642
2 9:29:59 17.99   -0.04  11034  19857700
3 9:30:09 17.99    0.00  28920  52089378
4 9:30:09 17.99    0.00   9272  16681906
5 9:30:14 17.96   -0.03    556    998913
6 9:30:19 17.96    0.00    873   1567490
> dim(data)
[1] 2345    5
```
###将数据汇总(group_by & summarize) 甚至再拆分 (spread)
示例里面就是把成交记录按照成交Price和BuySell拆分
``` bash
> data %>% group_by(Price,BuySell) %>% summarize(Money=sum(Money,na.rm=TRUE)) %>% spread(BuySell,Money)
Source: local data frame [46 x 16]

   Price -0.07 -0.06 -0.05    -0.04   -0.03    -0.02    -0.01        0     0.01
1  17.58    NA    NA    NA       NA      NA       NA 41631769 29645465       NA
2  17.59    NA    NA    NA       NA      NA 17173618 37029276       NA 24179724
3  17.60    NA    NA    NA       NA      NA   318581 42756941 15987562 11197676
4  17.61    NA    NA    NA       NA      NA       NA 58098336 36701330 14999088
5  17.62    NA    NA    NA       NA      NA       NA 32385632 51156365 24341609
6  17.63    NA    NA    NA       NA      NA  5191027 16112558 32054647 23599759
7  17.64    NA    NA    NA 24642084 3725529 14682967  4791698 18864232  4731619
8  17.65    NA    NA    NA       NA 3918096  6003983 16293279 19115145 13177514
9  17.66    NA    NA    NA       NA 5175002       NA 54169855 16671362  7801764
10 17.67    NA    NA    NA       NA      NA 10951987 38090607  8704892  7911066
..   ...   ...   ...   ...      ...     ...      ...      ...      ...      ...
Variables not shown: 0.02 (int), 0.03 (int), 0.04 (int), 0.05 (int), 0.06 (int),
  0.07 (int)
```
然后便可用ggplot等包绘图。
##常用图形
``` bash
简单柱形图+文本（单一变量） 
分面柱形图（facet_wrap/facet_grid) 
簇型柱形图(position="dodge") 
堆积柱形图(需要先添加百分比，再对百分比的变量做柱形图) 
饼图、极坐标图 
多重线性图
```
1)简单柱形图 

![](http://7xk19o.com1.z0.glb.clouddn.com/11.jpeg)
代码组成如下，这里使用格式刷mybar和mytheme，然后用geom_text添加柱形图标签(vjust=1表示在柱形图里面显示)
``` bash
data1<-diamonds %>% group_by(cut) %>% summarize(avg_price=mean(price))
bar_chart<-ggplot(data1,aes(x=cut,y=avg_price,fill=as.factor(cut)))+
        mybar+mytheme+mytitle+
        geom_text(aes(label=round(avg_price)),vjust=1,colour="white")
bar_chart
```
2）带分类的柱形图
使用facet_wrap或者facet_grid可以快速绘制相应图形。这也是ggplot2不太支持双坐标的原因：可以快速绘图，就不需要做那么多无用功了。 
![](http://7xk19o.com1.z0.glb.clouddn.com/22.jpeg)
代码如下：
``` bash
#dplyr处理数据
data2<-diamonds %>% group_by(cut,color) %>% summarize(avg_price=mean(price))
#画图，套用设定好的绘图元素
ggplot(data2,aes(x=color,y=avg_price))+facet_wrap(~cut,ncol = 2)+
        mybar+mytheme+mytitle
#在facet_wrap里面，如果加上scales="free"的话，坐标就不一样了。
```

3）簇型图 
制图要点是，对数据作图后，添加geom_bar时，position="dodge"（分开的）如果去掉这部分，默认是生成堆积图.


![](http://7xk19o.com1.z0.glb.clouddn.com/33.jpeg)
代码如下：

``` bash
data3<-diamonds %>% filter(cut %in% c("Fair","Very Good","Ideal")) %>%
        group_by(cut,color) %>% summarize(avg_price=mean(price))
#簇状图
簇状柱形图<-ggplot(data3,aes(x=color,y=avg_price,fill=cut))+
        geom_bar(stat="identity",position="dodge")+
        mytheme+mytitle+mycolour_3 
```
这里如果想要定义颜色的相应顺序的话，可以使用factor 

譬如以下,只是用这行代码对颜色重新定义一下，用levels改变factor顺序，再画图的时候，颜色以及柱子顺序就会跟着改变了。非常方便。
``` bash
data3$cut<-factor(data3$cut,levels=c("Very Good","Ideal","Fair"))
```

4）百分比堆积图 
制图前要事先添加一个百分比的数据之后才好作图，这里我们用mutate(percent=n/sum(n))添加该百分比数据。同时去掉position="dodge" 
![](http://7xk19o.com1.z0.glb.clouddn.com/66.jpeg)
``` bash
data4<-diamonds %>% filter(cut %in% c("Fair","Very Good","Ideal")) %>%
         count(color,cut) %>% 
        mutate(percent=n/sum(n))
堆积图<-ggplot(data4,aes(x=color,y=percent,fill=cut))+mytitle+
        geom_bar(stat="identity")+mytheme+mycolour_3
```
当然，也可以做面积图。不过如果数据有缺失，面积图出错几率蛮大的

5）饼图以及极坐标图

在ggplot2里并没有直接画饼图的方法，基本上都是先画出柱形图，再用coord_polar转化为饼图. 
不指定x轴，直接用geom_bar生成y轴，然后fill=分类颜色，coord_polar直接投影y轴，该方法的好处代码是比较简单：coord_polar("y") 。
加标签方法请见： http://stackoverflow.com/questions/8952077/pie-plot-getting-its-text-on-top-of-each-other
![](http://7xk19o.com1.z0.glb.clouddn.com/77.jpeg) 
``` bash
data5<-diamonds %>% count(cut) %>% 
        mutate(percent=n/sum(n))
ggplot(data5,aes(x=factor(1),y=percent,fill=cut))+geom_bar(stat="identity",width=3)+mycolour_7+
        coord_polar("y")+pie_theme+mytitle
```
6、折线图 
![](http://7xk19o.com1.z0.glb.clouddn.com/88.jpeg) 
要点是，先做成如A-B-变量这样的二联表，然后，x轴为A，group为b,colour为b 
下面代码展示了这个处理 
如果去掉group的话，折线图会不知道怎么去处理数字。
``` bash
data6<-diamonds %>% count(color,cut) %>% filter(color %in% c("D","E","F"))%>%
        mutate(percent=n/sum(n))
ggplot(data6,aes(x=cut,y=n,group=color,colour=color))+geom_line(size=1.5)+mypoint+
        mycolour_line_7+mytheme+mytitle
```