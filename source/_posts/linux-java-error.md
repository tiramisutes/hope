title: linux下java安装和运行报错
date: 2016-05-31 19:08:12
tags: linux-java
categories: Bioinformatics
---

##Linux下安装java
<a href="http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html" target="_blank">java官网</a>下载最新版本jdk：<a href="http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html" target="_blank">jdk-8u91-linux-x64.tar.gz</a>。
按照官网说明安装：<a href="http://docs.oracle.com/javase/8/docs/technotes/guides/install/linux_jdk.html#BJFJJEFG" target="_blank">JDK Installation for Linux Platforms</a>
最后配置环境变量：编辑<code>.bashrc</code>文件。
##Linux服务器上java运行报错
``` bash
Error occurred during initialization of VM
Could not reserve enough space for object heap
Could not create the Java virtual machine.
```
或者
``` bash
Error occurred during initialization of VM 
Could not reserve enough space for code cache
```
根据报错提示主要是运行内存不足造成，解决办法如下：
``` bash
set JAVA_OPTS=-Xms512m -Xmx512m -XX:MaxPermSize=256m
```
more：http://stackoverflow.com/questions/4401396/could-not-reserve-enough-space-for-object-heap