title: Perl,awk,sed One-Liners Explained, Part III： Selective Printing and Deleting of Certain Lines
date: 2016-08-18 16:08:20
tags: One-Liners
categories: Perl
---
###sed -i 备份
``` bash
sed -i.bak 's/:/;/' users
```
**sed -i**将会在原文件上执行sed命令，-i.bak将创建一个users.bak文件备份原users文件。
###只在第N行进行替换
``` bash
sed 'Ns/foo/bar/' test.txt
```
###输出第N行
``` bash
perl -ne '$.==N && print && exit' test.txt
awk 'NR==N' test.txt
```
<!-- more -->
####<i class="fa fa-chrome" aria-hidden="true"></i>参数解释：
**<code>$.</code>**为专用变量，表示当前行编号；
###输出第N、M行
``` bash
perl -ne 'print if $.==N || $.==M' test.txt
```
###输出第N到M行
``` bash
perl -ne 'print if $.>=N && $.<=M' test.txt
perl -ne 'print if N .. M' test.txt
awk 'NR==N,NR==M' test.txt
sed -n 'N,Mp' test.txt
```
###输出最长行
``` bash
perl -ne '$1=$_ if length($_)>length($1);END {print $1}' test.txt
```
###输出奇数行
``` bash
perl -ne 'print if $. % 2' test.txt
```
###输出偶数行
``` bash
perl -ne 'print if $. % 2==0' test.txt
```
###重复行只输出一次，非重复行不输出
``` bash
perl -ne 'print if ++$a{$_} ==2' test.txt
```
###输出匹配到模式的下一行
``` bash
awk '/模式/ {getline; print}' test.txt 
```
####<i class="fa fa-chrome" aria-hidden="true"></i>参数解释：
**getline**读取下一行数据,继续运行当前的awk脚本;next也的读取下一行，然后把控制权交给了awk脚本的顶部，如<code>awk '{if(NR==1){next} print $1,$2}' data</code>；
###输出匹配到模式的行到最后一行
``` bash
awk '/模式/,0' test.txt
```
###输出匹配到模式1到模式2 的行
``` bash
awk '/模式1/,/模式2/' test.txt  #包括模式1和2
awk '/模式1/,/模式2/{if (!/模式1/&&!/模式2/)print}' test.txt #不包括模式1和2自身
```
###删除所有空行
``` bash
awk NF test.txt
```
**空行时NF是零**
###文件1和文件2根据某一列对应值合并
``` bash
[zpxu@node102 ~]$ cat datafile 
20081010 1123 xxx
20081011 1234 def
20081012 0933 xyz
20081013 0512 abc
20081013 0717 def
[zpxu@node102 ~]$ cat mapfile 
abc withdrawal
def payment
xyz deposit
xxx balance
[zpxu@node102 ~]$ awk 'NR==FNR{a[$1]=$2;next} {$3=a[$3]}1' mapfile datafile
20081010 1123 balance
20081011 1234 payment
20081012 0933 deposit
20081013 0512 withdrawal
20081013 0717 payment
```
###空白单元格
``` bash
$ cat test.txt 
a       4       5       6
b               5
d       1
s       5       3       5
$ #想要效果，替换空白单元格为NA
$ awk 'BEGIN{FS=OFS="\t"} {for(i=1;i<=NF;i++) if ($i~/^$/) $i="NA"};1' test.txt 
a       4       5       6
b       NA      5       NA
d       1       NA      NA
s       5       3       5
```
####<i class="fa fa-chrome" aria-hidden="true"></i>参数解释：
**awk中最后的数字1是<code>{ print $0 }</code>的简写。**
另一种效果：
``` bash
$ cat myfile.csv 
1,2,3,4,5,6,7
,,,,,,
1,,,4,5,,
,2,3,4,5,,
$ cat fill-empty-values.sh
#!/bin/bash

for i in $( seq 1 2); do
  sed -e "s/^,/$2,/" -e "s/,,/,$2,/g" -e "s/,$/,$2/" -i $1
done
$ bash fill-empty-values.sh myfile.csv 0
$ cat myfile.csv 
1,2,3,4,5,6,7
0,0,0,0,0,0,0
1,0,0,4,5,0,0
0,2,3,4,5,0,0
```
more：<i class="fa fa-link" aria-hidden="true"></i> http://www.catonmat.net/blog/ten-awk-tips-tricks-and-pitfalls/#awk_ranges
