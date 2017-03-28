title: sed中那些特殊的替换
date: 2015-12-26 22:39:28
tags: sed
categories: Linux
---
##修改匹配的第N个内容
``` bash
cat text1
2
2
3
22
2
sed ':a;N;$! ba;s/2/--/5' text1   #替换第5个
2
2
3
22
--
sed ':a;N;$!ba;s/\(.*\)2/\1--/' text1  #替换最后一个
cat text2
2 52 8 2
sed 's/2/--/4' text2
2 52 8 --
```
