title: 根据一个ID列表文件从一个fasta文件里面挑取符合要求的序列
date: 2015-07-29 13:53:40
tags: perl
categories: Bioinformatics
---
其中一个文件是ID列表，一个ID占一行，另一个文件是fasta格式的序列，一行是>开头的标记，旗下所有行都是该标记的内容，直到下一个>开头的标记
###Perl代码：
``` bash
#!/usr/bin/perl -w 
if( @ARGV != 2  ) 
{
    print "Usage: we need two files\n";
    exit 0;
}
 my $ID=shift @ARGV;
 my $fasta=shift @ARGV;
 open FH1,"<$ID" or die "can not open the file,$!";
while (<FH1>)
{
chomp;
$hash{$_}=1;
}
#读取第一个参数，ID列表，每一行的ID都扫描进去hash表
open FH2,"$fasta" or die "can not open the file,$!";
while(defined($line=<FH2>))
{
	chomp $line;
	if($line =~ />/)
	{
	$key = (split /\s/,$line)[0];
	$key =~ s/>//g;
	$flag = exists $hash{$key}?1:0;
	}#这个flag是用来控制这个标记下面的序列是否输出

	print $line."\n" if $flag == 0;

}
```