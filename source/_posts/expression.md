title: How to use subscripts in ggplot2 legends -[expression()]
date: 2015-12-05 11:16:17
tags: expression
categories: R
---
If you want to incorporate Greek symbols etc. into the major tick labels, use an unevaluated <a href="http://stat.ethz.ch/R-manual/R-patched/library/base/html/expression.html">expression</a>.
``` bash
library(ggplot2)
data <- data.frame(names=tolower(LETTERS[1:4]),mean_p=runif(4))

p <- ggplot(data,aes(x=names,y=mean_p))
p <- p + geom_bar(colour="black",fill="white")
p <- p + xlab("expressions") + scale_y_continuous(expression(paste("Wacky Data")))
p <- p + scale_x_discrete(labels=c(a=expression(paste(Delta^2)),
                               b=expression(paste(q^n)),
                               c=expression(log(z)),
                               d=expression(paste(omega / (x + 13)^2))))
p
```
![](http://7xk19o.com1.z0.glb.clouddn.com/expression.png)
Contribution from ：
http://stackoverflow.com/questions/6202667/how-to-use-subscripts-in-ggplot2-legends-r