title: vim编辑器个性化配置总结
Total word: WordCount
Read time: Min2Read
date: 2016-09-21 16:16:31
tags: vim
categories: Linux
---
<a href="https://linux.cn/article-7766-1.html" target="_blank">Vim 终于发布了一个新的大版本 8.0</a>
##安装
下载安装最新版本的 Vim 的最好方式是使用 Git ：
``` bash
git clone https://github.com/vim/vim.git 
```
更多信息可参考：&nbsp;<a href="http://www.vim.org/git.php" target="_blank" rel="nofollow">http://www.vim.org/git.php</a>&nbsp;。
**Windows**下图形界面版：&nbsp;<a href="ftp://ftp.vim.org/pub/vim/pc/gvim80.zip&nbsp;">ftp://ftp.vim.org/pub/vim/pc/gvim80.zip&nbsp;</a>
windows下next安装就可以。
**Vim安装完成之后，目录如下：**
<li>vim80：vim运行时所需的文件，对应目录为$VIMRUNTIME变量</li>
<li>vimfiles：第三方的文件，对应目录为$VIM/vimfiles</li>
<li>_vimrc：vim全局配置信息</li>
##主题
vimrc配置内容主要参考了http://blog.csdn.net/zhengzhoudaxue2/article/details/45247733

**注：**_vimrc主题中参数解释见 http://edyfox.codecarver.org/html/_vimrc_for_beginners.html
##配置<a href="https://github.com/gmarik/Vundle.vim" rel="nofollow,noindex">Vundle</a>
<a href="#" class="myButton">vim插件Vundle能够轻松的管理插件；</a> 
###下载Vundle
在Vim/vimfiles路径下新建文件夹bundle，然后在此文件夹下克隆github上的vundel项目：
``` bash
#以管理员权限运行cmd，进入bundle文件夹下
cd Vim/vimfiles/bundle
$ git clone https://github.com/VundleVim/Vundle.vim.git Vundle.vim
```
###配置Vundle
**在_vimrc文件中添加如下代码：**
**以下英语输入法状态下的"符号是_vimrc中的注释符；**
``` bash
filetype off

" Vundle的路径
set rtp+=$VIM/vimfiles/bundle/Vundle.vim
" 插件的安装路径
call vundle#begin('$VIM/vimfiles/bundle/')
" 需要安装的插件
Plugin 'gmarik/Vundle.vim'
Plugin 'L9'
 
call vundle#end()
filetype plugin indent on
```
**注：**若不指定call vundle#begin()中的路径参数，默认保存路径为C:\Users\***\.vim；
##vim中安装/卸载插件
vundle主要是利用git，来处理自动安装，更新和卸载插件，所以首先需要安装git。
###vim插件安装方式
_vimrc指定的vim插件安装有4种方式：
<li>1. 代码库放在github上</li>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bundle 'tpope/vim-fugitive'
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bundle 'Lokaltog/vim-easymotion'
<li>2. 代码库在vim script上</li>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bundle 'L9'
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bundle 'FuzzyFinder'
<li>3. 代码库在其他git库上</li>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bundle 'git://git.wincent.com/command-t.git'
<li>4. 当你自己写了个定制的插件，放在本地的时候</li>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Bundle 'file:///Users/gmarik/path/to/plugin'
###常用的命令
启动vim，键入
``` bash
:BundleInstall    安装插件
:PluginInstall    安装插件
:BundleInstall!   更新插件
:BundleClean(!)   卸载不在.vimrc配置列表中的插件
:BundleSearch(!)  搜索插件
:BundleList       显示已安装插件列表
```
**如果想安装插件，首先在_vimrc中添加相应插件的Bundle，一般为Bundle 'username/pluginname'的形式，如Bundle 'gmarik/vundle',然后打开Vim，输入一下命令，并等待Done即可，如果安装过程中出错，可以输入小写字母"l"查看日志;**
**如果想卸载插件，只需在_vimrc中删除（或注释）相应的Bundle，然后打开Vim，输入相应命令。**
##遇到的问题
<li>安装ctags遇到"Taglist: Exuberant ctags (http://ctags.sf.net) not found in PATH.Plugin is not loaded."</li>
解决办法：ctags 目录下的 ctags.exe 复制到gvim.exe 所在的目录；
<h5>参考资料</h5>
<a href="http://www.tuicool.com/articles/yqAryqR" target="_blank">Gvim各种插件配置（windows环境下） - vitah</a>
<a href="http://www.cnblogs.com/pigzhu/p/3320755.html" target="_blank">VIM插件管理--vundle</a>
<a href="http://www.cnblogs.com/ppboy_dxh/p/3226938.html" target="_blank">Vim Skills——Windows利用Vundle和Github进行Vim配置和插件的同步</a>
<a href="http://edyfox.codecarver.org/html/_vimrc_for_beginners.html" target="_blank">_vimrc for beginners</a>
<a href="http://luckybins.blog.51cto.com/786164/681325" target="_blank">_gvim与插件的安装（ctag、taglist、cscope等）</a>
