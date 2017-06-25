title: De Nove杞綍缁勭粍瑁呰川閲忚瘎浼?
Total word: WordCount
Read time: Min2Read
date: 2016-10-30 23:00:17
tags: De Nove
categories: Bioinformatics
---
鏃犲弬De Nove缁勮閫氬父鐢ㄥ埌**<a href="https://github.com/trinityrnaseq/trinityrnaseq/wiki" target="_blank">Trinity</a>**杞欢,缁勮杩囩▼涓渶閲嶈鐨勪袱涓弬鏁板氨鏄?
<span class="myCode">--min_kmer_cov</span>鍜?span class="myCode">--min_glue</span>銆備负缁勮鍑洪珮璐ㄩ噺缁撴灉鎴戜滑閫氬父闇€瑕佸幓灏濊瘯鐢ㄤ笉鍚岀殑鍙傛暟锛実ithub涓婁篃鏈夎蒋浠跺紑鍙戣€呰璁哄叧浜庤繖涓や釜鍙傛暟锛?*<a href="https://github.com/trinityrnaseq/trinityrnaseq/issues/92" target="_blank">Optimizing parameters</a>**鍙緵鍙傝€冿紝鍏跺疄闂鏈€缁堜篃灏卞綊缁撲负浣犳槸鍚﹀叧蹇冧綘鏁版嵁涓殑浣庝赴搴﹁浆褰曟湰銆?
姝ゅ浣滆€呬篃鎻愪緵浜嗕竴绯诲垪鏂规硶鏉ヨ瘎浼扮粍瑁呰川閲?*<a href="https://github.com/trinityrnaseq/trinityrnaseq/wiki/Transcriptome-Assembly-Quality-Assessment" target="_blank">Transcriptome Assembly Quality Assessment</a>**锛屾€诲叡鍒楀嚭鏈?绉嶆柟娉曞彲瀵逛笉鍚屽弬鏁扮殑缁勮缁撴灉杩涜璇勪及,鐪嬪畬鍚庣患鍚堟€荤粨鍑哄叾涓?绉嶈瘎浼版柟娉曘€?
##Assessing the Read Content of the Transcriptome Assembly
``` bash
bowtie2-build  ../trinity_out_dir${i}/Trinity.fasta ../trinity_out_dir${i}/Trinity.fasta
bowtie2 --local --no-unal -p ${cpu} -x  ../trinity_out_dir${i}/Trinity.fasta -q -1 ${left} -2 ${right} \
     | samtools view -Sb - | samtools sort -no - - > bowtie2.nameSorted.bam
#鍙傜湅proper pairs reads鏁伴噺鍜岀櫨鍒嗘瘮
${TRINITY_DIR}/util/SAM_nameSorted_to_uniq_count_stats.pl  bowtie2.nameSorted.bam
grep "^proper_pairs" Read-Representation.out
```
**绗簩姝ョ殑bowtie2姣斿搴忓垪鍒扮粍瑁呰浆褰曟湰缁撴灉鏃跺彲閫夐儴鍒嗘暟鎹潵姣斿锛岃繖鏍峰彲澶уぇ闄嶄綆姣斿鑰楁椂銆?*
##Full-length transcript analysis for model and non-model organisms using BLAST+
``` bash
blastall -p blastx -i ./trinity_out_dir${i}/Trinity.fasta  -d ${uniprot} -v 1 -b 1 -m 8 -e 1e-5 -a ${cpu} -F F -o uniprot_sprot.fasta_blastx.outfmt8
${TRINITY_DIR}/util/analyze_blastPlus_topHit_coverage.pl uniprot_sprot.fasta_blastx.outfmt8 ./trinity_out_dir${i}/Trinity.fasta /public/home/cotton/public_data/SwissProt/uniprot_sprot.fasta
${TRINITY_DIR}/util/misc/blast_outfmt6_group_segments.pl \
      ./uniprot_sprot.fasta_blastx.outfmt8 ./trinity_out_dir${i}/Trinity.fasta uniprot_sprot.fasta > ./uniprot_sprot.fasta_blastx.outfmt8.grouped
${TRINITY_DIR}/util/misc/blast_outfmt6_group_segments.tophit_coverage.pl ./uniprot_sprot.fasta_blastx.outfmt8.grouped
```
##Compute DETONATE scores
RSEM-EVAL杞欢瀵逛簬鍙岀reads鏁版嵁闇€瑕佹彁渚涗竴涓猘verage fragment length鍊硷紝鍙弬鑰冩垜鐨勫彟涓€绡囧崥鏂?*<a href="http://tiramisutes.github.io/2016/09/19/Insert-Size.html" target="_blank">璇勪及鏂囧簱 Average Insert Size</a>**鏉ヨ绠楀緱鍒版鍊笺€?
``` bash
rsem-eval-estimate-transcript-length-distribution ./trinity_out_dir${i}/Trinity.fasta ./RSEM-EVAL${i}/length_distribution_parameter.txt
rsem-eval/rsem-eval-calculate-score -p 1 \
              --transcript-length-parameters ./RSEM-EVAL${i}/length_distribution_parameter.txt \
              --paired-end  --phred33 --strand-specific ../1.clean.fq ../2.clean.fq\
              ./trinity_out_dir${i}/Trinity.fasta \
              hope-trinity_out_dir${i} 300
```
璇勪及缁撴灉瑙ｉ噴瑙侊細**<a href="http://deweylab.biostat.wisc.edu/detonate/rsem-eval.html" target="_blank">RSEM-EVAL: A novel reference-free transcriptome assembly evaluation measure</a>**銆?

<li>RSEM-EVAL produces the following three score related files: 'sample_name.score', 'sample_name.score.isoforms.results' and 'sample_name.score.genes.results'.</li>
<li>'sample_name.score' stores the evaluation score for the evaluated assembly. The first lines Score锛歵he RSEM-EVAL score.</li>
<li>Higher RSEM-EVAL scores are better than lower scores. This is true despite the fact that the scores are always negative. For example, a score of -80000 is better than a score of -200000, since -80000 > -200000.</li>
##BUSCO explore completeness according to conserved ortholog
``` bash
git clone https://gitlab.com/ezlab/busco.git
```
鐐瑰嚮**<a href="http://busco.ezlab.org/" target="_blank">BUSCO瀹樼綉</a>**鐩稿簲鍥炬爣涓嬭浇鎵€闇€鏁版嵁搴撱€?
![](http://7xk19o.com1.z0.glb.clouddn.com/busco.png)
``` bash
python BUSCO.py -i SEQUENCE_FILE -o OUTPUT_NAME -l LINEAGE -m tran
```
SEQUENCE_FILE锛?transcript set (DNA nucleotide sequences) file in FASTA format
OUTPUT_NAME锛?name to use for the run and temporary files (appended)
LINEAGE锛?location of the BUSCO lineage data to use (e.g. fungi_odb9)
**瀵熺湅缁撴灉: 鍦ㄨ繍琛岀粨鏋滄枃浠跺す涓媊`short_summary_OUTPUT_NAME.txt``涓湁濡備笅缁熻淇℃伅馃憞**
```
C:80.0%[S:80.0%,D:0.0%],F:0.0%,M:20.0%,n:10

8 Complete BUSCOs (C)
8 Complete and single-copy BUSCOs (S)
0 Complete and duplicated BUSCOs (D)
0 Fragmented BUSCOs (F)
2 Missing BUSCOs (M)
10 Total BUSCO groups searched
```
涔熷彲鍥惧儚鍖栧睍绀虹粨鏋滒煈囷細
```
cp short_summary_OUTPUT_NAME.txt ./plot
python2.7 BUSCO_plot.py -wd ./busco/plot/
```
![](http://7xk19o.com1.z0.glb.clouddn.com/busco2.png)