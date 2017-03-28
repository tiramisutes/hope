title: python基础教程总结
date: 2015-12-03 19:05:19
tags: python basic
categories: Python
---
<p><img src="http://7xk19o.com1.z0.glb.clouddn.com/pythonlogo.jpg" width="570" height="300"></p>
##简介
Python 是一个高层次的结合了解释性、编译性、互动性和面向对象的脚本语言。
Python 的设计具有很强的可读性，相比其他语言经常使用英文关键字，其他语言的一些标点符号，它具有比其他语言更有特色语法结构。
Python 是一种解释型语言： 这意味着开发过程中没有了编译这个环节。类似于PHP和Perl语言。
Python 是交互式语言： 这意味着，您可以在一个Python提示符，直接互动执行写你的程序。
Python 是面向对象语言: 这意味着Python支持面向对象的风格或代码封装在对象的编程技术。
Python 是初学者的语言：Python 对初级程序员而言，是一种伟大的语言，它支持广泛的应用程序开发，从简单的文字处理到 WWW 浏览器再到游戏。
###Python 特点
1.易于学习：Python有相对较少的关键字，结构简单，和一个明确定义的语法，学习起来更加简单。
2.易于阅读：Python代码定义的更清晰。
3.易于维护：Python的成功在于它的源代码是相当容易维护的。
4.一个广泛的标准库：Python的最大的优势之一是丰富的库，跨平台的，在UNIX，Windows和Macintosh兼容很好。
5.互动模式：互动模式的支持，您可以从终端输入并获得结果的语言，互动的测试和调试代码片断。
6.便携式：Python可以运行在多种硬件平台和所有平台上都具有相同的接口。
7.可扩展：可以添加低层次的模块到Python解释器。这些模块使程序员可以添加或定制自己的工具，更有效。
8.数据库：Python提供所有主要的商业数据库的接口。
9.GUI编程：Python支持GUI可以创建和移植到许多系统调用。
10.可扩展性：相比 shell 脚本，Python 提供了一个更好的结构，且支持大型程序。
##Python 环境搭建
可以通过终端窗口输入 "python" 命令来查看本地是否已经安装Python以及Python的安装版本。
###Python下载
Python最新源码，二进制文档，新闻资讯等可以在Python的官网查看到：
Python官网：http://www.python.org/
可以在一下链接中下载Python的文档，你可以下载 HTML、PDF 和 PostScript 等格式的文档。
Python文档下载地址：www.python.org/doc/
###Python安装
Unix & Linux 平台安装 Python:
<li>下载及解压压缩包。</li>
<li>如果你需要自定义一些选项修改<i>Modules/Setup</i> </li>
<li><b>执行</b> ./configure 脚本</li>
<li>make</li>
<li>make install</li>
<p>执行以上操作后，Python会安装在 /usr/local/bin 目录中，Python库安装在/usr/local/lib/pythonXX，XX为你使用的Python的版本号。</p>
Window 平台安装 Python:
<li>下载后，双击下载包，进入Python安装向导，安装非常简单，你只需要使用默认的设置一直点击"下一步"直到安装完成即可。</li>
###环境变量配置
Unix/Linux 设置环境变量
``` bash
export PATH="$PATH:/usr/local/bin/python" 
##/usr/local/bin/python 是Python的安装目录
```
Windows 设置环境变量：
``` bash
##命令提示框中(cmd) : 输入 
path %path%;C:\Python 
##C:\Python 是Python的安装目录
```
Python 重要环境变量：
![](http://7xk19o.com1.z0.glb.clouddn.com/python—path.png)
##Python 中文打印错误
解决方法为只要在文件开头加入 # -*- coding: UTF-8 -*- 或者 #coding=utf-8 就行了。
##Python 基础语法
###行和缩进
学习Python与其他语言最大的区别就是，Python的代码块不使用大括号（{}）来控制类，函数以及其他逻辑判断。python最具特色的就是用缩进来写模块。
缩进的空白数量是可变的，但是所有代码块语句必须包含相同的缩进空白数量，这个必须严格执行。
<i class="fa fa-cogs"></i>IndentationError: unexpected indent 错误是python编译器是在告诉你"Hi，老兄，你的文件里格式不对了，可能是tab和空格没对齐的问题"，所有python对格式要求非常严格。
<i class="fa fa-cogs"></i>如果是 IndentationError: unindent does not match any outer indentation level错误表明，你使用的缩进方式不一致，有的是 tab 键缩进，有的是空格缩进，改为一致即可。
因此，在Python的代码块中必须使用相同数目的行首缩进空格数。
<i class="fa fa-graduation-cap"></i>建议你在每个缩进层次使用 单个制表符 或 两个空格 或 四个空格 , 切记不能混用。
###多行语句
Python语句中一般以新行作为为语句的结束符，但是我们可以使用斜杠（ \）将一行的语句分为多行显示，语句中包含[], {} 或 () 括号就不需要使用多行连接符。
###Python注释
python中单行注释采用 # 开头，多行注释使用三个单引号(''')或三个单引号(""")。
##Python 变量
<p>Python有五个标准的数据类型：</p>
<li>Numbers（数字）</li>
<li>String（字符串）</li>
<li>List（列表）</li>
<li>Tuple（元组）</li>
<li>Dictionary（字典）</li>
##Python数字(Number)
<p>Python支持四种不同的数值类型：</p>
<li>int（有符号整型）</li>
<li>long（长整型[也可以代表八进制和十六进制]）</li>	
<li>float（浮点型）</li>	
<li>complex（复数）</li>
<i class="fa fa-area-chart"></i>Python数学函数：
![](http://7xk19o.com1.z0.glb.clouddn.com/shuxue.png)
##Python字符串(String)
字符串或串(String)是由数字、字母、下划线组成的一串字符。
字符串用''标识
<p>python的字串列表有2种取值顺序:</p>
<li>从左到右索引默认0开始的，最大范围是字符串长度少1</li>
<li>从右到左索引默认-1开始的，最大范围是字符串开头</li>
<i class="fa fa-eye"></i>如果你的实要取得一段子串的话，可以用到变量[头下标:尾下标]，就可以截取相应的字符串，其中下标是从0开始算起，可以是正数或负数，下标可以为空表示取到头或尾。
加号（+）是字符串连接运算符，星号（*）是重复操作。
<i class="fa fa-book"></i>Python字符串运算符：
![](http://7xk19o.com1.z0.glb.clouddn.com/str.png)
<i class="fa fa-book"></i>python的字符串内建函数：

| 序号 | 方法 | 描述 |
|:----:|:----:|:----:|
|  1   |  string.capitalize() |把字符串的第一个字符大写   |
|  2   |  string.center(width)) |返回一个原字符串居中,并使用空格填充至长度 width 的新字符串   |
|  3   |  string.count(str, beg=0, end=len(string)) |返回 str 在 string 里面出现的次数，如果 beg 或者 end 指定则返回指定范围内 str 出现的次数|
|  4   |  string.decode(encoding='UTF-8', errors='strict') |以 encoding 指定的编码格式解码 string，如果出错默认报一个 ValueError 的 异 常 ， 除 非 errors 指 定 的 是 'ignore' 或 者'replace'  |
|  5   |  string.encode(encoding='UTF-8', errors='strict') |以 encoding 指定的编码格式编码 string，如果出错默认报一个ValueError 的异常，除非 errors 指定的是'ignore'或者'replace' |
|  6   |  string.endswith(obj, beg=0, end=len(string))) |检查字符串是否以 obj 结束，如果beg 或者 end 指定则检查指定的范围内是否以 obj 结束，如果是，返回 True,否则返回 False.   |
|  7   |  string.expandtabs(tabsize=8)|把字符串 string 中的 tab 符号转为空格，默认的空格数 tabsize 是 8. |
|  8   |  string.join(seq) |Merges (concatenates)以 string 作为分隔符，将 seq 中所有的元素(的字符串表示)合并为一个新的字符串  |
|  9   |  string.ljust(width) | 返回一个原字符串左对齐,并使用空格填充至长度 width 的新字符串 |
|  10   |  string.lower() |转换 string 中所有大写字符为小写 |
|  11   |  string.lstrip() |截掉 string 左边的空格   |
|  12   |  string.maketrans(intab, outtab]) |maketrans() 方法用于创建字符映射的转换表，对于接受两个参数的最简单的调用方式，第一个参数是字符串，表示需要转换的字符，第二个参数也是字符串表示转换的目标。   |
|  13   |  string.replace(str1, str2,  num=string.count(str1)) |把 string 中的 str1 替换成 str2,如果 num 指定，则替换不超过 num 次  |
|  14   |  string.rstrip() |删除 string 字符串末尾的空格  |
|  15   |  string.split(str="", num=string.count(str))|以 str 为分隔符切片 string，如果 num有指定值，则仅分隔 num 个子字符串  |
|  16   |  string.strip([obj]) |在 string 上执行 lstrip()和 rstrip()|
|  17   |  string.title() |返回"标题化"的 string,就是说所有单词都是以大写开始，其余字母均为小写(见 istitle()) |

##Python列表(List)
列表用[ ]标识。
列表中的值得分割也可以用到变量[头下标:尾下标]，就可以截取相应的列表，从左到右索引默认0开始的，从右到左索引默认-1开始，下标可以为空表示取到头或尾。
加号（+）是列表连接运算符，星号（*）是重复操作。
###访问列表中的值
使用下标索引来访问列表中的值，同样你也可以使用方括号的形式截取字符。
###更新列表
``` bash
>>> list = ['physics', 'chemistry', 1997, 2000]
>>> print list[2];
1997
>>> list[2] = 2001;
>>> print list[2];
2001
>>> print list;
['physics', 'chemistry', 2001, 2000]
```
###删除列表元素
可以使用 del 语句来删除列表的的元素
``` bash
>>> del list[2];
>>> print list;
['physics', 'chemistry', 2000]
```
###Python列表函数

| 序号 | 函数 | 作用 |
|:----:|:----:|:----:|
|  1   |  cmp(list1, list2) |比较两个列表的元素   |
|  2   |  len(list) |列表元素个数   |
|  3   |  max(list) |返回列表元素最大值   |
|  4   |  min(list) |返回列表元素最小值   |
|  5   |  sum(list) |返回列表元素总和   |
|  6   |  list(seq) |将元组转换为列表   |

###Python列表方法

| 序号 | 函数 | 作用 |
|:----:|:----:|:----:|
|  1   |  list.append(obj) |在列表末尾添加新的对象   |
|  2   |  list.count(obj) |统计某个元素在列表中出现的次数   |
|  3   |  list.extend(seq) |在列表末尾一次性追加另一个序列中的多个值（用新列表扩展原来的列表）   |
|  4   |  list.index(obj) |从列表中找出某个值第一个匹配项的索引位置   |
|  5   |  list.insert(index, obj) |将对象插入列表   |
|  6   |  list.pop(obj=list[-1]) |移除列表中的一个元素（默认最后一个元素），并且返回该元素的值   |
|  7   |  list.remove(obj) |移除列表中某个值的第一个匹配项   |
|  8   |  list.reverse() |反向列表中元素   |
|  9   |  list.sort([func]) | 对原列表进行排序   |

##Python元组
元组是另一个数据类型，类似于List（列表）。
元组用"()"标识。
内部元素用逗号隔开。但是元素不能二次赋值，相当于只读列表。
###元组内置函数
tuple(seq)：将列表转换为元组。
##Python元字典
字典(dictionary)是除列表以外python之中最灵活的内置数据结构类型。列表是有序的对象结合，字典是无序的对象集合。
两者之间的区别在于：字典当中的元素是通过键来存取的，而不是通过偏移存取。
字典用"{ }"标识。字典由索引(key)和它对应的值value组成。
adict[key] 形式返回键key对应的值value，如果key不在字典中会引发一个KeyError。
###字典用法举例
``` bash
>>> code = {"GLY" : "G", "ALA" : "A", "LEU" : "L", "ILE" : "I",
... "ARG" : "R", "LYS" : "K", "MET" : "M", "CYS" : "C"}
>>> code[’VAL’]
’V’
>>> code.keys()
>>> code.values()
>>> code.items()
>>> del code[’CYS’]
>>> code.update({’CYS’:’C’, ’MET’:’M’)
>>> one2three = {}
>>> for key,val in code.items():
... one2three[val]= key
```
###字典内置函数&方法

| 序号 | 函数 | 作用 |
|:----:|:----:|:----:|
|  1   |  radiansdict.clear() |删除字典内所有元素   |
|  2   |  radiansdict.copy() |返回一个字典的浅复制   |
|  3   |  radiansdict.fromkeys() |创建一个新字典，以序列seq中元素做字典的键，val为字典所有键对应的初始值 |
|  4   |  radiansdict.get(key, default=None) |返回指定键的值，如果值不在字典中返回default值  |
|  5   |  radiansdict.items() |以列表返回可遍历的(键, 值) 元组数组|
|  6   |  radiansdict.keys()|以列表返回一个字典所有的键 |
|  7   |  radiansdict.update(dict2) |把字典dict2的键/值对更新到dict里 |
|  8   |  radiansdict.values() |以列表返回字典中的所有值   |

###Python数据类型转换
有时候，我们需要对数据内置的类型进行转换，数据类型的转换，你只需要将数据类型作为函数名即可。
以下几个内置的函数可以执行数据类型之间的转换。这些函数返回一个新的对象，表示转换的值。
![](http://7xk19o.com1.z0.glb.clouddn.com/zhuanfan.png)
##Python 运算符
<p>Python语言支持以下类型的运算符:</p>
<li><a href="#ysf1">算术运算符：+，-，*，/,%,**(幂 - 返回x的y次幂x**y),//(取整除 - 返回商的整数部分)</a></li>
<li><a href="#ysf2">比较（关系）运算符:==,!=,<>(不等于),>,<,>=,<=</a></li>
<li><a href="#ysf3">赋值运算符：=，-=(减法赋值运算符),+=(加法赋值运算符),*=,/=,%=,**=,//=</a></li>
<li><a href="#ysf4">逻辑运算符：and，or，not</a></li>
<li><a href="#ysf5">位运算符</a></li>
<li><a href="#ysf6">成员运算符：in，not in</a></li>
<li><a href="#ysf7">身份运算符：is，not is</a></li>
<li><a href="#ysf8">运算符优先级</a></li>
##Python 条件语句
``` bash
if 判断条件1:
    执行语句1……
elif 判断条件2:
    执行语句2……
elif 判断条件3:
    执行语句3……
else:
    执行语句4……
```
其中"判断条件"成立时（非零），则执行后面的语句，而执行内容可以多行，以缩进来区分表示同一范围。
##Python 循环语句
Python提供了for循环和while循环
![](http://7xk19o.com1.z0.glb.clouddn.com/5xunhuan.png)
##Python While循环语句
``` bash
#!/usr/bin/python

count = 0
while (count < 9):
   print 'The count is:', count
   count = count + 1

print "Good bye!"
输出：
The count is: 0
The count is: 1
The count is: 2
The count is: 3
The count is: 4
The count is: 5
The count is: 6
The count is: 7
The count is: 8
Good bye!
```
##Python for 循环语句
``` bash
#!/usr/bin/python
# -*- coding: UTF-8 -*-

for num in range(10,20):  # 迭代 10 到 20 之间的数字
   for i in range(2,num): # 根据因子迭代
      if num%i == 0:      # 确定第一个因子
         j=num/i          # 计算第二个因子
         print '%d 等于 %d * %d' % (num,i,j)
         break            # 跳出当前循环
   else:                  # 循环的 else 部分
      print num, '是一个质数'
以上实例输出结果：

10 等于 2 * 5
11 是一个质数
12 等于 2 * 6
13 是一个质数
14 等于 2 * 7
15 等于 3 * 5
16 等于 2 * 8
17 是一个质数
18 等于 2 * 9
19 是一个质数
```
##Python函数
###自定义一个函数
<p>你可以定义一个由自己想要功能的函数，以下是简单的规则：</p>
<li>函数代码块以def关键词开头，后接函数标识符名称和圆括号()。</li>
<li>任何传入参数和自变量必须放在圆括号中间。圆括号之间可以用于定义参数。</li>
<li>函数的第一行语句可以选择性地使用文档字符串—用于存放函数说明。</li>
<li>函数内容以冒号起始，并且缩进。</li>
<li>Return[expression]结束函数，选择性地返回一个值给调用方。不带表达式的return相当于返回 None。</li>
###语法
``` bash
def functionname( parameters ):
   "函数_文档字符串"
   function_suite
   return [expression]
```
###实例
``` bash
#!/usr/bin/python
# -*- coding: UTF-8 -*-

total = 0; # 这是一个全局变量
# 可写函数说明
def sum( arg1, arg2 ):
   #返回2个参数的和."
   total = arg1 + arg2; # total在这里是局部变量.
   print "函数内是局部变量 : ", total
   return total;  #return语句[表达式]退出函数，选择性地向调用方返回一个表达式。不带参数值的return语句返回None
 
#调用sum函数
sum( 10, 20 );
print "函数外是全局变量 : ", total 
以上实例输出结果：

函数内是局部变量 :  30
函数外是全局变量 :  0
```
##Python 模块
简单地说，模块就是一个保存了Python代码的文件。模块能定义函数，类和变量。模块里也能包含可执行的代码。关于模块的安装见<a href="http://tiramisutes.github.io/2015/11/27/python-install/">《python模块安装--无root权限（easy_install和pip）》</a>
###import 语句
想使用Python源文件，只需在另一个源文件里执行import语句。
###From…import 语句
Python的from语句让你从模块中导入一个指定的部分到当前命名空间中。
###From…import* 语句
把一个模块的所有内容全都导入到当前的命名空间也是可行的。
###Python中的包
包是一个分层次的文件目录结构，它定义了一个由模块及子包，和子包下的子包等组成的Python的应用环境。
##Python 文件I/O
###读取键盘输入
Python提供了两个内置函数从标准输入读入一行文本，默认的标准输入是键盘。如下：</p>
<li>raw_input：raw_input([prompt]) 函数从标准输入读取一个行，并返回一个字符串（去掉结尾的换行符）</li>
<li>input：input([prompt]) 函数和raw_input([prompt]) 函数基本可以互换，但是input会假设你的输入是一个有效的Python表达式，并返回运算结果。</li>
###open()函数
你必须先用Python内置的open()函数打开一个文件，创建一个file对象，相关的辅助方法才可以调用它进行读写。
<p>
语法：
</p>
<pre>
file object = open(file_name [, access_mode][, buffering])
</pre>
<p>
各个参数的细节如下：
</p>
<li>file_name：file_name变量是一个包含了你要访问的文件名称的字符串值。</li>
<li>access_mode：access_mode决定了打开文件的模式：只读，写入，追加等。所有可取值见如下的完全列表。这个参数是非强制的，默认文件访问模式为只读(r)。</li>
<li>buffering:如果buffering的值被设为0，就不会有寄存。如果buffering的值取1，访问文件时会寄存行。如果将buffering的值设为大于1的整数，表明了这就是的寄存区的缓冲大小。如果取负值，寄存区的缓冲大小则为系统默认。</li>
![](http://7xk19o.com1.z0.glb.clouddn.com/open.png)
###Close()方法
<p>
语法：
</p>
<pre>
fileObject.close();
</pre>
###Write()方法
Write()方法在字符串的结尾不添加换行符('\n')
注意：write(str())写入的数据必须是字符串。
<p>
语法：
</p>
<pre>
fileObject.write(string);
</pre>
###read()方法
read（）方法从一个打开的文件中读取一个字符串。
<pre>
fileObject.read([count]);
</pre>
##Python正则表达式
Python 自1.5版本起增加了re 模块，它提供 Perl 风格的正则表达式模式。
re 模块使 Python 语言拥有全部的正则表达式功能。
compile 函数根据一个模式字符串和可选的标志参数生成一个正则表达式对象。该对象拥有一系列方法用于正则表达式匹配和替换。
**re** 模块也提供了与这些方法功能完全一致的函数，这些函数使用一个模式字符串做为它们的第一个参数。
详细内容分见[](http://m.runoob.com/python/python-reg-expressions.html)
##自己使用总结
###python字符串替换的2种有效方法：
*用字符串本身
a = 'hello word'
a.replace('word','python')
*用正则表达式
import re
strinfo = re.compile('word')
b = strinfo.sub('python',a)
print b
###异常报错
TypeError: 'str' object does not support item assignment
AttributeError: 'str' object has no attribute 'append' 
错误原因：对str进行list的操作
解决办法：转换数据类型
list和str转化str.split()
这个内置函数实现的是将str转化为list。其中str=""是分隔符。
join可以说是split的逆运算
``` bash
>>> name=['Albert', 'Ainstain']
>>> "".join(name)
'AlbertAinstain'
```
Contribution from ：
http://m.runoob.com/python/
http://www.ynpxrz.com/n781659c2025.aspx