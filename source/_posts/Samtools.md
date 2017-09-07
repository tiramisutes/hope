title: 被忽视的Samtools参数
date: 2016-03-20 22:54:42
tags: Samtools
categories: Bioinformatics
---
<a href="http://www.plob.org/tag/samtools" title="View all posts in samtools" target="_blank">Samtools</a>是一个用于操作序列比对结果sam和bam文件的工具合集。
##sam文件格式
SAM格式由两部分组成：头部区和比对区，都以tab分列。
**头部区:**以'@'开始，体现了比对的一些总体信息。比对的SAM格式版本，比对的参考序列，比对使用的软件等。
**比对区:** 比对结果，每一个比对结果是一行，有11个主列和1个可选列。
``` bash
@HD VN:1.0 SO:unsorted  
头部区第一行：VN是格式版本；SO表示比对排序的类型，有unkown(default),unsorted,
queryname和coordinate几种。samtools软件在进行排序后不能自动更新bam文件的SO值。
picard却可以。
@SQ SN:A.auricula_all_contig_1 LN:9401
参考序列名。这些参考序列决定了比对结果sort的顺序。SN是参考序列名；LN是参考序列
长度;
@RG ID:sample01
Read Group. 1个sample的测序结果为1个Read Group；该sample可以有多个library
的测序结果。
@PG ID:bowtie2 PN:bowtie2 VN:2.0.0-beta7
比对所使用的软件。

比对区11个列和可选列的解释
1  QNAME  比对的序列名,即单端或双端fa/fq 中的reads编号
2  FLAG   Bwise FLAG(表明比对类型：pairing，strand，mate strand等)
3  RNAME  比对上的参考序列名
4  POS    1-Based的比对上的最左边的定位
5  MAPQ   比对质量，255表示没有map
6  CIGAR  Extended CIGAR string (操作符：MIDNSHP) 比对结果信息：匹配碱基数，可变剪接等，*表示不可用。
7  MRNM   相匹配的另外一条序列，比对上的参考序列名
8  MPOS   1-Based leftmost Mate POsition
9  ISIZE  插入片段长度
10 SEQ    和参考序列在同一个琏上的比对序列(若比对结果在负意链上，则序列是其反向重复序列)
11 QUAL   比对序列的质量(ASCII-33=Phred base quality)
12 可选的行，以TAG：TYPE：VALUE的形式提供额外的信息
```
###比对区解释
**sam/bam比对区包含有此次比对的结果信息，**其中主要信息解释如下：
<li>**FLAG部分**</li>
![](http://7xk19o.com1.z0.glb.clouddn.com/flag.png)
**0x800** 表明相应位置的比对属于嵌合体比对；
**0x4** 没有map上的reads；
![](http://7xk19o.com1.z0.glb.clouddn.com/sam_output2.png)
<li>**CIGAR部分**</li>
![](http://7xk19o.com1.z0.glb.clouddn.com/cigar.png)
对于mRNA到基因组的比对，N表示内含子。
More: http://samtools.github.io/hts-specs/SAMv1.pdf
## sam文件的几个特例解释
###Unmapped reads 统计
Each alignment is one line of the SAM file, but not all lines are successful alignments. **Unmapped reads在sam文件中的标记：``FLAG``列为4而且``RNAME``列为星号*；**
```
#统计包含星号的比对行数
cut -f3 smallRNA-seq.sam | grep -c \*
#总的比对行数
grep -c -v "^@" smallRNA-seq.sam
```
###How many different read IDs are in the file?
The query (read) ID is in field 1. Some reads may have multiple alignments, so the number of lines is not necessarily the number of reads.
```
grep -v "@" HR-1B.fq.gz.sam | cut -f1 | sort | uniq | wc -l 
#同时统计此次比对的单端/双端 fa/fq文件发现两者结果不同，说明确实有些reads未能比对上去。
zcat pepper/RNA-seq/sgs-clean-reads/HR-1B.fq.gz | wc -l
```
###How many different read sequences are in the file?
第一列的reads ID仅能表示测序过程中的不同reads，但他们的序列可能因为PCR扩增原因或文库偏好而完全相同，所以统计第10列的uniq序列数能够准确的表示reads总数。
```
cut -f10 smallRNAseq.sam | sort | uniq | wc -l 
```
###How many reads are **uniquely mapped**?
```
cut -f10 smallRNAseq.sam | sort | uniq -u | wc -l 
```
对于 BWA比对结果也可用``grep -c XT:A:U smallRNA-seq.sam``来准确统计。
###How many reads are **multi-hits**?
```
cut -f1 smallRNA-seq.sam | sort | uniq -d | wc -l
```
对于 BWA比对结果也可用``grep -c XT:A:R smallRNAseq.sam``来准确统计。
### How many alignments are reported for each read? 
```
grep -v "^@" smallRNA-seq.sam | cut -f1 | sort | uniq -c | sort -nr > sortedreadcount.txt
grep -v "^@" smallRNA-seq.sam | cut -f1 |sort | uniq -c | sort -nr | cut -c1-8 | sort | uniq -c
```
###How many different reference sequences are represented in the file?
```
grep -v "^@" smallRNA-seq.sam | cut –f3 | sort | uniq | wc -l
```
##view
-c	计数
-f	返回指定区间/flags比对结果
-q	返回比对质量大于等于指定值的比对数目
**-F 4：**统计map 上的 reads总数；
**-f 4：**统计没有map 上的 reads总数；
To get the <strong>unmapped</strong> reads from a <a rel="nofollow" href="http://samtools.sourceforge.net/SAM1.pdf">bam</a> file use : 
<code>samtools view -f 4 file.bam &gt; unmapped.sam</code>, the output will be in <a rel="nofollow" href="http://samtools.sourceforge.net/SAM1.pdf">sam</a>
to get the output in <a rel="nofollow" href="http://samtools.sourceforge.net/SAM1.pdf">bam</a> use : <code>samtools view -b -f 4 file.bam &gt; unmapped.bam</code>
To get only the <strong>mapped</strong> reads use the parameter 'F', which works like <code>-v</code> of grep and skips the alignments for a specific flag.
<code>samtools view -b -F 4 file.bam &gt; mapped.bam</code>
samtools view -b -F 4 -f 8 file.bam > onlyThisEndMapped.bam
samtools view -b -F 8 -f 4 file.bam > onlyThatEndMapped.bam
samtools view -b -F12 file.bam > bothEndsMapped.bam
samtools merge merged.bam onlyThisEndMapped.bam onlyThatEndMapped.bam bothEndsMapped.bam
**对于tophat比对结果：**
<code><span style="background-color: rgb(249, 242, 244);">samtools view -b -f 2  accepted_hits.bam &gt; mappedPairs.bam</span></code>
Better with:
<code><span style="background-color: rgb(249, 242, 244);">samtools view -b -f 0x2 accepted_hits.bam > mappedPairs.bam</span></code>
##sort
-m	指定运算内存，支持K，M，G等缩写
-@	并行运算核数
##index
必须对bam文件进行默认情况下的排序后，才能进行index。否则会报错。

建立索引后将产生后缀为.bai的文件，用于快速的随机处理。很多情况下需要有bai文件的存在，特别是显示序列比对情况下。比如samtool的tview命令就需要；gbrowse2显示reads的比对图形的时候也需要。
##faidx
对fasta文件建立索引,生成的索引文件以.fai后缀结尾。该命令也能依据索引文件快速提取fasta文件中的某一条（子）序列。
See more： <a href="http://tiramisutes.github.io/2016/03/18/bedtools.html" target="_blank">bedtools 使用小结</a>
##flagstat
给出BAM文件的比对结果
``` bash
$ samtools flagstat example.bam
11945742 + 0 in total (QC-passed reads + QC-failed reads)
#总共的reads数
0 + 0 duplicates
7536364 + 0 mapped (63.09%:-nan%)
#总体上reads的匹配率
11945742 + 0 paired in sequencing
#有多少reads是属于paired reads
5972871 + 0 read1
#reads1中的reads数
5972871 + 0 read2
#reads2中的reads数
6412042 + 0 properly paired (53.68%:-nan%)
#完美匹配的reads数：比对到同一条参考序列，并且两条reads之间的距离符合设置的阈值
6899708 + 0 with itself and mate mapped
#paired reads中两条都比对到参考序列上的reads数
636656 + 0 singletons (5.33%:-nan%)
#单独一条匹配到参考序列上的reads数，和上一个相加，则是总的匹配上的reads数。
469868 + 0 with mate mapped to a different chr
#paired reads中两条分别比对到两条不同的参考序列的reads数
243047 + 0 with mate mapped to a different chr (mapQ>=5)
```
##mpileup
samtools还有个非常重要的命令mpileup，以前为pileup。该命令用于生成bcf文件，再使用bcftools进行SNP和Indel的分析。bcftools是samtool中附带的软件，在samtools的安装文件夹中可以找到。
-f 来输入有索引文件的fasta参考序列；
-g 输出到bcf格式。
<p></p>
贡献来源
http://www.plob.org/2014/01/26/7112.html
http://blog.sina.com.cn/s/blog_670445240101l30k.html
https://www.biostars.org/p/56246/
https://www.biostars.org/p/110039/
https://www.biostars.org/p/95929/
https://www.biostars.org/p/110157/
https://groups.google.com/forum/#!forum/bedtools-discuss
https://code.google.com/p/hydra-sv/