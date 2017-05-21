title: table按条件合并
Total word: WordCount
Read time: Min2Read
date: 2016-10-01 15:10:29
tags: shell
categories: Linux
---
a.txt的第三列按照2.txt替换
``` bash
cat a.txt
1	h	1	hhh
2	k	3	uytfd
3	d	2	gfsr
4	f	3	jdgk
cat b.txt
1	a
2	b
3	c
cat 预期结果
1	h	a	hhh
2	k	c	uytfd
3	d	b	gfsr
4	f	c	jdgk
```
##join版
``` bash
join -t$'\t' -o 1.1 1.2 2.2 1.4 -1 3 -2 1 <(sort -k3 a.txt) b.txt | sort -n -k1
```
<i class="fa fa-bullhorn" aria-hidden="true"></i>join命令：
`join -1 <file_1_field> -2 <file_2_field> <file_1> <file_2>`
-a<1或2>   除了显示原来的输出内容之外，还显示指令文件中没有相同栏位的行。 
-i或--igore-case   比较栏位内容时，忽略大小写的差异。 
-t<字符>   使用栏位的分隔字符。 
##awk版
``` bash
awk 'BEGIN{FS=OFS=" "} NR==FNR {a[$1]=$2;next}{print $1,$2,a[$3],$4}' b.txt a.txt
```