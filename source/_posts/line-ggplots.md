title: quick start guide of ggplot2 line plot  - R software and data visualization
date: 2015-09-21 14:29:22
tags: error_bars
categories: R
---
<p>This <strong>R tutorial</strong> describes how to create <strong>line plots</strong> using <strong>R software</strong> and <strong>ggplot2</strong> package.</p>
<p>In a line graph, observations are ordered by x value and connected.</p>
<p>The functions <strong>geom_line()</strong>, <strong>geom_step()</strong>, or <strong>geom_path()</strong> can be used.</p>
<p>x value (for x axis) can be :</p>
<ul>
<li>date : for a time series data</li>
<li>texts</li>
<li>discrete numeric values</li>
<li>continuous numeric values</li>
</ul>
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-logo-data-visualization-1.png"  width="384" /></p>
<div id="basic-line-plots" class="section level1">
<h1>Basic line plots</h1>
<div id="data" class="section level2">
<h2>Data</h2>
<p>Data derived from <em>ToothGrowth</em> data sets are used. ToothGrowth describes the effect of Vitamin C on tooth growth in Guinea pigs.</p>
``` bash
df <- data.frame(dose=c("D0.5", "D1", "D2"),
                len=c(4.2, 10, 29.5))

head(df)
##   dose  len
## 1 D0.5  4.2
## 2   D1 10.0
## 3   D2 29.5
```
<ul>
<li><em>len</em> : Tooth length<br /></li>
<li><em>dose</em> : Dose in milligrams (0.5, 1, 2)</li>
</ul>
</div>
<div id="create-line-plots-with-points" class="section level2">
<h2>Create line plots with points</h2>
``` bashlibrary(ggplot2)
# Basic line plot with points
ggplot(data=df, aes(x=dose, y=len, group=1)) +
  geom_line()+
  geom_point()

# Change the line type
ggplot(data=df, aes(x=dose, y=len, group=1)) +
  geom_line(linetype = "dashed")+
  geom_point()

# Change the color
ggplot(data=df, aes(x=dose, y=len, group=1)) +
  geom_line(color="red")+
  geom_point()```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-basic-data-visualization-1.png"  width="240" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-basic-data-visualization-2.png"  width="240" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-basic-data-visualization-3.png"  width="240" /></p>
<p>Read more on line types : <a href="http://www.sthda.com/english/wiki/ggplot2-line-types-how-to-change-line-types-of-a-graph-in-r-software">ggplot2 line types</a></p>
<p>You can add an arrow to the line using the <em>grid</em> package :</p>
``` bash
library(grid)
# Add an arrow
ggplot(data=df, aes(x=dose, y=len, group=1)) +
  geom_line(arrow = arrow())+
  geom_point()

# Add a closed arrow to the end of the line
myarrow=arrow(angle = 15, ends = "both", type = "closed")
ggplot(data=df, aes(x=dose, y=len, group=1)) +
  geom_line(arrow=myarrow)+
  geom_point()
```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-add-arrow-data-visualization-1.png"  width="240" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-add-arrow-data-visualization-2.png"  width="240" /></p>
<p>Observations can be also connected using the functions <strong>geom_step()</strong> or <strong>geom_path()</strong> :</p>
``` bash
ggplot(data=df, aes(x=dose, y=len, group=1)) +
  geom_step()+
  geom_point()


ggplot(data=df, aes(x=dose, y=len, group=1)) +
  geom_path()+
  geom_point()
```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-geom-step-data-visualization-1.png"  width="240" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-geom-step-data-visualization-2.png"  width="240" /></p>
<br/>
<div class="block">
<ul>
<li><strong>geom_line</strong> : Connecting observations, ordered by x value</li>
<li><strong>geom_path()</strong> : Observations are connected in original order</li>
<li><strong>geom_step</strong> : Connecting observations by stairs</li>
</ul>
</div>
</div>
</div>
<div id="line-plot-with-multiple-groups" class="section level1">
<h1>Line plot with multiple groups</h1>
<div id="data-1" class="section level2">
<h2>Data</h2>
<p>Data derived from <em>ToothGrowth</em> data sets are used. ToothGrowth describes the effect of Vitamin C on tooth growth in Guinea pigs. Three dose levels of Vitamin C (0.5, 1, and 2 mg) with each of two delivery methods [orange juice (OJ) or ascorbic acid (VC)] are used :</p>
``` bash
df2 <- data.frame(supp=rep(c("VC", "OJ"), each=3),
                dose=rep(c("D0.5", "D1", "D2"),2),
                len=c(6.8, 15, 33, 4.2, 10, 29.5))

head(df2)
##   supp dose  len
## 1   VC D0.5  6.8
## 2   VC   D1 15.0
## 3   VC   D2 33.0
## 4   OJ D0.5  4.2
## 5   OJ   D1 10.0
## 6   OJ   D2 29.5```
<ul>
<li><em>len</em> : Tooth length<br /></li>
<li><em>dose</em> : Dose in milligrams (0.5, 1, 2)</li>
<li><em>supp</em> : Supplement type (VC or OJ)</li>
</ul>
</div>
<div id="create-line-plots" class="section level2">
<h2>Create line plots</h2>
<p>In the graphs below, line types, colors and sizes are the same for the two groups :</p>
``` bash
# Line plot with multiple groups
ggplot(data=df2, aes(x=dose, y=len, group=supp)) +
  geom_line()+
  geom_point()

# Change line types
ggplot(data=df2, aes(x=dose, y=len, group=supp)) +
  geom_line(linetype="dashed", color="blue", size=1.2)+
  geom_point(color="red", size=3)
 ```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-multiple-groups-data-visualization-1.png"  width="240" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-multiple-groups-data-visualization-2.png"  width="240" /></p>
</div>
<div id="change-line-types-by-groups" class="section level2">
<h2>Change line types by groups</h2>
<p>In the graphs below, line types and point shapes are controlled automatically by the levels of the variable <em>supp</em> :</p>
``` bash
# Change line types by groups (supp)
ggplot(df2, aes(x=dose, y=len, group=supp)) +
  geom_line(aes(linetype=supp))+
  geom_point()

# Change line types and point shapes
ggplot(df2, aes(x=dose, y=len, group=supp)) +
  geom_line(aes(linetype=supp))+
  geom_point(aes(shape=supp)
 ```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-multiple-groups-change-line-type-data-visualization-1.png"  width="259.2" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-multiple-groups-change-line-type-data-visualization-2.png"  width="259.2" /></p>
<p>It is also possible to change manually the line types using the function <strong>scale_linetype_manual()</strong>.</p>
``` bash
# Set line types manually
ggplot(df2, aes(x=dose, y=len, group=supp)) +
  geom_line(aes(linetype=supp))+
  geom_point()+
  scale_linetype_manual(values=c("twodash", "dotted"))
```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-multiple-groups-manual-scale-data-visualization-1.png"  width="288" /></p>
<p>You can read more on line types here : <a href="http://www.sthda.com/english/wiki/ggplot2-line-types-how-to-change-line-types-of-a-graph-in-r-software">ggplot2 line types</a></p>
<p><span class="warning">If you want to change also point shapes, read this article : <a href="http://www.sthda.com/english/wiki/ggplot2-point-shapes">ggplot2 point shapes</a></span></p>
</div>
<div id="change-line-colors-by-groups" class="section level2">
<h2>Change line colors by groups</h2>
<p>Line colors are controlled automatically by the levels of the variable <em>supp</em> :</p>
``` bash
p<-ggplot(df2, aes(x=dose, y=len, group=supp)) +
  geom_line(aes(color=supp))+
  geom_point(aes(color=supp))
p
```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-change-line-color-data-visualization-1.png"  width="240" /></p>
<p>It is also possible to <em>change manually line colors</em> using the functions :</p>
<ul>
<li><em>scale_color_manual()</em> : to use custom colors</li>
<li><em>scale_color_brewer()</em> : to use color palettes from <em>RColorBrewer</em> package</li>
<li><em>scale_color_grey()</em> : to use grey color palettes</li>
</ul>
``` bash
# Use custom color palettes
p+scale_color_manual(values=c("#999999", "#E69F00", "#56B4E9"))

# Use brewer color palettes
p+scale_color_brewer(palette="Dark2")

# Use grey scale
p + scale_color_grey() + theme_classic()
```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-group-line-manual-color-data-visualization-1.png"  width="240" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-group-line-manual-color-data-visualization-2.png"  width="240" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-group-line-manual-color-data-visualization-3.png"  width="240" /></p>
<p>Read more on ggplot2 colors here : <a href="http://www.sthda.com/english/wiki/ggplot2-colors-how-to-change-colors-automatically-and-manually">ggplot2 colors</a></p>
</div>
</div>
<div id="change-the-legend-position" class="section level1">
<h1>Change the legend position</h1>
``` bash
p <- p + scale_color_brewer(palette="Paired")+
  theme_minimal()

p + theme(legend.position="top")

p + theme(legend.position="bottom")

# Remove legend
p + theme(legend.position="none")
```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-legend-position-data-visualization-1.png"  width="240" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-legend-position-data-visualization-2.png"  width="240" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-legend-position-data-visualization-3.png"  width="240" /></p>
<p><span class="success">The allowed values for the arguments <strong>legend.position</strong> are : "left","top", "right", "bottom".</span></p>
<p>Read more on ggplot legend : <a href="http://www.sthda.com/english/wiki/ggplot2-legend-easy-steps-to-change-the-position-and-the-appearance-of-a-graph-legend-in-r-software">ggplot2 legend</a></p>
</div>
<div id="line-plot-with-a-numeric-x-axis" class="section level1">
<h1>Line plot with a numeric x-axis</h1>
<p>If the variable on x-axis is numeric, it can be useful to treat it as a continuous or a factor variable depending on what you want to do :</p>
``` bash
# Create some data
df2 <- data.frame(supp=rep(c("VC", "OJ"), each=3),
                dose=rep(c("0.5", "1", "2"),2),
               len=c(6.8, 15, 33, 4.2, 10, 29.5))
head(df2)
##   supp dose  len
## 1   VC  0.5  6.8
## 2   VC    1 15.0
## 3   VC    2 33.0
## 4   OJ  0.5  4.2
## 5   OJ    1 10.0
## 6   OJ    2 29.5
```
``` bash
# x axis treated as continuous variable
df2$dose <- as.numeric(as.vector(df2$dose))
ggplot(data=df2, aes(x=dose, y=len, group=supp, color=supp)) +
  geom_line() + geom_point()+
  scale_color_brewer(palette="Paired")+
  theme_minimal()

# Axis treated as discrete variable
df2$dose<-as.factor(df2$dose)
ggplot(data=df2, aes(x=dose, y=len, group=supp, color=supp)) +
  geom_line() + geom_point()+
  scale_color_brewer(palette="Paired")+
  theme_minimal()
```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-numeric-x-axis-data-visualization-1.png"  width="240" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-numeric-x-axis-data-visualization-2.png"  width="240" /></p>
</div>
<div id="line-plot-with-dates-on-x-axis" class="section level1">
<h1>Line plot with dates on x-axis</h1>
<p><em>economics</em> time series data sets are used :</p>
``` bash
head(economics)
        date   pce    pop psavert uempmed unemploy
## 1 1967-06-30 507.8 198712     9.8     4.5     2944
## 2 1967-07-31 510.9 198911     9.8     4.7     2945
## 3 1967-08-31 516.7 199113     9.0     4.6     2958
## 4 1967-09-30 513.3 199311     9.8     4.9     3143
## 5 1967-10-31 518.5 199498     9.7     4.7     3066
## 6 1967-11-30 526.2 199657     9.4     4.8     3018
```
<p>Plots :</p>
``` bash
# Basic line plot
ggplot(data=economics, aes(x=date, y=pop))+
  geom_line()

# Plot a subset of the data
ggplot(data=subset(economics, date &gt; as.Date("2006-1-1")), 
       aes(x=date, y=pop))+geom_line()
```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-time-serie-data-data-visualization-1.png"  width="259.2" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-time-serie-data-data-visualization-2.png"  width="259.2" /></p>
<p>Change line size :</p>
``` bash
# Change line size
ggplot(data=economics, aes(x=date, y=pop, size=unemploy/pop))+
  geom_line()
```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-time-serie-data-line-size-data-visualization-1.png"  width="384" /></p>
</div>
<div id="line-graph-with-error-bars" class="section level1">
<h1>Line graph with error bars</h1>
<p>The function below will be used to calculate the mean and the standard deviation, for the variable of interest, in each group :</p>
``` bash
#+++++++++++++++++++++++++
# Function to calculate the mean and the standard deviation
  # for each group
#+++++++++++++++++++++++++
# data : a data frame
# varname : the name of a column containing the variable
  #to be summariezed
# groupnames : vector of column names to be used as
  # grouping variables
data_summary <- function(data, varname, groupnames){
  require(plyr)
  summary_func <- function(x, col){
    c(mean = mean(x[[col]], na.rm=TRUE),
      sd = sd(x[[col]], na.rm=TRUE))
  }
  data_sum<-ddply(data, groupnames, .fun=summary_func,
                  varname)
  data_sum <- rename(data_sum, c("mean" = varname))
 return(data_sum)
}
```
<p>Summarize the data :</p>
``` bash
df3 <- data_summary(ToothGrowth, varname="len", 
                    groupnames=c("supp", "dose"))
head(df3)
##   supp dose   len       sd
## 1   OJ  0.5 13.23 4.459709
## 2   OJ  1.0 22.70 3.910953
## 3   OJ  2.0 26.06 2.655058
## 4   VC  0.5  7.98 2.746634
## 5   VC  1.0 16.77 2.515309
## 6   VC  2.0 26.14 4.797731
```
<p>The function <strong>geom_errorbar()</strong> can be used to produce a line graph with error bars :</p>
``` bash
# Standard deviation of the mean
ggplot(df3, aes(x=dose, y=len, group=supp, color=supp)) + 
    geom_errorbar(aes(ymin=len-sd, ymax=len+sd), width=.1) +
    geom_line() + geom_point()+
   scale_color_brewer(palette="Paired")+theme_minimal()

# Use position_dodge to move overlapped errorbars horizontally
ggplot(df3, aes(x=dose, y=len, group=supp, color=supp)) + 
    geom_errorbar(aes(ymin=len-sd, ymax=len+sd), width=.1, 
    position=position_dodge(0.05)) +
    geom_line() + geom_point()+
   scale_color_brewer(palette="Paired")+theme_minimal()
```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-with-error-bar-data-visualization-1.png"  width="259.2" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-with-error-bar-data-visualization-2.png"  width="259.2" /></p>
</div>
<div id="customized-line-graphs" class="section level1">
<h1>Customized line graphs</h1>
``` bash
# Simple line plot
# Change point shapes and line types by groups
ggplot(df3, aes(x=dose, y=len, shape=supp, linetype=supp))+ 
    geom_errorbar(aes(ymin=len-sd, ymax=len+sd), width=.1, 
    position=position_dodge(0.05)) +
    geom_line() +
    geom_point()+
    labs(title="Plot of lengthby dose",x="Dose (mg)", y = "Length")+
    theme_classic()


# Change color by groups
# Add error bars
p <- ggplot(df3, aes(x=dose, y=len,  color=supp))+ 
    geom_errorbar(aes(ymin=len-sd, ymax=len+sd), width=.1, 
    position=position_dodge(0.05)) +
    geom_line(aes(linetype=supp)) + 
    geom_point(aes(shape=supp))+
    labs(title="Plot of lengthby dose",x="Dose (mg)", y = "Length")+
    theme_classic()

p + theme_classic() + scale_color_manual(values=c(&#39;#999999&#39;,&#39;#E69F00&#39;))
```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-customized-line-graph-data-visualization-1.png"  width="259.2" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-customized-line-graph-data-visualization-2.png"  width="259.2" /></p>
<p>Change colors manually :</p>
``` bash
p + scale_color_brewer(palette="Paired") + theme_minimal()

# Greens
p + scale_color_brewer(palette="Greens") + theme_minimal()

# Reds
p + scale_color_brewer(palette="Reds") + theme_minimal()
```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-customized-plot-change-color-data-visualization-1.png"  width="259.2" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-customized-plot-change-color-data-visualization-2.png"  width="259.2" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-line-plot-customized-plot-change-color-data-visualization-3.png"  width="259.2" /></p>
<h1>Infos</h1>
<p><span class="warning"> This analysis has been performed using <strong>R software</strong> (ver. 3.1.2) and <strong>ggplot2</strong> (ver. 1.0.0) </span></p>
Contribution from ：http://www.sthda.com/english/wiki/ggplot2-line-plot-quick-start-guide-r-software-and-data-visualization