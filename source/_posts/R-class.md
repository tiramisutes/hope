title: A Beginner’s Guide to Learn R Programming
Total word: WordCount
Read time: Min2Read
date: 2017-12-15 09:57:52
tags: Basics_R
categories: R
---
**Author: hope @Huazhong Agricultural University**

![](http://7xk19o.com1.z0.glb.clouddn.com/Rclass.png)
<!--more-->
# 一、数据操作
## 循环 (Loops)
```
library(tibble)
set.seed(7)
df <- tibble(
  a = rnorm(10),
  b = rnorm(10),
  c = rnorm(10),
  d = rnorm(10)
  )
median(df$a)
median(df$b)
median(df$c)
median(df$d)
output <- vector("double", ncol(df))  # 1. output
for (i in seq_along(df)) {            # 2. sequence
  output[[i]] <- median(df[[i]])      # 3. body
  }
output
apply(df,2,median)
```
## 数据转换 (Data transformation) 清洗和整理
### 数据环境载入
```
library(nycflights13)
library(tidyverse)
head(flights)
unique(flights$month)
```
### 1.1 筛选: filter()
```
(jan1 <- filter(flights, month == 1, day == 1))
```
### 1.2 排列: arrange()
```
arrange(flights, year, month, day)
arrange(flights, desc(arr_delay))
```
### 1.3 选择: select()
```
select(flights, year, month, day)
```
### 1.4 变形: mutate()
```
flights_sml <- select(flights, 
                      year:day, 
                      ends_with("delay"), 
                      distance, 
                      air_time
)
```
#### 新添加的列可以用于后续计算
```
mutate(flights_sml,
       gain = arr_delay - dep_delay,
       hours = air_time / 60,
       gain_per_hour = gain / hours
)
```
#### 只保留变形后的列
```
transmute(flights,
          gain = arr_delay - dep_delay,
          hours = air_time / 60,
          gain_per_hour = gain / hours
)
```
### 1.5 汇总: summarise()
```
summarise(flights, delay = mean(dep_delay, na.rm = TRUE))
```
### 1.6 分组: group_by()
```
by_day <- group_by(flights, year, month, day)
summarise(by_day, delay = mean(dep_delay, na.rm = TRUE))
filter(flights, year == 2013, month == 1, day == 1)
```
### 1.7 管道函数(%>%) 和 绘图
```{r message=FALSE, warning=FALSE}
delays <- flights %>% 
  group_by(dest) %>% 
  summarise(
    count = n(),
    dist = mean(distance, na.rm = TRUE),
    delay = mean(arr_delay, na.rm = TRUE)
  ) %>% 
  filter(count > 20, dest != "HNL")
library(ggplot2)
ggplot(data = delays, mapping = aes(x = dist, y = delay)) +
  geom_point(aes(size = count), alpha = 1/3) +
  geom_smooth(se = FALSE)
```

## 数据整形 (Reshaping Data)
### tibble 型数据
```
library(tibble)
friends_data <- data_frame(
  name = c("Nicolas", "Thierry", "Bernard", "Jerome"),
  age = c(27, 25, 29, 26),
  height = c(180, 170, 185, 169),
  married = c(TRUE, FALSE, TRUE, TRUE)
)
# Print
friends_data
```
### tibble 与 常规 data frame 的差别
```
data("iris")
class(iris)
my_data <- as_data_frame(iris)
class(my_data)
my_data2 <- as.data.frame(my_data)
```
### 基本数据载入
```
library("tidyr")
my_data <- USArrests[c(1, 10, 20, 30), ]
my_data
my_data <- cbind(state = rownames(my_data), my_data)
my_data
```
### gather(data, key, value, ...)
```
my_data2 <- gather(my_data,
                   key = "arrest_attribute",
                   value = "arrest_estimate",
                   -state)
my_data2
```
### spread(data, key, value)
```
my_data3 <- spread(my_data2, 
                   key = "arrest_attribute",
                   value = "arrest_estimate"
)
my_data3
```
### unite(data, col, ..., sep = "_")
```
my_data4 <- unite(my_data,
                  col = "Murder_Assault",
                  Murder, Assault,
                  sep = "_")
my_data4
```
### separate(data, col, into, sep = "[^[:alnum:]]+")
```
my_data5 <- separate(my_data4,
         col = "Murder_Assault",
         into = c("Murder", "Assault"),
         sep = "_")
my_data5
```
### 管道函数(%>%)
```
my_data6 <- my_data %>% gather(key = "arrest_attribute",
                   value = "arrest_estimate",
                   Murder:UrbanPop) %>%
  unite(col = "attribute_estimate",
        arrest_attribute, arrest_estimate)
```
## 关系型数据 (Relational data)
### 数据载入
```
library(tidyverse)
library(nycflights13)
# nycflights13 contains four tibbles that are related to the flights table.
class(flights)
flights
```
### Mutating joins
```
flights2 <- flights %>% 
  select(year:day, hour, origin, dest, tailnum, carrier)
flights2
flights2 %>%
  select(-origin, -dest) %>% 
  left_join(airlines, by = "carrier")
```
### Filtering joins
```
top_dest <- flights %>%
  count(dest, sort = TRUE) %>%
  head(5)
flights %>% 
  semi_join(top_dest)
dim(flights)
dim(flights %>% semi_join(top_dest))
flights %>%
  anti_join(planes, by = "tailnum") %>%
  count(tailnum, sort = TRUE)
```
### Set operations
```
df1 <- tribble(
  ~x, ~y,
  1,  1,
  2,  1
)
df2 <- tribble(
  ~x, ~y,
  1,  1,
  1,  2
)
df1
df2
intersect(df1, df2)
union(df1, df2)
setdiff(df1, df2)
```
# 二、Plotting in R for Biologists
## ggplot2绘图
## 1. 散点图
```
library(ggplot2)
p <- ggplot(data=mpg, mapping=aes(x=cty, y=hwy))
p + geom_point()
```
### 将年份映射到颜色属性
```
p <- ggplot(mpg,aes(x=cty, y=hwy, colour=factor(year)))
p + geom_point()
```
### 增加平滑曲线
```
p + geom_point() + stat_smooth()
```
### 分面
```
p + geom_point() + stat_smooth()+facet_wrap(~ year, ncol=1)
```
## 2. 直方图
```
p <- ggplot(mpg,aes(x=hwy))
p + geom_histogram()
```
### 统计变换+分面
```
p + geom_histogram(aes(fill=factor(year),y=..density..), alpha=0.3,colour='black') +
  stat_density(geom='line',position='identity',size=1.5, aes(colour=factor(year))) +
  facet_wrap(~year,ncol=1)
```
## 3. 条形图
```
p <- ggplot(mpg, aes(x=class))
p + geom_bar()
```
### 根据计数排序后绘制的条形图
```
class2 <- mpg$class
class2 <- reorder(class2,class2,length)
mpg$class2 <- class2
p <- ggplot(mpg, aes(x=class2))
p + geom_bar(aes(fill=class2))
```
## 4.饼图
```
p <- ggplot(mpg, aes(x = factor(1), fill = factor(class))) +
  geom_bar(width = 1)
p + coord_polar(theta = "y")
```
### 改变填充颜色
```
p + coord_polar(theta = "y") + scale_fill_brewer(palette="Dark2")
```
## 5.箱线图
```
p <- ggplot(mpg, aes(class,hwy,fill=class))
p + geom_boxplot()
```
## 6.小提琴图
```
p + geom_violin(alpha=0.3,width=0.9)+
  geom_jitter(shape=21)
```
## 7.密度图
```
set.seed(1234)
df <- data.frame(
  sex=factor(rep(c("F", "M"), each=200)),
  weight=round(c(rnorm(200, mean=55, sd=5),
                 rnorm(200, mean=65, sd=5)))
)
head(df)
p <- ggplot(df, aes(x=weight, color=sex)) +
  geom_density()
p
```
## 8.线图
```
df2 <- data.frame(sex = rep(c("Female", "Male"), each=3),
                  time=c("breakfeast", "Lunch", "Dinner"),
                  bill=c(10, 30, 15, 13, 40, 17) )
head(df2)
ggplot(df2, aes(x=time, y=bill, group=sex)) +
  geom_line(aes(linetype=sex, color=sex))+
  geom_point(aes(color=sex))+
  theme(legend.position="top")
```
## 9.热图
```
library(pheatmap)
test = matrix(rnorm(200), 20, 10)
colnames(test) = paste("Test", 1:10, sep = "")
rownames(test) = paste("Gene", 1:20, sep = "")
pheatmap(test, color = colorRampPalette(c("navy", "white", "firebrick3"))(50))
```
## 10.相关性分析图
```
library(corrplot)
mydata <- select(mtcars,hp,disp,wt,qsec,mpg,drat)
source("http://www.sthda.com/upload/rquery_cormat.r")
rquery.cormat<-function(x, type=c('lower', 'upper', 'full', 'flatten'),
                        graph=TRUE, graphType=c("correlogram", "heatmap"),
                        col=NULL, ...)
{
  library(corrplot)
  # Helper functions
  #+++++++++++++++++
  # Compute the matrix of correlation p-values
  cor.pmat <- function(x, ...) {
    mat <- as.matrix(x)
    n <- ncol(mat)
    p.mat<- matrix(NA, n, n)
    diag(p.mat) <- 0
    for (i in 1:(n - 1)) {
      for (j in (i + 1):n) {
        tmp <- cor.test(mat[, i], mat[, j], ...)
        p.mat[i, j] <- p.mat[j, i] <- tmp$p.value
      }
    }
    colnames(p.mat) <- rownames(p.mat) <- colnames(mat)
    p.mat
  }
  # Get lower triangle of the matrix
  getLower.tri<-function(mat){
    upper<-mat
    upper[upper.tri(mat)]<-""
    mat<-as.data.frame(upper)
    mat
  }
  # Get upper triangle of the matrix
  getUpper.tri<-function(mat){
    lt<-mat
    lt[lower.tri(mat)]<-""
    mat<-as.data.frame(lt)
    mat
  }
  # Get flatten matrix
  flattenCorrMatrix <- function(cormat, pmat) {
    ut <- upper.tri(cormat)
    data.frame(
      row = rownames(cormat)[row(cormat)[ut]],
      column = rownames(cormat)[col(cormat)[ut]],
      cor  =(cormat)[ut],
      p = pmat[ut]
    )
  }
  # Define color
  if (is.null(col)) {
    col <- colorRampPalette(c("#67001F", "#B2182B", "#D6604D", 
                              "#F4A582", "#FDDBC7", "#FFFFFF", "#D1E5F0", "#92C5DE", 
                              "#4393C3", "#2166AC", "#053061"))(200)
    col<-rev(col)
  }
  
  # Correlation matrix
  cormat<-signif(cor(x, use = "complete.obs", ...),2)
  pmat<-signif(cor.pmat(x, ...),2)
  # Reorder correlation matrix
  ord<-corrMatOrder(cormat, order="hclust")
  cormat<-cormat[ord, ord]
  pmat<-pmat[ord, ord]
  # Replace correlation coeff by symbols
  sym<-symnum(cormat, abbr.colnames=FALSE)
  # Correlogram
  if(graph & graphType[1]=="correlogram"){
    corrplot(cormat, type=ifelse(type[1]=="flatten", "lower", type[1]),
             tl.col="black", tl.srt=45,col=col,...)
  }
  else if(graphType[1]=="heatmap")
    heatmap(cormat, col=col, symm=TRUE)
  # Get lower/upper triangle
  if(type[1]=="lower"){
    cormat<-getLower.tri(cormat)
    pmat<-getLower.tri(pmat)
  }
  else if(type[1]=="upper"){
    cormat<-getUpper.tri(cormat)
    pmat<-getUpper.tri(pmat)
    sym=t(sym)
  }
  else if(type[1]=="flatten"){
    cormat<-flattenCorrMatrix(cormat, pmat)
    pmat=NULL
    sym=NULL
  }
  list(r=cormat, p=pmat, sym=sym)
}
rquery.cormat(mydata, type="full")
```
## 11.主成份分析(PCA)
```
z1 <- rnorm(10000, mean=1, sd=1)
z2 <- rnorm(10000, mean=3, sd=3)
z3 <- rnorm(10000, mean=5, sd=5)
z4 <- rnorm(10000, mean=7, sd=7)
z5 <- rnorm(10000, mean=9, sd=9)
mydata <- matrix(c(z1, z2, z3, z4, z5), 2500, 20, byrow=T, dimnames=list(paste("R", 1:2500, sep=""), paste("C", 1:20, sep=""))) 
pca <- prcomp(mydata, scale=T) 
summary(pca)
summary(pca)$importance[, 1:6]
x11(height=6, width=12, pointsize=12); par(mfrow=c(1,3))
mycolors <- c("red", "green", "blue", "magenta", "black")
plot(pca$x[,1:2], pch=20, col=mycolors[sort(rep(1:5, 500))])
pairs(pca$x[,1:4], pch=20, col=mycolors[sort(rep(1:5, 500))])
library(scatterplot3d)
scatterplot3d(pca$x[,1:3], pch=20, color=mycolors[sort(rep(1:5, 500))])
```
## 12.气泡图 (Bubbles )
```
require(ggplot2)
df<- read.csv("Bubbles.csv")
ggplot(df, aes(x = id,y=Term,label = Term)) +
  geom_point(aes(size = Input_number, colour = P.Value)) + 
  #geom_text(hjust = 1, size = 2) +
  scale_size(range = c(1,15)) +
  scale_x_continuous(breaks = seq(1, 15, 2)) +
  scale_colour_gradientn(colours=rainbow(4)) +
  theme_bw()
```
## 美化 (themes and background)
## ggplot2自带主题
```
p <- ggplot(iris, aes(Sepal.Length, Sepal.Width, colour = Species))+
  geom_point()
p
p + theme_classic()
```
## 主题包
```
library(ggthemes)
p + theme_calc()+ scale_colour_calc()+
  ggtitle("Iris data")
```
## 定制主题
```
p + theme(
  panel.background = element_rect(fill = "lightblue",
                                  colour = "lightblue",
                                  size = 0.5, linetype = "solid"),
  panel.grid.major = element_line(size = 0.5, linetype = 'solid',
                                  colour = "white"), 
  panel.grid.minor = element_line(size = 0.25, linetype = 'solid',
                                  colour = "white")
)
```
# 三、复杂图形修改
<p></p>
![](http://7xk19o.com1.z0.glb.clouddn.com/20111210_WOC210.gif)
```
library(ggplot2)
#dat <- read.csv("https://github.com/tiramisutes/myscripts-R/blob/master/EconomistData.csv")
dat <- read.csv("C:/Users/hope/Desktop/R-class//EconomistData.csv")
```
## Basic plot
```
pc1 <- ggplot(dat,aes(x = CPI, y = HDI, color = Region))+
  geom_point()
pc1
```
## Trend line
```
pc2 <- pc1 +
  geom_smooth(aes(group = 1),
              method = "lm",
              formula = y ~ log(x),
              se = FALSE,
              color = "red")
pc2
```
## Open points
```
pc3 <- ggplot(dat,aes(x = CPI, y = HDI, color = Region))+
  geom_point(shape = 1, size = 4) +
  geom_smooth(aes(group = 1),
              method = "lm",
              formula = y ~ log(x),
              se = FALSE,
              color = "red")
pc3
```
## 选择性的标注想要的点
```
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
pc4
```
## 修改图例值和顺序
```
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
## 利用scale来修改x，y轴，颜色和标出title
```
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
  ggtitle("Corruption and Human development") +
  theme(plot.title = element_text(hjust = 0.5))
pc5
```
## 微调主题
```
library(grid)
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
  )
pc6
```
# 四、RNA-Seq (DESeq2)
```
library(DESeq2)
library(limma)
library(pasilla)
data(pasillaGenes)
exprSet=counts(pasillaGenes)
head(exprSet)
colData <- data.frame(row.names=colnames(exprSet), 
                      group_list=group_list
)
dds <- DESeqDataSetFromMatrix(countData = exprSet,
                              colData = colData,
                              design = ~ group_list)
dds
dds2 <- DESeq(dds)
resultsNames(dds2)
res <-  results(dds2, contrast=c("group_list","treated","untreated")) 
resOrdered <- res[order(res$padj),]
resOrdered=as.data.frame(resOrdered)
head(resOrdered)
```
# 五、写在最后
<p></p>
<i class="fa fa-commenting-o" aria-hidden="true"></i>本页内容对应PPT详细请见[A Beginner’s Guide to Learn R Programming](http://tiramisutes.github.io/code/)，其他更多优质资源请阅读 [R语言的最好资源，一个就够！](https://mp.weixin.qq.com/s/CZt7URZQIQwBmdQFceQUig)