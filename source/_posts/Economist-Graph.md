title: Economist_Graph：复杂图形修改
date: 2016-03-09 17:23:10
tags: ggplot2
categories: R
---
<p><img src="http://7xk19o.com1.z0.glb.clouddn.com/20111210_WOC210.gif" width="600" height="300"></p>
原图：http://www.economist.com/node/21541178
##Basic plot
``` bash
library(ggplot2)
dat <- read.csv("EconomistData.csv")
pc1 <- ggplot(dat, aes(x = CPI, y = HDI, color = Region))+
       geom_point()
```
![](http://7xk19o.com1.z0.glb.clouddn.com/econScatter1.png)
##Trend line
``` bash
pc2 <- pc1 +
   geom_smooth(aes(group = 1),
               method = "lm",
               formula = y ~ log(x),
               se = FALSE,
               color = "red") +
   geom_line()
```
![](http://7xk19o.com1.z0.glb.clouddn.com/econScatter2.png)
##Open points
``` bash
pc3 <- pc2 +
  geom_point(shape = 1, size = 4)
```
![](http://7xk19o.com1.z0.glb.clouddn.com/econScatter3.png)
##Labelling points
``` bash
pointsToLabel <- c("Russia", "Venezuela", "Iraq", "Myanmar", "Sudan",
                   "Afghanistan", "Congo", "Greece", "Argentina", "Brazil",
                   "India", "Italy", "China", "South Africa", "Spane",
                   "Botswana", "Cape Verde", "Bhutan", "Rwanda", "France",
                   "United States", "Germany", "Britain", "Barbados", "Norway", "Japan",
                   "New Zealand", "Singapore")
library("ggrepel")
pc4 <- pc3 +  geom_text_repel(aes(label = Country),
            color = "gray20",
            data = subset(dat, Country %in% pointsToLabel),
            force = 10)
```
![](http://7xk19o.com1.z0.glb.clouddn.com/econScatter4.png)
选择性的标注想要的点
##Change the region labels and order
``` bash
dat$Region <- factor(dat$Region,
                     levels = c("EU W. Europe",
                                "Americas",
                                "Asia Pacific",
                                "East EU Cemt Asia",
                                "MENA",
                                "SSA"),
                     labels = c("OECD",
                                "Americas",
                                "Asia &\nOceania",
                                "Central &\nEastern Europe",
                                "Middle East &\nnorth Africa",
                                "Sub-Saharan\nAfrica"))
pc4$data <- dat
pc4
```
![](http://7xk19o.com1.z0.glb.clouddn.com/econScatter6.png)
修改图例值和顺序
##Add title and format axes
``` bash
library(grid)
pc5 <- pc4 +
  scale_x_continuous(name = "Corruption Perceptions Index, 2011 (10=least corrupt)",
                     limits = c(.9, 10.5),
                     breaks = 1:10) +
  scale_y_continuous(name = "Human Development Index, 2011 (1=Best)",
                     limits = c(0.2, 1.0),
                     breaks = seq(0.2, 1.0, by = 0.1)) +
  scale_color_manual(name = "",
                     values = c("#24576D",
                                "#099DD7",
                                "#28AADC",
                                "#248E84",
                                "#F2583F",
                                "#96503F")) +
  ggtitle("Corruption and Human development"))
```
![](http://7xk19o.com1.z0.glb.clouddn.com/econScatter7.png)
利用scale来修改x，y轴，颜色和标出title
##Theme tweaks
``` bash
library(grid) # for the 'unit' function
pc6 <- pc5 +
  theme_minimal() + # start with a minimal theme and add what we need
  theme(text = element_text(color = "gray20"),
        legend.position = c("top"), # position the legend in the upper left 
        legend.direction = "horizontal",
        legend.justification = 0.1, # anchor point for legend.position.
        legend.text = element_text(size = 11, color = "gray10"),
        axis.text = element_text(face = "italic"),
        axis.title.x = element_text(vjust = -1), # move title away from axis
        axis.title.y = element_text(vjust = 2), # move away for axis
        axis.ticks.y = element_blank(), # element_blank() is how we remove elements
        axis.line = element_line(color = "gray40", size = 0.5),
        axis.line.y = element_blank(),
        panel.grid.major = element_line(color = "gray50", size = 0.5),
        panel.grid.major.x = element_blank()
        ))
```
![](http://7xk19o.com1.z0.glb.clouddn.com/econScatter8.png)
微调主题
##Add model R^2 and source note
``` bash
mR2 <- summary(lm(HDI ~ log(CPI), data = dat))$r.squared
library(grid)
png(file = "images/econScatter10.png", width = 800, height = 600)
pc6 
grid.text("Sources: Transparency International; UN Human Development Report",
         x = .02, y = .03,
         just = "left",
         draw = TRUE)
grid.segments(x0 = 0.81, x1 = 0.825,
              y0 = 0.90, y1 = 0.90,
              gp = gpar(col = "red"),
              draw = TRUE)
grid.text(paste0("R² = ",
                 as.integer(mR2*100),
                 "%"),
          x = 0.835, y = 0.90,
          gp = gpar(col = "gray20"),
          draw = TRUE,
          just = "left")

dev.off()
```
![](http://7xk19o.com1.z0.glb.clouddn.com/econScatter10.png)
Contribution from ：
http://tutorials.iq.harvard.edu/R/Rgraphics/Rgraphics.html