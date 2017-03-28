title: 非Root用户编译安装GCC
date: 2016-06-04 09:08:22
tags: linux-gcc
categories: Linux
---
Linux下源码安装软件三部曲都需要GCC编译，所以Linux下都会有预安装的GCC，但处于稳定性和兼容性考虑，其版本均为较低的稳定版，而最新软件的安装编译时需要较高版本才可以，对于非Root普通用户解决办法就是自己目录下安装所需版本GCC。
如何证明你的GCC版本需要升级呢？
当你安装软件make编译时看到如下报错，就说明该升级了：
``` bash
g++ -std=c++11 -pedantic -Wall -Wextra    -c CCSSequence.cpp -o CCSSequence.o 
cc1plus: error: unrecognized command line option "-std=c++11"
```
<code>-std=c++0x</code>是g++-4.4支持的，而<code>-std=c++11</code>是g++-4.7及其后续版本。
<code>gcc -v</code>察看当前系统GCC版本，确认是否为GCC版本问题引起报错。
##GCC安装
安装gcc之前依赖gmp、mpc、mpfr这三个包，所以先安装这个三个包，这三个包可以在下面的<a href="ftp://gd.tuwien.ac.at/gnu/gcc/infrastructure/" target="_blank">infrastructure</a>目录下下载，gcc源码包在<a href="ftp://gd.tuwien.ac.at/gnu/gcc/releases/" target="_blank">releases</a>中下载，这里gcc下载的版本为gcc-4.8.5。
因为这三个包之间有依赖关系，所以一定按如下顺序依次安装。
###gmp安装
``` bash
$tar -jxvf gmp-4.3.2.tar.bz2

$cd gmp-4.3.2

$./configure --prefix=/home/software/opt/gmp-4.3.2/ #gmp安装路径

$make

$make check #这一步可以不要

$make install
```
###mpfr安装
``` bash
tar -jxvf mpfr-2.4.2.tar.bz2

$cd mpfr-2.4.2

$./configure --prefix=/home/software/opt/mpfr-2.4.2/ --with-gmp=/home/software/opt/gmp-4.3.2/ #congfigure后面是mpfr安装路径及依赖的gmp路径

$make

$make check #这一步可以不要

$make install
```
###mpc安装
``` bash
$tar -zxvf mpc-0.8.1.tar.gz

$cd mpc-0.8.

$ ./configure --prefix=/home/software/opt/mpc-0.8.1/ --with-gmp=/home/software/opt/gmp-4.3.2/ --with-mpfr=/home/software/opt/mpfr-2.4.2/

$make

$make check #这一步可以不要

$make install
```
###更改~/.bashrc文件
安装完上述三个依赖包后设置环境变量 $LD_LIBRARY_PATH，即在bashrc文件添加如下内容：
因为系统的LD_LIBRARY_PATH中有两个相邻的冒号，编译gcc的导致通不过，所以先把这个变量自己重新定义一下，然后将上面装的三个包添加到该变量中
``` bash
export LD_LIBRARY_PATH=/public/software/mpi/openmpi/1.6.5/intel/lib:/opt/gridview/pbs/dispatcher/lib:/public/software/compiler/intel/composer_xe_2013_sp1.0.080/compiler/lib/intel64:/public/software/compiler/intel/composer_xe_2013_sp1.0.080/mkl/lib/intel64:/usr/local/lib64:/usr/local/lib:/usr/local/otpserver/dependson_libs_x64

export LD_LIBRARY_PATH=~/opt/gmp-4.3.2/lib/:~/opt/mpfr-2.4.2/lib/:~/opt/mpc-0.8.1/lib/:$LD_LIBRARY_PATH

export LIBRARY_PATH=$LD_LIBRARY_PATH
```

不然会碰到错误 configure: error: cannot compute suffix of object files: cannot compile
###gcc安装
完成依赖包的安装和环境设置后就可以开始GCC的安装了
``` bash
$tar -jxvf gcc-4.8.5.tar.bz2

$cd gcc-4.8.5

$./configure --prefix=/home/software/opt/gcc-4.8.5/ --enable-threads=posix --disable-checking --disable-multilib --with-mpc=/home/software/opt/mpc-0.8.1/ --with-gmp=/home/software/opt/gmp-4.3.2/ --with-mpfr=/home/software/opt/mpfr-2.4.2/ 

make -j 10 #类似于使用10个线程编译，速度要快很多,此过程需要较长时间，中间不要间断。

make install
```
###更改~/.bashrc文件
在文件中加入一下两句将gcc加入到环境变量中。
``` bash
export PATH=/home/software/opt/gcc-4.8.5/bin/:$PATH

export LD_LIBRARY_PATH=/home/software/opt/gcc-4.8.5/lib/:~/opt/gcc-4.8.5/lib64/:$LD_LIBRARY_PATH
```
##安装过程报错暨解决办法
Linux安装任何软件切记   **路劲**　 **路劲** 　**路劲**　　要的事说3编！
路劲报错主要类型如下：
1）路劲缺失
解决：export PATH="$PATH:/home/bin/amos-3.1.0/bin"相应缺失路径到<code>.bashrc</code>文件。
2）当前软件安装路径存在，如下面报错[configure-stage2-gcc] Error 1 。
3）意外路径存在于环境变量中，如下面blasr安装编译报错。
###报错[configure-stage2-gcc] Error 1
``` bash
contains current directory 
configure: error:  
*** LIBRARY_PATH shouldn't contain the current directory when 
*** building gcc. Please change the environment variable 
*** and run configure again.
make[2]: *** [configure-stage2-gcc] Error 1
```
1)根据提示看出是LIBRARY_PATH环境变量不应该包含有当前安装GCC的路径，即我想要安装gcc路径为<code>/honm/software/gcc-4.8.5/</code>，那个<code>echo $LIBRARY_PATH</code>就不应该包含此路径。
2)若<code>echo $LIBRARY_PATH</code>输出结果为<code>/usr/lib/x86_64-linux-gnu/:</code>（注意结尾冒号）,则同样会报错，解决办法就是去掉冒号<code>/usr/lib/x86_64-linux-gnu/</code>。
3）解决办法<code>unset LIBRARY_PATH; ./configure -v</code>。来源于http://stackoverflow.com/questions/8565695/error-compiling-gcc-4-6-2-under-ubuntu-11-10
###报错[stage1-bubble] Error 2
``` bash
make[1]: *** [stage1-bubble] Error 2
make[1]: Leaving directory `/np/linac/belloni/programs/gcc/gcc-build'
make: *** [all] Error 2
```
解决：主要由Error 1 报错引起的，在第一个报错解决后此错误消失。
###后续编译其他软件报错
####安装<a href="https://github.com/PacificBiosciences/blasr/wiki/Step-by-step-blasr-installation-example" target="_blank">blasr</a>报错如下：
``` bash
g++ -std=c++11 -pedantic -Wall -Wextra    -c CCSSequence.cpp -o CCSSequence.o
/public/home/zpxu/bin/gcc-4.8.5/libexec/gcc/x86_64-unknown-linux-gnu/4.8.5/cc1plus: error while loading shared libraries: libmpc.so.2: cannot open shared object file: No such file or directory
make[3]: *** [CCSSequence.o] Error 1
make[3]: Leaving directory `/public/home/zpxu/bin/blasr_install/blasr/libcpp/pbdata'
make[2]: *** [libpbdata] Error 2
make[2]: Leaving directory `/public/home/zpxu/bin/blasr_install/blasr/libcpp'
make[1]: *** [all] Error 2
make[1]: Leaving directory `/public/home/zpxu/bin/blasr_install/blasr/libcpp'
```
报错原因在于blasr安装相关路径已经存在于系统环境变量中，注释掉<code>.bashrc</code>中相应路径。
####make install后报错
``` bash
/bin/llvm-tblgen: /usr/lib64/libstdc++.so.6: version `GLIBCXX_3.4.15' not found (required by /bin/llvm-tblgen)
```
解决办法：
I found the libstdc++.so.6.0.18 at the place where I complied gcc 4.8.1

Then I do like this
``` bash

cp ~/objdir/x86_64-unknown-linux-gnu/libstdc++-v3/src/.libs/libstdc++.so.6.0.18 /usr/lib64/

rm /usr/lib64/libstdc++.so.6

ln -s libstdc++.so.6.0.18 libstdc++.so.6
```
problem solved.
##GCC延伸阅读
<a href="http://blog.5ibc.net/p/78733.html" target="_blank">Linux下gcc生成和使用静态库和动态库详解</a>
<a href="http://www.cnblogs.com/image-eye/archive/2011/08/20/2147133.html" target="_blank">Linux添加环境变量与GCC编译器添加INCLUDE与LIB环境变量</a>
<p></p>
贡献来源：
http://favoorr.github.io/centos6.6-build-gcc5.2-from-source/
http://stackoverflow.com/questions/5216399/usr-lib-libstdc-so-6-version-glibcxx-3-4-15-not-found