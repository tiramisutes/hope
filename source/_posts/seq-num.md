title: 命令行生成数列：{}和seq
Total word: WordCount
Read time: Min2Read
date: 2016-10-01 16:59:45
tags: shell
categories: Linux
---
**如何在命令行上产生一列数字呢？**
<li><span class="myCode">{START..END..INCREMENT}</span></li>
<li><span class="myCode">{1..3}{a..c}</span></li>
<li><span class="myCode">seq -s ',' START INCREMENT END</span>,使用方式<span class="myCode">$(seq -s ',' START INCREMENT END)</span></li>
在**awk**中的使用技巧：
``` bash
echo "$"$(seq -s ',$' 20)
$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20
```
**More：**http://www.thelinuxrain.com/articles/building-sequences-of-numbers-on-the-command-line