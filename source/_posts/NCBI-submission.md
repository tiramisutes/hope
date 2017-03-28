title: NCBI_submission
Total word: WordCount
Read time: Min2Read
date: 2016-08-30 13:50:01
tags: NCBI_submission
categories: Bioinformatics
---
**测序数据上传到NCBI的SRA数据库；**
上传首页：<i class="fa fa-cloud" aria-hidden="true"></i>https://submit.ncbi.nlm.nih.gov/
上传整体顺序为：<a href="#" class="myButton">BioProject，BioSample，SRA</a>
**需要注意的是，上传的过程中很多地方一旦保存或提交就不可以修改，尤其是各处的Alias，所以想清楚后再保存，可先看下别人的数据提交形式；确实需要修改的可以发邮件联系NCBI的工作人员修改内容。**
![](http://7xk19o.com1.z0.glb.clouddn.com/NCBI.png)
<!--more-->
##1. BioProject
1> 点击进入<a href="https://submit.ncbi.nlm.nih.gov/subs/bioproject/" target="_blank">BioProject主页</a>；
2> 点击**New submission**
![](http://7xk19o.com1.z0.glb.clouddn.com/BioProject.png)
3>依次填写信息,最后保存即可。
![](http://7xk19o.com1.z0.glb.clouddn.com/BioProjec2t.png)
##2. BioSample
1> 点击进入<a href="https://submit.ncbi.nlm.nih.gov/subs/biosample/" target="_blank">BioSample主页</a>；
2> 点击**New submission**
3>依次填写信息,最后保存即可。
<i class="fa fa-commenting-o" aria-hidden="true"></i>根据实际情况选择合适的批处理，若为植物样本，选择下载Plant.1.0.txt文件，填写相应信息；
若现有sample1 and sample2两个实验处理，其各为3次生物学重复的双端RNA-seq数据，即sample1-1,sample1-2,sample1-3,sample2-1,sample2-2,sample2-3，此时的Plant.1.0.txt文件内容如下（文件中其他内容根据实际情况选择填写）,即<a href="#" class="myButton">生物学重复划分在同一个SAMPLE的不同RUN下</a>；
| sample_name        | bioproject_accession           |
| ------------- |:-------------:|
| sample1      | PRJNAxxxxxx |
| sample2      | PRJNAxxxxxx      |
![](http://7xk19o.com1.z0.glb.clouddn.com/Biosample3.png)
##3. SRA
1> 点击进入<a href="https://submit.ncbi.nlm.nih.gov/subs/sra/" target="_blank">SRA主页</a>；
2> 点击**Create new submission**
3>依次填写信息,最后保存即可。
![](http://7xk19o.com1.z0.glb.clouddn.com/BioSample2.png)
##4. 数据上传
Linux下建议用Aspera上传；首先给sra工作人员发邮件要private SSH key文件；
``` bash
/software/.aspera/connect/bin/ascp -i sra-8.ssh.priv -QT -l100m -k1 sample1_1.fastq.gz asp-sra@upload.ncbi.nlm.nih.gov:incoming
```
注：命令只能在登录节点上联网运行；
详细参数解释和其他上传方法见：https://www.ncbi.nlm.nih.gov/sra/docs/submitfiles/
