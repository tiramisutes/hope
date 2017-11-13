title: 转录组分析之--Cufflinks（很简单）
date: 2015-07-25 17:31:08
tags: Cufflinks
categories: Bioinformatics
---
Cufflinks assembles transcripts, estimates their abundances, and tests for differential expression and regulation in RNA-Seq samples. It accepts aligned RNA-Seq reads and assembles the alignments into a parsimonious set of transcripts. Cufflinks then estimates the relative abundances of these transcripts based on how many reads support each one, taking into account biases in library preparation protocols.

##Cufflinks:

``` bash
cufflinks [options] <aligned_reads.(sam/bam)>
``` 
for example:
``` bash
$ cufflinks -p 8 -G transcript.gtf --library-type fr-unstranded -o cufflinks_output tophat_out/accepted_hits.bam
  -o/--output-dir              write all output files to this directory              [ default:     ./ ]
  -p/--num-threads             number of threads used during analysis                [ default:      1 ]
  --seed                       value of random number generator seed                 [ default:      0 ]
  -G/--GTF                     quantitate against reference transcript annotations                      
  -g/--GTF-guide               use reference transcript annotation to guide assembly      
``` 
##Cuffmerge:
Use to merge together several Cufflinks assemblies.
``` bash
cuffmerge [options]* <assembly_GTF_list.txt>
``` 
###Cuffmerge input files

cuffmerge takes several assembly GTF files from Cufflinks' as input. Input GTF files must be specified in a "manifest" file listing full paths to the files.

###Cuffmerge arguments
``` bash
<assembly_GTF_list.txt>
``` 
Text file "manifest" with a list (one per line) of GTF files that you'd like to merge together into a single GTF file.
##Cuffdiff
Use to find significant changes in transcript expression, splicing, and promoter use.
``` bash
cuffdiff [options]* <transcripts.gtf> \

<sample1_replicate1.sam[,…,sample1_replicateM.sam]> \

<sample2_replicate1.sam[,…,sample2_replicateM.sam]> … \

[sampleN.sam_replicate1.sam[,…,sample2_replicateM.sam]]
``` 
###Cuffdiff output Files
``` bash
gene_exp.diff	Gene-level differential expression. Tests differences in the summed FPKM of transcripts sharing each gene_id
``` 
<i class="fa fa-bullhorn"></i>cuffdiff过程中同一处理的多个样本间用逗号分隔，不同处理间空格分隔.