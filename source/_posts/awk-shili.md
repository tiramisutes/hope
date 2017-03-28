title: Awk经典实例总结
date: 2015-12-27 13:09:47
tags: awk
categories: Linux
---
##删除某一行
``` bash
[zpxu@node102 ~]$ cat fkjsaf 
        GO_ids
Gh_A01G0005     GO:0016021
Gh_A01G0006     GO:0006629
Gh_A01G0007
Gh_A01G0008
Gh_A01G0009
Gh_A01G0010     GO:0008121,GO:0006122
Gh_A01G0011
Gh_A01G0012
Gh_A01G0013     GO:0003677,GO:0006355
Gh_A01G0014
Gh_A01G0015     GO:0004713,GO:0005524,GO:0004674,GO:0004672,GO:0006468
Gh_A01G0016     GO:0006886,GO:0005643,GO:0008536,GO:0005515,GO:0008565
Gh_A01G0017     GO:0003676
Gh_A01G0018
Gh_A01G0019     GO:0016020,GO:0006810,GO:0005215
[zpxu@node102 ~]$ awk '{if(NR==1){next} print $0}' fkjsaf 
Gh_A01G0005     GO:0016021
Gh_A01G0006     GO:0006629
Gh_A01G0007
Gh_A01G0008
Gh_A01G0009
Gh_A01G0010     GO:0008121,GO:0006122
Gh_A01G0011
Gh_A01G0012
Gh_A01G0013     GO:0003677,GO:0006355
Gh_A01G0014
Gh_A01G0015     GO:0004713,GO:0005524,GO:0004674,GO:0004672,GO:0006468
Gh_A01G0016     GO:0006886,GO:0005643,GO:0008536,GO:0005515,GO:0008565
Gh_A01G0017     GO:0003676
Gh_A01G0018
Gh_A01G0019     GO:0016020,GO:0006810,GO:0005215
```
##删除列数小于N的行
``` bash
[zpxu@node102 ~]$ awk '{if(NF==1){next} print $0}' fkjsaf 
Gh_A01G0005     GO:0016021
Gh_A01G0006     GO:0006629
Gh_A01G0010     GO:0008121,GO:0006122
Gh_A01G0013     GO:0003677,GO:0006355
Gh_A01G0015     GO:0004713,GO:0005524,GO:0004674,GO:0004672,GO:0006468
Gh_A01G0016     GO:0006886,GO:0005643,GO:0008536,GO:0005515,GO:0008565
Gh_A01G0017     GO:0003676
Gh_A01G0019     GO:0016020,GO:0006810,GO:0005215
```
##删除空行
``` bash
[zpxu@node102 ~]$ cat text
111
222

222
333
[zpxu@node102 ~]$ awk NF text
111
222
222
333
```
##不输出后两列
``` bash
cat file 
a b c d e f
1 2 3 4
awk 'NF-=2' file
a b c d
1 2
```
##不输出前两列
``` bash
awk '{for(i=3;i<NF;i++)printf("%s ",$i);print $NF}' file
c d e f
3 4
```
##文件1和文件2交集部分合并输出
``` bash
cat a.txt    //a.txt  
111   aaa  
222   bbb  
333   cccc  
444   ddd  
cat b.txt    //b.txt  
111  123  456  
2    abc  cbd  
444  rts  786  
#要求输出结果是
111,aaa,123,456
444,ddd,rts,786
#实现方法1
awk 'NR==FNR{a[$1]=$2;}NR!=FNR && a[$1]{print $1","a[$1]","$2","$3}' a.txt b.txt  
111,aaa,123,456  
444,ddd,rts,786
```
<i class="fa fa-commenting-o"></i>解释
当NR和FNR相同时,这就说明在对第一个文件进行操作，<code>a[$1]=$2</code>表示，建立一个数组，以第一个字段为下标，第二个字段为值。当NR!=FNR时,说明在对第二个文件进行操作，注意：这个时候的,<code>$1</code>和前面的$1不是同一个东西了，前面的<code>$1</code>表示的是a.txt的第一个字段，而后面的<code>$1</code>表示的是b.txt的第一个字段。<code>a[$1]</code>表示以b.txt中第一个字段的为下标的值，如果a[$1]有值的话，说明也存在于a.txt文件中，这样就把数据print出来就行了。
``` bash
#方法2
awk -v OFS="," 'NR==FNR{a[$1]=$2;} NR!=FNR && $1 in a { print $1,a[$1],$2,$3}' a.txt b.txt  
111,aaa,123,456  
444,ddd,rts,786 
```
<i class="fa fa-commenting-o"></i>解释
-v OFS=","这个是设置输出时的列分割符，<code>$1 in a</code>这个是b.txt文件中的第一列的值是不是在数组a的key中，这个对做程序的来说很好理解，各种语言当中都有这样的用法，或者函数。