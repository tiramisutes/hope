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