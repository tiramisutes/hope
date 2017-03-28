title: python技巧总结
Total word: WordCount
Read time: Min2Read
date: 2017-03-25 16:17:03
tags: python-tip
categories: Python
---
##多行字符串转换为单行
``` bash
string = 'this is \n a \t          example'
string = ' '.join(string.split())
```
**这里split不传入参数，那么，这个函数会将以空白分开，空白包括：\n, \t , ' ',等，最终再，用空格来连接起来，也可以指定分隔符，如string.split(';')**
可以自己写个函数来处理，利用lambda表达式：
``` bash
processFunc = lambda s: " ".join(s.split())
string = processFunc(string)
```
##替换
replace("\n", ""),后边的串替换掉前边的
``` bash
>>>a="hope"
>>> a.replace("h", "bioh")
```
##字符串转数组
str = '1,2,3'
arr = str.split(',')
##数组转字符串
arr = ['a','b']
str = ','.join(arr)
###global vs. local
Python's LEGB scope :**Local -> Enclosed -> Global -> Built-in**

```
x = 0
def in_func():
    global x   #将local变量用于global
    x = 1
    print('in_func:', x)
    
in_func()
print('global:', x)
>>>
in_func: 1
global: 1
```
###local vs. enclosed
```
def outer():
       x = 1
       print('outer before:', x)
       def inner():
           nonlocal x  #modify the x variable in the enclosed scope
           x = 2
           print("inner:", x)
       inner()
       print("outer after:", x)
outer()
>>>
outer before: 1
inner: 2
outer after: 2
```
##List comprehensions vs generators
List comprehensions are fast, but generators are faster!?
1\. use lists if you want to use the plethora of list methods
2\. use generators when you are dealing with huge collections to avoid memory issues
```
def plainlist(n=100000):
    my_list = []
    for i in range(n):
        if i % 5 == 0:
            my_list.append(i)
    return my_list

def listcompr(n=100000):
    my_list = [i for i in range(n) if i % 5 == 0]
    return my_list

def generator(n=100000):
    my_gen = (i for i in range(n) if i % 5 == 0)
    return my_gen

def generator_yield(n=100000):
    for i in range(n):
        if i % 5 == 0:
            yield i
```
##assert
在没完善一个程序之前，我们不知道程序在哪里会出错，与其让它在运行最崩溃，不如在出现错误条件时就崩溃，这时候就需要assert断言的帮助。
assert断言是声明其布尔值必须为真的判定，如果发生异常就说明表达示为假。可以理解assert断言语句为raise-if-not，用来测试表示式，其返回值为假，就会触发异常。
See: <i class="fa fa-link" aria-hidden="true"></i>[python assert的作用](http://www.cnblogs.com/liuchunxiao83/p/5298016.html)
```
>>> assert 2==1,'2不等于1'
AssertionError: 2不等于1
AssertionErrorTraceback (most recent call last)
<ipython-input-30-015aa214a555> in <module>()
----> 1 assert 2==1,'2不等于1'
AssertionError: 2不等于1
>>> assert 2==2,'2不等于1'
```
---
##set数据类型
<i class="fa fa-link" aria-hidden="true"></i>[python中set和frozenset方法和区别](http://www.cnblogs.com/panwenbin-logs/p/5519617.html)
set(可变集合)与frozenset(不可变集合)
set无序排序且不重复，是可变的，有add（），remove（）等方法。既然是可变的，所以它不存在哈希值。基本功能包括关系测试和消除重复元素. 集合对象还支持union(联合), intersection(交集), difference(差集)和sysmmetric difference(对称差集)等数学运算. 
sets 支持`` x in set, len(set)``,和 ``for x in set``。作为一个无序的集合，sets不记录元素位置或者插入点。因此，sets不支持 indexing, 或其它类序列的操作。
frozenset是冻结的集合，它是不可变的，存在哈希值，好处是它可以作为字典的key，也可以作为其它集合的元素。缺点是一旦创建便不能更改，没有add，remove方法。
```
s1 = set("qiwsir")
# set of integers
my_set = {1, 2, 3}
print(my_set)
my=set(['Gh_A01G0993','Gh_A03G0561','Gh_A03G0561'])   #返回唯一值 
print my
# set of mixed datatypes
my_set = {1.0, "Hello", (1, 2, 3)}
```
##set Operations
<i class="fa fa-link" aria-hidden="true"></i>[Python Sets](https://www.programiz.com/python-programming/set)
```
>>> A = {1, 2, 3, 4, 5}
... B = {4, 5, 6, 7, 8}
... # use | operator
... # Output: {1, 2, 3, 4, 5, 6, 7, 8}
... print(A | B)
... A |= B  #A=A|B
... A
... 
set([1, 2, 3, 4, 5, 6, 7, 8])
{1, 2, 3, 4, 5, 6, 7, 8}
```
---
##``_,__,___``
<i class="fa fa-link" aria-hidden="true"></i>[What does _ in Python do? [duplicate]](http://stackoverflow.com/questions/26895362/what-does-in-python-do)
```
[_] (a single underscore) : stores previous output, like Python’s default interpreter.
[__] (two underscores): next previous.
[___] (three underscores): next-next previous.
1+1
print _
2+2
print _
3+3
print _
print __
print ___
```
**用于占位符，也可以是一个简单的变量，by convention it means that you don't intend to use that value, just read it and ignore it.**
```
x=1
for _ in range(10):
    x+=1
    print x
```
**"单下划线" 开始的成员变量叫做保护变量，意思是只有类对象和子类对象自己能访问到这些变量；**
**"双下划线" 开始的是私有成员，意思是只有类对象自己能访问，连子类对象也不能访问到这个数据。**
```
class Student (object):
    def __init__(self,name):
        self._name=name
sd=Student("Tom")
sd._name
class Student (object):
    def __init__(self,name):
        self.__name=name
sd.__name
sd._Student__name
```

贡献来源

http://www.educity.cn/wenda/356740.html
http://nbviewer.jupyter.org/github/rasbt/python_reference/blob/master/tutorials/not_so_obvious_python_stuff.ipynb#pm_in_lists