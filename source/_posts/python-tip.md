title: python技巧总结（持续更新）
Total word: WordCount
Read time: Min2Read
date: 2017-03-25 16:17:03
tags: python-tip
categories: Python
---
![](http://7xk19o.com1.z0.glb.clouddn.com/Preferred-for-Web-development.png)
**以下总结是基于python2.7，在其他版本中是否可行没有验证。**
<!--more-->
##多行字符串转换为单行
``` bash
string = 'this is \n a \t          example'
string = ' '.join(string.split())
```
**这里split不传入参数，那么这个函数会将以空白分开，空白包括：\n, \t , ' ',等，最终再用空格来连接起来，也可以指定分隔符，如string.split(';')**
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
---
##\*args and **kwargs
<i class="fa fa-link" aria-hidden="true"></i>[Python函数可变参数args及kwargs释义](http://lovesoo.org/python-han-shu-ke-bian-can-shu-args-ji-kwargs-shi-yi.html)
<strong>\*args表示任何多个无名参数，它是一个tuple</strong>
<strong>\**kwargs表示关键字参数，它是一个dict</strong>
```
def foo(*args,**kwargs):
    print 'args=',args
    print 'kwargs=',kwargs
    print '**********************'
 
if __name__=='__main__':
    foo(1,2,3)
    foo(a=1,b=2,c=3)
	
#结果如下：
args= (1, 2, 3)
kwargs= {}
**********************
args= ()
kwargs= {'a': 1, 'c': 3, 'b': 2}
**********************
```
You can pass a default value to get() for keys that are not in the dictionary:
<i class="fa fa-link" aria-hidden="true"></i>[Proper way to use **kwargs in Python](http://stackoverflow.com/questions/1098549/proper-way-to-use-kwargs-in-python)
```
val2 = kwargs.get('val2',"default value")
val2 = kwargs.get('val2',None)
```
---
##除法运算
```
>>> print 5*(2/6)
0
```
运行结果总是0，WHY? 
查找资料发现在Python里，整数初整数，只能得出整数。也就是 2 除 6 这个结果永远是0；
事实上不光python这样处理，C/C++，R也都是这样的，因为整数和浮点数本来就是两回事，用来计算除法的部件也不是同一个。
**解决办法：**
1\. 如果想做浮点除法，就应该把至少一个操作数转化为浮点型。最简单的方法就是在后面加上``.0``。
2\. 用类型转换的方法：``(float)2/6``。
3\. 代码开头加上 ``from __future__ import division``，在python3.0以后的版本中不存在这种情况的。
###小数点位数
<i class="fa fa-link" aria-hidden="true"></i>[谈谈关于Python里面小数点精度控制的问题](http://www.cnblogs.com/herbert/p/3402245.html)
至于保留小数点后位数可以通过内置函数``round()``和使用格式化,如``"%.2f" % 2.645``；
round()如果只有一个数作为参数，不指定位数的时候，返回的是一个整数，而且是最靠近的整数（这点上类似四舍五入）。但是当出现.5的时候，两边的距离都一样，round()取靠近的偶数；
当指定取舍的小数点位数的时候，一般情况也是使用四舍五入的规则，但是碰到.5的这样情况，如果要取舍的位数前的小树是奇数，则直接舍弃，如果偶数这向上取舍。
```
>>> round(2.635, 2)
2.63
>>> round(2.645, 2)
2.65
```
python默认的是17位小数的精度，但是这里有一个问题，就是当我们的计算需要使用更高的精度（超过17位小数）的时候可以使用**高精度decimal模块，配合getcontext**。
###特殊取整
math模块的ceil(x) : 取大于或者等于x的最小整数；
math模块的floor(x) : 取小于或者等于x的最大整数。

---
##列表操作
<i class="fa fa-link" aria-hidden="true"></i>[What is the syntax to insert one list into another list in python?](http://stackoverflow.com/questions/3748063/what-is-the-syntax-to-insert-one-list-into-another-list-in-python)
###列表加法运算merge
```
>>> x = [1,2,3]
>>> y = [4,5,6]
>>> x + y
[1, 2, 3, 4, 5, 6]
>>> x.extend(y)
>>> x
[1, 2, 3, 4, 5, 6] 
```
**To extend a list at a specific insertion point you can use list slicing**
```
>>> x[2:2] = ['a','b']
>>> x
[1, 2, 'a', 'b', 3]
```
***List slicing is quite flexible as it allows to replace a range of entries in a list with a range of entries from another list*
```
>>> x[1:2] = ['a','b']
>>> x
[1, 'a', 'b', 3]
```
###列表附加append
```
>>> x = [1,2,3]
>>> y = [4,5,6]
>>> x.append(y)
>>> x
[1, 2, 3, [4, 5, 6]]
```
###插入insert
```
>>> x.insert(2, y)
>>> x
[1, 2, [4, 5, 6], 3]
```
###计数count
```
>>> x = [1,2,3,2,2]
>>> x.count(2)
3
```
###索引index
```
>>> x.index(2)
1
```
###反转reverse
```
>>> x.reverse()
>>> x
[2, 2, 3, 2, 1]
```
其他还有``list.remove(x)``移除第一个item,``list.pop([i])``删除给定位置item,``list.clear()``,``list.sort(key=None, reverse=False)``,``list.copy()``。
###List Comprehensions
```
[(x,y) for x in [1,2,3] for y in [4,2,6] if x !=y]
```

---
##eval和ast.literal_eval
<i class="fa fa-link" aria-hidden="true"></i>[Using python's eval() vs. ast.literal_eval()?](http://stackoverflow.com/questions/15197673/using-pythons-eval-vs-ast-literal-eval)
eval是Python用于执行python表达式的一个内置函数，使用eval，可以很方便的将字符串动态执行,即将字符串str当成有效的表达式来求值并返回计算结果。
```
>>> eval("5+2")
7
>>> eval("[x for x in range(5)]")
[0, 1, 2, 3, 4]
>>>a = "[[1,2], [9,0]]"
>>> b = eval(a)
>>> print b
[[1, 2], [9, 0]]
```
**“安全”使用eval**
Eval函数的声明为``eval(expression[, globals[, locals]])``,第二三个参数分别指定能够在eval中使用的函数等，如果不指定，默认为globals()和locals()函数中 包含的模块和函数。
但``eval``的使用存在安全隐患，具体See also <a href="http://nedbatchelder.com/blog/201206/eval_really_is_dangerous.html" rel="noreferrer">the dangers of <code>eval</code></a>。
因此，**Use ``ast.literal_eval`` whenever you need eval.``ast.literal_eval`` raises an exception if the input isn't a valid Python datatype, so the code won't be executed if it's not.**

---
##zip函数
<i class="fa fa-link" aria-hidden="true"></i>[Python零碎知识(2):强大的zip](http://www.cnblogs.com/BeginMan/archive/2013/03/14/2959447.html)
1\. 接受一系列可迭代对象作为参数，将对象中对应的元素打包成一个个tuple（元组），然后返回由这些tuples组成的list（列表）。若传入参数的长度不等，则返回list的长度和参数中长度最短的对象相同;
2\. zip()配合*号操作符,可以将已经zip过的列表对象解压;

---
##String slices
<i class="fa fa-link" aria-hidden="true"></i>[Chapter 8  Strings](http://www.greenteapress.com/thinkpython/html/thinkpython009.html#toc89)
The operator [n:m] returns the part of the string from the “n-eth” character to the “m-eth” character, including the first but excluding the last. This behavior is counterintuitive, but it might help to imagine the indices pointing between the characters.
![](http://7xk19o.com1.z0.glb.clouddn.com/String%20slices.png)

---




贡献来源

http://www.educity.cn/wenda/356740.html
http://nbviewer.jupyter.org/github/rasbt/python_reference/blob/master/tutorials/not_so_obvious_python_stuff.ipynb#pm_in_lists