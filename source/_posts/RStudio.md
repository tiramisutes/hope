title: RStudio
date: 2015-07-29 13:19:30
tags: RStudio_RPubs
categories: R
---
RStudio is an integrated development environment (IDE) for R. It includes a console, syntax-highlighting editor that supports direct code execution, as well as tools for plotting, history, debugging and workspace management.

![](http://7xk19o.com1.z0.glb.clouddn.com/RStudio.png)
##Publish to RPubs
###Getting Started with RPubs
RStudio lets you harness the power of R Markdown to create documents that weave together your writing and the output of your R code. And now, with RPubs, you can publish those documents on the web with the click of a button!

###Prerequisites

You'll need R itself, RStudio (v0.96.230 or later), and the knitr package (v0.5 or later).

###Instructions

In RStudio, create a new R Markdown document by choosing File | New | R Markdown.
Click the Knit HTML button in the doc toolbar to preview your document.
In the preview window, click the Publish button.
![](http://7xk19o.com1.z0.glb.clouddn.com/RPubs.png)
###Results：
Convergence testing
``` bash
library(lattice)
library(lme4)
library(blme)
library(reshape2)
library(ggplot2); theme_set(theme_bw())
library(gridExtra)  ## for grid.arrange
library(bbmle) ## for slice2D; requires *latest* r-forge version (r121)
source("allFit.R")
```
Load data:
``` bash
dList <- load("data.RData")
```
Spaghetti plot: don't see much pattern other than (1) general increasing trend; (2) quantized response values (table(dth$Estimate) or unique(dth$Estimate) also show this); (3) skewed residuals
``` bash
sort(unique(dth$Estimate))
```
``` bash
##  [1]  0.0  0.5  1.0  1.5  2.0  2.5  3.0  4.0  5.0  6.0  7.0  7.5  8.0 10.0
## [15] 12.0 15.0 17.0 20.0 25.0 30.0 35.0 40.0 50.0 60.0 70.0 75.0 90.0
```
``` bash
(p0 <- ggplot(dth,aes(Actual,Estimate))+geom_point()+
    geom_line(aes(group=factor(pid)))+
    stat_summary(fun.y=mean,geom="line",colour="red",lwd=2))
```
![](http://7xk19o.com1.z0.glb.clouddn.com/download.png)