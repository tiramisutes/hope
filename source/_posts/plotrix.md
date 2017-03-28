title: R作图--坐标中断(axis breaks)-- plotrix
date: 2015-10-05 13:12:51
tags: coordinates
categories: R
---
R当中的坐标中断一般都使用plotrix库中的axis.break(), gap.plot(), gap.barplot(), gap.boxplot()等几个函数来实现.
##axis.break
``` bash
library(plotrix)
opar<-par(mfrow=c(1,3))
plot(sample(5:7,20,replace=T),main="Axis break test of gap",ylim=c(2,8))
axis.break(axis=2,breakpos=3.5,breakcol="red",style="gap")
plot(sample(5:7,20,replace=T),main="Axis break test of slash",ylim=c(2,8))
axis.break(axis=2,breakpos=3.5,breakcol="red",style="slash")
plot(sample(5:7,20,replace=T),main="Axis break test of zigzag",ylim=c(2,8))
axis.break(axis=2,breakpos=3.5,breakcol="red",style="zigzag")
par(opar)
```
![](http://7xk19o.com1.z0.glb.clouddn.com/plotrix1.png)
###parameters
``` bash
axis.break(axis=1,breakpos=NULL,pos=NA,bgcol="white",breakcol="black",
           style="slash",brw=0.02)
axis：    which axis to break,1=x轴，2=y轴，3=顶端x轴，4=右y轴
breakpos：where to place the break in user units
pos：     position of the axis (see axis)
bgcol：   the color of the plot background
breakcol：the color of the "break" marker
style：   Either gap, slash or zigzag
brw：     break width relative to plot width
```
##gap.plot
``` bash
opar<-par(mfrow=c(1,3))
twogrp<-c(rnorm(5)+4,rnorm(5)+20,rnorm(5)+5,rnorm(5)+22)
gap.plot(twogrp,gap=c(8,16,25,35),
          xlab="X values",ylab="Y values",xlim=c(1,30),ylim=c(0,45),
          main="Test two gap plot with the lot",xtics=seq(0,30,by=5),
          ytics=c(4,6,18,20,22,38,40,42),
          lty=c(rep(1,10),rep(2,10)),
          pch=c(rep(2,10),rep(3,10)),
          col=c(rep(2,10),rep(3,10)),
          type="b")
gap.plot(21:30,rnorm(10)+40,gap=c(8,16,25,35),add=TRUE,
         lty=rep(3,10),col=rep(4,10),type="l")
gap.barplot(twogrp,gap=c(8,16),xlab="Index",ytics=c(3,6,17,20),
         ylab="Group values",main="Barplot with gap")
gap.barplot(twogrp,gap=c(8,16),xlab="Index",ytics=c(3,6,17,20),
         ylab="Group values",horiz=TRUE,main="Horizontal barplot with gap")
par(opar)
```
![](http://7xk19o.com1.z0.glb.clouddn.com/plotrix2.png)
``` bash
opar<-par(mfrow=c(1,2))
twovec<-list(vec1=c(rnorm(30),-6),vec2=c(sample(1:10,40,TRUE),20))
gap.boxplot(twovec,gap=list(top=c(12,18),bottom=c(-5,-3)),
        main="Show outliers separately")
gap.boxplot(twovec,gap=list(top=c(12,18),bottom=c(-5,-3)),range=0,
         main="Include outliers in whiskers")
par(opar)
```
![](http://7xk19o.com1.z0.glb.clouddn.com/plotrix3.png)
``` bash
twogrp<-c(rnorm(5)+4,rnorm(5)+20,rnorm(5)+5,rnorm(5)+22)
gpcol<-c(2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5)
gap.plot(twogrp,gap=c(8,16),xlab="Index",ylab="Group values", main="E ",col=gpcol)
legend(19, 9.5, c("2","3","4","5"), pch = 1, col = 2:5)
```
![](http://7xk19o.com1.z0.glb.clouddn.com/plotrix4.png)
###parameters
``` bash
gap.plot(x,y,gap,gap.axis="y",bgcol="white",breakcol="black",brw=0.02,xlim=range(x),ylim=range(y),
xticlab,xtics=NA,yticlab,ytics=NA,lty=rep(1,length(x)),col=rep(par("col"),length(x)),
pch=rep(1,length(x)),add=FALSE,stax=FALSE,...)
 
x,y:      data values
gap:      the range(s) of values to be left out  省略的轴
gap.axis: whether the gaps are to be on the x or y axis   在哪个轴上省略
bgcol:    the color of the plot background
breakcol: the color of the "break" marker
brw:      break width relative to plot width
xlim,ylim:the plot limits.
xticlab:  labels for the x axis ticks
xtics:    position of the x axis ticks  #x轴显示的表号
yticlab:  labels for the y axis ticks
ytics:    position of the y axis ticks
lty:      line type(s) to use if there are lines
col:      color(s) in which to plot the values
pch:      symbols to use in plotting.
add:      whether to add values to an existing plot.
stax:     whether to call staxlab for staggered axis labels.
```
##gap.barplot
使用gap.plot, gap.barplot, gap.boxplot之后重新使用axis.break来修改中断类型，使得看上去美一点,
并绘制出双反斜线中断，可以视实际情况延伸断点起止位置.
``` bash
library(plotrix)
opar<-par(mfrow=c(2,2))
x<-c(1:5,6.9,7)
y<-2^x
from<-33
to<-110
plot(x,y,type="b",main="normal plot")
gap.plot(x,y,gap=c(from,to),type="b",main="gap plot")
axis.break(2,from,breakcol="red",style="gap")
axis.break(2,from*(1+0.02),breakcol="black",style="slash")
axis.break(4,from*(1+0.02),breakcol="black",style="slash")
axis(2,at=from)
gap.barplot(y,gap=c(from,to),col=as.numeric(x),main="barplot with gap")
axis.break(2,from,breakcol="red",style="gap")
axis.break(2,from*(1+0.02),breakcol="black",style="slash")
axis.break(4,from*(1+0.02),breakcol="black",style="slash")
axis(2,at=from)
gap.barplot(y,gap=c(from,to),col=as.numeric(x),horiz=T,main="Horizontal barplot with gap")
axis.break(1,from,breakcol="red",style="gap")
axis.break(1,from*(1+0.02),breakcol="black",style="slash")
axis.break(3,from*(1+0.02),breakcol="black",style="slash")
axis(1,at=from) 
par(opar)
```
![](http://7xk19o.com1.z0.glb.clouddn.com/plotrix5.png)
<i class="fa fa-diamond"></i>如果画图过程中困惑了，记得重新来看一下内容，有惊喜：
``` bash
x1=c(3,5,6,9,375,190);
x1
x2=c(2,2,3,30,46,60);
x2
data=rbind(x1,x2);
data
colnames(data)=c("Pig","Layer","Broiler","Dairy","Beef","Sheep")
rownames(data)=c("1980","2010")
data
library(plotrix)
newdata<-data
newdata[newdata>200]<-newdata[newdata>200]-150
newdata
barpos<-barplot(newdata,names.arg=colnames(newdata),
                ylim=c(0,250),beside=TRUE,col=c("darkblue","red"),axes=FALSE)
axis(2,at=c(0,50,100,150,200,235),
     labels=c(0,50,100,150,200,375))
box()
axis.break(2,210,style="gap")
```
![](http://7xk19o.com1.z0.glb.clouddn.com/axis.png)
Contribution from ：http://www.dataguru.cn/article-4827-1.html