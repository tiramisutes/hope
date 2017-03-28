title: 为图形添加文本
date: 2015-10-05 19:52:16
tags: plot-text
categories: R
---
``` bash
> text1<-read.delim("fun.txt",header=FALSE)
> text1
                                                                    V1
1                                   INFORMATION STORAGE AND PROCESSING
2                 [J] Translation, ribosomal structure and biogenesis 
3                                 [A] RNA processing and modification 
4                                                   [K] Transcription 
5                           [L] Replication, recombination and repair 
6                                [B] Chromatin structure and dynamics 
7                                     CELLULAR PROCESSES AND SIGNALING
8      [D] Cell cycle control, cell division, chromosome partitioning 
9                                               [Y] Nuclear structure 
10                                             [V] Defense mechanisms 
11                                 [T] Signal transduction mechanisms 
12                         [M] Cell wall/membrane/envelope biogenesis 
13                                                  [N] Cell motility 
14                                                   [Z] Cytoskeleton 
15                                       [W] Extracellular structures 
16  [U] Intracellular trafficking, secretion, and vesicular transport 
17   [O] Posttranslational modification, protein turnover, chaperones 
18                                                          METABOLISM
19                               [C] Energy production and conversion 
20                          [G] Carbohydrate transport and metabolism 
21                            [E] Amino acid transport and metabolism 
22                            [F] Nucleotide transport and metabolism 
23                              [H] Coenzyme transport and metabolism 
24                                 [I] Lipid transport and metabolism 
25                         [P] Inorganic ion transport and metabolism 
26   [Q] Secondary metabolites biosynthesis, transport and catabolism 
27                                                POORLY CHARACTERIZED
28                               [R] General function prediction only 
29                                               [S] Function unknown 
> a<-c("a","b","c");
> b<-c(1,2,3);
> c<-c(4,6,7);
> abc<-data.frame(a,b,c);
> abc;
  a b c
1 a 1 4
2 b 2 6
3 c 3 7
> library(reshape2);
> agcd<-melt(abc,id.vars="a",value.name="value",variable.name="bq");
> len<-nrow(text1);
> a1<-agcd[,1];
> b1<-agcd[,3];
> library(ggplot2);
> library(grid);
> vp1<-viewport(width=0.6,height=1,x=0.3,y=0.5);
> pm<-ggplot(agcd,aes(a1,weight=value,fill=bq))+geom_bar(position="dodge")+theme(legend.title=element_blank(),legend.position=c(0.1,0.9))+xlab("COG")+ylab("M82/smithella  and  M82/SB");
#之上为画图部分，下面开始绘制文本
> par(fig=c(0.55,1,0,1),bty="n");
> b<-20;
> plot(1:b,1:b,type="n",xaxt="n",yaxt="n",xlab="",ylab="");
> sum=b+b/(2*len);
> for(i in 1:(len)){
+   if (i %in% c(1,7,18,27) ){
+     text(1,sum,text1[i,],adj=0,cex=0.8,font=2);
+     sum=sum-b/(len);
+   }else{
+     text(1,sum,text1[i,],adj=0,cex=0.8);
+     sum=sum-b/(len);}}
#将图形和文本合并
> print(pm,vp=vp1);
```
![](http://7xk19o.com1.z0.glb.clouddn.com/plot-text.png)
###关键点解释
设置图形参数--函数par()
``` bash
adj：设定在text、mtext、title中字符串的对齐方向。0表示左对齐，0.5（默认值）表示居中，而1表示右对齐。
ann：如果ann=FALSE，那么高水平绘图函数会调用函数plot.default使对坐标轴名称、整体图像名称不做任何注解。
bty：用于限定图形的边框类型。如果bty的值为"o"（默认值）、"l"、"7"、"c"、"u"或者"]"中的任意一个，对应的边框类型就和该字母的形状相似，"n"，表示无边框。
fig: c(x1, x2, y1, y2)，设定当前图形在绘图设备中所占区域，需要满足x1<x2,y1<y2。如果修改参数fig，会自动打开一个新的绘图设备，而若希望在原来的绘图设备中添加新的图形，需要和参数new=TRUE一起使用。
fin：当前绘图区域的尺寸规格，形式为(width,height)。
lty：直线类型。参数的值可以为整数（0为空，1为实线（默认值），2为虚线，3为点线。
oma：参数形式为c(bottom, left, top, right) ，用于设定外边界。
```
![](http://7xk19o.com1.z0.glb.clouddn.com/fig.jpg)
melt()
``` bash
id.vars 是被当做维度的列变量，每个变量在结果中占一列；
measure.vars 是被当成观测值的列变量，它们的列变量名称和值分别组成 variable 和 value两列，列变量名称用variable.name 和 value.name来指定。
```
position()
``` bash
geom_bar(position="dodge")调整条形图排列方式，可选参数为"dodge，fill，identity，jitter，stack"。legend.position调整图例位置。
dodge："避让"方式，即往旁边闪，如柱形图的并排方式就是这种
fill：填充方式， 先把数据归一化，再填充到绘图区的顶部
identity：原地不动，不调整位置
jitter：随机抖一抖，让本来重叠的露出点头来
stack：叠罗汉
```

``` bash
b<-20;为自定义值，根据图形微调。
```
``` bash
1,7,18,27为文本文件中特殊行。
```
##附加
通过设置par（）绘制一页多图
``` bash
attach(mtcars)
opar<-par(no.readonly=T) 
par(fig=c(0,0.8,0,0.8))
plot(wt,mpg,xlab="Miles per Gallon",ylab="car weight")
par(fig=c(0,0.8,0.55,1),new=T)
boxplot(wt,horizontal=T,axes=F)
par(fig=c(0.65,1,0,0.8),new=T)
boxplot(mpg,axes=F)
par(opar)
detach(mtcars)
```
![](http://7xk19o.com1.z0.glb.clouddn.com/duotu.png)


<i class="fa fa-link"></i> Contribution from ：http://www.dataguru.cn/article-4827-1.html