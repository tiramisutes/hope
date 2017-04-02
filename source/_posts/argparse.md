title:  Python 命令行解析argparse 模块
Total word: WordCount
Read time: Min2Read
date: 2017-03-25 12:55:35
tags: argparse
categories: Python
---
![](http://7xk19o.com1.z0.glb.clouddn.com/python-build-your-security-toolspdf-47-638.jpg)
argparse是python用于解析命令行参数和选项的标准模块，用于代替已经过时的optparse模块。argparse模块的作用是用于在python解析命令行参数。
<!--more-->
基本用法：
```
import argparse
parser=argparse.ArgumentParser()
parser.add_argument()
args=parser.parse_args()
parser.print_help()
```
##导入**argparse**模块
```
import argparse
```
##创建解析器对象ArgumentParser
```
parser=argparse.ArgumentParser()
```
<code>ArgumentParser(prog=None, usage=None,description=None, epilog=None, parents=[],formatter_class=argparse.HelpFormatter, prefix_chars='-',fromfile_prefix_chars=None, argument_default=None,conflict_handler='error', add_help=True)</code>
###可选参数
description： 程序描述性语句，命令行帮助的开始文字；
add_help：默认是True，可以设置False禁用；
epilog：命令行帮助的结尾文字；
prog： (default: sys.argv[0])程序的名字，一般不需要修改，另外，如果你需要在help中使用到程序的名字，可以使用<code>%(prog)s</code>； 
prefix_chars： 命令的前缀，默认是-，例如-f/--file；
formatter_class： 自定义帮助信息的格式（description和epilog）。默认情况下会将长的帮助信息进行<自动换行和消除多个连续空白>。
###三个允许值
class argparse.RawDescriptionHelpFormatter 直接输出description和epilog的原始形式（不进行自动换行和消除空白的操作）；
class argparse.RawTextHelpFormatter 直接输出description和epilog以及add_argument中的help字符串的原始形式（不进行自动换行和消除空白的操作）；
class argparse.ArgumentDefaultsHelpFormatter 在每个选项的帮助信息后面输出他们对应的缺省值，如果有设置的话。
###实例
<code>parser = argparse.ArgumentParser(description="This is a description of %(prog)s", epilog="This is a epilog of %(prog)s", prefix_chars="-+", fromfile_prefix_chars="@", formatter_class=argparse.ArgumentDefaultsHelpFormatter) </code>
##add_mutually_exclusive_group()指定互斥选项
```
group=parser.add_mutually_exclusive_group()
group.add_argument("-v","--verbose",action="store_true")
group.add_argument("-q","--quiet",action="store_true")
```
argparse会为你强制执行互斥性，因此一次使用仅能给出该群组的选项中的一个。输出时形如<code>[-v | -q]</code>。
##add_argument()指定命令参数
```
parser.add_argument()
```
<code>add_argument(name or flags...[, action][, nargs][, const][, default][, type][, choices][, required][, help][, metavar][, dest])</code>
name or flags： 指定参数的形式，一般指定一个短参数，一个长参数，或直接写参数名，如"-f", "--file"，"file"；
nargs： 命令行参数的个数，一般使用通配符表示，其中，'?'表示只用一个，'*'表示0到多个，'+'表示至少一个;
default：默认值
type：参数的类型，默认是字符串string类型，还有float、int等类型;
dest: 如果提供dest，例如dest="a"，那么可以通过args.a访问该参数;
```
parser.add_argument('--ratio',dest='ratio',type=float,default=None,
                help="only show values where the difference between study")
...
min_ratio=args.ratio
```
action: 参数出发的动作，常见形式为<code>store_true/false, count</code>等；
choices：允许的参数值；<code>parser.add_argument("-v", "--verbosity", type=int, choices=[0, 1, 2], help="increase output verbosity")</code>；
metavar: 参数的名字，在显示 帮助信息时才用到.
help： 和ArgumentParser方法中的参数作用相似，出现的场合也一致;
在执行程序的时候，定位参数必选，可选参数可选。在输出的帮助信息中显示为分开的“与位置相关的参数”和“可选参数”两个部分：
###定位参数Positional
**不需要长/短线指示，直接输入参数**
<code>parser.add_argument("bar", help="test test test") </code>
###可选参数Optional
**长/短线形式**
<code>parser.add_argument("-f", "--file", help="test test test")</code>
##parse_args()解析命令行
```
args=parser.parse_args()
```
定义了所有参数之后，你就可以给 parse_args() 传递一组参数字符串来解析命令行。
parse_args() 的返回值是一个命名空间，包含传递给命令的参数。该对象将参数保存其属性，因此如果你的参数 dest 是 "myoption"，那么你就可以args.myoption 来访问该值。
##parser.print_help() 打印帮助信息

##高级用法
###文件参数
```
parser.add_argument('-i', metavar='in-file', type=argparse.FileType('rt'))
parser.add_argument('-o', metavar='out-file', type=argparse.FileType('wt'))
	 
parser.print_help()
>>>
usage: __main__.py [-h] [-i in-file] [-o out-file]

optional arguments:
  -h, --help   show this help message and exit
  -i in-file
  -o out-file
```
参考来源：
http://www.sijitao.net/2000.html
http://blog.csdn.net/yugongpeng_blog/article/details/46693471
http://www.jb51.net/article/67158.htm