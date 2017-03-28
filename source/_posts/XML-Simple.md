title: Linux下XML::Simple无root权限安装
date: 2016-08-11 14:32:51
tags: XML::Simple
categories: Perl
---
##XML::Simple简介
XML::Simple 基本上有两个功能；它将 XML 文本文档转换为 Perl 数据结构（匿名散列和数组的组合），以及将这种数据结构转换回 XML 文本文档。提供了两个函数：XMLin() 和 XMLout()。第一个子函数读取 XML 文件，返回一个引用。给出适当数据结构的引用，第二个子函数将它转换为 XML 文档，根据参数的不同，产生的 XML 文档采用字符串格式或文件形式。

XML::Simple 有两个主要限制。首先，在输入方面，它将完整的 XML 文件读入内存，所以如果文件非常大或者需要处理 XML 数据流，就不能使用这个模块。第二，它无法处理 XML 混合内容，也就是在一个元素体中同时存在文本和子元素的情况.
##为何需要XML::Simple
在用<a href="https://trinotate.github.io/">Trinotate: Transcriptome Functional Annotation and Analysis</a>对De Novo转录组数据进行注释时，需要运行RNAMMER来识别rRNA转录本，同时将XML输出文件解析为gff结果；这一过程就需要XML::Simple这一模块；
否则将报错<cord>../rnammer  error converting xml into gff</cord>
##安装XML::Simple
XML::Simple模块的安装需要至少以下两个依赖包：**XML::Parser和XML::SAX::Expat**
注意：**一定按照 XML::Parser、XML::SAX::Expat、XML::Simple的顺序依次安装；**
XML::Parser一般可以在cpan下顺利安装，但是XML::SAX::Expat在正常的cpan安装将因为权限问题而中断：
``` bash
$ perl -MCPAN -e shell
cpan> install XML::Simple
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
ERROR: Can't create '/usr/local/share/man/man3'
Do not have write permissions on '/usr/local/share/man/man3'
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
```
所以就涉及到在Linux下如何无root权限安装perl模块？
这里推荐更加好用,更加人性的cpanm，**在没有 Root 权限时会自动安装到当前用户家目录的perl/lib文件夹下。
###cpanm安装
下载cpanm到自己的目录下，并修改可执行权限
``` bash
$ wget  http://xrl.us/cpanm  --no-check-certificate -O cpanm 
$ chmod +x cpanm 
```
将路径写到bashrc文件中
``` bash
export PATH=~/software/perl/:$PATH
```
###perl模块安装
####XML::SAX::Expat
``` bash
$ cpanm XML::SAX::Expat
```
注意：第一次安装时，cpanm会创建一个~/perl5目录，而perl模块的安装位置为~/perl5/lib/perl5，将这个变量写入bashrc文件的PERL5LIB变量中
``` bash
export PERL5LIB=~/perl5/lib/perl5

source ~/.bashrc
```
验证安装
perldoc XML::SAX::Expat
输出正常帮助文档则表明安装成功；
cpanm还有更多用法，参见扶凯 blog<a href="http://www.php-oa.com/2010/05/05/perl-cpanminus-cpan.html">使用 CPANMinus 来安装 Perl 模块和其它技巧</a>
####XML::Simple
``` bash
$ cpanm XML::Simple
```
报错：
``` bash
t/0_Config.t ............ ok
t/1_XMLin.t ............. 
Failed 84/132 subtests 
t/2_XMLout.t ............ ok
t/3_Storable.t .......... 
Failed 21/23 subtests 
t/4_MemShare.t .......... 
Failed 7/8 subtests 
t/5_MemCopy.t ........... 
Failed 6/7 subtests 
t/6_ObjIntf.t ........... ok
t/7_SaxStuff.t .......... 
Failed 12/14 subtests 
t/8_Namespaces.t ........ ok
t/9_Strict.t ............ ok
t/A_XMLParser.t ......... ok
t/B_Hooks.t ............. 
Failed 4/12 subtests 
	(less 3 skipped subtests: 5 okay)
t/release-pod-syntax.t .. skipped: these tests are for release candidate testing

Test Summary Report
-------------------
t/1_XMLin.t           (Wstat: 139 Tests: 48 Failed: 0)
  Non-zero wait status: 139
  Parse errors: Bad plan.  You planned 132 tests but ran 48.
t/3_Storable.t        (Wstat: 139 Tests: 2 Failed: 0)
  Non-zero wait status: 139
  Parse errors: Bad plan.  You planned 23 tests but ran 2.
t/4_MemShare.t        (Wstat: 139 Tests: 1 Failed: 0)
  Non-zero wait status: 139
  Parse errors: Bad plan.  You planned 8 tests but ran 1.
t/5_MemCopy.t         (Wstat: 139 Tests: 1 Failed: 0)
  Non-zero wait status: 139
  Parse errors: Bad plan.  You planned 7 tests but ran 1.
t/7_SaxStuff.t        (Wstat: 139 Tests: 2 Failed: 0)
  Non-zero wait status: 139
  Parse errors: Bad plan.  You planned 14 tests but ran 2.
t/B_Hooks.t           (Wstat: 139 Tests: 8 Failed: 0)
  Non-zero wait status: 139
  Parse errors: Bad plan.  You planned 12 tests but ran 8.
Files=13, Tests=367,  3 wallclock secs ( 0.11 usr  0.05 sys +  1.61 cusr  0.35 csys =  2.12 CPU)
Result: FAIL
Failed 6/13 test programs. 0/367 subtests failed.
make: *** [test_dynamic] Error 255
-> FAIL Installing XML::Simple failed.
```
可以看出是text时存在其他依赖包的缺失，解决办法如下：
``` bash
$ cpanm XML::LibXML::SAX::Parser 
$ cpanm XML::LibXML::SAX 
$ cpanm XML::SAX::PurePerl
$ cpanm XML::Simple
--> Working on XML::Simple
Fetching http://www.cpan.org/authors/id/G/GR/GRANTM/XML-Simple-2.22.tar.gz ... OK
Configuring XML-Simple-2.22 ... OK
Building and testing XML-Simple-2.22 ... OK
Successfully installed XML-Simple-2.22
1 distribution installed
```
more：https://bugzilla.redhat.com/show_bug.cgi?id=233003