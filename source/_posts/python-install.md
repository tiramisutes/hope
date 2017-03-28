title: python模块安装--无root权限（easy_install和pip）
date: 2015-11-27 13:17:35
tags: module install
categories: Python
---
easy_install是由PEAK(Python Enterprise Application Kit)开发的setuptools包里带的一个命令，所以使用easy_install实际上是在调用setuptools来完成安装模块的工作。 Perl 用户比较熟悉 CPAN，而 Ruby 用户则比较熟悉 Gems；引导 setuptools 的ez_setup工具和随之而生的扩展后的easy_install 与"Cheeseshop"（Python Package Index，也称为 "PyPI"）一起工作来实现相同的功能。它可以很方便的让您自动下载，编译，安装和管理Python包。【百度百科】
easy_install和pip都是用来下载安装Python一个公共资源库PyPI的相关资源包的，pip类似RedHat里面的yum，安装Python包非常方便。本节详细介绍pip的安装、以及使用方法。
##首先安装setuptools
``` bash
wget "https://bitbucket.org/pypa/setuptools/get/default.tar.gz#egg=setuptools-dev" --no-check-certificate
tar -xzvf default.tar.gz
cd pypa-setuptools-eb92fc5071bf //依据你的解压目录名而定
python setup.py install
```
##安装easy_install
``` bash
wget https://pypi.python.org/pypi/ez_setup
```
解压,安装.
``` bash
python ez_setup.py
```
###easy_install安装包
``` bash
easy_install 【要安装的模块】
```
##pip下载安装
``` bash
wget "https://pypi.python.org/packages/source/p/pip/pip-1.5.4.tar.gz#md5=834b2904f92d46aaa333267fb1c922bb" --no-check-certificate
```
###pip安装
``` bash
tar -xzvf pip-1.5.4.tar.gz
cd pip-1.5.4
python setup.py install
```
##pip使用详解
### pip安装包
``` bash
pip install SomePackage
[...]
Successfully installed SomePackage
```
###pip查看已安装的包
``` bash
pip show --files SomePackage
Name: SomePackage
Version: 1.0
Location: /my/env/lib/pythonx.x/site-packages
Files:
../somepackage/__init__.py
[...]
```
###pip检查哪些包需要更新
``` bash
pip list --outdated
SomePackage (Current: 1.0 Latest: 2.0)
```
###pip升级包
``` bash
pip install --upgrade SomePackage
[...]
Found existing installation: SomePackage 1.0
Uninstalling SomePackage:
Successfully uninstalled SomePackage
Running setup.py install for SomePackage
Successfully installed SomePackage
```
###pip卸载包
``` bash
pip uninstall SomePackage
Uninstalling SomePackage:
/my/env/lib/pythonx.x/site-packages/somepackage
Proceed (y/n)? y
Successfully uninstalled SomePackage
```
##常见错误
``` bash
ImportError No module named setuptools
```
解决办法：安装setuptools

