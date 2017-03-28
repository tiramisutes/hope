title: Awk Regular Expressions
Total word: WordCount
Read time: Min2Read
date: 2016-08-31 23:25:51
tags: awk
categories: Linux
---
##--re-interval
在标准的正则表达式中{m}表示匹配字符m次，即<code>[A-Z]{m}表示匹配A到Z的任意一个字符m次。</code>，所以我们在awk中通常如下匹配：
``` bash
cat test.txt
12  AT  CG
7555  AAA       AT
878 GGGG        CTG
cat test.txt | awk 'BEGIN{FS=OFS="\t"} {for(i=1;i<=NF;i++) if ($i~/^[ATCG]{2}$/) print $i}'
```
**空**，什么也没有输出？
首先{m}属于基本的正则表达式，而awk只支持扩展的正则表达式；
awk要想使用{m,n}类型的正则表达式，必须向awk提供参数：<code>--re-interval </code>。
``` bash
cat test.txt | awk --re-interval 'BEGIN{FS=OFS="\t"} {for(i=1;i<=NF;i++) if ($i~/^[ATCG]{2}$/) print $i}'
AT
CG
AT
```
##**-v var=value or --asign var=value**	赋值一个用户定义变量；
``` bash
$ awk -va=1 '{print $1,$1+a}' log.txt
 ---------------------------------------------
 2 3
 3 4
 This's 1
 10 11
 $ awk -va=1 -vb=s '{print $1,$1+a,$1b}' log.txt
 ---------------------------------------------
 2 3 2s
 3 4 3s
 This's 1 This'ss
 10 11 10s
 ```
##gensub()替换
 ``` bash
 echo "123356" | awk '{print gensub("3","d",2)}'
123d56
```
gensub(a,b,c,d) a:匹配的字符，b替换的字符,c为指定替换目标是第几次匹配（如1，2，g），d为指定替换目标是哪个域如$1,$2，若无d指$0，返回值为target替换后内容(未替换还是返回 target原内容)。
##两个文本按条件合并
 ``` bash
[zpxu@node102 ~]$  cat 2.txt 1.txt 
I0011  11111    hhh
I0012  22222    kkk
I0014  55555    ppp
I0017  66666    ttt
0011AAA 200.00 20050321
0012BBB 300.00 20050621
0013DDD 400.00 20050622
0014FFF 500.00 20050401
#比较 1.txt的1-4字符 和 2.txt的2-5 字符，如果相同，将2.txt 的全部列 与 1.txt 合并
[zpxu@node102 ~]$ awk  'NR==FNR{a[substr($1,2,5)]=$0}NR>FNR&&a[b=substr($1,1,4)]{print $0, a[b]}' 2.txt 1.txt 
0011AAA 200.00 20050321 I0011  11111    hhh
0012BBB 300.00 20050621 I0012  22222    kkk
0014FFF 500.00 20050401 I0014  55555    ppp
#NR==FNR处理的是2.txt文件,NR>FNR处理的是1.txt文件
#awk 'NR==FNR{a[$1]=$2}NR>FNR&&a[$1] {print $1,a[$1]}' 2.txt 1.txt
```
**命令解释：**首先处理2.txt文件，a[$1]=$0相当与将$1为键，整个行$0为值的hash；当处理1.txt文件时，直接在键的数组a中匹配1.txt中的$1列，若匹配则输出1.txt的$1和其在对应2.txt中匹配到的值；
##next与getline
awk code: 'BEGIN{...}{Main Input}END{..}'
next 读入下一输入行并从(Main Input中的)第一个规则开始执行脚本。
``` bash
[zpxu@node102 ~]$  cat data 
name naughty
25 shandong
age 14  
ah,here is test
[zpxu@node102 ~]$ awk '{if(NR==1){next} print $1,$2}' data   
25 shandong
age 14
ah,here is
```
当记录行号等于1，就跳过当前行，其后面的print $1,$2也不会执行,读入下一行重新开始；
**next合并多行为一行**
可首先将两个或多个文件处理：cat a.txt b.txt | sort -n -k1 ，然后用next合并多行为一行来进行两个文本的按条件合并；
``` bash
cat data
web01[192.168.2.100]
httpd            ok
tomcat               ok
sendmail               ok
web02[192.168.2.101]
httpd            ok
postfix               ok
web03[192.168.2.102]
mysqld            ok
httpd               ok
awk '/^web/{T=$0;next;} {print T":\t"$0;}' data
web01[192.168.2.100]:   httpd            ok
web01[192.168.2.100]:   tomcat               ok
web01[192.168.2.100]:   sendmail               ok
web02[192.168.2.101]:   httpd            ok
web02[192.168.2.101]:   postfix               ok
web03[192.168.2.102]:   mysqld            ok
web03[192.168.2.102]:   httpd               ok
#行首匹配到web时将这一整行赋值给T存储起来，并读入下一行，最后将T和下一行一起print；
```
与next相似，getline也是读取下一行数据。但是与next不同的是，next读取下一行之后，把控制权交给了awk脚本的顶部。但是getline却没有改变脚本的控制，读取下一行之后，继续运行当前的awk脚本。getline执行之后，会覆盖$0的内容。
``` bash
[zpxu@node102 ~]$ cat d  
$1=="name"{print $0;getline;print $0;}  
$1=="age"{print $0}  
[zpxu@node102 ~]$ awk -f d data   
name naughty  
25 shandong  
age 14  
```
**getline从整体上来说，应这么理解它的用法：**
<li>当其左右无重定向符 | 或 < 时，getline作用于当前文件，读入当前文件的第一行给其后跟的变量var 或$0（无变量）；应该注意到，由于awk在处理getline之前已经读入一行，所以getline得到
的返回结果是隔行的。</li>
<li>当其左右有重定向符 | 或 < 时，getline则作用于定向输入文件，由于该文件是刚打开，并没有被awk读入一行，只是getline读入，那么getline返回的是该文件的第一行，而不是隔行。</li>
##多行或多列的删除
###多行
``` bash
[zpxu@node102 ~]$  cat 1.txt 
1
2
3
4
5
6
7
8
9
10
11
12
[zpxu@node102 ~]$ awk -vD="1,3,5,8,11" 'BEGIN{split(D,a,",");c=1}NR==a[c]{c++;next}1' 1.txt 
2
4
6
7
9
10
12
```
###多列
``` bash
[zpxu@node102 ~]$  cat data 
1,2,3,4,5,6,7,8,9,10,11,12
[zpxu@node102 ~]$ awk --re-interval -vD='1,3,5,11' 'BEGIN{l=split(D,a,",")}{for(i=1;i<=l;i++){$0=gensub("(([^,]*,?){"a[i]-i"})([^,]+,?)(.*)","\\1\\4","1")}}1' data 
2,4,6,7,8,9,10,12
```
<h5>参考资料</h5>
<a href="http://www.runoob.com/linux/linux-comm-awk.html" target="_blank">Linux awk 命令</a>
<a href="http://www.cnblogs.com/belid/archive/2013/05/22/3093264.html" target="_blank">awk函数+数组+多文件处理</a>