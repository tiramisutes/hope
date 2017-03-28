title: Linux环境变量
date: 2015-08-22 16:23:25
tags: Linux
categories: Linux
---
##常见的环境变量
对于PATH和HOME等环境变量大家都不陌生。除此之外，还有下面一些常见环境变量。
◆ HISTSIZE是指保存历史命令记录的条数。
◆ LOGNAME是指当前用户的登录名。
◆ HOSTNAME是指主机的名称，许多应用程序如果要用到主机名的话，通常是从这个环境变量中来取得的。
◆ SHELL是指当前用户用的是哪种Shell。
◆ LANG/LANGUGE是和语言相关的环境变量，使用多种语言的用户可以修改此环境变量。
◆ MAIL是指当前用户的邮件存放目录。
◆ PS1是基本提示符，对于root用户是#，对于普通用户是$。PS2是附属提示符，默认是">"。可以通过修改此环境变量来修改当前的命令符，比如下列命令会将提示符修改成字符串"Hello,My NewPrompt "。

除了这些常见的环境变量，许多应用程序在安装时也会增加一些环境变量，比如使用Java就要设置JAVA_HOME和CLASSPATH等
##定制环境变量
环境变量是和Shell紧密相关的，用户登录系统后就启动了一个Shell。对于Linux来说一般是bash，但也可以重新设定或切换到其它的 Shell。环境变量是通过Shell命令来设置的，设置好的环境变量又可以被所有当前用户所运行的程序所使用。对于bash这个Shell程序来说，可 以通过变量名来访问相应的环境变量，通过export来设置环境变量。下面通过几个实例来说明。
1、显示环境变量HOME
``` bash
$ echo $HOME 
/home/terry
```
2、设置一个新的环境变量WELCOME
``` bash
$ export WELCOME="Hello!" 
$ echo $WELCOME 
Hello!
```
3、使用env命令显示所有的环境变量
``` bash
$ env 
HOSTNAME=terry.mykms.org 
PVM_RSH=/usr/bin/rsh 
SHELL=/bin/bash 
TERM=xterm
HISTSIZE=1000 
...
```
4、使用set命令显示所有本地定义的Shell变量
``` bash
$ set 
BASH=/bin/bash 
BASH_VERSINFO=([0]="2"[1]="05b"[2]="0"[3]="1"[4]="release"[5]="i386-redhat-linux-gnu") 
BASH_VERSION='2.05b.0(1)-release' 
COLORS=/etc/DIR_COLORS.xterm 
COLUMNS=80 
DIRSTACK=() 
DISPLAY=:0.0 
...
```
5、使用unset 命令来清除环境变量
set可以设置某个环境变量的值。清除环境变量的值用unset命令。如果未指定值，则该变量值将被设为NULL。示例如下：
``` bash
$ export TEST="Test..." #增加一个环境变量TEST 
$ env|grep TEST #此命令有输入，证明环境变量TEST已经存在了 
TEST=Test... 
$ unset $TEST #删除环境变量TEST 
$ env|grep TEST #此命令没有输出，证明环境变量TEST已经存在了
```
6、使用readonly 命令设置只读变量
如果使用了readonly命令的话，变量就不可以被修改或清除了。示例如下：
``` bash 
$ export TEST="Test..." #增加一个环境变量TEST 
$ readonly TEST #将环境变量TEST设为只读 
$ unset TEST #会发现此变量不能被删除 
-bash: unset: TEST: cannot unset: readonly variable 
$ TEST="New" #会发现此也变量不能被修改 
-bash: TEST: readonly variable
```
##环境变量PATH
which, 它用来查找某个命令的绝对路径
``` bash
[root@localhost ~]# which rmdir
/bin/rmdir
[root@localhost ~]# which rm
alias rm='rm -i'
        /bin/rm
[root@localhost ~]# which ls
alias ls='ls --color=auto'
        /bin/ls
```