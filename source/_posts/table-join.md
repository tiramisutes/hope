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
##awk版
``` bash
awk 'BEGIN{FS=OFS=" "} NR==FNR {a[$1]=$2;next}{print $1,$2,a[$3],$4}' b.txt a.txt
```