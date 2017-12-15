title: 程序运行报错总结
Total word: WordCount
Read time: Min2Read
date: 2016-10-26 17:04:06
tags: error
categories: Bioinformatics
---
跑程序难免会遇到各种各样的错误，解决办法也多种多样，自此仅总结我所遇到的问题和最优的解决方案。
##R报错
``` bash
>alphaData = read.csv("data.csv")
Error: REAL() can only be applied to a 'numeric', not a 'integer'
```
**<a href="https://support.bioconductor.org/p/76829/" target="_blank">解决办法</a>**
``` bash
alphaData = read.csv("data.csv") * 1.0
```
##npm报错
``` bash
ERR! Windows_NT 6.3.9600
Error: tunneling socket could not be established, cause=connect ECONNREFUSED
```
**<a href="http://stackoverflow.com/questions/33162560/error-tunneling-socket-could-not-be-established-cause-connect-econnrefused-10" target="_blank">解决办法</a>**
``` bash
#first run
npm cache clean
#If there is no proxy , remove proxy config from npm
npm config set proxy null
npm config set https-proxy null
npm install -g XXXX
```
##python报错
### 1. re模块正则匹配时报错
```
AttributeError: 'NoneType' object has no attribute 'group'
```
**<a href="http://www.cnblogs.com/zhoujinyi/p/3159903.html" target="_blank">解决办法</a>**
写的正则表达式匹配不到任何内容，检查正则表达式正确性。
### 2. lib库报错
```
error while loading shared libraries: libpython2.7.so.1.0: cannot open shared object file: No such file or directory
```
添加python的lib库地址到环境变量即可。
##生信软件安装报错
make编译过程报错
```
error: ‘getpid’ was not declared in this scope
```
[解决办法](https://stackoverflow.com/questions/34823393/linux-getpid-system-call-error)
添加``#include <unistd.h>``在相应报错的XX.cpp文件头部