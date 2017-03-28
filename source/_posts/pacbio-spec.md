title: PBcR：SpecFiles Options
Total word: WordCount
Read time: Min2Read
date: 2016-08-26 14:33:11
tags: PacBio
categories: Bioinformatics
---
The spec file is an optional input to the runCA executive that launches the Celera Assembler pipeline. The spec files provides a convenient way to generate assemblies while documenting their parameters faithfully. The use of spec files is STRONGLY recommended.
##Spec files参数解释
PBcR混合组装需要指定两个Spec配置文件： pacbio.spec(纠错)和asm.spec(组装)。这两个文件都包含特定的算法参数和计算机硬件参数，通常情况下算法参数可以忽略（此时将用软件默认值），但是计算机硬件参数需要根据实际情况调整。
所有参数均为<code>option = value</code>形式，其中的value为布尔型(boolean),即true=1，false=0。
<!--more-->
<a href="#" class="myButton">全局参数</a>
<li>**showNext=boolean (default=0)**： 如果设定，下一步主要命令将输出到屏幕而不执行；</li>
<li>**pathMap=filename (default=empty-string)**： filename包含主机到软件工作目录的映射，这个参数通常不需要指定；</li>
<li>**shell=string (default=/bin/sh)**： 指定运行脚本的命令解释器；</li>
####错误率(Error Rates)
共有5个可配制的错误率，'error rate'在overlap中是小数，取值范围为0.0到0.4，而'error limit'是绝对值，取值范围没有限制。overlap取值只要低于'error rate' 或 'error limit'阈值中的任意一个就将被取用。**例如，100个碱基中overlap错误率为2%，假如 utgErrorRate=0.015并且utgErrorLimit=2.5，那么2%的overlap值将用于unitigging中。**
<code>错误率必须是utg ≤ ovl ≤ cns ≤ cgw. 通常情况下, ovl = cns</code>
<li>**ovlErrorRate=float (default=0.06)**： overlap的误差界限，运用在trim和assembly过程中，超过这一界限值的overlap将不会被检测到。</li>
<li>**cnsErrorRate=float (default=0.06)**： 一致性的错误率；</li>
<li>**cgwErrorRate=float (default=0.10)**： scaffolder的错误率，低于此值的scaffolder将融合成unitigs和contigs；</li>
<li>**obtErrorLimit=float (default=see below)**： 控制overlap碱基整理过程中的overlap质量，仅影响trim过程；</li>
Unitigger的错误率较为复杂，Overlaps中的错误率不能用在unitig构建中，每一个unitig比对使用一个不同的错误率设定值；
1>utg uses utgErrorRate.
2>bog uses utgErrorRate and utgErrorLimit.
3>bogart uses utgGraphErrorRate, utgGraphErrorLimit, utgMergeErrorRate and utgMergeErrorLimit.
<li>**utgErrorRate=float (default=0.015 for utg and 0.030 for bog)**： 低于设定值的overlap将用于utg 和 bog的unitiggers中；</li>
<li>**utgErrorLimit=float (default=2.5)**： 低于设定值的overlap将用于utg 和 bog的unitiggers中；</li>
<li>**utgGraphErrorRate=float (default=0.030)**： 低于设定值的overlap将用于 bogart unitigger中最好的重叠图谱构建； bogart unitigger被开发用来处理高覆盖度数据；</li>
<li>**utgGraphErrorLimit=float (default=3.25)**： 同上；</li>
<li>**utgMergeErrorRate=float (default=0.045)**： 低于设定值的overlap将用于bogart unitigger中bubble popping和重复区检测；</li>
<li>**utgMergeErrorLimit=float (default=5.25)**： 同上；</li>
####最小片段长度和最小overlap长度(Minimum Fragment Length and Minimum Overlap Length)
低于最小长度发片段在gatekeeper中将丢弃，低于最小长度的overlap将不被计算。
<li>**frgMinLen=integer (default=64)**： 低于设定值的片段将不被用在组装过程中；</li>
<li>**ovlMinLen=integer (default=40)**： 低于最小长度的overlap将不被计算；</li>
####提前停止renCA运行(Stopping runCA Early)
runCA可在某一阶段运行完后停止。
<li>**stopBefore=string (default=empty-string)**</li>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>meryl</b>： Stop before computing mer histograms.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>initialTrim</b>： Stop before the OBT initial quality trim.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>deDuplication</b>： Stop before the OBT de-duplication.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>finalTrimming</b>： Stop before the OBT trim point merge.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>chimeraDetection</b>： Stop before the OBT chimera detection.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>classifyMates</b>： Stop before de-novo classification.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>unitigger</b>： Stop before unitigger.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>scaffolder</b>： Stop before the scaffolding stage starts.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>CGW</b>： Stop before the CGW program starts.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>eCR</b>： Stop before the extend clear ranges program starts.  <b>extendClearRanges</b> is an alias for this.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>eCRPartition</b>： Stop before partitioning for extend clear ranges.  <b>extendClearRangesPartition</b> is an alias &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for this.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>terminator</b>： Stop before terminator.
<li>**stopAfter=string (default=empty-string)**</li>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>initialStoreBuilding</b>： Stop after the fragment and gatekeeper stores are created.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>meryl</b>： Stop after mer counts are generates.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>overlapBasedTrimming</b>： Stop after the Overlap Based Trimming algorithm has updated the clear ranges.  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>OBT</b> is an alias for this.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>overlapper</b>： Stop after the overlapper finishes, and the overlap store is created.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>classifyMates</b>： Stop after de-novo classification.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>unitigger</b>： Stop after unitigs are constructed, but before consensus starts.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>utgcns</b>： Stop after unitig consensus finishes; <b>consensusAfterUnitigger</b> is an alias for this.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>scaffolder</b>： Stop after all stages of scaffolding are finished.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>ctgcns</b>： Stop after contig consensus finishes; <b>consensusAfterScaffolder</b> is an alias for this.
####网格计算(Grid Engine Options)
grid计算，useGrid = 1，需要集群的特殊支持，如果运行报错"qsub: script file 'smp' cannot be loaded - No such file or directory"，则说明你的当前集群环境不支持gird；详细见：<a href="http://www.cnblogs.com/MuyouSome/archive/2013/05/31/3109487.html" target="_blank">并行计算、分布式计算、集群计算和云计算</a>。
<li>**gridEngine=string (default=SGE)**： 选择SGE或LSF做为gird引擎；</li>
<li>**useGrid=integer (default=0)**： 0表示不使用grid；</li>
<li>**scriptOnGrid=integer (default=0)**: 0表示只在grid上进行并行计算；</li>
<li>**mbtOnGrid=integer (default=1)**： 0表示不在grid上进行mer-based trim；useGrid=0时此参数失效；</li>
<li>**ovlOnGrid=integer (default=1)**： 0表示不用grid进行overlap；</li>
<li>**frgCorrOnGrid=integer (default=0)**： frg文件纠错；</li>
<li>**ovlCorrOnGrid=integer (default=0)**： overlap纠错；</li>
<li>**cnsOnGrid=integer (default=1)**： 一致性；</li>
<li>**-pe thread N -l memory=Mg -p  400**： 指定单个host下用N个cpu进行计算，并且每个cpu使用内存为Mg；所以每一个任务需要的总内存数等于NMg；例如，sgeConsensus= -pe thread 3 -l memory=2g -p -600表示仅是进行一致性计算需要3个cpu，每个cpu 2g内存，共需3X2=6g内存；</li>
<a href="#" class="myButton">局部参数</a>
####Gatekeeper
<li>**gkpFixInsertSizes=integer (default=1)**： 1表示gatekeeper将修正预估的插入大小当标准差太大或太小时，可接受的插入大小估计是<code>0.1 * mean < std.dev. < 1/3 * mean</code>,如果标准差超出这一范围，则重设为0.1 * mean；</li>
<li>**gkpAllowInefficientStorage=integer (default=1)**： 1表示允许将long-reads存储在计算机内存中，对内存损耗就大，一般设置为0；</li>
####Fragment Trimming
<li>**doOverlapBasedTrimming=integer (default=1) (aliasdoOBT)**： 1表示做trim；</li>
<li>**doDeDuplication=integer (default=1)**： 1表示搜寻重复reads或454数据中的mate-pairs reads；当doOBT=0时失效；</li>
<li>**doChimeraDetection=off or normal or aggressive (default=normal)**： 通过与其他reads的比较检测嵌合体，当doOBT=0时失效；</li>
<li>**mbtBatchSize=integer (default=1000000)**： 每次trim批处理的片段数；</li>
<li>**mbtThreads=integer (default=4)**： 每次trim的线程数；</li>
<li>**mbtConcurrency=integer (default=1)**： 同时运行多少个trim；</li>
<li>**mbtIlluminaAdapter=integer (default=1)**： 在merTrim过程中移除Illumina接头序列； </li>
<li>**mbt454Adapter=integer (default=1)**： 在merTrim过程中移除454接头序列；</li>
####Overlapper
每一对fragments互相比对确定是否重叠；
对于较小的组装，可通过期望并行计算的数量来划分fragments数，例对于16个jobs，可划分fragments为4；
对于较大的组装，建议用较大的ovlRefBlockSize和ovlHashBlockLength控制jobs数量；
<li>**overlapper=ovl or mer (default=ovl)**： 选择overlap阶段；</li>
<li>**obtOverlapper=ovl or mer (default=ovl)**： 选择OBT (overlap-based trimming)的overlap阶段；</li>
<li>**ovlOverlapper=ovl or mer (default=ovl)**： unitig构建过程中的overlap阶段；</li>
<li>**ovlStoreMemory=integer (default=1024M)**： 构建overlap存储的内存量；</li>
<li>**saveOverlaps=integer (default = 0)**： 0表示overlap store生成后清除中间文件；中间文件较大，一般选择清除；</li>
<li>**merSize=integer (default=22)**： K-mer长度，设置这一参数相当于同时设置了obtMerSize和 ovlMerSize；</li>
<li>**obtMerSize=integer (default=22)**： 仅的OBT过程的k-mer长度；</li>
<li>**ovlMerSize=integer (default=22)**： unitig和组装过程的k-mer长度；</li>
<li>**obtMerThreshold=integer (default=auto)**： 检查k-mer直方图挑选合适的k值；</li>
<li>**ovlMerThreshold=integer (default=auto)**： 检查k-mer直方图挑选合适的k值；</li>
<li>**merThreshold=integer (default=auto)**： 分配线程数给 obtMerThreshold 和 ovlMerThreshold；</li>
####OVL Overlapper
<li>**ovlThreads=integer (default=2)**： overlap计算线程数；</li>
<li>**ovlConcurrency=integer (default=1)**： 不使用SGE时，同时进行一致性overlap的数目；</li>
<li>**ovlHashLoad=float (default 0.75)**: 最多载入Table Size的75%；例如，22对应的Table Size为88,080,384，实际载入大小为88,080,384X75%=66060288；</li>
<li>**ovlHashBits=integer (default 22)**： hash表大小，固定尺寸，不随 ovlHashBlockLength 或 ovlRefBlockSize变化；</li>
![](http://7xk19o.com1.z0.glb.clouddn.com/hash.png)
<li>**ovlHashBlockLength=integer (default=100000000)**： 载入hash表的序列碱基数，每一个碱基占10 bytes内存。</li>
<li>**ovlRefBlockSize=integer (default=2000000)**: 控制overlap的jobs数目和每一个的运行时间，较小的值将需要较多的jobs，但每一个jobs完成所需时间少；</li>
**ovlHashBits**和**ovlHashBlockLength**如何综合选择呢？根据我们实际使用的计算机硬件情况决定，假如我们的计算机有8G内存，
1>设置<code>**ovlHashBits=25**</code> 根据上面表格得知载入这个hash表将需要消耗接近7G的内存，如果是1/2 GB操作系统，那么我们500 MB内存载入序列数据，也就是ovlHashBlockLength最多为50,000,000，而25对应的hash表可以载入704,643,072 k-mers，但是我们仅能载入50,000,000 k-mer（one k-mer per base of sequence），这样是设定造成内存的浪费；
2>设置<code>**ovlHashBits=24**</code>消耗305G内存，剩余3G载入序列，ovlHashBlockLength多达300,000,000，352,24对应的hash表能够载入321,536 k-mers，此时的配置较为合理。
overlap job log file (0-overlaptrim-overlap/#######.out and 1-overlapper/######.out)有助于我们筛选合适的配置值，其包含如下内容；
``` bash
HASH LOADING STOPPED: strings         38020 out of        38020 max.
HASH LOADING STOPPED: length       15487424 out of     15487424 max.
HASH LOADING STOPPED: entries       4435417 out of     66060288 max (load 5.04).
```
在这里，载入15,487,424碱基序列，仅用了hash表可载入66,060,288大小的4,435,417，意味着可以增加ovlHashBlockLength (to load more sequence)或降低ovlHashBits (to use less memory)。
####MER Overlapper
mer overlapper 也使用 Classic Overlapper参数 obtMerSize and ovlMerSize.
<li>**merCompression=integer (default=1)**： ACTTTAAC with merCompression=1 would be ACTAC</li>
####Meryl
<li>**merylMemory=integer (default=800M)**</li>
<li>**merylThreads=integer (default=1)**</li>
``` bash
merylMemory   = -segments 4 -threads 4
merylThreads  = 4
```
####Fragment Error Correction
<li>**frgCorrBatchSize=integer (default=200000)**： 一次性载入的reads数；</li>
<li>**doFragmentCorrection=integer (default=1)**</li>
<li>**frgCorrThreads=integer (default=2)**</li>
<li>**frgCorrConcurrency=integer (default=1)**</li>
####Unitigger
<li>**unitigger=utg or bog or bogart (default=utg)**： utg（Sanger数据），bog（只有454数据或结合Sanger数据），bogart（仅有 Illumina数据或结合其他数据）;</li>
<li>**utgGenomeSize=integer (default=not-set)**:确定其是否输入或计算 grep -i genome /4-unitigger/unitigger.err</li>
####Scaffolder
Scaffold module is called CGW (chunk graph walker),It builds contigs and scaffolds from unitigs and mate pairs.
####Consensus
unitigger和scaffolder后的一致性
####Terminator
<li>**cleanup=none or light or heavy or aggressive (default=none)**： 最后组装完清除临时文件和中间文件，有效值是'none' (no cleanup), 'light' (temporary files), 'heavy' (currently, same as light), 'aggressive' (everything except the output is removed)；</li>
####Unitig Repeat/Unique Toggling
Celera Assembler利用泊松分布将unitigs分类为unique和重复的，由于覆盖偏向性和截断的影响，这种分类偶尔也将unique unitigs划分为重复；为避免错误组装，重复的unitigs在组装过程中是不可信的，Unitig Repeat/Unique Toggling允许Celera Assembler纠错这些”重复“unitigs，然后重新组装；这一过程将生成一个10-toggledAsm目录，最后的组装结果在10-toggledAsm/9-terminator目录下。
<li>**doToggle=integer (default=0)**： 1表示运行 Toggling过程；</li>
##Spec files实例
###pacbio.spec
``` bash
merSize=16
mhap=-k 16 --num-hashes 512 --num-min-matches 3 --threshold 0.04 --weighted

useGrid=0
scriptOnGrid=0

ovlMemory=32
ovlStoreMemory=32000
threads=32
ovlConcurrency=1
cnsConcurrency=8
merylThreads=32
merylMemory=32000
ovlRefBlockSize=20000
frgCorrThreads = 16
frgCorrBatchSize = 100000
ovlCorrBatchSize = 100000


sgeScript = -pe threads 1
sgeConsensus = -pe threads 8
sgeOverlap = -pe threads 15 –l mem=2GB
sgeCorrection = -pe threads 15 –l mem=2GB
sgeFragmentCorrection = -pe threads 16 –l mem=2GB
sgeOverlapCorrection = -pe threads 1 –l mem=16GB
```
###asm.spec
``` bash
ovlStoreMemory 		=	60000
ovlThreads 		= 	16
ovlConcurrency 		= 	1
cnsConcurrency 		= 	16
merylMemory           	=	-segments 16 -threads 16
merylThreads          	= 	16

frgCorrThreads 		= 	16
ovlCorrConcurrency	=	16
frgCorrBatchSize 	= 	100000
ovlCorrBatchSize 	= 	100000

ovlHashBlockLength		=	300000000
ovlRefBlockLength		=	0
ovlRefBlockSize			=	2000000

# assembly settings, designed for eukaryotic genomes (1GB+)
ovlErrorRate			=	0.1
utgErrorRate			=	0.06
cnsErrorRate			=	0.1
cgwErrorRate			=	0.1
cnsErrorRate			=	0.1
doOBT				=	1
obtErrorRate			=	0.08
obtErrorLimit			=	4.5

batOptions			=	-RS -NS -CS
utgGraphErrorRate		=	0.05
utgMergeErrorRate		=	0.05
unitigger			=	bogart
consensus			=	pbutgcns

frgMinLen			=	3000
ovlMinLen			=	100

ovlHashBits			=	24
ovlHashLoad			=	0.80
```
<h5>参考资料</h5>
<a href="http://wgs-assembler.sourceforge.net/wiki/index.php/SpecFiles" target="_blank">SpecFiles</a>
<a href="http://wgs-assembler.sourceforge.net/wiki/index.php/RunCA#Global_Options" target="_blank">RunCA#Global_Options</a>
