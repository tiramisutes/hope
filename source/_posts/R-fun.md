title: R中的基础函数
date: 2015-11-08 16:53:00
tags: function
categories: R
---
在R中偶尔也需要对一些数据进行简短的处理，掌握一些基本函数是必须的，本文将持续收集那些短小精悍的R函数，正确的运用还是能起到四两拔千斤的效果，欢迎评论补充。
###aggregate
功能:aggregate(formula, data, FUN)
首先将数据进行分组（按行），然后对每一组数据进行函数统计，最后把结果组合成一个比较nice的表格返回.
``` bash
> head(chickwts)
  weight      feed
1    179 horsebean
2    160 horsebean
3    136 horsebean
4    227 horsebean
5    217 horsebean
6    168 horsebean
> unique(chickwts$feed)
[1] horsebean linseed   soybean   sunflower meatmeal  casein   
Levels: casein horsebean linseed meatmeal soybean sunflower
> #aggregate(chickwts$weight, by=list(chickwts$feed), FUN=mean)
> aggregate(weight ~ feed, data = chickwts, mean)
       feed   weight
1    casein 323.5833
2 horsebean 160.2000
3   linseed 218.7500
4  meatmeal 276.9091
5   soybean 246.4286
6 sunflower 328.9167
> head(iris)
  Sepal.Length Sepal.Width Petal.Length Petal.Width Species
1          5.1         3.5          1.4         0.2  setosa
2          4.9         3.0          1.4         0.2  setosa
3          4.7         3.2          1.3         0.2  setosa
4          4.6         3.1          1.5         0.2  setosa
5          5.0         3.6          1.4         0.2  setosa
6          5.4         3.9          1.7         0.4  setosa
> unique(iris$Species)
[1] setosa     versicolor virginica 
Levels: setosa versicolor virginica
> aggregate(. ~ Species, data = iris, mean)
     Species Sepal.Length Sepal.Width Petal.Length Petal.Width
1     setosa        5.006       3.428        1.462       0.246
2 versicolor        5.936       2.770        4.260       1.326
3  virginica        6.588       2.974        5.552       2.026
```
###paste
功能：paste(..., sep = " ", collapse = NULL)
字符串连接
``` bash
> paste("CK", 1:6, sep = "")
[1] "CK1" "CK2" "CK3" "CK4" "CK5" "CK6"
> #设置collapse参数，连成一个字符串
> paste("CK", 1:6, sep = "", collapse = "-")
[1] "CK1-CK2-CK3-CK4-CK5-CK6"
```
<i class="fa fa-binoculars" aria-hidden="true"></i>paste在不指定分割符的情况下，默认分割符是空格 ，paste0在不指定分割符的情况下，默认分割符是空。
###strsplit
功能：strsplit(x, split, fixed = FALSE, perl = FALSE, useBytes = FALSE)
字符串拆分，生成一个list
参数解释：
x为字串向量，每个元素都将单独进行拆分。
split为拆分位置的字串向量（分隔符），默认为正则表达式匹配（fixed=FALSE）。如果你没接触过正则表达式，设置fixed=TRUE，表示使用普通文本匹配或正则表达式的精确匹配。普通文本的运算速度快。
perl=TRUE/FALSE的设置和perl语言版本有关，如果正则表达式很长，正确设置表达式并且使用perl=TRUE可以提高运算速度。
useBytes设置是否逐个字节进行匹配，默认为FALSE，即按字符而不是字节进行匹配。
``` bash
> text <- "Hello Adam!\nHello Ava!"
> strsplit(text, "\\s")
[[1]]
[1] "Hello" "Adam!" "Hello" "Ava!" 
```
<i class="fa fa-bullhorn" aria-hidden="true"></i>如果要对一个向量使用该函数，需要注意。
``` bash
#分割向量的每一个元素，并取分割后的第一个元素
unlist(lapply(X = c("abc", "bcd", "dfafadf"), FUN = function(x) {return(strsplit(x, split = "")[[1]][1])}))
[1] "a" "b" "d"
```
###grep/regexpr/gregexpr/regexec
功能:grep(pattern, x, ignore.case = FALSE, perl = FALSE, value = FALSE, fixed = FALSE, useBytes = FALSE, invert = FALSE)
grep仅返回匹配项的下标.
regexpr、gregexpr和regexec返回的结果包含了匹配的具体位置和字符串长度信息.
``` bash
> text <- c("Hellow, Adam!", "Hi, Adam!", "How are you, Adam.")
> text
[1] "Hellow, Adam!"      "Hi, Adam!"          "How are you, Adam."
> grep("Adam",text)
[1] 1 2 3
> regexpr("Adam", text)
[1]  9  5 14
attr(,"match.length")
[1] 4 4 4
attr(,"useBytes")
[1] TRUE
> gregexpr("Adam", text)
[[1]]
[1] 9
attr(,"match.length")
[1] 4
attr(,"useBytes")
[1] TRUE

[[2]]
[1] 5
attr(,"match.length")
[1] 4
attr(,"useBytes")
[1] TRUE

[[3]]
[1] 14
attr(,"match.length")
[1] 4
attr(,"useBytes")
[1] TRUE

> regexec("Adam", text)
[[1]]
[1] 9
attr(,"match.length")
[1] 4

[[2]]
[1] 5
attr(,"match.length")
[1] 4

[[3]]
[1] 14
attr(,"match.length")
[1] 4
```
###substr
功能：substr(x, start, stop)
字符串提取
``` bash
> substr(text,9,12)
[1] "Adam" "!"    "you,"
```
###strtrim
功能：strtrim(x, width)
将字符串修剪到特定的显示宽度.
``` bash
> head(iris)
  Sepal.Length Sepal.Width Petal.Length Petal.Width Species
1            5         3.5          1.4         0.2  setosa
2            4         3.0          1.4         0.2  setosa
3            4         3.2          1.3         0.2  setosa
4            4         3.1          1.5         0.2  setosa
5            5         3.6          1.4         0.2  setosa
6            5         3.9          1.7         0.4  setosa
> strtrim(head(iris)$Sepal.Length,1)
[1] "5" "4" "4" "4" "5" "5"
> iris$Sepal.Length<-strtrim(head(iris)$Sepal.Length,1)
> head(iris)
  Sepal.Length Sepal.Width Petal.Length Petal.Width Species
1            5         3.5          1.4         0.2  setosa
2            4         3.0          1.4         0.2  setosa
3            4         3.2          1.3         0.2  setosa
4            4         3.1          1.5         0.2  setosa
5            5         3.6          1.4         0.2  setosa
6            5         3.9          1.7         0.4  setosa
```
###length/nchar
nchar是向量元素的字符个数，而length是向量长度.
``` bash
> length("ATGGGAATGCATGAACTAGCAGCCAAAGTTGATGAGT")
[1] 1
> car <- c('bmw','ford','mini','bmw','mini')
> length(car)
[1] 5
> length(unique(car))
[1] 3
> nchar("ATGGGAATGCATGAACTAGCAGCCAAAGTTGATGAGT")
[1] 37
```
###round
功能：round(x, digits = 0)
四舍五入
``` bash
> round(c(1.1254,0.1247844),3)
[1] 1.125 0.125
```
###axes/axis
axes=FALSE       暂时禁止坐标轴的生成|以便使用axis()函数添加你自己定制的坐标轴。默认情况是axes=TRUE，即包含坐标轴。
axis(side, . . . )
在当前图形的指定边上添加坐标，在哪个边上由第一个参数指定（1到4，从底部按照顺时针顺序）。其他参数控制坐标的位置|在图形内或图形外，以及标记的位置和标签。适合在调用参数为axes=FALSE的函数plot()后添加定制的坐标轴。
###order()
A[order(A[,4],decreasing=T),] ＃按照第4列降序排序
data  #dataframe对象 含有v1,v2两列
data[sort(data$v1,index.return=TRUE)$ix,]　　#对data的数据按v1排列,v1须为numeric  as.numeric()
###%in%
功能：在数据框中选取某一列只含特定字符的行
``` bash
> library(dplyr)
> library(tidyr)
> df <- data_frame(
+   group = c(1:2, 1),
+   item_name = c("a", "b", "b"),
+   value1 = 1:3,
+   value2 = 4:6
+ )
> df
Source: local data frame [3 x 4]

  group item_name value1 value2
  (dbl)     (chr)  (int)  (int)
1     1         a      1      4
2     2         b      2      5
3     1         b      3      6
>#选取item_name列中只含有a的行
> a<-c("a")
> df[df$item_name %in% a,]
Source: local data frame [1 x 4]

  group item_name value1 value2
  (dbl)     (chr)  (int)  (int)
1     1         a      1      4
```
###table
功能：统计数据的频数
``` bash
> a<-c(1,1,1,2,2,3)
> table(a)
a
1 2 3 
3 2 1 
```
###str()
功能：查看数据结构
``` bash
> str(reps )
'data.frame':	255956 obs. of  17 variables:
 $ bin      : int  585 585 585 585 585 585 585 585 585 585 ...
 $ swScore  : int  342 2271 3379 2704 180 380 1113 233 388 673 ...
 $ milliDiv : int  0 159 80 108 0 131 168 302 256 182 ...
 $ milliDel : int  0 37 4 31 0 0 19 0 0 7 ...
 $ milliIns : int  0 25 0 10 0 14 19 68 14 90 ...
 $ genoName : Factor w/ 1 level "chrX": 1 1 1 1 1 1 1 1 1 1 ...
 $ genoStart: int  0 41 1799 2290 2797 2945 3015 3565 5012 5164 ...
 $ genoEnd  : int  38 446 2272 2703 2817 3015 3221 3757 5164 5186 ...
 $ genoLeft : int  -154913716 -154913308 -154911482 -154911051 -154910937 -154910739 -154910533 -154909997 -154908590 -154908568 ...
 $ strand   : Factor w/ 2 levels "-","+": 2 2 2 2 2 2 1 2 1 2 ...
 $ repName  : Factor w/ 1105 levels "(A)n","(AAATG)n",..: 90 519 656 579 90 183 248 284 940 240 ...
 $ repClass : Factor w/ 15 levels "DNA","LINE","Low_complexity",..: 10 4 4 4 10 10 11 3 4 11 ...
 $ repFamily: Factor w/ 35 levels "AcHobo","Alu",..: 28 7 7 7 28 28 2 12 13 2 ...
 $ repStart : int  3 741 1 1 2 1 -20 1 -200 1 ...
 $ repEnd   : int  40 1150 475 422 21 69 292 179 228 22 ...
 $ repLeft  : int  0 -104 -83 -79 0 0 87 0 37 -280 ...
 $ id       : int  1 2 3 4 5 6 7 8 9 1 ...
 ```
###ifelse
功能：条件判断
``` bash
> set.seed(123)
> col1 <- runif (5, 0, 2)
> col2 <- rnorm (5, 0, 2)
> col3 <- rpois (5, 3)
> col4 <- rchisq (5, 0.1)
> df <- data.frame (col1, col2, col3, col4)
> df
       col1       col2 col3         col4
1 0.5751550 -3.3791113    5 2.771082e-01
2 1.5766103  2.4789918    2 3.888853e-04
3 0.8179538 -0.2179319    0 8.652702e-05
4 1.7660348 -0.2344839    2 6.492406e-17
5 1.8809346  0.3661652    6 2.963428e-02
> output <- ifelse ((df$col1) > 1 & (df$col3) > 2, "yes", "no")
> df$output <- output
> df
       col1       col2 col3         col4 output
1 0.5751550 -3.3791113    5 2.771082e-01     no
2 1.5766103  2.4789918    2 3.888853e-04     no
3 0.8179538 -0.2179319    0 8.652702e-05     no
4 1.7660348 -0.2344839    2 6.492406e-17     no
5 1.8809346  0.3661652    6 2.963428e-02    yes
```
###gsub和sub
字符串替换 
gsub替换匹配到的全部 
sub 替换匹配到的第一个

``` bash
# 将b替换为B
gsub(pattern = "b", replacement = "B", x = c("abcb", "boy", "baby"))
[1] "aBcB" "Boy"  "BaBy
# 只替换第一个b
sub(pattern = "b", replacement = "B", x = c("abcb", "baby"))
[1] "aBcb" "Baby"
```
###字符串中字符统计
``` bash
s <- "aababac"
p <- "a"
countCharOccurrences <- function(char, s) {
    s2 <- gsub(char,"",s)
    return (nchar(s) - nchar(s2))
}
countCharOccurrences(p,s)
```