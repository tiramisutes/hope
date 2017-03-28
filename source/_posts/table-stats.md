title: awk对table的统计计算
Total word: WordCount
Read time: Min2Read
date: 2016-10-01 17:28:19
tags: shell
categories: Linux
---
##第三列相同时，第四列累加
``` bash
awk 'BEGIN{FS=OFS="\t"} \
NR>1 \
{a[$3]+=$4} \
END {for (i in a) {print i,a[i]}}' text.txt | sort
```
**awk中的数组由一对字符串组成，第一个字符串是<code>'index'</code>,第二个是index所对应的<code>value</code>，<code>a[$3]+=$4</code>中的index来自第三列，value是第四列相应值的累加。**
**用asorti在awk中排序**
``` bash
awk 'BEGIN{FS=OFS="\t"} \
NR>1 \
{a[$3]+=$4} \
END {n=asorti(a,b);for (i=1;i<=n;i++) {print b[i],a[b[i]]}}' text.txt
```
##依据第三列和第二列，第四列累加
``` bash
awk 'BEGIN{FS=OFS="\t"} \
NR>1 \
{a[$3$2]+=$4} \
END {n=asorti(a,b);for (i=1;i<=n;i++) {print b[i],a[b[i]]}}' text.txt
```
##第三列相同时，第四列的最大值
``` bash
awk -F, '{if (a[$1] < $2)a[$1]=$2;}END{for(i in a){print i,a[i];}}' OFS=, file.txt
```
##第三列相同值计数
``` bash
awk -F, '{a[$1]++;}END{for (i in a)print i, a[i];}' file.txt
```
##第三列相同时，仅输出第四列第一个值
``` bash
awk -F, '!a[$1]++' file.txt
```
##第三列相同时，第四列的所有值并未一行
``` bash
awk -F, '{if(a[$1])a[$1]=a[$1]":"$2; else a[$1]=$2;}END{for (i in a)print i, a[i];}' OFS=, file.txt
```
<h5>参考资料</h5>
<a href="http://www.thelinuxrain.com/articles/a-pivot-table-in-awk" target="_blank">A Pivot Table In AWK</a>
<a href="http://www.theunixschool.com/2012/06/awk-10-examples-to-group-data-in-csv-or.html" target="_blank">awk - 10 examples to group data in a CSV or text file</a>