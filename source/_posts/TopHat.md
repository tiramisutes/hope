title: TopHat
date: 2015-07-25 17:30:52
tags: tophat
categories: Bioinformatics
---
TopHat is a fast splice junction mapper for RNA-Seq reads. It aligns RNA-Seq reads to mammalian-sized genomes using the ultra high-throughput short read aligner Bowtie, and then analyzes the mapping results to identify splice junctions between exons. 
##Usage:
``` bash
tophat [options]* [reads1_2,...readsN_2] 
``` 
for example:
``` bash
tophat -p 8 -G genes.gtf -o C1_R1_thout genome C1_R1_1.fq C1_R1_2.fq
-p 代表线程
-G 代表转录本注释信息
-o 输出文件夹
--segment-length 25 （将redas分成的最小比对片段）
--segment-mismatches 1 （片段比对错配碱基数）
--library-type （是否链特异性）fr-unstranded
—transcriptome-index （转录本的bowtie-index文件）
``` 
比对输出文件：
``` bash
accepted_hits.bam（比对输出）
junctions.bed
insertions.bed and deletions.bed
``` 
