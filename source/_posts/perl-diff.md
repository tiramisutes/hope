title: 用于比较两个文件不同的行差集
date: 2015-07-29 22:39:49
tags: perl_diff
categories: Bioinformatics
---
这个脚本用于求两个文件不同的行所构成的差集，即A中存在而B中不存在的行，及B中存在而A中不存在的行.
代码：
``` bash
#!/usr/bin/perl -w
use strict;

my ($fileA,$fileB) = @ARGV;

open A,'<',$fileA or die "Unable to open file:$fileA:$!";
my %ta;
my $i; 
while(<A>){
  chomp;
  $ta{$_} = ++$i; 
}

close A;

open B,'<',$fileB or die "Unable to open file:$fileB:$!";
my @B; 
while(<B>){
    chomp;
    unless (defined $ta{$_}){
        push @B,$_;
    }else{
        $ta{$_} = 0;
    }   
}
close B;

# Output diff to different files respectively

open DIFF_A, ">$fileA.diff" or die "Unable to create diff file for $fileA:$!";
my $countA;
print "Remain in files $fileA\n";
my %tt = reverse %ta;

foreach (keys %tt) {
    $countA += $_>0? print DIFF_A $tt{$_}."\n":0;
}

print "$countA lines\n";

close DIFF_A;

open DIFF_B, ">$fileB.diff" or die "Unable to create diff file for $fileB:$!";
my $countB = scalar @B; 
print DIFF_B $_."\n" foreach @B; 

if ($countA == 0 and $countB ==0 ){
    print STDOUT "The two files are identical\n";
}

close DIFF_B;
```