title: python读取文件的正确方式
Total word: WordCount
Read time: Min2Read
date: 2017-04-02 20:39:50
tags: python-read-file
categories: Python
---
![](http://7xk19o.com1.z0.glb.clouddn.com/Why-Python-training-is-Essential-for-Big-Data-Jobs-002.png)
**P**ython对文件的基础操作间[python基础教程总结：Python 文件I/O](http://tiramisutes.github.io/2015/12/03/python-basic.html#Python_文件I/O)部分；以下主要总结大文件和小文件操作过程中内存有效利用方法。
<!--more-->
##小文件
###with函数(推荐使用)
**The ``with`` statement handles opening and closing the file, including if an exception is raised in the inner block.**
```
with open('myfile') as f:
    for line in f:
        <do something with line>
```
###readlines/readline
```
for line in open('myfile','r').readlines():
    do_something(line)
```
**二者的区别是``readlines``读进来的是列表，而``readline``是字符串；**
```
>>> import re
... with open('zsq.txt') as f:
...     lines = f.readlines()
...     print type(lines)
<type 'list'>
>>> import re
... with open('zsq.txt') as f:
...     lines = f.readline()
...     print type(lines)
<type 'str'>
```

---
##大文件
###fileinput
```
import fileinput

for line in fileinput.input(['myfile']):
    do_something(line)
```
**``fileinput.input()`` call reads lines sequentially, but doesn't keep them in memory after they've been read or even simply so this.**
<li>结合``with``处理多个文件：
```
with fileinput.input(files=('spam.txt', 'eggs.txt')) as f:
    for line in f:
        process(line)
```
###buffer
```
filePath = "input.txt"

buffer = "Read buffer:\n"
file = open(filePath, 'rU')
while(1):
    bytes = file.read(5)
    if bytes:
        buffer += bytes
    else:
        break

print buffer
```


贡献来源

http://stackoverflow.com/questions/8009882/how-to-read-large-file-line-by-line-in-python?noredirect=1&lq=1