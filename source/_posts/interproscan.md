title: 非root用户interproscan的安装和使用
Total word: WordCount
Read time: Min2Read
date: 2016-12-15 11:10:40
tags: InterProScan
categories: Bioinformatics
---
<a href="#" class="myButton">InterProScan</a>**常用于基因序列的功能注释，**InterPro**是一个包含有蛋白质功能和家族等的数据库，而InterProScan的功能就是将我们的目标序列比对到这个数据库，从而了解其功能。
![](http://7xk19o.com1.z0.glb.clouddn.com/InterProScan.png)
<!--more-->
关于InterProScan的功能和安装过程以及基本的配置要求官网提供了非常详细的<a href="https://github.com/ebi-pf-team/interproscan/wiki" target="_blank">InterProScan wiki</a>，这里就不做细述。
但通常我们面临的问题是权限，比如python的版本问题，我的集群python是2.6，我也在自己家目录下正确安装有python2.7，但系统默认的是2.6，首先如何修改<code>/usr/bin/python</code>目录下python使其默认为自己安装的2.7。
最简单的就是用alias：
``` bash
alias python='~/bin/Python-2.7.10/Python/bin/python2.7'
```
但是当所运行软件是调用系统默认python时，上面方法就失效了。
那么为什么非要修改系统默认版本呢？当需要python时直接指定就可以，是的，python编写的软件可以通过<code>python2.7 软件</code>这样的方式运行，但InterProScan的运行主程序 **interproscan.sh**并不是python写的，好在有一个专属的配置文件**interproscan.properties**，可设置软件和数据库路径。
所以,**解决非root用户interproscan使用时python版本问题的方法就是添加<a href="#" class="myButton"> python.command=/path/to/python2.7</a>到配置文件。**
##Pre-calculated Match Lookup Service
软件会联网搜寻并匹配[EBI](http://www.ebi.ac.uk)数据库来获得准确结果，当服务器不能联网时可选取如下解决办法：
1>[Download and install the InterProScan 5 lookup service](https://github.com/ebi-pf-team/interproscan/wiki/LocalLookupService).
2>用<code>-dp</code>参数来关掉此功能.
3>用#号注释掉**interproscan.properties**文件中的<code>precalculated.match.lookup.service.url=http://www.ebi.ac.uk/interpro/match-lookup</code>行。