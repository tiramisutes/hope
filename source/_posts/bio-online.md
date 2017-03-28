title: 常用生物信息在线工具
date: 2015-08-05 19:19:40
tags: bio-online
categories: Bioinformatics
---
<i class="fa fa-volume-control-phone" aria-hidden="true"></i>**声明：本文所列工具均为较为初级的生物信息分析，只用于简单的分析过程，更加优秀的工具和准确的分析结果我也在不懈寻找中，同样也欢迎大家留言提供，一个分析结果最好是能够综合不同方式所得结果。**
###韦恩图
<a href="http://bioinfogp.cnb.csic.es/tools/venny/index.html" target="_blank">Venny2.0</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/ven.png)
###基因预测
<a href="http://linux1.softberry.com/berry.phtml?topic=fgenesh&group=programs&subgroup=gfind" target="_blank">FGENESH</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/fgenesh.png)
### phylogenetic
<a href="http://itol.embl.de/index.shtml" target="_blank"> iTO</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/itol.png)
### 启动子区预测
<a href="http://www.cbs.dtu.dk/services/SignalP/" target="_blank">Promoter Scan</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/promot.png)
### 蛋白质一级结构分析
<a href="https://www.predictprotein.org/home" target="_blank">PredictProte</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/predictprotein.png)
<a href="http://web.expasy.org/protparam/" target="_blank">ExPASy-ProtParam tool</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/protparam.png)
### 蛋白质磷酸化位点
<a href="http://www.cbs.dtu.dk/services/NetPhos/" target="_blank">NetPhos 2.0</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/NetPhos.png)
### 信号肽
<a href="http://www.cbs.dtu.dk/services/SignalP/" target="_blank">SignalP</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/signalip.png)
### 跨膜结构域
<a href="http://www.cbs.dtu.dk/services/TMHMM/" target="_blank">TMHMM Server v. 2.0</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/tmhmm.png)
### 蛋白质亚细胞定位
<a href="http://psort.hgc.jp/form2.html" target="_blank">PSORT II Prediction</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/PSORT%20II%20Prediction.png)
### 蛋白质二级结构分析
<a href="https://npsa-prabi.ibcp.fr/cgi-bin/npsa_automat.pl?page=npsa_sopma.html" target="_blank">SOPMA</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/sopma.png)
### 蛋白质三级结构预测
<a href="http://swissmodel.expasy.org/interactive" target="_blank">SWISS-MODEL</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/SWISS-MODEL.png)
### 短序列拼接
<a href="http://doua.prabi.fr/software/cap3" target="_blank">Cap3</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/cap3.png)
### 多序列比对相似性展示
<a href="http://cotton.hzau.edu.cn/EN/tools/BioERCP/simitrix.php" target="_blank">SimiTriX-SimiTetra</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/3wei.png)
![](http://7xk19o.com1.z0.glb.clouddn.com/4wei.png)
### 绘制GO注释结果
<a href="http://wego.genomics.org.cn/cgi-bin/wego/index.pl" target="_blank">WEGO：Web Gene Ontology Annotation Plotting</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/wego.png)
###蛋白质domain
<a href="http://pfam.xfam.org/" target="_blank">Pfam database</a>
<a href="http://meme-suite.org/tools/meme" target="_blank">meme:Multiple Em for Motif Elicitation</a>
<a href="http://smart.embl-heidelberg.de/smart/job_status.pl?jobid=2202499913219771481699820TuJCLAnhyf" target="_blank">SMART</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/Pfam.png)
###基因组杂合性评估
<a href="http://qb.cshl.edu/genomescope/analysis.php?code=example2" target="_blank">GenomeScope：Estimate genome heterozygosity, repeat content, and size from sequencing reads using a kmer-based statistical approach</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/GenomeScope.png)
###circos图
**<a href="http://mkweb.bcgsc.ca/tableviewer/visualize/" target="_blank">CIRCOS</a>**可以用来画基因组数据的环状图，也可以用来绘制其它数据的相关环状图。
![](http://7xk19o.com1.z0.glb.clouddn.com/circos-table-01%20%281%29.png)
**1. 需要注意的是上传数据格式为空格或tab分隔的txt格式纯文本列表文件，值均为非负整数，若存在缺失值，用“-”线代替，若有小数，每一个单元格乘以某一值(如1000)，化为整数，且每个单元格中只能有数字，其他任何符号都不行，除了缺失的“-”，(1555，而不是1,555)；**
**2. 在线版只能绘制75阶方阵数据，若需要绘制较复杂的请下载<a href="http://www.circos.ca/software/download/circos">Circos</a> and use the <a href="http://www.circos.ca/documentation/tutorials/utilities/visualizing_tables/">tableviewer tool。</a>**
**3. 每一个标签所对应半圈的总长度为这一标签所对应的所有值的和，不同半圈间连线表示这两标签所表示的值。**
###元数据可视化
<a href="http://121.241.184.233/webigloo/index.php" target="_blank">Web-Igloo：Interactively visualizing multivariate data without feature decomposition</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/welogo.png)
**需要数据和元数据两个文件**,实例数据结构如下：
数据(Select data file (Tab delimited))
<blockquote>Samples	Palmitic	Palmitoleic	Stearic	Oleic	Linoleic	Linolenic	Arachidic	Eicosenoic
S1	1075	75	226	7823	672	36	60	29
S2	1088	73	224	7709	781	31	61	29
S3	911	54	246	8113	549	31	63	29
S4	966	57	240	7952	619	50	78	35
S5	1051	67	259	7771	672	50	80	46
S6	911	49	268	7924	678	51	70	44
S7	922	66	264	7990	618	49	56	29
S8	1100	61	235	7728	734	39	64	35
S9	1082	60	239	7745	709	46	83	33
S10	1037	55	213	7944	633	26	52	30
S11	1051	35	219	7978	605	21	65	24
S12	1036	59	235	7868	661	30	62	44
</blockquote>
元数据（Select metadata (Tab delimited)）
<blockquote>Samples	Geography
S1	N
S2	N
S3	N
S4	NA
S5	NA
S6	NA
S7	NAp
S8	NAp
S9	NAp
S10	NApulia
S11	NApulia
S12	NApulia
</blockquote>
### 基因结构展示
<a href="http://gsds.cbi.pku.edu.cn/index.php" target="_blank">GSDS2.0: Gene Structure Display Server</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/GSDS.png)