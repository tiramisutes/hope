title: Multiple graphs on one page using ggplot2
date: 2015-10-03 10:41:58
tags: multiple
categories: R
---
The easy way is to use the multiplot function to put multiple graphs on one page, defined at the bottom of this page. If it isn't suitable for your needs, you can copy and modify it.
##Problem
You want to put multiple graphs on one page.
##Solution-1
use the multiplot function
###plots and store 
First, set up the plots and store them, but don't render them yet. The details of these plots aren't important; all you need to do is store the plot objects in variables.
``` bash
library(ggplot2)

# This example uses the ChickWeight dataset, which comes with ggplot2
# First plot
p1 <- ggplot(ChickWeight, aes(x=Time, y=weight, colour=Diet, group=Chick)) +
    geom_line() +
    ggtitle("Growth curve for individual chicks")

# Second plot
p2 <- ggplot(ChickWeight, aes(x=Time, y=weight, colour=Diet)) +
    geom_point(alpha=.3) +
    geom_smooth(alpha=.2, size=1) +
    ggtitle("Fitted growth curve per diet")

# Third plot
p3 <- ggplot(subset(ChickWeight, Time==21), aes(x=weight, colour=Diet)) +
    geom_density() +
    ggtitle("Final weight, by diet")

# Fourth plot
p4 <- ggplot(subset(ChickWeight, Time==21), aes(x=weight, fill=Diet)) +
    geom_histogram(colour="black", binwidth=50) +
    facet_grid(Diet ~ .) +
    ggtitle("Final weight, by diet") +
    theme(legend.position="none")        # No legend (redundant in this graph)
```
###multiplot function
This is the definition of multiplot. It can take any number of plot objects as arguments, or if it can take a list of plot objects passed to plotlist.
``` bash
# Multiple plot function
#
# ggplot objects can be passed in ..., or to plotlist (as a list of ggplot objects)
# - cols:   Number of columns in layout
# - layout: A matrix specifying the layout. If present, 'cols' is ignored.
#
# If the layout is something like matrix(c(1,2,3,3), nrow=2, byrow=TRUE),
# then plot 1 will go in the upper left, 2 will go in the upper right, and
# 3 will go all the way across the bottom.
#
multiplot <- function(..., plotlist=NULL, file, cols=1, layout=NULL) {
  library(grid)

  # Make a list from the ... arguments and plotlist
  plots <- c(list(...), plotlist)

  numPlots = length(plots)

  # If layout is NULL, then use 'cols' to determine layout
  if (is.null(layout)) {
    # Make the panel
    # ncol: Number of columns of plots
    # nrow: Number of rows needed, calculated from # of cols
    layout <- matrix(seq(1, cols * ceiling(numPlots/cols)),
                    ncol = cols, nrow = ceiling(numPlots/cols))
  }

 if (numPlots==1) {
    print(plots[[1]])

  } else {
    # Set up the page
    grid.newpage()
    pushViewport(viewport(layout = grid.layout(nrow(layout), ncol(layout))))

    # Make each plot, in the correct location
    for (i in 1:numPlots) {
      # Get the i,j matrix positions of the regions that contain this subplot
      matchidx <- as.data.frame(which(layout == i, arr.ind = TRUE))

      print(plots[[i]], vp = viewport(layout.pos.row = matchidx$row,
                                      layout.pos.col = matchidx$col))
    }
  }
}
```
###multiplot
Once the plot objects are set up, we can render them with multiplot. This will make two columns of graphs:
``` bash
multiplot(p1, p2, p3, p4, cols=2)
#> Loading required package: grid
#> geom_smooth: method="auto" and size of largest group is <1000, so using loess. Use 'method = x' to change the smoothing method.
```
![](http://7xk19o.com1.z0.glb.clouddn.com/unnamed-chunk-3-1.png)
##Solution-2
facet_grid
``` bash
p <- ggplot(mtcars, aes(mpg, wt)) + geom_point()
# With one variable
p + facet_grid(. ~ cyl)
```
![](http://7xk19o.com1.z0.glb.clouddn.com/facet_grid-2.png)
``` bash
# With two variables
p + facet_grid(vs ~ am)
```
![](http://7xk19o.com1.z0.glb.clouddn.com/facet_grid-6.png)
##Solution-3
grid.arrange
``` bash
library(gridExtra)
grid.arrange(p1, p2, p3, p4, ncol=2, 
             main="Multiple plots on the same page")
```
![](http://7xk19o.com1.z0.glb.clouddn.com/unnamed-chunk-3-1.png)