title: R数据整形术之 tidyr
date: 2016-03-09 21:07:46
tags: tidyr
categories: R
---
<blockquote>
<p>Happy families are all alike; every unhappy family is unhappy in its own way — Leo Tolstoy</p>
</blockquote>
R数据整形包之一tidyr最近迎来更新(<a href="http://blog.rstudio.org/2016/02/02/tidyr-0-4-0/" target="_blank" rel="external">tidyr 0.4.0</a>)，所以有必要对其<a href="https://cran.r-project.org/web/packages/tidyr/vignettes/tidy-data.html" target="_blank" rel="external">Tidy data</a>进行学习。
以下为个人简单总结：
<pre class="r"><code>#gather--mutate--separate--select--arrange
setwd(&quot;F:/Rwork/tidyr&quot;)
library(tidyr)</code></pre>
<pre><code>## Warning: package 'tidyr' was built under R version 3.2.3</code></pre>
<pre class="r"><code>library(dplyr)</code></pre>
<pre><code>## Warning: package 'dplyr' was built under R version 3.2.2</code></pre>
<pre><code>## 
## Attaching package: 'dplyr'
## 
## The following objects are masked from 'package:stats':
## 
##     filter, lag
## 
## The following objects are masked from 'package:base':
## 
##     intersect, setdiff, setequal, union</code></pre>
<pre class="r"><code>preg &lt;-read.csv(&quot;preg.csv&quot;,stringsAsFactors = FALSE)
preg</code></pre>
<pre><code>##           name treatmenta treatmentb
## 1   John Smith         NA         18
## 2     Jane Doe          4          1
## 3 Mary Johnson          6          7</code></pre>
<pre class="r"><code>preg6 &lt;-tbl_df(read.csv(&quot;preg.csv&quot;,stringsAsFactors = FALSE))
preg6</code></pre>
<pre><code>## Source: local data frame [3 x 3]
## 
##           name treatmenta treatmentb
##          (chr)      (int)      (int)
## 1   John Smith         NA         18
## 2     Jane Doe          4          1
## 3 Mary Johnson          6          7</code></pre>
<pre class="r"><code>preg2&lt;-preg %&gt;% 
  gather(treatment,n,treatmenta:treatmentb) %&gt;%  
#The first argument, is the name of the key column, which is the name of the variable defined by the values of the column headings. 
#The second argument is the name of the value column.
#The third argument defines the columns to gather, here, every column except religion.
 #gather(treatment,n,-name,na.rm = TRUE)    #the same above # na.rm to drop any missing values from the gather columns
  mutate(treatment=gsub(&quot;treatment&quot;,&quot;&quot;,treatment)) %&gt;%
  arrange(name,treatment)   #arrange=sort
preg2</code></pre>
<pre><code>##           name treatment  n
## 1     Jane Doe         a  4
## 2     Jane Doe         b  1
## 3   John Smith         a NA
## 4   John Smith         b 18
## 5 Mary Johnson         a  6
## 6 Mary Johnson         b  7</code></pre>
<pre class="r"><code>#each deplay one by one 
preg3&lt;-preg %&gt;% 
  gather(treatment,n,treatmenta:treatmentb)
preg3</code></pre>
<pre><code>##           name  treatment  n
## 1   John Smith treatmenta NA
## 2     Jane Doe treatmenta  4
## 3 Mary Johnson treatmenta  6
## 4   John Smith treatmentb 18
## 5     Jane Doe treatmentb  1
## 6 Mary Johnson treatmentb  7</code></pre>
<pre class="r"><code>preg33&lt;-preg3 %&gt;% separate(treatment, c(&quot;Treatments&quot;, &quot;group&quot;),9 )  #separate
preg33</code></pre>
<pre><code>##           name Treatments group  n
## 1   John Smith  treatment     a NA
## 2     Jane Doe  treatment     a  4
## 3 Mary Johnson  treatment     a  6
## 4   John Smith  treatment     b 18
## 5     Jane Doe  treatment     b  1
## 6 Mary Johnson  treatment     b  7</code></pre>
<pre class="r"><code>preg333&lt;-preg33 %&gt;% select(name,group,n)  # select
preg333</code></pre>
<pre><code>##           name group  n
## 1   John Smith     a NA
## 2     Jane Doe     a  4
## 3 Mary Johnson     a  6
## 4   John Smith     b 18
## 5     Jane Doe     b  1
## 6 Mary Johnson     b  7</code></pre>
<pre class="r"><code>preg3333&lt;-preg333 %&gt;% spread(group,n)  #spread: one column become two column
preg3333</code></pre>
<pre><code>##           name  a  b
## 1     Jane Doe  4  1
## 2   John Smith NA 18
## 3 Mary Johnson  6  7</code></pre>
<pre class="r"><code>preg4&lt;-preg3 %&gt;% mutate(treatment=gsub(&quot;treatment&quot;,&quot;&quot;,treatment))
preg4</code></pre>
<pre><code>##           name treatment  n
## 1   John Smith         a NA
## 2     Jane Doe         a  4
## 3 Mary Johnson         a  6
## 4   John Smith         b 18
## 5     Jane Doe         b  1
## 6 Mary Johnson         b  7</code></pre>
<pre class="r"><code>preg5&lt;-preg4 %&gt;% arrange(name,treatment)
preg5</code></pre>
<pre><code>##           name treatment  n
## 1     Jane Doe         a  4
## 2     Jane Doe         b  1
## 3   John Smith         a NA
## 4   John Smith         b 18
## 5 Mary Johnson         a  6
## 6 Mary Johnson         b  7</code></pre>
<pre class="r"><code>#reads all files from the same locaed pathway  into a single data frame.
library(plyr)</code></pre>
<pre><code>## -------------------------------------------------------------------------
## You have loaded plyr after dplyr - this is likely to cause problems.
## If you need functions from both plyr and dplyr, please load plyr first, then dplyr:
## library(plyr); library(dplyr)
## -------------------------------------------------------------------------
## 
## Attaching package: 'plyr'
## 
## The following objects are masked from 'package:dplyr':
## 
##     arrange, count, desc, failwith, id, mutate, rename, summarise,
##     summarize</code></pre>
<pre class="r"><code>paths &lt;- dir(&quot;F:/Rwork/tidyr&quot;, pattern = &quot;\\.csv$&quot;, full.names = TRUE)
names(paths) &lt;- basename(paths)
all&lt;-ldply(paths, read.csv, stringsAsFactors = FALSE)
all</code></pre>
<pre><code>##               .id         name treatmenta treatmentb
## 1 preg - Copy.csv   John Smith         NA         18
## 2 preg - Copy.csv     Jane Doe          4          1
## 3 preg - Copy.csv Mary Johnson          6          7
## 4        preg.csv   John Smith         NA         18
## 5        preg.csv     Jane Doe          4          1
## 6        preg.csv Mary Johnson          6          7</code></pre>
<pre class="r"><code>#get some data from name column incloud John Smith and Jane Doe  located in preg3 data frame 
subset(preg3, name %in% c(&quot;John Smith&quot;, &quot;Jane Doe&quot;))</code></pre>
<pre><code>##         name  treatment  n
## 1 John Smith treatmenta NA
## 2   Jane Doe treatmenta  4
## 4 John Smith treatmentb 18
## 5   Jane Doe treatmentb  1</code></pre>
