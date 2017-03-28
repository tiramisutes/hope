title: R中分组统计函数
date: 2015-10-05 19:37:27
tags: statistics
categories: R
---
##apply（对一个数组按行或者按列进行计算）
使用格式为：
``` bash
apply(X, MARGIN, FUN, ...)
```
其中X为一个数组；MARGIN为一个向量（表示要将函数FUN应用到X的行还是列），若为1表示取行，为2表示取列，为c(1,2)表示行、列都计算。
``` bash
> ma <- matrix(c(1:4, 1, 6:8), nrow = 2)
> ma
     [,1] [,2] [,3] [,4]
[1,]    1    3    1    7
[2,]    2    4    6    8
> apply(ma, c(1,2), sum)
     [,1] [,2] [,3] [,4]
[1,]    1    3    1    7
[2,]    2    4    6    8
> apply(ma, 1, sum)
[1] 12 20
> apply(ma, 2, sum)
[1]  3  7  7 15
```
##tapply（分组统计）
使用格式为：
``` bash
tapply(X, INDEX, FUN = NULL, ..., simplify = TRUE)
```
其中X通常是一向量；
INDEX是一个list对象，且该list中的每一个元素都是与X有同样长度的因子；
FUN是需要计算的函数；
simplify是逻辑变量，若取值为TRUE（默认值），且函数FUN的计算结果总是为一个标量值，那么函数tapply返回一个数组；
                  若取值为FALSE，则函数tapply的返回值为一个list对象。
需要注意的是，当第二个参数INDEX不是因子时，函数 tapply() 同样有效，因为必要时 R 会用 as.factor()把参数强制转换成因子。
``` bash
> a<-data.frame(name=c("tom","sam","mik","ali"),age=c(8,9,8,9),math=c(50,100,70,90),verbal=c(90,60,96,80))
> a
  name age math verbal
1  tom   8   50     90
2  sam   9  100     60
3  mik   8   70     96
4  ali   9   90     80
> ages<-levels(as.factor(a$age))
> ages
[1] "8" "9"
> b<-matrix(nrow=length(ages),ncol=2)
> rownames(b)<-ages
> colnames(b)<-c("math","verbal")
> for(i in 1:2){
+   b[,i]<-tapply(a[,i+2],a[,"age"],mean)   #tapply的排序方法是输入factor的levels.
+   }
> b
  math verbal
8   60     93
9   95     70
```
##table（因子出现的频数）
使用格式为：
``` bash
table(..., exclude = if (useNA == "no") c(NA, NaN), useNA = c("no",
    "ifany", "always"), dnn = list.names(...), deparse.level = 1)
```
其中参数exclude表示哪些因子不计算。
``` bash
> d <- factor(rep(c("A","B","C"), 10), levels=c("A","B","C","D","E"))
> d
 [1] A B C A B C A B C A B C A B C A B C A B C A B C A B C A B C
Levels: A B C D E
> table(d)
d
 A  B  C  D  E
10 10 10  0  0
> table(d, exclude="B")
d
 A  C  D  E
10 10  0  0
```