title: Mix multiple graphs on the same page
date: 2015-10-03 11:23:52
tags: multiple
categories: R
---
Easy way to mix multiple graphs on the same page - R software and data visualization
##Install and load required packages
``` bash
install.packages("gridExtra")
library("gridExtra")
install.packages("cowplot")
library("cowplot")
```
##Prepare some data
``` bash
df <- ToothGrowth
# Convert the variable dose from a numeric to a factor variable
df$dose <- as.factor(df$dose)
head(df)
##    len supp dose
## 1  4.2   VC  0.5
## 2 11.5   VC  0.5
## 3  7.3   VC  0.5
## 4  5.8   VC  0.5
## 5  6.4   VC  0.5
## 6 10.0   VC  0.5
```
##Cowplot: Publication-ready plots
The cowplot package is an extension to ggplot2 and it can be used to provide a publication-ready plots.
##Basic plots
``` bash
library(cowplot)
# Default plot
bp <- ggplot(df, aes(x=dose, y=len, color=dose)) +
  geom_boxplot() + 
  theme(legend.position = "none")
bp

# Add gridlines
bp + background_grid(major = "xy", minor = "none")
```
<img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-mixing-multiple-plots-cowplot-ggplot2-1.png" width="192" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-mixing-multiple-plots-cowplot-ggplot2-2.png"  width="192" />
Recall that, the function <strong>ggsave()</strong>[in <strong>ggplot2</strong> package] can be used to save ggplots. However, when working with <strong>cowplot</strong>, the function <strong>save_plot()</strong> [in <strong>cowplot</strong> package] is preferred. It's an alternative to <strong>ggsave</strong> with a better support for multi-figur plots.
``` bash
save_plot("mpg.pdf", plot.mpg,
          base_aspect_ratio = 1.3 # make room for figure legend
          )
```
##Arranging multiple graphs using cowplot
``` bash
# Scatter plot
sp <- ggplot(mpg, aes(x = cty, y = hwy, colour = factor(cyl)))+ 
  geom_point(size=2.5)
sp

# Bar plot
bp <- ggplot(diamonds, aes(clarity, fill = cut)) +
  geom_bar() +
  theme(axis.text.x = element_text(angle=70, vjust=0.5))
bp
```
<img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-mixing-multiple-plots-cowplot-ggplot2-arranging-multiple-plot-1.png"  width="259.2" /><img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-mixing-multiple-plots-cowplot-ggplot2-arranging-multiple-plot-2.png"  width="259.2" />
Combine the two plots (the scatter plot and the bar plot):
``` bash
plot_grid(sp, bp, labels=c("A","B"), ncol = 2, nrow = 1)
```
<img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-mixing-multiple-plots-cowplot-ggplot2-arranging-multiple-plot-2-1.png"  width="528" />
The function <strong>draw_plot()</strong> can be used to place graphs at particular locations with a particular sizes. The format of the function is:
``` bash
draw_plot(plot, x = 0, y = 0, width = 1, height = 1)
```
<ul>
<li><strong>plot</strong>: the plot to place (ggplot2 or a gtable)</li>
<li><strong>x</strong>: The x location of the lower left corner of the plot.</li>
<li><strong>y</strong>: The y location of the lower left corner of the plot.</li>
<li><strong>width, height</strong>: the width and the height of the plot</li>
</ul>
The function <strong>ggdraw()</strong> is used to initialize an empty drawing canvas.
``` bash
plot.iris <- ggplot(iris, aes(Sepal.Length, Sepal.Width)) + 
  geom_point() + facet_grid(. ~ Species) + stat_smooth(method = "lm") +
  background_grid(major = &#39;y&#39;, minor = "none") + # add thin horizontal lines 
  panel_border() # and a border around each panel
# plot.mpt and plot.diamonds were defined earlier
ggdraw() +
  draw_plot(plot.iris, 0, .5, 1, .5) +
  draw_plot(sp, 0, 0, .5, .5) +
  draw_plot(bp, .5, 0, .5, .5) +
  draw_plot_label(c("A", "B", "C"), c(0, 0, 0.5), c(1, 0.5, 0.5), size = 15)
```
<img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-mixing-multiple-plots-cowplot-ggplot2-arranging-multiple-plot-3-1.png"  width="537.6" />
##grid.arrange: Create and arrange multiple plots
The R code below creates a box plot, a dot plot, a violin plot and a stripchart (jitter plot) :
``` bash
library(ggplot2)
# Create a box plot
bp <- ggplot(df, aes(x=dose, y=len, color=dose)) +
  geom_boxplot() + 
  theme(legend.position = "none")

# Create a dot plot
# Add the mean point and the standard deviation
dp <- ggplot(df, aes(x=dose, y=len, fill=dose)) +
  geom_dotplot(binaxis=&#39;y&#39;, stackdir=&#39;center&#39;)+
  stat_summary(fun.data=mean_sdl, mult=1, 
                 geom="pointrange", color="red")+
   theme(legend.position = "none")

# Create a violin plot
vp <- ggplot(df, aes(x=dose, y=len)) +
  geom_violin()+
  geom_boxplot(width=0.1)

# Create a stripchart
sc <- ggplot(df, aes(x=dose, y=len, color=dose, shape=dose)) +
  geom_jitter(position=position_jitter(0.2))+
  theme(legend.position = "none") +
  theme_gray()
```
Combine the plots using the function <strong>grid.arrange()</strong> [in <strong>gridExtra</strong>] :
``` bash
library(gridExtra)
grid.arrange(bp, dp, vp, sc, ncol=2, 
             main="Multiple plots on the same page")
```
<img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-mixing-multiple-plots-grid-arrange-data-visualization-1.png"  width="518.4" />
##Add a common legend for multiple ggplot2 graphs
This can be done in four simple steps :
<ol style="list-style-type: decimal">
<li>Create the plots : p1, p2, ….</li>
<li>Save the legend of the plot p1 as an external graphical element (called a "grob" in Grid terminology)</li>
<li>Remove the legends from all plots</li>
<li>Draw all the plots with only one legend in the right panel</li>
</ol>
To <strong>save the legend</strong> of a ggplot, the helper function below can be used :
``` bash
library(gridExtra)
get_legend<-function(myggplot){
  tmp <- ggplot_gtable(ggplot_build(myggplot))
  leg <- which(sapply(tmp$grobs, function(x) x$name) == "guide-box")
  legend <- tmp$grobs[[leg]]
  return(legend)
}
```
(The function above is derived from this <a href="http://stackoverflow.com/questions/12539348/ggplot-separate-legend-and-plot" rel="nofollow">forum</a>. )
``` bash
# 1. Create the plots
#++++++++++++++++++++++++++++++++++
# Create a box plot
bp <- ggplot(df, aes(x=dose, y=len, color=dose)) +
  geom_boxplot()

# Create a violin plot
vp <- ggplot(df, aes(x=dose, y=len, color=dose)) +
  geom_violin()+
  geom_boxplot(width=0.1)+
  theme(legend.position="none")

# 2. Save the legend
#+++++++++++++++++++++++
legend <- get_legend(bp)

# 3. Remove the legend from the box plot
#+++++++++++++++++++++++
bp <- bp + theme(legend.position="none")

# 4. Arrange ggplot2 graphs with a specific width
grid.arrange(bp, vp, legend, ncol=3, widths=c(2.3, 2.3, 0.8))
```
<img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-mixing-multiple-plots-common-legend-data-visualization-1.png"  width="518.4" />
##Scatter plot with marginal density plots
<strong>Step 1/3. Create some data :</strong>
``` bashset.seed(1234)
x <- c(rnorm(500, mean = -1), rnorm(500, mean = 1.5))
y <- c(rnorm(500, mean = 1), rnorm(500, mean = 1.7))
group <- as.factor(rep(c(1,2), each=500))
df2 <- data.frame(x, y, group)
head(df2)
##             x          y group
## 1 -2.20706575 -0.2053334     1
## 2 -0.72257076  1.3014667     1
## 3  0.08444118 -0.5391452     1
## 4 -3.34569770  1.6353707     1
## 5 -0.57087531  1.7029518     1
## 6 -0.49394411 -0.9058829     1
```
<strong>Step 2/3. Create the plots :</strong>
``` bash
# Scatter plot of x and y variables and color by groups
scatterPlot <- ggplot(df2,aes(x, y, color=group)) + 
  geom_point() + 
  scale_color_manual(values = c(&#39;#999999&#39;,&#39;#E69F00&#39;)) + 
  theme(legend.position=c(0,1), legend.justification=c(0,1))


# Marginal density plot of x (top panel)
xdensity <- ggplot(df2, aes(x, fill=group)) + 
  geom_density(alpha=.5) + 
  scale_fill_manual(values = c(&#39;#999999&#39;,&#39;#E69F00&#39;)) + 
  theme(legend.position = "none")

# Marginal density plot of y (right panel)
ydensity <- ggplot(df2, aes(y, fill=group)) + 
  geom_density(alpha=.5) + 
  scale_fill_manual(values = c(&#39;#999999&#39;,&#39;#E69F00&#39;)) + 
  theme(legend.position = "none")
  ```
Create a blank placeholder plot :
``` bash
lankPlot <- ggplot()+geom_blank(aes(1,1))+
  theme(
    plot.background = element_blank(), 
   panel.grid.major = element_blank(),
   panel.grid.minor = element_blank(), 
   panel.border = element_blank(),
   panel.background = element_blank(),
   axis.title.x = element_blank(),
   axis.title.y = element_blank(),
   axis.text.x = element_blank(), 
   axis.text.y = element_blank(),
   axis.ticks = element_blank(),
   axis.line = element_blank()
     )
```
<strong>Step 3/3. Put the plots together:</strong>
Arrange ggplot2 with adapted height and width for each row and column :
``` bash
library("gridExtra")
grid.arrange(xdensity, blankPlot, scatterPlot, ydensity, 
        ncol=2, nrow=2, widths=c(4, 1.4), heights=c(1.4, 4))
```
<img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-mixing-multiple-plots-put-multiple-plot-together-data-visualization-1.png"  width="480" />
##Create a complex layout using the function viewport()
The different steps are :
<ol style="list-style-type: decimal">
<li>Create plots : p1, p2, p3, ….</li>
<li>Move to a new page on a grid device using the function <strong>grid.newpage()</strong></li>
<li>Create a layout 2X2 - number of columns = 2; number of rows = 2</li>
<li>Define a grid viewport : a rectangular region on a graphics device</li>
<li>Print a plot into the viewport</li>
</ol>
``` bash
# Move to a new page
grid.newpage()

# Create layout : nrow = 2, ncol = 2
pushViewport(viewport(layout = grid.layout(2, 2)))

# A helper function to define a region on the layout
define_region <- function(row, col){
  viewport(layout.pos.row = row, layout.pos.col = col)
} 

# Arrange the plots
print(scatterPlot, vp=define_region(1, 1:2))
print(xdensity, vp = define_region(2, 1))
print(ydensity, vp = define_region(2, 2))
```
<img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-mixing-multiple-plots-complex-layout-data-visualization-1.png"  width="480" />
##Insert an external graphical element inside a ggplot
The function <strong>annotation_custom()</strong> [in <strong>ggplot2</strong>] can be used for adding tables, plots or other grid-based elements. The simplified format is :
``` bash
annotation_custom(grob, xmin, xmax, ymin, ymax)
```
<ul>
<li><strong>grob</strong>: the external graphical element to display</li>
<li><strong>xmin, xmax</strong> : x location in data coordinates (horizontal location)</li>
<li><strong>ymin, ymax</strong> : y location in data coordinates (vertical location)</li>
</ul>
The different steps are :
<ol style="list-style-type: decimal">
<li>Create a scatter plot of y = f(x)</li>
<li>Add, for example, the box plot of the variables x and y inside the scatter plot using the function <strong>annotation_custom()</strong></li>
</ol>
<span class="warning">As the inset box plot overlaps with some points, a <strong>transparent background</strong> is used for the box plots.</span>
``` bash
# Create a transparent theme object
transparent_theme <- theme(
 axis.title.x = element_blank(),
 axis.title.y = element_blank(),
 axis.text.x = element_blank(), 
 axis.text.y = element_blank(),
 axis.ticks = element_blank(),
 panel.grid = element_blank(),
 axis.line = element_blank(),
 panel.background = element_rect(fill = "transparent",colour = NA),
 plot.background = element_rect(fill = "transparent",colour = NA))
 ```
Create the graphs :
``` bash
p1 <- scatterPlot # see previous sections for the scatterPlot

# Box plot of the x variable
p2 <- ggplot(df2, aes(factor(1), x))+
  geom_boxplot(width=0.3)+coord_flip()+
  transparent_theme

# Box plot of the y variable
p3 <- ggplot(df2, aes(factor(1), y))+
  geom_boxplot(width=0.3)+
  transparent_theme

# Create the external graphical elements
# called a "grop" in Grid terminology
p2_grob = ggplotGrob(p2)
p3_grob = ggplotGrob(p3)
   

# Insert p2_grob inside the scatter plot
xmin <- min(x); xmax <- max(x)
ymin <- min(y); ymax <- max(y)
p1 + annotation_custom(grob = p2_grob, xmin = xmin, xmax = xmax, 
                       ymin = ymin-1.5, ymax = ymin+1.5)
```
<img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-mixing-multiple-plots-insert-plot-inside-ggplot-data-visualization-1.png"  width="384" />
``` bash
# Insert p3_grob inside the scatter plot
p1 + annotation_custom(grob = p3_grob,
                       xmin = xmin-1.5, xmax = xmin+1.5, 
                       ymin = ymin, ymax = ymax)
```
<img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-mixing-multiple-plots-insert-plot-inside-ggplot-data-visualization-2.png"  width="384" />
<span class="error">If you have a solution to insert, at the same time, both p2_grob and p3_grob inside the scatter plot, please let me a comment. I got some errors trying to do this…</span>
##Mix table, text and ggplot2 graphs
The functions below are required :
<ul>
<li><strong>tableGrob()</strong> [in the package <em>gridExtra</em>] : for adding a data table to a graphic device</li>
<li><strong>splitTextGrob()</strong> [in the package <em>RGraphics</em>] : for adding a text to a graph</li>
</ul>
<span class="warning">Make sure that the package <strong>RGraphics</strong> is installed.</span>
``` bash
library(RGraphics)
library(gridExtra)

# Table
p1 <- tableGrob(head(ToothGrowth))

# Text
text <- "ToothGrowth data describes the effect of Vitamin C on tooth growth in Guinea pigs.  Three dose levels of Vitamin C (0.5, 1, and 2 mg) with each of two delivery methods [orange juice (OJ) or ascorbic acid (VC)] are used."
p2 <- splitTextGrob(text)

# Box plot
p3 <- ggplot(df, aes(x=dose, y=len)) + geom_boxplot()

# Arrange the plots on the same page
grid.arrange(p1, p2, p3, ncol=1)
```
<img src="http://www.sthda.com/sthda/RDoc/figure/ggplot2/ggplot2-mixing-multiple-plots-add-table-add-text-data-visualization-1.png"  width="480" />

##Infos
<span class="warning"> This analysis has been performed using <strong>R software</strong> (ver. 3.1.2) and <strong>ggplot2</strong> (ver. 1.0.0) </span>
Contribution from ：<a href="http://www.sthda.com/english/wiki/ggplot2-easy-way-to-mix-multiple-graphs-on-the-same-page-r-software-and-data-visualization" target="_blank" rel="external">http://www.sthda.com/english/wiki/ggplot2-easy-way-to-mix-multiple-graphs-on-the-same-page-r-software-and-data-visualization</a>

