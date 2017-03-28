title: Linux 下批量下载 http 中链接内容
date: 2015-12-01 08:31:16
tags: batch-download
categories: Linux
---
![](http://7xk19o.com1.z0.glb.clouddn.com/kobas.png)
KOBAS这个软件所需数据库有3540个物种数据，如何实现批量下载...
![](http://7xk19o.com1.z0.glb.clouddn.com/kobas2.png)
察看html网页源文件可发现：所有这些下载链接都整齐排列于 <code><a href="../download/sqlite3/ko.db.gz">KO</a><br/></code>这样一个html语法结构中，所以可以通过正则表达式匹配找出所有的下载链接；
##<i class="fa fa-key"></i>方法1:python抓取网页并下载
python中实现爬虫，解析网页html文件和下载文件的简单容易上手的优秀模块分别为requests，BeautifulSoup和re，通过三者的组合可实现爬虫网页并批量下载。
导入所需模块
``` bash
#!~/bin/Python-2.7.10/
from BeautifulSoup import BeautifulSoup
import requests
import re
#—--name:url-batch-download.py--
#—--修改:hope--
# point to output directory
outpath = '/backend3/'
url = 'http://kobas.cbi.pku.edu.cn/site/download_db.jsp'
mbyte=1024*1024

print 'Reading: ', url
html = requests.get(url).text
soup = BeautifulSoup(html)

print 'Processing: ', url
for name in soup.findAll('a', href=True):
    gzurl = name['href']
    strinfo = re.compile('\../')
    xzp= strinfo.sub('http://kobas.cbi.pku.edu.cn/',gzurl)
    print xzp
    if( xzp.endswith('.gz') ):
        outfname = outpath + xzp.split('/')[-1]
        r = requests.get(xzp, stream=True)
        if( r.status_code == requests.codes.ok ) :
            fsize = int(r.headers['content-length'])
            print 'Downloading %s (%sMb)' % ( outfname, fsize/mbyte )
            with open(outfname, 'wb') as fd:
                for chunk in r.iter_content(chunk_size=1024): # chuck size can be larger
                    if chunk: # ignore keep-alive requests
                        fd.write(chunk)
                fd.close()
```

修稿py文件为可执行文件
``` bash	
chmod +x url-batch-download.py
```
开始爬虫并批量下载
``` bash
python2.7 url-batch-download.py
```
<i class="fa fa-key"></i>方法2：wget批量下载
1） wget下载整个html页面后批量下载
wget都很熟悉，但是通常只是用来下载单个文件，如果需要批量下载呢？
``` bash
wget http://kobas.cbi.pku.edu.cn/site/download_db.jsp
```
对于这个链接下载完后是jsp后缀文件，可以重命名为index.html。
2） 开始批量下载
``` bash
wget -i index.html -F -B http://kobas.cbi.pku.edu.cn/site/download_db.jsp
```
参数解释：
-i 表示从文件导入链接，默认是直接按行读取URL
-F 表示将文件以HTML的格式解析，其实就是解析<a>
-B 因为发现解析出来的链接用的都是相对路径，而为了下载这个文件，必须在相对路径前添加上Base URL，-B就是用来添加Base URL。

这样就可以批量下载当前目录中的文件了。