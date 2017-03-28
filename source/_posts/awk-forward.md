title: awk 匹配与取反，命令行传递参数
date: 2016-08-11 18:40:40
tags: awk
categories: Linux
---
##匹配
**/FIN|TIME/** 匹配FIN或者TIME；
##取反
**!~**
####取出第一列以外的其他列
<cord>awk '{$1="";print }' file.txt</cord>
####第N列和M列外的其他列
<cord>awk '{\$1=\$3="" ;print }' file.txt</cord>
##拆分文件
``` bash
$ cat netstat.txt
Proto Recv-Q Send-Q Local-Address          Foreign-Address             State
tcp        0      0 0.0.0.0:3306           0.0.0.0:*                   LISTEN
tcp        0      0 0.0.0.0:80             0.0.0.0:*                   LISTEN
tcp        0      0 127.0.0.1:9000         0.0.0.0:*                   LISTEN
tcp        0      0 coolshell.cn:80        124.205.5.146:18245         TIME_WAIT
tcp        0      0 coolshell.cn:80        61.140.101.185:37538        FIN_WAIT2
tcp        0      0 coolshell.cn:80        110.194.134.189:1032        ESTABLISHED
tcp        0      0 coolshell.cn:80        123.169.124.111:49809       ESTABLISHED
tcp        0      0 coolshell.cn:80        116.234.127.77:11502        FIN_WAIT2
tcp        0      0 coolshell.cn:80        123.169.124.111:49829       ESTABLISHED
tcp        0      0 coolshell.cn:80        183.60.215.36:36970         TIME_WAIT
tcp        0   4166 coolshell.cn:80        61.148.242.38:30901         ESTABLISHED
tcp        0      1 coolshell.cn:80        124.152.181.209:26825       FIN_WAIT1
tcp        0      0 coolshell.cn:80        110.194.134.189:4796        ESTABLISHED
tcp        0      0 coolshell.cn:80        183.60.212.163:51082        TIME_WAIT
tcp        0      1 coolshell.cn:80        208.115.113.92:50601        LAST_ACK
tcp        0      0 coolshell.cn:80        123.169.124.111:49840       ESTABLISHED
tcp        0      0 coolshell.cn:80        117.136.20.85:50025         FIN_WAIT2
```
按第6列分隔文件，**其中的NR！=1表示不处理表头。**
``` bash
$ awk 'NR!=1{print > $6}' netstat.txt
 
$ ls
ESTABLISHED  FIN_WAIT1  FIN_WAIT2  LAST_ACK  LISTEN  netstat.txt  TIME_WAIT
 
$ cat ESTABLISHED
tcp        0      0 coolshell.cn:80        110.194.134.189:1032        ESTABLISHED
tcp        0      0 coolshell.cn:80        123.169.124.111:49809       ESTABLISHED
tcp        0      0 coolshell.cn:80        123.169.124.111:49829       ESTABLISHED
tcp        0   4166 coolshell.cn:80        61.148.242.38:30901         ESTABLISHED
tcp        0      0 coolshell.cn:80        110.194.134.189:4796        ESTABLISHED
tcp        0      0 coolshell.cn:80        123.169.124.111:49840       ESTABLISHED
 
$ cat FIN_WAIT1
tcp        0      1 coolshell.cn:80        124.152.181.209:26825       FIN_WAIT1
 
$ cat FIN_WAIT2
tcp        0      0 coolshell.cn:80        61.140.101.185:37538        FIN_WAIT2
tcp        0      0 coolshell.cn:80        116.234.127.77:11502        FIN_WAIT2
tcp        0      0 coolshell.cn:80        117.136.20.85:50025         FIN_WAIT2
 
$ cat LAST_ACK
tcp        0      1 coolshell.cn:80        208.115.113.92:50601        LAST_ACK
 
$ cat LISTEN
tcp        0      0 0.0.0.0:3306           0.0.0.0:*                   LISTEN
tcp        0      0 0.0.0.0:80             0.0.0.0:*                   LISTEN
tcp        0      0 127.0.0.1:9000         0.0.0.0:*                   LISTEN
 
$ cat TIME_WAIT
tcp        0      0 coolshell.cn:80        124.205.5.146:18245         TIME_WAIT
tcp        0      0 coolshell.cn:80        183.60.215.36:36970         TIME_WAIT
tcp        0      0 coolshell.cn:80        183.60.212.163:51082        TIME_WAIT
```
##if-else-if
``` bash
$ awk 'NR!=1{if($6 ~ /TIME|ESTABLISHED/) print > "1.txt";
else if($6 ~ /LISTEN/) print > "2.txt";
else print > "3.txt" }' netstat.txt
```
##统计
``` bash
awk '{sum+=$5} END {print sum}' file.txt
awk 'NR!=1{a[$6]++;} END {for (i in a) print i ", " a[i];}' file.txt #输出非重复的第六列并计数
awk 'NR!=1{a[$6]+=$7;} END { for(i in a) print i ", " a[i]"KB";}' file.txt #输出非重复的第六列，其第七列对应值累加
```
##shell脚本中传入参数
接收来自命令行传入的参数，第一个参数用<cord>\$1</cord>表示，第二个参数用<cord>\$2</cord>表示，以此类推；注意：\$0表示脚本文件名。
``` bash
$ cat test.sh
cat $@ | awk -F, 'NR!=1 $79!~/\[M\+[0-9]\]+|\[M\][0-9]+/' > te.$@
```
$@表示所有的命令行参数；详细见http://www.runoob.com/linux/linux-shell-passing-arguments.html
##awk -v参数
-v var=var_value
在awk程序执行前，把awk变量var的值设置为var_value，这个var变量在BEGIN块中也有效，经常用来把shell变量引入awk程序。
``` bash
$a=1
$ awk -v var=$a 'BEGIN{print var}'
1
```
读入csv文件
**awk -F, -v OFS=, '{print $1,$3}' old.csv**