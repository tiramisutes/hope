title: sed：流编辑器(stream editor)简单总结
date: 2015-11-29 13:29:36
tags: sed
categories: Linux
---
![](http://7xk19o.com1.z0.glb.clouddn.com/sed.jpg)
##Sed简介  
sed 是一种在线编辑器，它一次处理一行内容。处理时，把当前处理的行存储在临时缓冲区中，称为"模式空间"（pattern space），接着用sed命令处理缓冲区中的内容，处理完成后，把缓冲区的内容送往屏幕。接着处理下一行，这样不断重复，直到文件末尾。文件内容并没有 改变，除非你使用重定向存储输出。
##sed命令形式
``` bash
sed [options] 'command' file(s)    
sed [options] -f scriptfile file(s) 
```
##sed command
<i class="fa fa-bicycle"></i>command部分可以分为两部分，一部分是确定范围部分，一部分是处理方式部分。
###确定范围部分
1 指定行数：例如3,5表示第3、第4和第5行；5,$表示第5行至最后一行；
2 用模式匹配进行指定：例如/^[^dD]/表示匹配行首不是以d或D开头的行等；
###处理方式部分呢，有很多命令可用，介绍几个最常用的：
d 表示删除行
p 打印该行
r 读取指定文件的内容
w 写入指定文件sed '/200[4-6]/w new.txt' mysed.txt（w new.txt表示将来源于mysed.txt中含有2004、2005、2006的行写入到new.txt文件中）
a\ 在特定行"下面"插入特定内容sed '/2004/a\China' mysed.txt
i\ 在特定行"上面"插入特定内容sed '/2004/i\China' mysed.txt
y  就表示将第一栏的每个字符都替换为相对应的第二栏的字符sed 'y/eijng/EIJNG/' mysed.txt
n; 对匹配行的下一行进行处理sed '/2004/{n;y/eijng/EIJNG/;}' mysed.txt  (找含有2004的行，然后将它下面的一行中的eijng替换为大写的EIJNG。这里面的"n;"起到了"移至下一行"的作用。n背后的含义其实是将下一行放到模式空间中去)
##sed选项 
``` bash 
-e command, --expression=command  允许多台编辑，sed -n -e '1,2p' -e '4p' mysed.txt 
-h, --help                        打印帮助，并显示bug列表的地址。  
-n, --quiet, --silent             取消默认输出（默认为全输出）,-n之后只输出后面处理过的行。  
-f, --filer=script-file           引导sed脚本文件名。  
-V, --version                     打印版本和版权信息。
-r, --regexp-extended             使用扩展的正则表达式，如果不用r参数就要在正则表达式里使用很多的\来进行强制转换，如果使用r了就可以直接写正则表达式，而不用写那么多\了      
```
##sed元字符集
``` bash
^  锚定行的开始 如：/^sed/匹配所有以sed开头的行。  
$  锚定行的结束 如：/sed$/匹配所有以sed结尾的行。 
.  匹配一个非换行符的字符 如：/s.d/匹配s后接一个任意字符，然后是d。
*  匹配零或多个字符 如：/*sed/匹配所有模板是一个或多个空格后紧跟sed的行。
[] 匹配一个指定范围内的字符，如/[Ss]ed/匹配sed和Sed。  
[^]匹配一个不在指定范围内的字符，如：/[^A-RT-Z]ed/匹配不包含A-R和T-Z的一个字母开头，紧跟ed的行。  
\(..\) 保存匹配的字符，如s/\(love\)able/\1rs，loveable被替换成lovers。  
&  保存搜索字符用来替换其他字符，如s/love/**&**/，love变成**love**。   
\< 锚定单词的开始，如:/\<love/匹配包含以love开头的单词的行。   
\> 锚定单词的结束，如/love\>/匹配包含以love结尾的单词的行。   
x\{m\}  重复字符x，m次，如：/0\{5\}/匹配包含5个o的行。   
x\{m,\} 重复字符x,至少m次，如：/o\{5,\}/匹配至少有5个o的行。   
x\{m,n\} 重复字符x，至少m次，不多于n次，如：/o\{5,10\}/匹配5--10个o的行。 
```
##sed实例
例一 显示test文件的第20到30行：sed -n '20,30p' test
例二 将所有以d或D开头的行的所有小写x变为大写X：sed '/^[dD]/s/x/X/g' test
例三 删除每行最后的两个字符：sed 's/..$//' test
例四 删除每一行的前两个字符：sed 's/..//' test
例五 
``` bash
$cat mysed.txt
Beijing Beijing Beijing Beijing
$sed 's/\(Beijing\)\(.*\)\(Beijing\)/\12008\2\32008/' mysed.txt
Beijing2008 Beijing Beijing Beijing2008
##这个命令稍显复杂，其中用到了一个技巧，就是预存储，即被\(和\)括起来的匹配内容会被按顺序存储起来，存储到\1、\2…里面。这样你就可以使用\加数字来调用这些内容了。这个例子就是使用了这个技巧，分别存储了三个内容，分别为匹配Beijing、匹配.*和匹配Beijing。
```
任意字符:  sed -n '/.*ing/'p temp.txt     注意是.*ing,而不是*ing
's/^[][]*//g'      删除行首空格
's/^$/d'           删除空行
's/COL/(.../)//g'  删除紧跟COL的后三个字母
  
more<i class="fa fa-database"></i>http://www.grymoire.com/Unix/Sed.html
Contribution from ：
http://roclinux.cn/?p=1363
http://www.iteye.com/topic/587673
http://www.cnblogs.com/emanlee/archive/2013/09/07/3307642.html