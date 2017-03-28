title: linux命令行精选
date: 2015-08-01 21:27:15
tags: linux_command
categories: Linux
---
致力于收集那些短小精悍的linux命令，欢迎补充！
![](http://7xk19o.com1.z0.glb.clouddn.com/linux_command.png)
``` bash
grep -vf file1 file2 查看两个文件的不同
rename -n "s/-.*//" * 批量前缀重命名
diff <(sort file1.txt) <(sort file2.txt) 比较两个已排序的文件
for i in `find -name '*_test.rb'` ; do mv $i ${i%%_test.rb}_spec.rb ; done 批量重命名
shred -u -z -n 17 rubricasegreta.txt 安全删除文件
sed -re '/^#/d ; s/#.*$//' 清理注释
ps aux | sort -nk 6 排序按 第6列
convert -density 300x300 input.pdf output.png 把pdf转化成png
:%s/<control-VM>//g 如何在vim清理^M
export HISTTIMEFORMAT='%Y.%m.%d-%T :: ' HISTFILESIZE=50000 HISTSIZE=50000 更好地设置bash history
/^\([2-9]\d*\|1\d+\) vim 中查找比 1 大的数
tar cvfz dir_name.tgz dir/ 如何tar gz 一个目录
pv file1 > file2 带进度条的复制文件
gs -dNOPAUSE -sDEVICE=jpeg -r144 -sOutputFile=p%03d.jpg file.pdf 使用Ghostscript转换PDF为JPEG
find . -iname "*.jpg" -printf '<img src="%f" title="%f">\n' > gallery.html 创建一个html相册
sed -i <start>,<end>d <filename> 从一个文件删除一个范围内的行
sed '/^$/d' file >newfile 清除文件中的空行
awk '{print NR": "$0; for(i=1;i<=NF;++i)print "\t"i": "$i}' 分析列
echo 'wget url' | at 01:00 定时启动wget下载
awk -F'^"|", "|"$' '{ print $2,$3,$4 }' file.csv 用 awk 解析.csv
find -type f -exec mv {} . \; 将子目录的所有内容都移动到当前目录
sed -i 's/\s\+$//' <file> 删除文件中每行末尾的空格
ls -al | sort +4n 按大小排序
sort file1 file2 | uniq -d 求交集
wget -r -nd -q -A "*.ext" http://www.example.org/   抓去一个网页的所有特定扩展名的文件
awk '{s+=$1}END{print s}'   列求和
```
