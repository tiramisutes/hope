title: Perl, awk, sed One-Liners Explained, Part I： File Spacing, Numbering and Calculations
date: 2016-08-13 19:06:55
tags: One-Liners
categories: Perl
---
##文件间距
###两倍行距
``` bash
cat test.txt
Marrys 2143     78       84       77      239
Jacks  2321     78       78       45      189
Toms   2122     48       77       71      196
Mikes  2537     87       97       95      279
Bobs   2415     40       57       62      159
perl -pe '$\="\n"' test.txt
Marrys 2143     78       84       77      239

Jacks  2321     78       78       45      189

Toms   2122     48       77       71      196

Mikes  2537     87       97       95      279

Bobs   2415     40       57       62      159

#最终one line perl命令行相当于如下循环
while (<>) {
    $\ = "\n";
} continue {
    print or die "-p failed: $!\n";
}
```
####<i class="fa fa-chrome" aria-hidden="true"></i>参数解释：
**-e**：命令行进入执行perl程序，而不需要编写perl脚本文件；
**-p**：相当于perl语言的while循环，遍历所有输入内容(input或<>)，执行后面的命令并将结果传递给**$_**，最后print;
``` bash
while (<>) {
    # your program goes here
} continue {
    print or die "-p failed: $!\n";
}
```
**$\**：相当于awk中的ORS，每次print时执行一次。
相同效果<code>perl -pe 's/$/\n/' test.txt</code>和<code>perl -pe '$_ .= "\n"' test.txt</code>
<p></p>
**<i class="fa fa-slideshare" aria-hidden="true"></i>awk版<code>awk '1; { print "" }' test.txt</code> = <code>awk '{ print } { print "" }' test.txt</code>**
**<i class="fa fa-sign-language" aria-hidden="true"></i>简单粗暴sed版<code>sed G test.txt</code>两个换行符一个由G从保持空间传入交换到模式空间，另一个是sed流编辑器本身输出；**
**更多关于sed高级命令见<a href="http://tiramisutes.github.io/2015/12/25/advanced-sed.html" target="_blank">Advanced-sed：n，N，d，D，p，P，b, T,t,h，H，g，G，x,y</a>**
###两倍行距，除了空行
``` bash
perl -pe '$_.="\n" unless /^$/' test.txt
#等同于
perl -pe '$_ .= "\n" if /\S/' test.txt
```
####<i class="fa fa-chrome" aria-hidden="true"></i>参数解释：
**^$**：表示空行；
**\S**：大写S，\S相对于\s，if /\S/结果就是匹配这一行包含至少一个非空（tab, vertical tab, space, etc）字符。
<p></p>
**<i class="fa fa-slideshare" aria-hidden="true"></i>awk版<code>awk 'NF { print $0 "\n" }' test.txt</code>,空行时NF为0，可有效过滤掉空行。**
**<i class="fa fa-sign-language" aria-hidden="true"></i>简单粗暴sed版<code>sed '/^$/d;G' test.txt</code>  /^$/表示匹配空行，d表示删除，即首先将匹配到的空行全部删除，然后在执行G；**
**去掉两倍行距：<code>sed 'n;d' test.txt</code>，n表示读入下一行，即模式空间里同时每次存在两行内容；**
注意：sed中-n和n的区别，例如<code>sed -n 'n;p' test.txt</code>,在一般 sed 的用法中，所有来自 STDIN的资料一般都会被列出到屏幕上。但如果加上 -n 参数后，则只有经过sed 特殊处理的那一行(或者动作)才会被列出来,而单引号中的n表示读取下一行到pattern space，由于pattern space中有按照正常流程读取的内容，使用n命令后，pattern space中又有了一行，此时，pattern space中有2行内容，但是先读取的那一行不会被取代、覆盖或删除；当n命令后，还有其他命令p的时候，此时打印出的结果是n命令读取的那一行的内容，即第二时间读入的，也就是n命令后的其他命令只能作用于第二时间入读发行，首次读入的不做任何n后面命令的处理；另为一个是N命令（将下一行添加到pattern space中，但将当前读入行和用N命令添加的下一行看成"一行"，一起被N后面的命令处理）。**
###三倍行距
``` bash
perl -pe '$\="\n\n"' test.txt
```
**<i class="fa fa-slideshare" aria-hidden="true"></i>awk版<code>awk '1; { print "\n" }' test.txt</code> = <code>awk '{ print; print "\n" }' test.txt</code>**
**<i class="fa fa-sign-language" aria-hidden="true"></i>简单粗暴sed版<code>sed 'G;G' test.txt</code>
###N倍行距
``` bash
perl -pe '$_.="\n"x7' test.txt
```
###移除所以空行
``` bash
perl -ne 'print unless /^$/' test.txt
#最终one line perl命令行相当于如下循环
LINE:
while (<>) {
    print unless /^$/
}
#进一步可解释为
LINE:
while (<>) {
    print $_ unless $_ =~ /^$/
}
```
**-n**：相当于如下while循环，while通过<>读入每一行，然后传递给**$_**；
``` bash
LINE:
while (<>) {
    # your program goes here
}
```
相同效果<code>perl -lne 'print if length' test.txt</code>,**-l**参数相当于chomps，去掉每一行结尾的换行符，然后检查这一行的长度，如果存在任何字符则检查结果为true，并输出这一行；
###当有多行空行时仅留下一行
``` bash
perl -00 -pe '' test.txt
#相同效果
perl -00pe0 test.txt
```
###将所有空行压缩或展开成N个连续的
``` bash
perl -00 -pe '$_.="\n"x4' test.txt
```
##行编号
###所有行编号
``` bash
perl -pe '$_="$.$_"' test.txt
```
####<i class="fa fa-chrome" aria-hidden="true"></i>参数解释：
**$.**：包含输入内容的当前行数；
**<i class="fa fa-slideshare" aria-hidden="true"></i>awk版<code>awk '{print FNR "\t" $0}' test.txt</code>和<code>awk '{ print NR "\t" $0 }' test.txt</code>,当同时读入两个文件时前者awk中第二个文件开始编号为1，而后者的第二个文件开始编号继续第一个文件后**
###仅非空行编号，空行依然输出
``` bash
perl -pe '$_=++$a."$_" if /./' test.txt
```
####<i class="fa fa-chrome" aria-hidden="true"></i>参数解释：
**/./**：匹配除了换行符外的任何字符，即非空行；
**<i class="fa fa-slideshare" aria-hidden="true"></i>awk版<code>awk 'NF {$0=++a ":" $0}; {print}' test.txt</code>其中":"表示编号和原内容间分隔符。**
###仅非空行编号，空行不输出
``` bash
perl -ne 'print ++$a. "$_" if /./' test.txt
```
<i class="fa fa-paperclip" aria-hidden="true"></i>几点区别：
**$.与++$a.**：前者计数input的所有行，后者仅计数非空行；
**-p与-n**：前者while循环自带print函数，后者没有，需要指定print；
###所有行编号，但是仅输出非空行
``` bash
perl -pe '$_ = "$. $_" if /./' test.txt
```
###仅编号匹配指定模式的行，但其他行也无编号输出
``` bash
perl -pe '$_=++$a. "$_" if /模式/' test.txt
```
###仅编号和输出匹配指定模式的行
``` bash
perl -ne 'print ++$a. "$_" if /模式/' test.txt
```
###所有行编号，但仅输出匹配指定行的行编号
``` bash
perl -pe '$_ = "$. $_" if /模式/' test.txt
```
###所有行编号，并自定义输出形式
``` bash
perl -ne 'printf "%-5d %s", $.,$_' test.txt
```
**<i class="fa fa-slideshare" aria-hidden="true"></i>awk版<code>awk 'printf("%5d : %s\n", NR, $0)' test.txt</code>**
##运算
###统计所有行数,包括空行
``` bash
perl -lne 'END { print $. }' test.txt
```
**<i class="fa fa-slideshare" aria-hidden="true"></i>awk版<code>awk 'END {print NR}' test.txt</code>**
###统计非空行
``` bash
perl -le 'print scalar (grep {/./}<>)' test.txt
perl -le 'print ~~grep{/./}<>' test.txt
perl -le 'print~~grep/./,<>' test.txt
```
###统计空行数
``` bash
perl -lne '$a++ if /^$/; END {print $a+0}' test.txt #一行一行读入，较高效
perl -le 'print ~~grep{/^$/}<>' test.txt  #在内存中读入文件全部内容
```
###grep -c功能
``` bash
perl -lne '$a++ if /regex/; END {print $a+0}' test.txt
awk '/Beth/ { n++ }; END { print n+0 }' test.txt
```
###统计每一行数字总数
``` bash
awk '{s=0; for (i=1;i<=NF;i++) s=s+$i} print s}' test.txt
```
###取绝对值
``` bash
awk '{for (i=1;i<=NF;i++) if ($i<0) $i=-$i; print}' test.txt
perl -alne 'print "@{[map { abs} @F]}"' test.txt
```
###计算所有文件每行总和
``` bash
perl -MList::Util=sum -alne 'print sum @F' test.txt test2.txt
```
###输出每行最小值
``` bash 
perl -MList::Util=min -alne 'priint min @F' test.txt
```
###统计匹配某一模式的行数
``` bash
perl -lne '/模式/' && $t++; END {print $t} test.txt
```
英语原文：http://www.catonmat.net/blog/perl-one-liners-explained-part-one/