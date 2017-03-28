title: Linux中如何正确删除：find-rm
date: 2016-03-21 12:18:46
tags: find-rm
categories: Linux
---
假如当前目录下有诸多fastq文件想要删除，通常我们选择这样：
##直接删除
``` bash
rm *-temp.fastq
```
但是如果一时疏忽输入<code>rm * -temp.fastq</code>（*号和-号之间多了空格），那结果就惨了.....
而如果结合<a href="http://tiramisutes.github.io/2015/11/29/find/" target="_blank">Linux常用命令之find</a>命令那么一切就简单多了
``` bash
find . -name "*-temp.fastq" -exec rm -i {} \;
#or
find . -name "*-temp.fastq" | xargs rm
```
-exec 表示由find找到的匹配项会作为"-exec后面设定的命令"的参数（｛｝中输入值）
-i	交互删除
若想要删除文件夹，则<code>-delete</code> 代替<code>-exec -rm {}</code> 
##打印删除rm命令并检查
``` bash
find . -name "*-temp.fastq" | xargs -n 1 echo "rm -i" > delete-temp.sh
cat delete-temp.sh
rm -i ./zmaysA_R1-temp.fastq
rm -i ./zmaysA_R2-temp.fastq
rm -i ./zmaysC_R1-temp.fastq
rm -i ./zmaysC_R2-temp.fastq
bash delete-temp.sh
#or
find . -name "*.fastq" | xargs -n 1 -P 4 bash script.sh
```
-n 1	表示find擦找到的参数每次只有一个输入到xargs中
-P	并行运算
##将删除文件放入临时文件夹（tmp）
``` bash
myrm(){ D=/tmp/$(date +%Y%m%d%H%M%S); mkdir -p $D; mv "$@" $D && echo "moved to $D ok"; }
```