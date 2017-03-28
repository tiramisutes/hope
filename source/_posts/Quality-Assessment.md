title: De Nove转录组组装质量评估
Total word: WordCount
Read time: Min2Read
date: 2016-10-30 23:00:17
tags: De Nove
categories: Bioinformatics
---
无参De Nove组装通常用到**<a href="https://github.com/trinityrnaseq/trinityrnaseq/wiki" target="_blank">Trinity</a>**软件,组装过程中最重要的两个参数就是
<span class="myCode">--min_kmer_cov</span>和<span class="myCode">--min_glue</span>。为组装出高质量结果我们通常需要去尝试用不同的参数，github上也有软件开发者讨论关于这两个参数：**<a href="https://github.com/trinityrnaseq/trinityrnaseq/issues/92" target="_blank">Optimizing parameters</a>**可供参考，其实问题最终也就归结为你是否关心你数据中的低丰度转录本。
此外作者也提供了一系列方法来评估组装质量**<a href="https://github.com/trinityrnaseq/trinityrnaseq/wiki/Transcriptome-Assembly-Quality-Assessment" target="_blank">Transcriptome Assembly Quality Assessment</a>**，总共列出有6种方法可对不同参数的组装结果进行评估,看完后综合总结出其中4种评估方法。
##Assessing the Read Content of the Transcriptome Assembly
``` bash
bowtie2-build  ../trinity_out_dir${i}/Trinity.fasta ../trinity_out_dir${i}/Trinity.fasta
bowtie2 --local --no-unal -p ${cpu} -x  ../trinity_out_dir${i}/Trinity.fasta -q -1 ${left} -2 ${right} \
     | samtools view -Sb - | samtools sort -no - - > bowtie2.nameSorted.bam
#参看proper pairs reads数量和百分比
${TRINITY_DIR}/util/SAM_nameSorted_to_uniq_count_stats.pl  bowtie2.nameSorted.bam
grep "^proper_pairs" Read-Representation.out
```
**第二步的bowtie2比对序列到组装转录本结果时可选部分数据来比对，这样可大大降低比对耗时。**
##Full-length transcript analysis for model and non-model organisms using BLAST+
``` bash
blastall -p blastx -i ./trinity_out_dir${i}/Trinity.fasta  -d ${uniprot} -v 1 -b 1 -m 8 -e 1e-5 -a ${cpu} -F F -o uniprot_sprot.fasta_blastx.outfmt8
${TRINITY_DIR}/util/analyze_blastPlus_topHit_coverage.pl uniprot_sprot.fasta_blastx.outfmt8 ./trinity_out_dir${i}/Trinity.fasta /public/home/cotton/public_data/SwissProt/uniprot_sprot.fasta
${TRINITY_DIR}/util/misc/blast_outfmt6_group_segments.pl \
      ./uniprot_sprot.fasta_blastx.outfmt8 ./trinity_out_dir${i}/Trinity.fasta uniprot_sprot.fasta > ./uniprot_sprot.fasta_blastx.outfmt8.grouped
${TRINITY_DIR}/util/misc/blast_outfmt6_group_segments.tophit_coverage.pl ./uniprot_sprot.fasta_blastx.outfmt8.grouped
```
##Compute DETONATE scores
RSEM-EVAL软件对于双端reads数据需要提供一个average fragment length值，可参考我的另一篇博文**<a href="http://tiramisutes.github.io/2016/09/19/Insert-Size.html" target="_blank">评估文库 Average Insert Size</a>**来计算得到此值。
``` bash
rsem-eval-estimate-transcript-length-distribution ./trinity_out_dir${i}/Trinity.fasta ./RSEM-EVAL${i}/length_distribution_parameter.txt
rsem-eval/rsem-eval-calculate-score -p 1 \
              --transcript-length-parameters ./RSEM-EVAL${i}/length_distribution_parameter.txt \
              --paired-end  --phred33 --strand-specific ../1.clean.fq ../2.clean.fq\
              ./trinity_out_dir${i}/Trinity.fasta \
              hope-trinity_out_dir${i} 300
```
评估结果解释见：**<a href="http://deweylab.biostat.wisc.edu/detonate/rsem-eval.html" target="_blank">RSEM-EVAL: A novel reference-free transcriptome assembly evaluation measure</a>**。

<li>RSEM-EVAL produces the following three score related files: 'sample_name.score', 'sample_name.score.isoforms.results' and 'sample_name.score.genes.results'.</li>
<li>'sample_name.score' stores the evaluation score for the evaluated assembly. The first lines Score：the RSEM-EVAL score.</li>
<li>Higher RSEM-EVAL scores are better than lower scores. This is true despite the fact that the scores are always negative. For example, a score of -80000 is better than a score of -200000, since -80000 > -200000.</li>
##BUSCO explore completeness according to conserved ortholog
``` bash
git clone https://gitlab.com/ezlab/busco.git
```
点击**<a href="http://busco.ezlab.org/" target="_blank">BUSCO官网</a>**相应图标下载所需数据库。
![](http://7xk19o.com1.z0.glb.clouddn.com/busco.png)
``` bash
python BUSCO.py -i SEQUENCE_FILE -o OUTPUT_NAME -l LINEAGE -m tran
```
SEQUENCE_FILE： transcript set (DNA nucleotide sequences) file in FASTA format
OUTPUT_NAME： name to use for the run and temporary files (appended)
LINEAGE： location of the BUSCO lineage data to use (e.g. fungi_odb9)