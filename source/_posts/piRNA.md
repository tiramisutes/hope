title: Piwi-interacting RNA (piRNA)
date: 2016-06-08 21:58:48
tags: piRNA
categories: molecular biology
---
##PiRNA
<p><img src="http://7xk19o.com1.z0.glb.clouddn.com/pirc.png" width="580" height="200"></p>
**Piwi-interacting RNA (piRNA)**是一大类主要在动物体内表达的small non-coding RNA，piRNA通过与Piwi蛋白互作形成RNA-protein复合体。该piRNA复合体在生殖细胞中参与表观遗传和逆转录转座子(retrotransposons)的转录后基因沉默。piRNA与miRNA和siRNA在长度、序列结构和生物起源上均存在差异；
###PiRNA特点
1）26~31nt
2）无明显二级结构
3）5'端第一个碱基为U
4）5’端单磷酸盐(monophosphate)和3'端修饰(2'-O-methylation modification)阻止2' or 3'氧化，增加PiRNA稳定性。
5）种类较多，不具一定的保守性，老鼠体内 50,000 unique piRNA，果蝇中>13,000。
6）产生存在显著的链偏好性；
![](http://7xk19o.com1.z0.glb.clouddn.com/piRNA23.png)
![](http://7xk19o.com1.z0.glb.clouddn.com/piRNA2.png)
###位置
成簇贯穿基因组中，其每一个簇中包含PiRNA小于10个或达到成千上万，且大小差异极大。
在果蝇和脊椎动物中定位于非编码基因间，在线虫蛋白编码基因间也鉴定到PiRNA。
在无脊椎动物和哺乳动物生殖细胞中较多。
细胞核和细胞质中均存在。
###生物起源
PiRNA的产生存在显著的链特异性，可能仅仅是来源于双链DNA的某一条链，这表明转录的长的单链前体经过一次初加工形成 pachytene PiRNA，这过程中PiRNA前体的转录趋向于起始于5'端第一个碱基U。
![](http://7xk19o.com1.z0.glb.clouddn.com/piRNA1.png)
<p></p>
‘Ping Pong’机制：初级PiRNA(Primary piRNAs)第一个碱基位置偏向为U，第10个无偏向性；次级PiRNA(Secondary piRNAs)(产生于初级PiRNA指导的剪切)第一个碱基无偏向，第10个偏向A；<code>二者从5'端开始有10个碱基的互补</code>。
More：<i class="fa fa-link" aria-hidden="true"></i><a href="http://www.sciencedirect.com/science/article/pii/S1097276508006199" target="_blank">A piRNA Pathway Primed by Individual Transposons Is Linked to De Novo DNA Methylation in Mice</a>
初级PiRNA识别其互补靶标并招募Piwi蛋白，然后从距离初级PiRNA 5'端10个碱基处劈开(识别的互补靶标)形成次级PiRNA，次级PiRNA靶向到第10个碱基是 **A** 。
![](http://7xk19o.com1.z0.glb.clouddn.com/pingpong.jpg)
<i class="fa fa-link" aria-hidden="true"></i><a href="http://www.sciencedirect.com/science/article/pii/S0092867407002577" target="_blank">Discrete Small RNA-Generating Loci as Master Regulators of Transposon Activity in Drosophila</a>
###生物功能
####沉默转座子
见More：<i class="fa fa-link" aria-hidden="true"></i><a href="http://tiramisutes.github.io/2016/06/08/piRNA/#RNAi中作用" target="_blank">Piwi蛋白:RNAi中作用</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/PiRNA-function.png)
####后生效应(Epigenetic effects)
动植物中，小RNA通过特定的胞嘧啶甲基化来间接调控表观遗传，并且小RNA自身承担着表观遗传信息的载体。存在某些特殊转座子差异的果蝇品系间杂交能引起后代不育，这称之为杂种不育。当这一转座子是父系遗传时不育表型表现为显性，而母系遗传能够维持育性。在P- and I-element-mediated杂种不育中，依赖于父母本不同，其作用于每一个靶标元件(element)的PiRNA数量在后代表现出明显差异，这种差异来源于受精作用。综上表明母本生殖细胞内的PiRNA对上述特殊转座子的沉默响应起到重要作用，此沉默效应的缺失将引起杂种不育。
More：<i class="fa fa-link" aria-hidden="true"></i><a href="http://science.sciencemag.org/content/322/5906/1387.long" target="_blank">An epigenetic role for maternally inherited piRNAs in transposon silencing</a>
###PiRNA鉴定
PiRNA的鉴定目前主要通过识别’ping pong‘标签，相关软件如下：
<i class="fa fa-link" aria-hidden="true"></i><a href="http://pirnabank.ibab.ac.in/index.shtml" target="_blank">piRNABank: a web resource on classified and clustered Piwi-interacting RNAs</a>
<i class="fa fa-link" aria-hidden="true"></i><a href="https://sourceforge.net/projects/pingpongpro/files/v1.0/" target="_blank">PingPongPro：a software for finding ping-pong signatures and ping-pong cycle activity</a>
<i class="fa fa-link" aria-hidden="true"></i><a href="http://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-13-5" target="_blank">proTRAC: a software for probabilistic piRNA cluster detection, visualization and analysis</a>
<i class="fa fa-link" aria-hidden="true"></i><a href="http://www.smallrnagroup-mainz.de/piRNAclusterDB.html" target="_blank">piRNA cluster: database</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/pir_bio.png)
###PiRNA起源
基因组重复区域，例如逆转录转座子区；
异染色质区，双链RNA的反义链；
##Argonaute蛋白家族
![](http://7xk19o.com1.z0.glb.clouddn.com/piwi.png)
Argonaute蛋白包含有N-terminal, PAZ (Piwi-Argonaute-Zwille), middle and the C-terminal PIWI (P-element-induced wimpy testis) domains (Tolia et al., 2007)。
在果蝇中存在5种类型的Argonaute蛋白：AGO1, AGO2, Aubergine (Aub), Piwi and AGO3 (Gunawardane et al., 2007)；
AGO1和AGO2属于Argonaute (AGO)亚家族，Aub, Piwi and AGO3多存在于生殖细胞系中，且属于PIWI亚家族；
![](http://7xk19o.com1.z0.glb.clouddn.com/ago.png)
##Piwi蛋白
Piwi蛋白(最初在果蝇中的P-element induced wimpy testis)，维持干细胞的不完全分化和生殖细胞细胞分裂比率的稳定性。Piwi蛋白高度保守，广泛存在于动植物体内。
###RNAi中作用
Piwi蛋白存在有PAZ domain，该domain在Argonaute蛋白家族中参与双链RNA导向的单链RNA的水解作用。Argonaute是广泛研究的核酸结合蛋白(nucleic-acid binding)家族，其本质上是一种RNase H-like酶，完成RNA-induced silencing complex (RISC)的催化功能。在细胞RNAi反应中，RISC复合体中的Argonaute蛋白能够绑定(bind)到由ribonuclease Dicer切割（Dicer-2）外源双链RNA的正义链和反义链产生的siRNA(small interfering RNA)和切割（Dicer-1）内源非编码RNA（non-coding RNA）产生的miRNA(microRNA)上，从而形成RNA-RISC complex。该RNA-RISC complex绑定和切开与RNA（siRNA或miRNA）碱基互补的mRNA，破坏并且阻止其翻译过程。
**补充**RNAi中的RdRP机制：在线虫的研究中发现, siRNA 是合成 dsRNA 的特殊引物, 在RNA 依赖RNA 聚合酶(RdRP)作用下, 以靶mRNA 为模板合成dsRNA 。新生成的dsRNA 在Dicer 酶的作用下, 裂解产生新的siRNA , 新生成的siRNA 又可进入上述循环。大量集中的siRNA 可以形成RISC复合物, 这样可以提高mRNA 降解的效率。在这种RNAi过程中, 对靶mRNA 的特异性扩增有助于增强RNAi的特异性基因监视功能, 每个细胞只需少量的dsRNA就能完全关闭相应基因的表达，该模型称为RdRP。
###Piwi蛋白和转座子沉默
Piwi蛋白通过与PiRNA形成内源系统来沉默内源自私基因(endogenous selfish genetic elements)表达，例如逆转录转座子和重复序列，防止该自私基因产物干扰生殖细胞的形成。
selfish genetic elements明显特征：通过形成额外拷贝数在基因组中传播（转座子）和对宿主的成功繁殖没有特殊贡献。
##RasiRNA
![](http://7xk19o.com1.z0.glb.clouddn.com/%E5%B9%BB%E7%81%AF%E7%89%872.PNG)
RasiRNAs(Repeat associated small interfering RNA)是piRNA的亚种，与Piwi蛋白（Argonaute蛋白家族分枝）互作参与RNAi反应。在生殖细胞中建立和维持异染色质结构，控制重复序列的转录，沉默转座子和逆转录转座子。主要产生自反义链（antisense strand），缺乏动物siRNA and miRNA所特有的2',3'羟基末端。
More：<i class="fa fa-link" aria-hidden="true"></i><a href="http://science.sciencemag.org/content/313/5785/320.full" target="_blank">A Distinct Small RNA Pathway Silences Selfish Genetic Elements in the Germline</a>
![](http://7xk19o.com1.z0.glb.clouddn.com/%E5%B9%BB%E7%81%AF%E7%89%878.PNG)
##RNA 百科
<i class="fa fa-link" aria-hidden="true"></i><a href="http://mcmanuslab.ucsf.edu/rnas" target="_blank">RNA wiki</a>
