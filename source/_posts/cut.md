title: Linux常用命令之cut
date: 2015-11-29 14:55:55
tags: cut
categories: Linux
---
cut命令主要是接受三个定位方法：

<i class="fa fa-ship"></i>第一，字节（bytes），用选项-b
-b支持形如3-5的写法，而且多个定位之间用逗号隔开就成了,如：3-5，7
但有一点要注意，cut命令如果使用了-b选项，那么执行此命令时，cut会先把-b后面所有的定位进行从小到大排序，然后再提取
-3表示从第一个字节到第三个字节，而3-表示从第三个字节到行尾
<i class="fa fa-train"></i>第二，字符（characters），用选项-c
主要用于提取中文操作
<i class="fa fa-fighter-jet"></i>第三，域（fields），用选项-f
为什么会有"域"的提取呢，因为刚才提到的-b和-c只能在固定格式的文档中提取信息，而对于非固定格式的信息则束手无策。这时候"域"就派上用场了。
-d  来设置间隔符
<i class="fa fa-comments"></i>如果遇到空格和制表符时，怎么分辨呢？
``` bash
$ cat tab_space.txt
this is tab	finish.
this is several space      finish.
$ sed -n l tab_space.txt
this is tab\tfinish.$
this is several space      finish.$
``` bash
看到了吧，如果是制表符（TAB），那么会显示为\t符号，如果是空格，就会原样显示。
通过此方法即可以判断制表符和空格了。
注意，上面sed -n后面的字符是L的小写字母，不要看错。
