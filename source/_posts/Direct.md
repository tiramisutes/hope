title: Direct：命令行访问NCBI
Total word: WordCount
Read time: Min2Read
date: 2017-01-13 21:13:07
tags: Direct
categories: Bioinformatics
---
命令行访问和获取NCBI数据当选[Entrez Direct: E-utilities on the UNIX Command Line](https://www.ncbi.nlm.nih.gov/books/NBK179288/).
##工具集
**esearch** 搜索功能；
**elink** looks up neighbors (within a database) or links (between databases).
**efilter** 搜索结果过滤，搜索结果以特定格式输出.
**efetch** 以指定格式下载搜索结果.
**xtract** 转化XML格式为table.
**einfo** obtains information on indexed fields in an Entrez database.
**epost** uploads unique identifiers (UIDs) or sequence accession numbers.
**nquire** sends a URL request to a web page or CGI service.
##数据库查询
``` bash
esearch -db pubmed -query "lycopene cyclase" | efetch -format abstract
esearch -db protein -query "lycopene cyclase" | efetch -format fasta
```
当查询数据是蛋白或核酸时<code>-format</code>参数可以是fasta(fasta_cds_na, fasta_cds_aa, and gene_fasta),gb(GenBank), gp(GenPept),
##搜索和过滤
``` bash
esearch -db pubmed -query "opsin gene conversion" | elink -related | 
  efilter -query "tetrachromacy"
  efilter -days 60 -datetype PDAT   #过去2个月
  efilter -mindate 1990 -maxdate 1999 -datetype PDAT   #1990s
```
##XML格式转换为制表符
``` bash
$ esearch -db protein -query "lycopene cyclase" 
<ENTREZ_DIRECT>
  <Db>protein</Db>
  <WebEnv>NCID_1_322844954_130.14.22.215_9001_1484487403_837234396_0MetA0_S_MegaStore_F_1</WebEnv>
  <QueryKey>1</QueryKey>
  <Count>12380</Count>
  <Step>1</Step>
</ENTREZ_DIRECT>
$ esearch -db protein -query "lycopene cyclase" | xtract -pattern ENTREZ_DIRECT -element Count
12380
```
##某一领域最多产的作者
``` bash
$ SortUniqCountRank() {
    sort -f |
    uniq -i -c |
    perl -pe 's/\s*(\d+)\s(.+)/$1\t$2/' |
    sort -t $'\t' -k 1,1nr -k 2f
$ alias sort-uniq-count-rank='SortUniqCountRank'
$ esearch -db pubmed -query \
    "crotalid venoms [MAJR] AND phospholipase [TIAB]" |
  efetch -format xml |
  xtract -pattern PubmedArticle \
    -block Author -sep " " -tab "\n" -element LastName,Initials  |
  sort-uniq-count-rank
```
##某一领域每年文章发表情况
``` bash
 esearch -db pubmed -query "legionnaires disease [TITL]" |
  efetch -format docsum |
  xtract -pattern DocumentSummary -element PubDate |
  cut -c 1-4 |
  sort-uniq-count-rank
```
##人每条染色体上有多少基因
``` bash
 for chr in {1..22} X Y MT
  do
    esearch -db gene -query "Homo sapiens [ORGN] AND $chr [CHR]" |
    efilter -query "alive [PROP] AND genetype protein coding [PROP]" |
    efetch -format docsum |
    xtract -pattern DocumentSummary -NAME Name \
      -block GenomicInfoType -if ChrLoc -equals "$chr" \
        -tab "\n" -element ChrLoc,"&NAME" |
    sort | uniq | cut -f 1 | sort-uniq-count-rank
  done
```
