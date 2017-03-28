title: Perl,awk,sed One-Liners Explained, Part II： Text Conversion and Substitution
date: 2016-08-18 11:02:20
tags: One-Liners
categories: Perl
---
###所有字符大写
``` bash
perl -nle 'print uc' test.txt
```
###所有字符小写
``` bash
perl -nle 'print lc' test.txt
```
###行首字母大写
``` bash
perl -nle 'print ucfirst lc' test.txt
等同于
perl -nle 'print "\u\L$_"' test.txt
```
###去掉每行行首空格
``` bash
perl -ple 's^[ \t]+//' test.txt
awk '{ sub(/^[ \t]+/, ""); print }' test.txt
sed 's/^[ \t]*//' test.txt
等同于
perl- ple 's/^\s+//' test.txt
```
###去掉从开头到结尾的空格
``` bash
perl -ple 's/^[ \t]+|[ \t]+$//g' test.txt
awk '{ gsub(/^[ \t]+|[ \t]+$/, ""); print }' test.txt
awk '{$1=$1; print}' test.txt
sed 's/^[ \t]*//;s/[ \t]*$//' test.txt
```
**sub和gsub区别：sub替换遇到的第一个字符，而gsub相当于全局替换；**
###转换DOS/Windows换行符为UNIX换行符
``` bash
perl -pe 's|\r\n|\n|' test.txt
awk '{ sub(/\r$/,""); print }' test.txt
sed 's/.$//' test.txt
sed 's/^M$//' test.txt
```
###替换A为S
``` bash
perl -pe 's/A/S/g' test.txt
```
###仅替换最后一个A为S
``` bash
sed 's/\(.*\)A/\1S/' test.txt
```
###在C行替换A为S
``` bash
perl -pe '/C/ && s/A/S/g' test.txt
awk '/C/ { gsub(/A/, "S") }; { print }' test.txt
sed '/C/s/A/S/g' test.txt
```
###awk 中sort排序
``` bash
awk -F ":" '{print $1 | "sort"}' /etc/passwd
```
###删除第二列
``` bash
awk '{$2=""; print}' test.txt
```
###每一列倒序输出
``` bash
awk '{for (i=NF;i>0;i--) printf("%s ",$i); printf ("\n")}' test.txt
```
###sed实现tac功能
``` bash
sed '1!G;h;$!d' test.txt
```
####<i class="fa fa-chrome" aria-hidden="true"></i>参数解释：
**1!G**表示第一行不执行G命令；
**$!d**表示最后一行不执行d命令；