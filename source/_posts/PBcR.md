title: PacBio sequence error correction amd assemble via pacBioToCA
Total word: WordCount
Read time: Min2Read
date: 2016-08-27 19:57:48
tags: PacBio
categories: Bioinformatics
---
**Illumina**二代测序有个致命缺陷，说到底还是基于PCR扩增的,所以存在偏向性和对于高GC含量区无法扩增等<a href="#" class="myButton">系统误差</a>，测序错误是不可避免的，其次就是测序长度短；但其价格便宜，通量非常高，准确性达99%，综合性价比也受到青睐。短序列的reads在做基因组装的时候，遇到大的重复片段就会很吃力。
##10X Genomics
2015年备受瞩目的测序黑马：**10X Genomics**，是常规Illumina二代测序的升级版，由于开发出了一套巧妙的Barcoding建库方案，使得Illumina这种短读长二代测序能够得到跨度在30-100Kb的linked reads信息，与二代测序数据相结合，在Scaffold的组装上能够得到媲美三代测序的组装结果；
![](http://7xk19o.com1.z0.glb.clouddn.com/10xgenome.png)
<!-- more -->
**基本原理:** 首先将每一条长片段的DNA分配至不同的油滴微粒中，通过专利的GEM建库技术，长片段DNA被<code>切碎</code>成适合测序的大小，并且来源于相同油滴(同一条长片段DNA)的DNA片段，会带上相同的一段DNA序列标记(Barcode)，之后在Illumina系统上测序完成后，可以理论上再将来源相同的DNA序列独立拼接，得到原先的长片段DNA序列。
对于不同GC含量区其效果如何呢？2015年10月Nat Review Genetics文章<a href="http://www.nature.com/nrg/journal/v16/n11/full/nrg3933.html" target="_blank">Genetic variation and the de novo assembly of human genomes</a>中总结的PacBio、10X Genomics以及Illumina技术在不同GC含量DNA区域的覆盖度分布：
![](http://7xk19o.com1.z0.glb.clouddn.com/10Xgenome2.png)
10X Genomics技术相对于Illumina来说，有改进，但依旧是个拱形，而PacBio则是无偏倚的均一分布，10X的技术，其Coverage一样是受GC含量影响较大的，那么如果真要应用10X技术，那么必须注意目标DNA的GC含量分布最好能控制在30～70%。
但10Xgenome毕竟是升级版，其也存在一些特有的优势：
<li>(1) 微量样本：仅需<a href="#" class="myButton">1ng</a>基因组DNA即可进行长片段建库；</li>
<li>(2) 精确分区：由于拥有众多的barcode和Partions，可对DNA进行精确分区；</li>
<li>(3) 长片段信息：该技术可与Illumina测序仪进行无缝对接，利用短Reads可获得长达100Kb的片段；</li>
<li>(4) 基因组组装质量提升：利用长片段信息结合Illumina组装数据组装的ScaffoldN50长度比单纯用Illumina方法提高十几倍。</li>
##PacBio
<embed src="http://player.youku.com/player.php/sid/XNjAwODQwOTky/v.swf" allowFullScreen="true" quality="high" width="620" height="450" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>
![](http://7xk19o.com1.z0.glb.clouddn.com/PacBio.png)
第三代测序中的<a href="#" class="myButton">PacBio单分子实时</a>（Single Molecule Real-Time, SMRT）DNA测序可以实现超过99.999%（QV50）的高度精确测序，且不受DNA序列中GC和AT含量的影响，平均读长可达20kb（最长>60kb）。
![](http://7xk19o.com1.z0.glb.clouddn.com/reads-error.png)
PacBio三代测序最大的死穴是：通量不足和单次(1X)测序错误率高(85%)；但三代的错误是<a href="#" class="myButton">完全随机发生的，属于随机误差</a>，可以靠覆盖度来自我纠错，如果通量不是限制因素，那么PacBio是目前最准确的测序方式：错误率可以无限接近罕见突变的发生率（即无法分辨是测序错误还是罕见突变）。2012年冷泉港实验室的Michael Schatz开发了一种纠错算法，用二代测序的短读长高精确数据对三代长读长数据进行纠错，这种称为"混合纠错拼接" (<a href="http://www.nature.com/nbt/journal/v30/n7/abs/nbt.2280.html" target="_blank">Hybrid error correction and de novo assembly of single-molecule sequencing reads</a>)可以进一步提升PacBio测序精确度。
###PBcR: 混合纠错拼接
![](http://7xk19o.com1.z0.glb.clouddn.com/PBcR.png)
<i class="fa fa-chrome" aria-hidden="true"></i><a href="#" class="myButton">PBcR: 混合纠错拼接</a> 粉色长方形：单个PacBio RS reads；黑色竖线：测序错误；(a)由于测序错误碱基的存在使得两条reads就难确定是否在末端重叠；(b)高质量的短reads比对到存在错误的长reads；短reads中的黑色竖线表示 'mapping errors' ，是长reads和短reads中测序错误的组合，此外双拷贝的重复序列的存在（灰色轮廓）导致在每一个拷贝中出现短reads的堆挤，为避免reads map到错误的重复区，仅保留最高比对值的短reads；(c)剩余的比对形成一致性序列（紫色长方形），长reads和短reads中共有的部分错误未能得到纠正；(d)overlap纠正后的长reads；(e) 最后的组装能够跨越重复区域。
###Illumina reads纠错覆盖度
![](http://7xk19o.com1.z0.glb.clouddn.com/correct1.png)
![](http://7xk19o.com1.z0.glb.clouddn.com/correct2.png)
![](http://7xk19o.com1.z0.glb.clouddn.com/correct3.png)
纠错的准确性和组装一致性在Illumina高质量reads达<a href="#" class="myButton">50X</a>后开始收益递减，因此50X Illumina reads足够，纠错后PacBio长reads准确性将由85%提升至>99.9%，此时嵌合体和错误剪切reads分别为<2.5% 和 <1%。
目前在P6C4试剂下，大约每SMRT Cell平均可以做到 600M～1G数据量。
PacBio的长读长、无GC偏向性和无PCR扩增偏向性等独特优势有助于克服复杂的重复区域，从而跨越整个基因转录区，显著提升基因组和转录组的De Nove组装质量；
##Illumina二代+PacBio三代数据分析
<a href="http://www.cbcb.umd.edu/software/PBcR/" target="_blank">PBcR</a>首先通过纠错来提升PacBio reads准确性，然后进行组装。PBcR的纠错和组装分为self-correction (using only PacBio RS data，自动运行fastqToCA) or correction with high-identity sequences（二代数据）。
###self-correction
``` bash
PBcR -length 500 -partitions 200 -l lambda -s pacbio.spec -fastq pacbio.filtered_subreads.fastq genomeSize=50000 > run.out 2>&1  
```
###高质量Illumina reads
``` bash
#short read准备
fastqToCA -libraryname illumina -technology illumina -reads illumina.fastq > illumina.frg
#纠正
pacBioToCA -length 500 -partitions 200 -l ec_pacbio -t 16 -s pacbio.spec \
    -fastq pacbio.filtered_subreads.fastq illumina.frg > run.out 2>&1
#组装
runCA -p asm -d asm -s asm.spec ec_pacbio.frg > asm.out 2>&1	
```
<i class="fa fa-chrome" aria-hidden="true"></i>： 第一步short reads准备阶段请确认二代数据第四行质量编码值，一般是33，否则用-type参数指定，要不然会报错QV问题；
纠正时PBcR需要安装AMOS和blasr依赖软件，输入文件short reads (illumina.frg)和long reads (pacbio.filtered_subreads.fastq)；
fastqToCA和PBcR两个中的libraryname需不同；
fastqToCA生成的frg文件后面没有序列信息 ，是正确的；
###Spec files参数解释
PBcR混合组装需要指定两个Spec配置文件： pacbio.spec(纠错)和asm.spec(组装)。这两个文件都包含特定的算法参数和计算机硬件参数，通常情况下算法参数可以忽略（此时将用软件默认值），但是计算机硬件参数需要根据实际情况调整。
所有参数均为<code>option = value</code>形式，其中的value为布尔型(boolean),即true=1，false=0。
<i class="fa fa-book" aria-hidden="true"></i>具体关于specfile参数解释见<a href="http://tiramisutes.github.io/2016/08/26/pacbio-spec.html" target="_blank">PBcR：SpecFiles Options</a>
###Spec files实例
####集群下参考pacbio.spec
``` bash
#以下为grid计算
stopAfter=overlapper

# original asm settings
utgErrorRate = 0.25
utgErrorLimit = 4.5

cnsErrorRate = 0.25
cgwErrorRate = 0.25
ovlErrorRate = 0.25

merSize=14

merylMemory = 128000
merylThreads = 16

ovlStoreMemory = 8192

# grid info
useGrid = 1
scriptOnGrid = 1
frgCorrOnGrid = 1
ovlCorrOnGrid = 1

sge = -V -S /bin/sh
#sge = -V -A assembly
sgeScript = -pe smp 16
sgeConsensus = -pe smp 1
sgeOverlap = -pe smp 4
sgeFragmentCorrection = -pe smp 2
sgeOverlapCorrection = -pe smp 1

#ovlMemory=8GB --hashload 0.7
ovlHashBits = 25
ovlThreads = 4
ovlHashBlockLength = 20000000
ovlRefBlockSize =  50000000

# for mer overlapper
merCompression = 1
merOverlapperSeedBatchSize = 500000
merOverlapperExtendBatchSize = 250000

frgCorrThreads = 2
frgCorrBatchSize = 100000

ovlCorrBatchSize = 100000

######################以下为非gird计算，useGrid = 0 ####################
# non-Grid settings, if you set useGrid to 0 above these will be used
merylMemory = 128000
merylThreads = 4

ovlStoreMemory = 8192

ovlConcurrency = 6

cnsConcurrency = 16

merOverlapperThreads = 2
merOverlapperSeedConcurrency = 6
merOverlapperExtendConcurrency = 6

frgCorrConcurrency = 8
ovlCorrConcurrency = 16
cnsConcurrency = 16
```
####集群下参考asm.spec
``` bash
######################以下为gird计算，useGrid = 1 ####################
cnsErrorRate = 0.10
ovlErrorRate = 0.10

overlapper = ovl
unitigger = bogart
utgBubblePopping = 1

merSize = 14

merylMemory = 128000
merylThreads = 16

ovlStoreMemory = 8192

# grid info
useGrid = 1
scriptOnGrid = 1
frgCorrOnGrid = 1
ovlCorrOnGrid = 1

sge = -V -S /bin/sh
sgeScript = -pe smp 16
sgeConsensus = -pe smp 1
sgeOverlap = -pe smp 4
sgeFragmentCorrection = -pe smp 2
sgeOverlapCorrection = -pe smp 1

#ovlMemory=8GB --hashload 0.7
ovlHashBits = 25
ovlThreads = 6
ovlHashBlockLength = 20000000
ovlRefBlockSize =  5000000

# for mer overlapper
merCompression = 1
merOverlapperSeedBatchSize = 500000
merOverlapperExtendBatchSize = 250000

frgCorrThreads = 2
frgCorrBatchSize = 100000

ovlCorrBatchSize = 100000

######################以下为非gird计算，useGrid = 0 ####################
# non-Grid settings, if you set useGrid to 0 above these will be used
merylMemory = 128000
merylThreads = 12

ovlStoreMemory = 8192

ovlConcurrency = 8

merOverlapperThreads = 6
merOverlapperSeedConcurrency = 2
merOverlapperExtendConcurrency = 2

frgCorrConcurrency = 8

ovlCorrConcurrency = 16
cnsConcurrency = 16

doToggle=0
toggleNumInstances = 0
toggleUnitigLength = 2000

doOverlapBasedTrimming = 1
doExtendClearRanges = 2
```
##输出结果
<li>最后组装结果文件夹<code>9-terminator</code>;</li>
<li>主要输出文件是**prefix.asm**,以分层的数据结构提供组装结果的精确描述，包含生成的contig 和 scaffold 序列；</li>
<li>**prefix.qc**，关于组装结果的统计信息；</li>
<h5>参考资料</h5>
<a href="https://zhuanlan.zhihu.com/p/20723934?refer=tangboyun" target="_blank">当10X Genomics遇上PacBio——烫金开始剥落了</a>
<a href="http://www.zhihu.com/question/25409882/answer/42891213?utm_campaign=rss&utm_medium=rss&utm_source=rss&utm_content=title" target="_blank">第三代测序成本偏高是什么原因导致的？</a>
<a href="http://wiki.rac.manchester.ac.uk/community/SGE_Job_Arrays" target="_blank">Computational Science Community Wiki： Sun Grid Engine: Job Arrays</a>