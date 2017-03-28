title: 评估文库 Average Insert Size
Total word: WordCount
Read time: Min2Read
date: 2016-09-19 22:07:39
tags: Average Insert Size
categories: Bioinformatics
---
用SOAPdenovo对Illumina paired-end进行基因组组装时需要配置文件，其中要填写每个文库的average insert size，那么如何进行average insert size大小的评估呢？
##文库类型
对于基因组文库我们一般会建小库（<1K）的**paired-end reads**和大库的**mate-pair reads**，二者最主要的区别就是reads1和reads2的方向和之间的间隔大小。

<img src="http://7xk19o.com1.z0.glb.clouddn.com/strand_specificity.jpg" width="800" height="100">
<!--more-->
现在绝大部分的主流软件都是支持将paired-end reads进行比对的，那么 **mate-pair reads**如何处理呢，即 **mate-pair reads**如何做比对？请参考我的另一篇博文 **<a href="http://tiramisutes.github.io/2016/11/25/mate-pair-reads-Aligner.html" target="_blank">Mate-pair Reads Alignment</a>**
##Insert Size
首先，什么是Insert Size呢？
**对于paired-end reads来说**
![](http://www.frontiersin.org/files/Articles/77572/fgene-05-00005-HTML/image_m/fgene-05-00005-g001.jpg)
**对于mate-pair reads来说**其reads1和reads2方向指向外面，其插入大小统计需要格外注意。
##基于bwa比对log文件统计插入大小
通过观察bwa软件的输出log文件发现其对每一个pair-end reads分4次读入（[M::main_mem] read 2613712 sequences (200000105 bp)...），对于每一次的读入会对reads进行统计如下：
![](http://7xk19o.com1.z0.glb.clouddn.com/bwa.png)
由红框标出发现占主要比例的是RF reads，进一步往下寻找analyzing insert size distribution for orientation RF...就可得到其平均插入大小。
##基于比对的sam文件统计插入大小
###R计算
``` bash
$ cat sample.sam | cut -f9 > initial.insertsizes.txt
R
a = read.table("initial.insertsizes.txt")
a.v = a[a[,1]>0,1]                     # 筛选大于0的值
mn = quantile(a.v, seq(0,1,0.05))[4]   #分位数计算，[4]表示取第四个分位值,15%
mx = quantile(a.v, seq(0,1,0.05))[18]  #85%
mean(a.v[a.v >= mn & a.v <= mx])       # mean
sd(a.v[a.v >= mn & a.v <= mx])         # sd
```
可见R计算过程选择过滤掉小于等于15%和大于等于85%的值来计算平均插入大小；
###awk计算
``` bash
awk '{ if ($9 > 0) { N+=1; S+=$9; S2+=$9*$9 }} END { M=S/N; print "n="N", mean="M", stdev="sqrt ((S2-M*M*N)/(N-1))}' sample.sam
```
awk选择全部大于0的值计算平均插入大小；
##基于sorted.bam文件
###qualimap
``` bash
qualimap bamqc -bam sample.sorted.bam --java-mem-size=300G  -c -nw 400 -hm 3 -outdir /resulted
```
###<a href="https://broadinstitute.github.io/picard/command-line-overview.html#CollectInsertSizeMetrics" target="_blank">CollectInsertSizeMetrics</a>
``` bash
java -jar CollectInsertSizeMetrics.jar \
      I=sample.sorted.bam \
      O=insert_size_metrics.txt \
      H=insert_size_histogram.pdf \
      M=0.5
```
##问题
现对同一个比对产生的sam/bam文件用上述4种方法计算得出结果如下：
**R** ：mean insert size = 260.577232343453"，"standard deviation = 27.4153198790634"；
**awk**： mean=250.826, stdev=51.7005；
**qualimap**：mean insert size = 250.8258，std insert size = 51.7005；
**CollectInsertSizeMetrics**：MEAN_INSERT_SIZE=260.963523，STANDARD_DEVIATION=42.809159。
qualimap 和 CollectInsertSizeMetrics 都是java封装的软件，看不到其具体计算方法，根据以上计算结果可以看出CollectInsertSizeMetrics的计算原理应该和R的一样需要过滤掉数据，qualimap和awk中发一样，所以问题最后就归结为**是否需要首先过滤数值再计算平均插入大小？**
![](http://7xk19o.com1.z0.glb.clouddn.com/insert.png)
在R中计算时对数据**a.v**做正态性检验<code>lillie.test(a.v)</code>
``` bash
> library("nortest")
> lillie.test(a.v)

        Lilliefors (Kolmogorov-Smirnov) normality test

data:  a.v
D = 0.1541, p-value < 2.2e-16
```
**可以看出其插入大小分布不是呈正态分布，综合考虑后还是按照R的计算结果为准。**
<h5>参考资料</h5>
<a href="https://www.biostars.org/p/16556/" target="_blank">Question: Estimate Insert Size In Paired-End/Mate-Pair</a>
<a href="https://www.biostars.org/p/106291/" target="_blank">Question: What is the difference between a Read and a Fragment in RNA-seq?</a>
<a href="http://thegenomefactory.blogspot.com/2013/08/paired-end-read-confusion-library.html" target="_blank">Paired-end read confusion - library, fragment or insert size?</a>