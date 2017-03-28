title: ggplot2 error bars (finished)-Quick start guide - R software and data visualization
date: 2015-09-21 13:13:36
tags: error_bars
categories: R
---
<p>This <strong>tutorial</strong> describes how to create a <strong>graph</strong> with <strong>error bars</strong> using <strong>R software</strong> and <strong>ggplot2</strong> package. There are different types of <em>error bars</em> which can be created using the functions below :</p>
<ul>
<li>geom_errorbar()</li>
<li>geom_linerange()</li>
<li>geom_pointrange()</li>
<li>geom_crossbar()</li>
<li>geom_errorbarh()</li>
</ul>
<h1>Add error bars to a bar and line plots</h1>
<h2>Prepare the data</h2>
<p><em>ToothGrowth</em> data is used. It describes the effect of Vitamin C on tooth growth in Guinea pigs. Three dose levels of Vitamin C (0.5, 1, and 2 mg) with each of two delivery methods [orange juice (OJ) or ascorbic acid (VC)] are used :</p>
``` bash
library(ggplot2)
df <- ToothGrowth
df$dose <- as.factor(df$dose)
head(df)
   len supp dose
1  4.2   VC  0.5
2 11.5   VC  0.5
3  7.3   VC  0.5
4  5.8   VC  0.5
5  6.4   VC  0.5
6 10.0   VC  0.5
```
<li><em>len</em> : Tooth length<br /></li>
<li><em>dose</em> : Dose in milligrams (0.5, 1, 2)</li>
<li><em>supp</em> : Supplement type (VC or OJ)</li>
<p>In the example below, we'll plot the mean value of Tooth length in each group. The standard deviation is used to draw the error bars on the graph.</p>
<p>First, the helper function below will be used to calculate the mean and the standard deviation, for the variable of interest, in each group :</p>
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
df2 <- data_summary(ToothGrowth, varname="len", 
                    groupnames=c("supp", "dose"))
# Convert dose to a factor variable
df2$dose=as.factor(df2$dose)
head(df2)
   supp dose   len       sd
1   OJ  0.5 13.23 4.459709
2   OJ    1 22.70 3.910953
3   OJ    2 26.06 2.655058
4   VC  0.5  7.98 2.746634
5   VC    1 16.77 2.515309
6   VC    2 26.14 4.797731
```
<h2>Barplot with error bars</h2>
<p>The function <strong>geom_errorbar()</strong> can be used to produce the error bars :</p>
``` bash
library(ggplot2)
# Default bar plot
p<- ggplot(df2, aes(x=dose, y=len, fill=supp)) + 
  geom_bar(stat="identity", color="black", 
           position=position_dodge()) +
  geom_errorbar(aes(ymin=len-sd, ymax=len+sd), width=.2,
                 position=position_dodge(.9)) 
print(p)

# Finished bar plot
p+labs(title="Tooth length per dose", x="Dose (mg)", y = "Length")+
   theme_classic() +
   scale_fill_manual(values=c('#999999','#E69F00'))
```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-error-bar-barplot-data-visualization-1.png" width="359.2" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-error-bar-barplot-data-visualization-2.png" width="359.2" /></p>
Note that, you can chose to keep only the upper error bars
``` bash
# Keep only upper error bars
 ggplot(df2, aes(x=dose, y=len, fill=supp)) + 
  geom_bar(stat="identity", color="black", position=position_dodge()) +
  geom_errorbar(aes(ymin=len, ymax=len+sd), width=.2,
                 position=position_dodge(.9)) 
```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-error-bar-upper-error-bars-barplot-data-visualization-1.png" width="336" /></p>
<p>Read more on ggplot2 bar graphs : <a href="http://www.sthda.com/english/wiki/ggplot2-barplots-quick-start-guide-r-software-and-data-visualization">ggplot2 bar graphs</a></p>
<h2>Line plot with error bars</h2>
``` bash
# Default line plot
p<- ggplot(df2, aes(x=dose, y=len, group=supp, color=supp)) + 
  geom_line() +
  geom_point()+
  geom_errorbar(aes(ymin=len-sd, ymax=len+sd), width=.2,
                 position=position_dodge(0.05))
print(p)

# Finished line plot
p+labs(title="Tooth length per dose", x="Dose (mg)", y = "Length")+
   theme_classic() +
   scale_color_manual(values=c('#999999','#E69F00'))
```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-error-bar-line-plot-barplot-data-visualization-1.png" width="259.2" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-error-bar-line-plot-barplot-data-visualization-2.png" width="259.2" /></p>
<p><span class="warning">You can also use the functions <strong>geom_pointrange()</strong> or <strong>geom_linerange()</strong> instead of using <strong>geom_errorbar()</strong></span></p>
``` bash
# Use geom_pointrange
ggplot(df2, aes(x=dose, y=len, group=supp, color=supp)) + 
geom_pointrange(aes(ymin=len-sd, ymax=len+sd))

# Use geom_line()+geom_pointrange()
ggplot(df2, aes(x=dose, y=len, group=supp, color=supp)) + 
  geom_line()+
  geom_pointrange(aes(ymin=len-sd, ymax=len+sd))
```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-error-bar-point-range-barplot-data-visualization-1.png" width="240" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-error-bar-point-range-barplot-data-visualization-2.png" width="240" /></p>
<p>Read more on ggplot2 line plots : <a href="http://www.sthda.com/english/wiki/ggplot2-line-plot-quick-start-guide-r-software-and-data-visualization">ggplot2 line plots</a></p>
<h1>Dot plot with mean point and error bars</h1>
<p>The functions <strong>geom_dotplot()</strong> and <strong>stat_summary()</strong> are used :</p>
<p>The mean +/- SD can be added as a <em>crossbar</em> , a <strong>error bar</strong> or a <em>pointrange</em> :</p>
``` bash
p <- ggplot(df, aes(x=dose, y=len)) + 
    geom_dotplot(binaxis='y', stackdir='center')

# use geom_crossbar()
p + stat_summary(fun.data="mean_sdl", mult=1, 
                 geom="crossbar", width=0.5)

# Use geom_errorbar()
p + stat_summary(fun.data=mean_sdl, mult=1, 
        geom="errorbar", color="red", width=0.2) +
  stat_summary(fun.y=mean, geom="point", color="red")
   
# Use geom_pointrange()
p + stat_summary(fun.data=mean_sdl, mult=1, 
                 geom="pointrange", color="red")
```
<p><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-error-bar-add-mean-sd-barplot-data-visualization-1.png" width="192" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-error-bar-add-mean-sd-barplot-data-visualization-2.png" width="192" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-error-bar-add-mean-sd-barplot-data-visualization-3.png" width="192" /></p>
<p>Read more on ggplot2 dot plots : <a href="http://www.sthda.com/english/wiki/ggplot2-dot-plot-quick-start-guide-r-software-and-data-visualization">ggplot2 dot plot</a></p>
<h1>Infos</h1>
<p><span class="warning"> This analysis has been performed using <strong>R software</strong> (ver. 3.1.2) and <strong>ggplot2</strong> (ver. 1.0.0) </span></p>

Contribution from ：http://www.sthda.com/english/wiki/ggplot2-error-bars-quick-start-guide-r-software-and-data-visualization