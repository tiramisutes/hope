title: 非Root用户GLIBC安装“排雷”过程
Total word: WordCount
Read time: Min2Read
date: 2017-01-06 15:40:43
tags: linux-glibc
categories: Linux
---
![](http://7xk19o.com1.z0.glb.clouddn.com/AUGUSTUS.png)
<a href="http://bioinf.uni-greifswald.de/augustus/" target="_blank">AUGUSTUS</a> is a program that predicts genes in eukaryotic genomic sequences.
<!--more-->
``` bash
 ./augustus 
./augustus: /lib64/libc.so.6: version `GLIBC_2.14' not found (required by ./augustus)
./augustus: /public/home/zpxu/bin/gcc-4.8.5/lib64/libstdc++.so.6: version `GLIBCXX_3.4.20' not found (required by ./augustus)
./augustus: /public/home/zpxu/bin/gcc-4.8.5/lib64/libstdc++.so.6: version `GLIBCXX_3.4.21' not found (required by ./augustus)
```
查看GLIBC版本：
``` bash
strings /lib64/libc.so.6 | grep GLIBC
GLIBC_2.2.5
GLIBC_2.2.6
GLIBC_2.3
GLIBC_2.3.2
GLIBC_2.3.3
GLIBC_2.3.4
GLIBC_2.4
GLIBC_2.5
GLIBC_2.6
GLIBC_2.7
GLIBC_2.8
GLIBC_2.9
GLIBC_2.10
GLIBC_2.11
GLIBC_2.12
GLIBC_PRIVATE
```
发现最高版本是2.12但是系统需要2.14才可以，那么就自己编译安装吧。
##1>下载GLIBC
``` bash
wget http://ftp.gnu.org/gnu/glibc/glibc-2.14.tar.gz
```
##2> glibc-2.14.tar.gz解压，并进入解压后目录，创建build目录，并且进入：
``` bash
tar -zxvf glibc-2.14.tar.gz && cd glibc-2.14 && mkdir build && cd build
```
##3>编译：
``` bash
../configure --prefix=/opt/glibc-2.14  #你的安装目录
```
此时报错如下：
``` bash
checking LD_LIBRARY_PATH variable... contains current directory
configure: error:
*** LD_LIBRARY_PATH shouldn't contain the current directory when
*** building glibc. Please change the environment variable
*** and run configure again.
```
报错意思简单明了：目录冲突；
**<code>echo $LD_LIBRARY_PATH</code>**但是次安装目录并不在我的环境变量.bashrc文件里啊。
打开configure文件，查找LD_LIBRARY_PATH，找到如下内容：
<blockquote><p>
# Test if LD_LIBRARY_PATH contains the notation for the current directory

# since this would lead to problems installing/building glibc.

# LD_LIBRARY_PATH contains the current directory if one of the following

# is true:

# - one of the terminals (":" and ";") is the first or last sign

# - two terminals occur directly after each other

# - the path contains an element with a dot in it
</p></blockquote>
**解释就是“LD_LIBRARY_PATH不能以终结符（":" and ";"）作为开始和最后一个字符，且不能有2个终结符连在一起；因为在环境变量的最前和最后均有一个“:”，程序将此分隔符解释为当前目录了。**
<i class="fa fa-comments" aria-hidden="true"></i>**解决方法：**
执行指令：vi ~/.bashrc
将LD_LIBRARY_PATH环境变量的开头和末尾的“:”去掉，保存。等正确编译完成后可以再次修改回原来。
执行指令：source ~/.bashrc
##4> make
``` bash	
make -j4 && make install
```
make install 时报错如下：
``` bash
/usr/bin/install: `include/limits.h' and `/glibc-2.14/include/limits.h' are the same file 
make[1]: *** [/glibc-2.14/include/limits.h] Error 1
make[1]: Leaving directory `/glibc-2.14'
make: ***[install] Error 2
```
Google之发现解决办法如下：
``` bash
make install -k -i
```
<a href="#" class="myButton">通过k和i参数虽然可以强制安装，但经测试并不能真正解决问题，所以这最后一步的安装过程任然卡在这，目前也没有找到有效解决办法。这里先占个坑，等后面找到方法了再补充。</a>
其中-j，-k和-i参数解释如下：
``` bash
-j [jobs], --jobs[=jobs]
Specifies the number of jobs (commands) to run simultaneously. If there is more than one -j option, the last one is effective. If the -j option is given without an argument, make will not limit the number of jobs that can run simultaneously.
-i, --ignore-errors
Ignore all errors in commands executed to remake files.
-k, --keep-going
Continue as much as possible after an error. While the target that failed, and those that depend on it, cannot be remade, the other dependencies of these targets can be processed all the same.
```
##5>添加环境变量
``` bash
export LD_LIBRARY_PATH=/opt/glibc-2.14/lib:$LD_LIBRARY_PATH
```
<i class="fa fa-desktop" aria-hidden="true"></i>PATH和LD_LIBRARY_PATH区别
PATH:  可执行程序的查找路径；
LD_LIBRARY_PATH: 动态库的查找路径；
##参考来源
<li><a href="https://blog.liyang.io/301.html" target="_blank">解决/lib64/libc.so.6: version `GLIBC_2.14′ not found问题</a></li>
<li><a href="http://blog.csdn.net/anda0109/article/details/39229597" target="_blank"> [error]LD_LIBRARY_PATH shouldn't contain the current directory</a></li>