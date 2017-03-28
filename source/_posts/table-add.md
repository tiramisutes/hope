title: 添加系列表头的多种方法
Total word: WordCount
Read time: Min2Read
date: 2016-10-01 10:05:31
tags: shell
categories: Linux
---
##想要在某文本开头 或/和 结尾添加一行？
###awk版
**<code>BEGIN</code>**在开头添加，**<code>END</code>**在结尾添加；
``` bash
awk 'BEGIN{print "START"}; {print}; END{print "END"}'
```
###sed版
sed用 <code>1</code>来匹配第一行，<code>i</code>执行插入操作，<code>$</code>匹配最后一行，<code>a</code>执行追加，
``` bash
sed -e $'1i\\\nSTART' -e $'$a\\\nEND'
```
###echo版
在管道 <code>|</code>操作符中用<code>{命令1;命令2;命令3...}</code>来执行多个命令并告诉程序这是单个复合命令。
``` bash
content-generator |
{ echo START; cat; echo END; } |
postprocessor
```
##忽视第一行
``` bash
#head打印第一行，tail生成其他行来排序
head -n 1 table.txt && tail -n +2 table.txt | sort -nr -k1
#首先将第一行存储到一个变量中
foo=$(head -n 1 table); echo -e "$foo"; tail -n +2 table | sort -nr -k1
```
##忽略第一行，从第二行开始添加行号
``` bash
foo=$(head -n 1 table); echo -e "Record\t$foo"; tail -n +2 table | nl | sed 's/^[ ]*//'
```
##删除第一行
``` bash
awk 'NR!=1'
awk 'NR>1'
tail -n +2
sed '1d'
```
##添加系列多表头
如需添加<span class="myCode">M1,M2....M2016</span>，一系列由字母和数字组合的表头？
``` bash
echo M{1..2016}; cat text.txt
```
##在指定位置插入一列并赋值
``` bash
awk '{$3=NR==1?"add" OFS $3:"hope" OFS $3} 1' OFS="\t\t" text.txt
```
##按第一列将文件拆分并添加表头
``` bash
cat mainfile.txt
file1	abc	def	xyz
file1	aaa	pqr	xyz
file2	lmn	ghi	xyz
file2	bbb	tuv	xyz
#单纯的按照第一列分隔文件
awk '{FILENAME=$1; print >>FILENAME}' mainfile.txt
awk -F '\t' '{if(FILENAME!=$1){FILENAME=$1;print "Name \t State \t Country" > FILENAME}} {print $2 "\t" $3 "\t" $4 > FILENAME}'  mainfile.txt
cat file1
Name	 State	Country
abc	 def	        xyz
aaa	 pqr 	        xyz
cat file2
Name	 State	Country
lmn	 ghi	        xyz    
bbb	 tuv	        xyz
```
<h5>参考资料</h5>
<a href="http://www.thelinuxrain.com/articles/the-header-line-how-to-add-delete-and-ignore-it" target="_blank">The header line: how to add, delete and ignore it</a>
<a href="http://www.unix.com/shell-programming-and-scripting/180147-adding-header-sub-files-after-splitting-main-file-using-awk.html" target="_blank">Adding header to sub files after splitting the main file using AWK Shell Programming and Scripting</a>