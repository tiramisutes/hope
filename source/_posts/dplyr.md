title: R数据整形术之 dplyr
date: 2016-03-15 21:10:33
tags:  dplyr
categories: R
---
##数据集类型
将过长过大的数据集转换为显示更友好的 tbl_df 类型:
``` bash
hflights_df <- tbl_df(hflights)
```
可以 hflights_df 感受一下不再被刷屏的感觉.
##基本操作
<i class="fa fa-book"></i>常用的数据操作行为归纳为以下五种:
###筛选: filter()
按给定的逻辑判断筛选出符合要求的子数据集, 类似于 base::subset() 函数
``` bash
filter(hflights_df, Month == 1, DayofMonth == 1)
#对同一对象的任意个条件组合
filter(hflights_df, Month == 1 | Month == 2)
```
###排列: arrange()
按给定的列名依次对行进行排序
``` bash
arrange(hflights_df, DayofMonth, Month, Year)
#对列名加 desc() 进行倒序:
arrange(hflights_df, desc(ArrDelay))
#这个函数和 plyr::arrange() 是一样的, 类似于 order()
```
###选择: select()
用列名作参数来选择子数据集:
``` bash
select(hflights_df, Year, Month, DayOfWeek)
#还可以用 : 来连接列名, 没错, 就是把列名当作数字一样使用
select(hflights_df, Year:DayOfWeek)
用 - 来排除列名:
select(hflights_df, -DrayOfWeek)
```
###变形: mutate()
对已有列进行数据运算并添加为新列:
``` bash
mutate(hflights_df,   gain = ArrDelay - DepDelay,   speed = Distance / AirTime * 60)
```
###汇总: summarise()
对数据框调用其它函数进行汇总操作, 返回一维的结果:
``` bash
summarise(hflights_df, delay = mean(DepDelay, na.rm = TRUE))
```
##分组动作 group_by()
以上5个动词函数已经很方便了, 但是当它们跟分组操作这个概念结合起来时, 那才叫真正的强大! 当对数据集通过 group_by() 添加了分组信息后,mutate(), arrange() 和 summarise() 函数会自动对这些 tbl 类数据执行分组操作 (R语言泛型函数的优势).
``` bash
mtfs_df %>%
     group_by(chr) %>%
     summarize(max_recom = max(recom), mean_recom = mean(recom), num=n())

Source: local data frame [23 x 4]
     chr max_recom mean_recom  num
1   chr1   41.5648   2.217759 2095
2  chr10   42.4129   2.162635 1029
3  chr11   36.1703   2.774918  560
[...]
```
<i class="fa fa-book"></i>summarise中用到的函数
<i class="fa fa-fort-awesome"></i>
n(): 计算个数 n_distinct(): 计算 x 中唯一值的个数. (原文为 count_distinct(x))
first(x), last(x) 和 nth(x, n): 返回对应秩的值, 类似于自带函数 x[1], x[length(x)], 和 x[n]
##连接符 %>%
使用时把数据名作为开头, 然后依次对此数据进行多步操作.
##深入学习
dplyr 包自带的60页<a href="http://cran.rstudio.com/web/packages/dplyr/dplyr.pdf" target="_blank">详细文档</a>.
其余几个vignettes (<a href="http://cran.rstudio.com/web/packages/dplyr/vignettes/" target="_blank">网页</a>) 或 vignette(package = "dplyr"),包含了数据库相关, 混合编程, 运算性能比较, 以及新的 window-functions 等内容.
简单看了下<a href="http://cran.rstudio.com/web/packages/dplyr/vignettes/window-functions.html" target="_blank">vignette("window-functions", package = "dplyr")</a>, 提供了一系列函数, 扩展了原来只能返回一个数值的聚焦类函数(如sum(), mean())至返回等长度的值, 变成 cumsum()和 cummean(), 以及 n(), lead() 和 lag()等便捷功能.
plyr 包的相关文档: <a href="http://plyr.had.co.nz/" target="_blank">主页</a>
还有<a href="http://cran.rstudio.com/web/packages/data.table/" target="_blank">data.table</a>包也是很强大的哦, 空下来可以学一学.