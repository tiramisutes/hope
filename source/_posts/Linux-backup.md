title: Linux定时备份数据到百度云盘
date: 2015-07-28 22:22:09
tags: Linux_backup
categories: Linux
---
##php实现Linux定时备份数据到百度云盘
安装bpcs_uploader 虽然关于bpcs_uploader的教程不少，但都千篇一律。虽然网上也有很详细的教程，不过可能还有漏掉的细节。
废话不多说了，开工。
下载程序包：
``` bash
wget https://github.com/oott123/bpcs_uploader/zipball/master
```
解压：
``` bash
unzip master
```
默认的文件夹名字很长，为了方便以后操作，重命名文件夹：
``` bash
mv oott123-bpcs_uploader-3a33d09 baidu
```
这里我将文件夹名字修改成了baidu，需要注意的是，以后的默认文件夹名字可能有所不同，毕竟程序会升级，你需要看一下解压出来的文件夹名称是什么。
进入程序目录：
``` bash
cd baidu
```
设置权限：
``` bash
chmod +x bpcs_uploader.php
```
运行程序：
``` bash
./bpcs_uploader.php
```
你可能会看到出错提示，因为运行程序需要PHP环境，而你的服务器上的PHP路径可能与程序中设置的不同，修改一下程序文件bpcs_uploader.php中的PHP路径即可。
查看PHP路径：
``` bash
which php
```
编辑bpcs_uploader.php文件：
``` bash
vi bpcs_uploader.php
```
将第一句#!后的路径修改为你的PHP路径，如果你安装的是WDCP一键包，路径为：/www/wdlinux/php/bin/php
登录百度开发者中心：http://developer.baidu.com/
创建一个Web应用，应用名称自定义，例如：huihuige，其他默认设置就可以了。
此时，我们可以得到该应用的API Key，运行./bpcs_uploader.php后首先要输入的就是Key。
另外我们还要在应用管理中找到API管理，开启PCS API，设置一个目录，该目录将用于存放服务器上传过来的数据。
温馨提示：开启PCS API时设置的目录不可更改，但可以在"操作"菜单中删除应用重建。
输入Key后，接下来需要输入app floder name，也就是刚才开启PCS API时设置的目录名称。
然后需要输入access token，将你的Key填入以下地址相应位置，在浏览器打开得到的地址：
``` bash
https://openapi.baidu.com/oauth/2.0/authorize?response_type=token&client_id=KEY&redirect_uri=oob&scope=netdisk
```
然后你会看到一个写着"百度 Oauth2.0"的页面，将浏览器地址栏中的URL复制下来，找到access_token=和&之间的字符串，这就是access token，输入access token后就完成了，你会看到SSH终端显示出了你的百度云盘容量。
如果之前有安装过bpcs_uploader，那么可以执行以下命令初始化：
``` bash
./bpcs_uploader.php init
```
bpcs_uploader用法 查询容量：
``` bash
./bpcs_uploader.php quota
```
上传文件：
``` bash
./bpcs_uploader.php upload [path_local] [path_remote]
```
[path_local]是指服务器上的文件路径，[path_remote]是指百度云盘中的路径。
下载文件：
```
./bpcs_uploader.php download [path_local] [path_remote]
```
删除文件：
``` bash
./bpcs_uploader.php delete [path_remote]
```
离线下载：
``` bash
./bpcs_uploader.php fetch [path_remote] [path_to_fetch]
```
自动备份脚本 接下来需要设置自动备份数据，网上有许多自动备份脚本，所以我就不再复述了。
这里要介绍的是，由于我们多半都在Linux服务器上安装了控制面板，而控制面板都有自动备份数据的功能，比如WDCP就可以设置自动备份数据到/www/backup目录，那么我们就不再需要自动备份数据的脚本了，只需要一个脚本将备份目录下的所有文件上传到百度云盘即可。
下载脚本至baidu目录下：
``` bash
wget http://www.huihuige.com/wp-content/uploads/2013/10/baidubd.zip
```
解压：
``` bash
unzip baidubd.zip
```
这个脚本实用于WDCP面板用户，如果你的备份目录不同，可以打开脚本修改。
测试脚本是否有效：
``` bash
sh baidubd.sh
``` 
最后设置计划任务：
``` bash
crontab -e
```
加入一行：
``` bash
0 0 * * * /root/baidu/baidubd.sh
```
这里设置了每天的凌晨零点自动备份数据到百度云盘。
##python实现Linux命令行上传和下载百度云盘
<a href="https://github.com/houtianze/bypy" target="_blank">bypy</a>:一个python写得百度网盘的linux客户端工具.
###下载
	git clone https://github.com/houtianze/bypy.git
###要求
<li>python >=2.7</li>
<li>python需要Requests库</li>
``` bash
	python
	>>> import requests
	ImportError: No module named requests
```
###使用
完成以上安装，cd至之前的bypy的目录下，运行下面的命令开始初始化
``` bash	
	cd bypy
	./bypy.py list
```
首先他会要求你访问一个网址，需要你授权，授权后复制code给程序，如果没有报错，就可以看到你的同步目录了，你可以在网盘的我的应用数据文件夹里找到bypy文件夹，他就是应用目录了。

如果你迫不及待的要测试，那就试试直接把当前目录上传至百度网盘
``` bash
	./bypy.py upload
```
如果你想看到上传进度，请加入-v选项
``` bash
./bypy.py -v upload
```
###常用命令
./bypy.py list	查看目录

./bypy.py mkdir newdir	新建目录

./bypy.py upload <local_file或者dir> <remote_file或者dir>	上传

./bypy.py downfile或者./bypy.py downdir	下载
./bypy.py delete filename
./bypy.py rm dir
用的时候注意用help查看一下参数的使用，其中remote path的/代表了apps/bypy/这个路径,且命令中的斜线/表示或，如“delete/remove/rm”表示delete，remove和rm三个命令。
###自动备份到百度云
<li>编写备份bash</li>
``` bash
#!/bin/sh
# File:    home/bin/bypy/baidu_sync.sh
# Author:  hope
# Version: 1.0
 
# Some vars
UPLOAD_SCRIPTS_DIR="/public/home/zpxu/scripts"
DATE=`date +%F`
DATE_YEAR=`date +%Y`
DATE_MONTH=`date +%m`
 
# Backup
cd $UPLOAD_SCRIPTS_DIR
cd ..
tar -czvf  scripts_$DATE.tar.gz $UPLOAD_SCRIPTS_DIR
/home/Python-2.7.10/./python /home/bin/bypy/./bypy.py mkdir scripts/$DATE_YEAR/$DATE_MONTH
/home/Python-2.7.10/./python /home/bin/bypy/./bypy.py -v upload scripts_$DATE.tar.gz scripts/$DATE_YEAR/$DATE_MONTH
rm scripts_$DATE.tar.gz
/home/Python-2.7.10/./python /home/bin/bypy/./bypy.py list
```
<li>设置cron定时执行</li>
``` bash
$ crontab -e
```
此时会启动默认编辑器vim，添加以下内容
``` bash
# backup my scripts to baidu
40 1 * * * <备份bash目录/baidu_sync.sh>
```
以上内容意义为：每一行由空格分割为6部分，依次为"分钟"、"小时"、"日"、"月"、"星期"、"要执行的程序"。
备份操作可能消耗大量资源和时间，应该设置在凌晨访问量小、系统负载低的时候运行。如果有独立的服务器存储备份文件，还可以在脚本中增加ftp或者email传送备份文件到远程服务器的功能。
<p></p>
<i class="fa fa-blind" aria-hidden="true"></i>**百度限制上传/下载数度，所以对于较大文件的转移不是很方便，上传时至少可以打包压缩下，至于下载目前还不知道有何良策。**
<p></p>
<i class="fa fa-sign-language" aria-hidden="true"></i>**由于百度权限问题，使用百度云备份需要差不多一个月跟新一次授权，否则报错**
<code>OpenShift server failed, authorizing/refreshing with the Heroku server ...<code>
**跟新授权办法如下：**
``` bash
运行bypy.py -c，删除令牌文件，然后重新授权一次。
如果还不行，去百度应用授权（https://passport.baidu.com/accountbind） 里删除bypy再重新授权。
```
<p></p>
Contribution from ：
http://www.lovelucy.info/auto-backup-website-shell-script.html
https://github.com/houtianze/bypy/issues/199