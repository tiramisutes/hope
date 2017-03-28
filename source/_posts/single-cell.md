title: Single Cell全基因组扩增
Total word: WordCount
Read time: Min2Read
date: 2016-10-13 20:44:53
tags:
categories:
---
单细胞测序得以实现或者测序质量的提升得益于whole-genome amplification (WGA)，WGA方法存在较大的扩增偏好性（**偏好性来源于序列本身GC含量和非线性扩增过程**），导致低的基因组覆盖度；
##全基因组扩增WGA
目前主要存在有三种扩增方法：
简并寡核苷酸引物PCR扩增（DOP-PCR）、多重置换扩增反应（MDA）、置换预扩增和PCR扩增的组合（MALBAC）三种技术，各有优缺点。这些扩增方法可以把单细胞中pg级甚至fg级的DNA扩增至可满足测序的μg级样品量，正是这些技术的发明才使单细胞基因组测序成为可能。
![](http://7xk19o.com1.z0.glb.clouddn.com/wga.png)
<!--more-->
###DOP-PCR
**Pure PCR-based amplification(DOP-PCR)：**基于PCR的WGA用随机引物进行指数扩增，这一过程对不同的扩增序列会产生较大的影响。
###MDA
![](https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Single_cell_sequencing_%EF%BC%88MDA%EF%BC%89.JPG/800px-Single_cell_sequencing_%EF%BC%88MDA%EF%BC%89.JPG)
**Isothermal amplification(MDA)：**利用随机六碱基引物在多个位点与模板DNA退火，接下来在高扩增效率和保真性的Phi29DNA聚合酶在DNA的多个位点同时起始复制，它沿着DNA模板合成DNA,同时取代模板的互补链。被置换的互补链又成为新的模板来进行扩增，因此最终我们可以获得大量高分子量的DNA。**MDA虽然利用随机引物和链置换的ϕ29聚合酶在等温条件下扩增，相较于基于PCR的扩增能够降低序列本身GC含量造成的偏好性，对扩增覆盖度有较大提升，但依然是非线性的扩增，所以还是有较大的偏好性。**
<blockquote><p>Φ29  ：一种具有较高连续合成能力以及链置换的DNA聚合酶，它具有3'-5'外切酶(校正)活性。Φ29 DNA聚合酶不耐高温，65℃下放置10分钟方可使它失活。该酶对于模板有很强的模板结合能力，能连续扩增100Kb的DNA模板而不从模板上解离。同时这种酶具有3'—5'外切酶活性，可以保证扩增的高保真性。</p></blockquote>
###MALBAC
**Multiple annealing and looping-based amplification cycles(MALBAC)：**通过拟线性的预扩增来降低非线性扩增的偏好性。
###MALBAC扩增原理
![](http://7xk19o.com1.z0.glb.clouddn.com/malbac.png)
<li>首先，单细胞双链DNA在94℃变性成单链，随后在0℃时随机引物（包含有27个碱基的共有序列和8个变异碱基）均匀的结合到单链DNA模版上；</li>
<li>65℃时链置换DNA聚合酶用来生成不同长度序列（0.5到1.5kb）的半扩增产物(semi-amplicon)，随后在94℃变性成单链从模版上脱离。</li>
<li>在随后的5个温度的循环中，对半扩增产物进行进一步的扩增来产生完整扩增产物(full-amplicons)，且完整扩增产物的5'端和3'端互补。</li>
<li>温度降到58℃进行完整扩增产物的环化，同时并防止进一步扩增和序列的杂交。</li>
<li>半扩增产物和基因组DNA则继续循环来生成完整扩增产物。</li>
<li>环化的完整扩增产物即完成拟线性的预扩增过程，随后进行PCR的指数扩增。在PCR扩增过程中与MALBAC引物27个共有序列相同的寡聚核苷酸作为引物。</li>
<span class="myCode">扩增巧妙之处</span>
<li>**只有以半扩增产物为模版才能产生两端互补的完整扩增产物，完成预扩增。**</li>
##扩增效果比较
![](http://7xk19o.com1.z0.glb.clouddn.com/wga2.png)