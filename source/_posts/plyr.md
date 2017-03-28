title: R数据整形术之plyr
date: 2015-11-29 16:24:33
tags: plyr
categories: R
---
plyr包可以进行类似于数据透视表的操作，将数据分割成更小的数据，对分割后的数据进行些操作，最后把操作的结果汇总。
本文主要介绍以下内容：
Split-Aapply-Combine 原理介绍
baby_names的名字排名
求分段拟合的系数
部分其他函数介绍
在正式开始之前，请确保电脑上已经安装plyr，如果没有，通过install.packages()函数安装。
``` bash
> require(plyr)  #载入plyr包
> ##假设有美国新生婴儿的取名汇总，每一年，会统计男孩和女孩的取名情况，形成如下的一张表。baby_names数据集包含1880 ~ 2008年间的数据， 包含统计的年份(year)，新生婴儿的性别、名字、以及改名字的比例。
> baby_names<-read.csv("baby-names.csv")
> head(baby_names)
  year    name  percent sex
1 1880    John 0.081541 boy
2 1880 William 0.080511 boy
3 1880   James 0.050057 boy
4 1880 Charles 0.045167 boy
5 1880  George 0.043292 boy
6 1880   Frank 0.027380 boy
```
##以提问并解决问题的形式对plyr做介绍。

想知道数据集中，每年都有多少记录？
数据集中，男孩和女孩名的各自排名？
男孩名和女孩名各自排名前100在当年中的比例？
数据集中，每年都有多少记录
先假设我们有某一年的数据，我们会如何统计其中的记录数呢？由于数据集中，每条记录一行，只需要统计对应的行数就可以得到对应的记录数。
写个函数试试
``` bash
> record_count <- function(df) {
+     return(data.frame(count = nrow(df)))
+ }
```
返回值类型是data.frame类型，是为即将介绍的ddply()函数做铺垫。先来看看2008年，数据集中有多少记录。
``` bash
> baby_names_2008 <- subset(baby_names, year == 2008)
> record_count(baby_names_2008)
  count
1  2000
```
结果显示2000条，貌似我们已经得到答案。下面想想，该如何得到1880 ~ 2008这129年间，每年的记录数呢？
``` bash
> baby_names_1880_2008<-ddply(baby_names,     # 数据集
+                  .(year),        # 分类的标准
+                  record_count    # 函数
+                             )
> head(baby_names_1880_2008)
  year count
1 1880  2000
2 1881  2000
3 1882  2000
4 1883  2000
5 1884  2000
6 1885  2000
> dim(baby_names_1880_2008)
[1] 129   2
```
ddply解释：
定义了一个负责计数的函数record_count()
调用ddply()，这里出现刚刚定义的函数
ddply()函数是plyr包中用于对data.frame结构的数据做处理的函数，其结果也是data.frame。ddply的参数列表如下：
``` bash
ddply(.data, .variables, .fun = NULL, ..., .progress = "none",
  .inform = FALSE, .drop = TRUE, .parallel = FALSE, .paropts = NULL)
```
各部分解释如下
第一个参数是要操作的原始数据集，比如baby_name
第二个参数是按照某个（也可以几个）变量，对数据集分割，比如按照year对数据集分割，可以写成.(year)的形式
第三个参数是具体执行操作的函数，对分割后的每一个子数据集，调用该函数
第四个参数可选，表示第三个参数对应函数所需的额外参数
其他参数，可以暂时不用考虑。ddply()函数会自动的将分割后的每一小部分的计算结果汇总，以data.frame的格式保存。分割后的数据，是fun的第一个参数。
在上面的描述中，提到的分割、__操作、汇总__，在plyr包中是一种处理方式("frame")，即"Split - Apply - Combine"。在plyr包中有很多这种处理方式的函数，在介绍这些函数之前，我们再来看看ddply()的一些更深入的用法。
##各年，男孩名与女孩名的各自排名
以2008年的数据为例，男孩名"Jacob"的比例最高，排名应当是第一，"Michael"紧跟其后，排名应当第二，依此类推。对于女孩名，"Emma"排名第一，"Isabella"排名第二，"Emily"排名第三等等。我们希望得到这样的结果。

对于2008年的数据，可以通过简单的rank即可得到，不过要对男孩和女孩分别排序。
``` bash
baby_names_2008_boy <- subset(baby_names_2008, sex == "boy") # 获取男孩名
baby_names_2008_boy$rank <- rank(- baby_names_2008_boy$percent) # 排序
head(baby_names_2008_boy) # 查看
```
如何利用ddply()对原始数据集做相应的操作呢？这里需要介绍R语言中的一个函数transform()，该函数对原始数据集做一些操作，并把结果存储在原始数据中，更详细的用法，参见帮助文档?transform。

第一个版本的处理方式是这样的
``` bash
ddply(baby_names, 
      .(year, sex), 
      transform, 
      rank = rank(-percent, ties.method = "first")
)
```
第二个参数有点变化，除了year，还有sex，这表示对baby_name数据集，对year和sex分类（类似于SQL中的group by year, sex）。
第四个参数是transform的额外参数，如果查看transform的帮助文档，其函数调用方式如下：
``` bash
transform(_data, ...)
```
第一参数为操作的数据，在ddply()中为按年份和性别分割后的子数据集；后面的...参数是tag = value的形式，这种tag:value将追加在数据中。
由于rank默认对数据进行升序排序，若要实现逆序排序，常规的做法是将数据的符号取反，这也就是上面的rank函数中出现-percent的原因。在plyr中，有一个类似的函数，实现取反的操作，是desc。
``` bash
x <- 1:10
desc(x)
# -1  -2  -3  -4  -5  -6  -7  -8  -9 -10
```
所以，上面对percent取反的操作，可以写得更优雅些，就有了第二个版本的函数
``` bash
baby_names <- ddply(baby_names, 
                    .(year, sex), 
                    transform, 
                    rank = rank(desc(percent), ties.method = "first")
)
```
注意这里把结果赋给了baby_name，因为后面还会用到排名的信息，就把结果保存下来。
##排名前100的男孩名与女孩名在当年中的比例
跟前一问类似，处理方法是：

把每年排名前100的数据筛选出来
把男孩和女孩对应的percent相加
``` bash
baby_names_top100 <- subset(baby_names, rank <= 100)  # 将前100排名的数据筛选出来
baby_names_top100_trend <- ddply(baby_names_top100, 
                                 .(year, sex), # 按年和性别分割
                                 summarize, # 汇总数据
                                 trend = sum(percent)) # 汇总方式（求和）
```
这里出现一个新的操作函数summarize()，该函数是对数据做汇总，与transform不一样的是，该函数并不追加结果到原始数据，而是产生新的数据集。比如想知道，2008年的男孩名中，排名最高和最低的名字的百分比之差，可以通过如下方式求得：
``` bash
summarize(baby_names_2008_boy, trend = max(percent) - min(percent))
# 0.010266
```
回到刚才的问题，从1880 ~ 2008年间，男孩名与女孩名的前100所占比例（可以衡量名字大众化的程度）到底是什么样的呢？画个图就知道了。
![](http://7xk19o.com1.z0.glb.clouddn.com/ddply.jpeg)
Contribution from ：http://www.jianshu.com/p/bfddfe29aa39

