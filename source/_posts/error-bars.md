title: Error bars (basic)
date: 2015-08-22 18:00:06
tags: error_bars
categories: R
---
Error bars are a graphical representation of the variability of data and are used on graphs to indicate the error, or uncertainty in a reported measurement. They give a general idea of how precise a measurement is, or conversely, how far from the reported value the true (error free) value might be. Error bars often represent one standard deviation of uncertainty, one standard error, or a certain confidence interval (e.g., a 95% interval). 
###Add error bar used R
loading data
``` bash
plot(mpg~disp,data=mtcars)
```
###verticality error bars
``` bash
arrows(x0=mtcars$disp,
       y0=mtcars$mpg*0.95,
       x1=mtcars$disp,
       y1=mtcars$mpg*1.05,
       angle=90,
       code=3,      #drawing an arrowhead at both ends
       length=0.04,
       lwd=0.4)
```
结果如下：
![](http://7xk19o.com1.z0.glb.clouddn.com/Rplot.png)
###horizontal error bars
``` bash
arrows(x0=mtcars$disp*0.95,
       y0=mtcars$mpg,
       x1=mtcars$disp*1.05,
       y1=mtcars$mpg,
       angle=90,
       code=3,
       length=0.04,
       lwd=0.4)
```
结果如下：
![](http://7xk19o.com1.z0.glb.clouddn.com/Rplot01.png)