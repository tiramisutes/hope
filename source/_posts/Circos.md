title: Circos安装和使用
Total word: WordCount
Read time: Min2Read
date: 2017-05-29 17:51:59
tags: Circos
categories: Bioinformatics
---
##安装主页
![](http://i.imgur.com/XrKrXqj.jpg)
##### [安装主页](http://www.circos.ca/documentation/tutorials/configuration/)
##### [已发表文章circos图](http://circos.ca/images/scientific_literature/)(http://circos.ca/in_literature/scientific/)
##### [教程和数据下载](http://www.circos.ca/software/download/tutorials/)
##### [Creating Circos Plots](http://jura.wi.mit.edu/bio/education/hot_topics/Circos/Circos.pdf)
<!--more-->
---
###[下载最新版circos](http://circos.ca/software/download/circos/)
```
$ wget http://circos.ca/distribution/circos-0.69-4.tgz
$ tar -xzvf circos-0.69-4.tgz
```
###[检查perl模块缺失情况](http://www.circos.ca/documentation/tutorials/configuration/perl_and_modules/)
```
$ cd circos-0.69-4
$ bin/circos -modules
ok       1.38 Carp
ok       0.38 Clone
missing            Config::General
ok        3.3 Cwd
ok      2.154 Data::Dumper
ok       2.39 Digest::MD5
ok       2.77 File::Basename
ok        3.3 File::Spec::Functions
ok       0.22 File::Temp
ok       1.50 FindBin
ok       0.39 Font::TTF::Font
ok       2.44 GD
ok        0.2 GD::Polyline
ok       2.38 Getopt::Long
ok       1.14 IO::File
ok      0.416 List::MoreUtils
ok       1.46 List::Util
ok       0.01 Math::Bezier
ok       1.60 Math::BigFloat
ok       0.07 Math::Round
ok       0.08 Math::VecStat
ok    1.01_03 Memoize
ok       1.17 POSIX
missing            Params::Validate
ok       1.36 Pod::Usage
missing            Readonly
ok 2016060801 Regexp::Common
missing            SVG
missing            Set::IntSpan
missing            Statistics::Basic
ok       2.20 Storable
ok       1.11 Sys::Hostname
ok      2.0.0 Text::Balanced
missing            Text::Format
ok     1.9721 Time::HiRes

```
`cpanm`来安装缺失模块
###检测GD是否能用于画图，最终能生成diag.png文件
```
bin/gddiag
```
###检测circos最终是否正确安装
```
bin/circos -help
```
或者
```
cd example
./run
```
将在当前example目录下生成如下circos.png图和run.out记录屏幕输出
![](http://i.imgur.com/ZkOgjPN.jpg)
###Circos的使用
```
circos -conf etc/circos.conf
```
###参数解释如下：
```
-version             查询circos版本
-modules             检测perl模块
-conf <string>       输入主配置文件
```
详细参数见：[COMMAND LINE PARAMETERS](http://www.circos.ca/documentation/tutorials/reference/command_line/)
`image.generic.conf` 配置文件设置图形输出文件夹和名称；
###[Circos配置文件详解](https://www.plob.org/article/8424.html)

Circos的使用主要通过输入一个主配置文件`circos.conf` 和 若干其他类型的配制文件。
该主配置文件的内容格式主要以各种区块表示，大区块中可以包含小区块。
此外，有些配置信息一般不需要改动，比如颜色，字体等。我们一般将这类信息保存到一个独立的配置文件中。只需要在主配置文件中通过include声明包含这些独立的配置文件名，即表示使用其配置信息。
例如，最常用的放置到主配置文件头部的数行包括：
- 基因组染色体组型数据文件karyotype
```
<<include karyotype.and.layout.conf>>
```

例如，最常用的放置到主配置文件尾部的数行包括：
- 设置生成的图片参数
```
<image>
<<include etc/image.conf>>
</image>
```
- 设置颜色，字体，填充模式的配置信息
```
<<include etc/colors_fonts_patterns.conf>>
```
- 系统与debug参数
```
<<include etc/housekeeping.conf>>
```

**一般绘图需要以下配置文件：**

| conf配置文件                   | 内容和作用说明                |
| -------------------------- | ---------------------- |
| circos.conf                | 主配置文件                  |
| karyotype.and.layout.conf  | 基因组染色体组型数据             |
| ideogram.conf              | 描述基因组染色体组型数据中染色体展示形式   |
| ticks.conf                 | 描述基因组染色体组型数据中染色体大小展示形式 |
| image.conf                 | 生成图片参数                 |
| highlight.conf             | 基因组染色体组型数据             |
| colors_fonts_patterns.conf | 颜色，字体，填充模式的配置信息        |
| ousekeeping.conf           | 系统与debug参数             |

**运行`circos -conf etc/circos.conf`程序时，circos先从circos.conf所在路径文件夹下搜索所需的配置文件**
##1. `karyotype.and.layout.conf ` 指定主要数据配置文件
- **karyotype 染色体组型**
  - 指定基因组 karyotype文件存放路径
  - karyotype 文件定义 names, sizes and colors of chromosomes that you will use in the image.
```shell
#指定染色体组型的文件
karyotype = data/karyotype/karyotype.human.txt,data/karyotype/karyotype.mouse.txt,data/karyotype/karyotype.rat.txt
chromosomes_order_by_karyotype = yes
# 设置长度单位，以下设置表示 1M 长度的序列代表为 1u
chromosomes_units              = 1000000
默认设置下是将 karyotype 文件中所有的染色体都展示出来。当然，也可能根据需要仅展示指定的 chromosomes, 使用如下的参数进行设置
chromosomes_display_default    = no
# 以下参数设置指定的 chromosomes 用于展示到圈图中。// 中是一个正则表达式，匹配的 chromosomes 用于展示到圈图中。其匹配的对象是 karyotype 文件中的第 3 列。也可以直接列出需要展示的 chromosomes， 例如：hs1;hs2;hs3;hs4 。
#chromosomes         = -/[XY]/;-/hs(1[1-9]|2\d)$/;-/rn/;-/mm/;rn1;mm1
chromosomes          = -/[XY]/;-/rn/;-/mm/;rn1;mm1
#chromosomes         = hs4;hs3;hs5;hs7;hs8;hs12;hs6;hs11;hs14;hs13;mm1
#chromosomes_order   = hs1,hs2,mm2,mm1
#设置各个 ideograms 的颜色，karyotype 文件最后一列指定了各个 chromosomes 的颜色，而使用 chromosomes_color 参数也能修改颜色。
chromosomes_color    = /mm/=blues-5-seq-4,/rn/=reds-5-seq-4
#使 hs2， hs3 和 hs4 在圈图上的展示方向是反向的。
chromosomes_reverse  = /hs[234]/
# rn1 and mm1 scaled to each occupy 1/4 of the figure
# 以下设置各个 ideograms 的大小。其总长度为 1 ，hs1 的长度为 0.5， hs2，hs3 和 hs4 这 3 个 chromosomes 的总长度为 0.5，并且这 3 个 chromosomes 的长度是分布均匀的。注意前者的单位是 r， 后者使用了正则表达式对应多个 chromosomes， 其单位于是为 rn 。
chromosomes_scale   = rn1=0.25r,mm1:0.25r
# /hs/=0.5rn - relative scaling, normalized by number of ideograms matching /hs/
#              this is equivalent to /hs/=0.0227r (0.5/22).
#chromosomes_scale   = /hs/=0.5rn
#默认下在 ideogram.conf 中统一设置了 ideogram 的位置，可以使用此参数调整指定 ideogram 的位置。
chromosomes_radius = hs2:1.05r;hs3:1.20r;hs4:1.35r;hs5:1.15r;hs6:1.05r
# karyotype 文件最后一列指定了各个 chromosomes 的颜色，而使用 chromosomes_color 参数也能修改颜色。当然，使用如下方式进行颜色的修改，则更加直观。以下方式是对颜色重新进行定义。chr1，chr2，chr3 和 chr4 对应着 karyotype 文件最后一列的值，代表着颜色的类型。此处使用 color block 来对其进行重新定义。注意重新定义的时候需要加符号 * 
<colors>
chr1* = red
chr2* = orange
chr3* = green
chr4* = blue
</colors>
```
![](http://i.imgur.com/JK17z8t.png)
- **染色体组型数据文件格式和内容**
  - [x] 内容: [制作自己基因组的karyotype file](http://circos.ca/documentation/tutorials/ideograms/karyotype)
  - [x]脚本制作自己的karyotype文件，其中的颜色值可从`/public/home/zpxu/bin/circos-0.69-4/etc/colors.unix.txt` 或 `/public/home/zpxu/bin/circos-0.69-4/etc/colors.ucsc.conf`文件中选取

```
#染色体 -   染色体编号(ID) 图显示名称(Label)     起始   结束    颜色
chr -   Gmax01  1   0   56831624    chr1
chr -   Gmax02  2   0   48577505   	chr2
chr -   Gmax03  3   0   45779781    chr3
```
  - [x] 解释:
```
染色体：chr，这一列定义表明这是一个染色体；
   - ：短线占位符，这个占位符通常用来定义所属关系，对于染色体来说，没有所属；
染色体编号(ID)： ID是染色体唯一且不能重复的标识。如果一个染色体组型文件里面包含多个不同来源的染色体组，设置ID最好的办法就是使用前缀。
                    比如hs=homo sapiens, mm=mus musculus等等。有时候你可以使用hs19做为前缀来明示数据来源版本。
                    其实，即使是只有一个来源的染色体组，也最好使用前缀，以规范文件格式。
                    比如上面的示例，就是我绘图的大豆的基因组，因而我在设置染色体编号（ID）的时候，使用了Gmax01 …的格式，
                    自己可以根据自己的染色体来设置。
图显名称(Label)：是将来用于显示在图上的文本。Label主要是在图中显示的名称，我这里就直接使用1,2, …表示，
                    但是如果有多个物种的基因组，或者来自不同的样品，品系的，还是要加以区分。
起始、结束(START和END)：定义了染色体的大小。
                    对于染色体组型文件，需要指明的是，这里的START和END应该是染色体本身的大小，而不是你想绘制部分的起止位置。
                    对于指定绘制部分将由其它文件来定义。
颜色(COLOR)：是于定义显示的颜色。如果染色体组不以条纹(cytogenetic bands)图谱覆盖的话，那么就会以这里设置的颜色显示。
                对于人类基因组而言，circos预设了与染色体相同的名字做为颜色名，比如chr1, chr2, … chrX, chrY, chrUn.
```
  - [x] 关于染色体上加上条纹图谱的信息：**可选内容**
  - [x] 一般的，我们都会在染色体组型文件当中加上条纹图谱的信息，这样才会让染色体图谱看上去有被染色的效果。文件格式与之前的一致，也只有七列。这里的DOMAIN就是染色体组型当中的ID就好了，其它的定义与前面的一致。下面就是一个例子。
```
band    DOMAIN  ID  LABEL   START   END COLOR
band    hs1     p36.33  p36.33  0   2300000     gneg
band    hs1     p36.32  p36.32  2300000     5400000     gpos25
band    hs1     p36.31  p36.31  5400000     7200000     gneg
band    hs1     p36.23  p36.23  7200000     9200000     gpos25
band    hs1     p36.22  p36.22  9200000     12700000    gneg
```
  - [x] cytogenetic bands的名称例子：1p36.33
  - [x] 其命名规则是之前的数字、字母为染色体代号，一般是数字或者X,Y。而之后会有字母p或者q。p代表短臂，q代表长臂。而每个band都会有颜色深浅的不同，这里主要以gpos和gneg来区别。为了和真实值更接近，circos还定义了一系列的灰度。
  ![](http://i.imgur.com/YyH4sq4.jpg)[![alt text](http://i.imgur.com/lFmo23A.jpg)](http://miss.ieph.net/archives/628)
- **自己额外显示的数据文件**
  - SNP的密度显示track，那么就拿这样一个track来做一个示例：
```
#染色体编号 起始位置    终止位置    value
Gmax01  0   999999  0.000301
Gmax01  1000000     1999999     0.001321
Gmax01  2000000     2999999     0.001050
Gmax01  3000000     3999999     0.003027
```
  - 文件内容解释：
```
染色体编号：一定要与基因组信息文件中的染色体编号保持一致，不然绘图的时候会出错；
起始位置、终止位置：这是你要统计的这个区段的的范围；
value：则是值，根据情况，比如我这里是统计的SNP的密度，那么这个值就是在这个染色体区段范围类，染色体的密度，
           如果是统计数量，那么这个值就是数目。
```
  - 每个track都有自己对应的数据，而且不同的绘图类型，所需要的数据结构可能都不一样，这时你就需要根据自己的需求来准备数据文件。
  - 不同显示数据的track对应的数据文件的格式，其实数据的格式都很好理解，如果你想绘制什么样的图，可以在官网上找到相关的数据类型结构，你只要根据这个结构来做好你的数据，就没什么问题。

## 2. `ideogram.conf` 显示染色体：不需要额外指定文件
将染色体在圈图上展示出来，代表每个染色体的图形，称为ideogram。
更详细解释见：[circos绘图ideogram.conf文件的配置](https://www.plob.org/article/10638.html) 和 [Circos系列教程（二）染色体示意图ideograms](http://blog.qiubio.com:8080/archives/2519)(有各种细节修改解释)
```
<ideogram>

### 设定 ideograms 之间的空隙
<spacing>
# 设置圈图中染色体之间的空隙大小，以下设置为每个空隙大小为周长的 0.5%
default = 0.005r

# 也可以设置指定两条染色体之间的空隙
#<pairwise hsY;hs1>
# 以下设定为两条染色体之间的空隙约为圆的 20 度角。
#spacing = 20r
#</pairwise>

</spacing>

## 设定 ideograms 
# 设定 ideograms 的位置，以下设定 ideograms 在图离圆心的 90% 处，修改染色体圆圈的大小，即空出较多边缘空间
radius           = 0.90r
# 设定 ideograms 的厚度，可以使用 r（比例关系） 或 p（像素）作为单位
thickness        = 20p
# 设定 ideograms 是否填充颜色。填充的颜色取决于 karyotype 指定的文件的最后一列。
fill             = yes
# 设定 ideograms 轮廓的颜色及其厚度。如果没有该参数或设定其厚度为0，则表示没有轮廓。
stroke_color     = dgrey
stroke_thickness = 2p

## 设定 label 的显示
# 设定是否显示 label 。 label 对应着 karyotype 文件的第 4 列。如果其值为 yes，则必须要有 label_radius 参数来设定 label 的位置，否则会报错并不能生成结果。
show_label       = yes
# 设定 label 的字体
label_font       = default
# 设定 label 的位置
label_radius     = 1r+90p
# 设定 label 的字体大小
label_size       = 40
# 设定 label 的字体方向，yes 是易于浏览的方向。
label_parallel   = yes

</ideogram>
```
### 染色体标签显示：[LABELS](http://www.circos.ca/documentation/tutorials/ideograms/labels/images)


## 3. `ticks.conf` 以刻度形式显示染色体大小：不需要额外指定文件
将染色体的大小以刻度的形式在圈图上展示出来。
![](http://i.imgur.com/LqhtHZN.png)
```
# 是否显示 ticks
show_ticks         = yes
# 是否显示 ticks 的 lables
show_tick_labels    = yes

## 设定 ticks
<ticks>
## ticks 的设置
# 设定 ticks 的位置
radius           = 1r
# 设定 ticks 的颜色
color            = black
# 设定 ticks 的厚度
thickness        = 2p
# 设定 ticks' label 的值的计算。将该刻度对应位置的值 * multiplier 得到能展示到圈图上的 label 值。
multiplier       = 1e-6
# label 值的格式化方法。%d 表示结果为整数；%f 结果为浮点数； %.1f 结果为小数点后保留1位； %.2f 结果为小数点后保留2位。
format           = %d

## 以下设置了 2 个 ticks，前者是小刻度，后者是大刻度。
<tick>
# 设置每个刻度代表的长度。若其单位为 u，则必须要设置 chromosomes_units 参数。比如设置 chromosomes_units = 1000000，则如下 5u 表示每个刻度代表 5M 长度的基因组序列。
spacing        = 5u
# 设置 tick 的长度
size           = 10p
</tick>

<tick>
spacing        = 25u
size           = 15p
# 由于设置的是大刻度，以下用于设置展示 ticks' label。
show_label     = yes
# 设置 ticks' label 的字体大小
label_size     = 20p
# 设置 ticks' label 离 ticks 的距离
label_offset   = 10p
format         = %d
</tick>

</ticks>
```
## 4. `links.conf ` 以曲线连接显示基因组内部区域之间的联系 ：需指定links文件
基因组内部不同的序列区域之间有联系，将之使用线条进行连接，从而展示到圈图上。常见的是重复序列之间的连接。
更多详细内容见：[Circos系列教程（四）连线 links](http://blog.qiubio.com:8080/archives/2554)
![](http://i.imgur.com/LpR2JnK.png)
### 数据结构
```
LABEL	ID	START	END
segdup00001	hs1	465	30596
segdup00001	hs2	114046768	114076456
segdup00002	hs1	486	76975
segdup00002	hs15	100263879	100338121
```
这里的LABEL是连线的名称，因为两点确定一条线，所以基本上连线的数据都是同一个名称出现两行数据，分别记录线两端对应的染色体组位置。ID对应的是karyotypes数据文件当中的ID，start和end分别定义起始和终止的位置。
### 或者是：
```
ID1    START    END    ID2    START    END
A01 27231996 27234600 D01 19250453 19253070
A03 98657717 98660412 A13 3532356 3534210
A03 97671503 97673317 D02 64857836 64860545
A03 98657717 98660412 D02 65834252 65836940
```

### 配置文件
```
<links>

<link>
# 指定 link 文件的路径，其文件格式为：
# chr1  start   end     chr2    start   end
# hs1   465     30596   hs2     114046768       114076456
# 表明这两个染色体区域有联系，例如这个区域的序列长度>1kb且序列相似性>=90%。
file          = data/5/segdup.txt
# 设置 link 曲线的半径
radius        = 0.8r
# 设置贝塞尔曲线半径，该值设大后曲线扁平，使图像不太好看。
bezier_radius = 0r
# 设置 link 曲线的颜色
color         = black_a4
# 设置 link 曲线的厚度
thickness     = 2

<rules>
# 以下可以设置多个 rules，用来对 link 文件的每一行进行过滤或展示进行设定。每个 rule 都有一个 condition 参数；如果该 condition 为真，除非 flow=continue ，则不

# 如果 link 文件中该行数据是染色体内部的 link，则不对其进行展示
<rule>
condition     = var(intrachr)
show          = no
</rule>

# 设置 link 曲线的颜色与 ideogram 的颜色一致，否则为统一的颜色。
<rule>
# condition 为真，则执行该 block 的内容
condition     = 1
# 设置 link 曲线的颜色为第 2 条染色体的颜色。对应这 link 文件中第 4 列数据对应的染色体的名称
color         = eval(var(chr2))
# 虽然 condition 为真，但依然检测下一个 rule
flow          = continue
</rule>

# 如果 link 起始于 hs1，则其 link 曲线半径为 0.99r
<rule>
condition     = from(hs1)
radius1       = 0.99r
</rule>

# 如果 link 结束于 hs1，则其 link 曲线半径为 0.99r
<rule>
condition     = to(hs1)
radius2       = 0.99r
</rule>

</rules>

</link>

</links>
```
## 5. `plots_histogram.conf` 以直方图形式展示数据：需指定额外数据
将基因组序列的GC含量，表达量等以直方图的形式在圈图中展示出来。以下作了两个直方图，并对分别添上背景或网格线。
```
<plot>
# 设定为直方图
type = histogram
# 数据文件格式，为 4 列：
# chromosome	start	end	data
# hs1	0	1999999	180.0000
file = data/5/segdup.hs1234.hist.txt
# 设置直方图的位置，r1 要比 r0 大。直方图的方向默认为向外。
r1   = 0.88r
r0   = 0.81r
# 直方图的填充颜色
fill_color = vdgrey
# 默认下直方图轮廓厚度为 1px，若不需要轮廓，则设置其厚度为0，或在 etc/tracks/histogram.conf 中修改。
thickness = 0p
# 直方图是由 bins （条行框）所构成的。若 bins 在坐标上不相连，最好设置不要将其bins连接到一起。例如：
# hs1 10 20 0.5
# hs1 30 40 0.25
# 上述数据设置值为 yes 和 no 时，图形是不一样的。
extend_bin = no

# 以下添加 rule ，不在 hs1 上添加直方图。
<rules>
<<include exclude.hs1.rule>>
</rules>

# 设定直方图的背景颜色
<backgrounds>
show  = data

<background>
color = vvlgrey
</background>
<background>
color = vlgrey
y0    = 0.2r
y1    = 0.5r
</background>
<background>
color = lgrey
y0    = 0.5r
y1    = 0.8r
</background>
<background>
color = grey
y0    = 0.8r
</background>

</backgrounds>

</plot>

<plot>
type = histogram
# 此处直方图的数据文件第 4 列是多个由逗号分割的数值，需要制作叠加的直方图。
file = data/5/segdup.hs1234.stacked.txt
r1   = 0.99r
r0   = 0.92r
# 给 4 个值按顺序填充不同的颜色
fill_color  = hs1,hs2,hs3,hs4
thickness = 0p
orientation = in
extend_bin  = no

<rules>
<<include exclude.hs1.rule>>
</rules>

# 在直方图中添加坐标网格线
<axes>
show = data
thickness = 1
color     = lgrey

<axis>
spacing   = 0.1r
</axis>
<axis>
spacing   = 0.2r
color     = grey
</axis>
<axis>
position  = 0.5r
color     = red
</axis>
<axis>
position  = 0.85r
color     = green
thickness = 2
</axis>

</axes>

</plot>
```
## 6. `plots_heatmap.conf` 以热图形式显示数据 ：需额外指定数据
基因组一个区域内有多组数据时，适合以热图形式显示数据。比如基因表达量。
```
<plot>
# 绘制 heat map
type  = heatmap
# 设定数据文件路径。
#文件格式描述：文件有 5 列
# chrID start   end     data    class
# hs1 0 1999999 113.0000 id=hs1
# hs1 0 1999999 40.0000 id=hs4
# hs1 0 1999999 20.0000 id=hs2
# hs1 0 1999999 7.0000 id=hs3
file  = data/5/segdup.hs1234.heatmap.txt
# 设定图形所处位置
r1    = 0.89r
r0    = 0.88r
# 设定热图的颜色。颜色为 hs3 ，以及相应带不同透明程度的 5 种颜色。
color = hs1_a5,hs1_a4,hs1_a3,hs1_a2,hs1_a1,hs1
# 设定 scale_log_base 参数。计算颜色的方法如下：
# f = (value - min) / ( max - min )    热图中每个方块代表着一个值，并给予相应的颜色标示。一系列的值 [min,max] 对应一系列的颜色 c[n], i=0..N
# n = N * f ** (1/scale_log_base)
# 由上面两个公式计算出代表颜色的 n 值。
# 若 scale_log_base = 1，则数值与颜色的变化是线性的；
# 若 scale_log_base > 1，则颜色向小方向靠近；
# 若 scale_log_base < 1，则颜色向大方向靠近。
scale_log_base = 5

<rules>
<<include exclude.hs1.rule>>

# 仅显示 id = hs1 的数据
<rule>
condition = var(id) ne "hs1"
show      = no
</rule>

</rules>

</plot>

<plot>
type  = heatmap
file  = data/5/segdup.hs1234.heatmap.txt
r1    = 0.90r
r0    = 0.89r
color = hs2_a5,hs2_a4,hs2_a3,hs2_a2,hs2_a1,hs2
scale_log_base = 5

<rules>
<<include exclude.hs1.rule>>

<rule>
condition = var(id) ne "hs2"
show      = no
</rule>

</rules>

</plot>

<plot>
type  = heatmap
file  = data/5/segdup.hs1234.heatmap.txt
r1    = 0.91r
r0    = 0.90r
color = hs3_a5,hs3_a4,hs3_a3,hs3_a2,hs3_a1,hs3
scale_log_base = 5

<rules>
<<include exclude.hs1.rule>>

<rule>
condition = var(id) ne "hs3"
show      = no
</rule>

</rules>

</plot>

<plot>
type  = heatmap
file  = data/5/segdup.hs1234.heatmap.txt
r1    = 0.92r
r0    = 0.91r
color = hs4_a5,hs4_a4,hs4_a3,hs4_a2,hs4_a1,hs4
scale_log_base = 5

<rules>
<<include exclude.hs1.rule>>

<rule>
condition = var(id) ne "hs4"
show      = no
</rule>

</rules>

</plot>
```
## 7. `plots_text.conf` 以文本形式显示数据 ：需额外指定数据
若需要在圈图上显示一些基因的名称，此时需要以文本形式显示数据。
**参数的图形解释见 ：[6 — 2D DATA TRACKS](http://www.circos.ca/documentation/tutorials/2d_tracks/text_1/images)**
```
<plot>
# 显示出文字
type  = text
# 数据文件路径
file  = data/6/genes.labels.txt
# 显示在图形中的位置,r1值需大于r0值，r0 = 1r时表示标签显示在圆圈外；
# r1和r0间的差值空间是用来显示标签的区域，所以当所显示标签文本很长时必须加大这一空间，否则标签文本不能显示；
r1    = 0.8r
r0    = 0.6r
r0    = 1r
r1    = 1r+800p
# 标签的字体
label_font = light
# 标签大小
label_size = 12p
# 文字边缘的大小，设置较小则不同单词就可能会连接到一起了。
# padding  - text margin in angular direction
# rpadding - text margin in radial direction
rpadding   = 5p
# 设置是否需要在 label 前加一条线，用来指出 lable 的位置。
show_links     = no
link_dims      = 0p,2p,5p,2p,2p
link_thickness = 2p
link_color     = black

<rules>
<<include exclude.hs1.rule>>

# 设置 rule ，对 label 中含有字母 a 或 b 的特异性显示
<rule>
condition  = var(value) =~ /a/i
label_font = bold
flow       = continue
</rule>
<rule>
condition  = var(value) =~ /b/i
color      = blue
</rule>
</rules>

</plot>
```
### 生成自己的 text 数据文件
```
cat exon-ixon.gff3 | grep "mRNA" | \grep -v "scaff" | cut -f 1,4,5,9 | cut -f 1 -d\; | sed "s/ID=//g" | \
sort -k1,1V | sed "s/\t/ /g" > ../bin/circos-0.69-4/xzp/Gh.cysteine_proteinase.text.txt
```
更多关于这一部分的修改见：`/public/home/zpxu/bin/circos-0.69-4/circos-tutorials-0.67/tutorials/6/7` 目录；
### `label_snuggle` 解释
![](http://i.imgur.com/qsdpv6d.png)
### `max_snuggle_distance` 解释
![](http://i.imgur.com/VXdqigG.png)
## 8. `rules.conf` 放置常用的规则配置
## 9. `circos.conf` 主配置文件
在主配置文件 circos.conf 中，包含以上所需要的配置文件信息，则可以画出所需要的track。此外，可以设置一些全局的设置。
```
# 额外信息显示与否
show_links      = yes
show_highlights = yes
show_text       = yes
show_heatmaps   = yes
show_scatter    = yes
show_histogram  = yes
# 从外部引用来指定染色体组型文件
<<include karyotype.and.layout.conf>>

### 绘制 plot 图
<plots>

<<include plots_histogram.conf>>
<<include plots_heatmap.conf>>
<<include plots_text.conf>>

</plots>

<<include highlights.conf>>
<<include ideogram.conf>>
<<include ticks.conf>>
<<include links.conf>>

################################################################
# 插入必须的并不常修改的标准参数
<image>
<<include etc/image.conf>>
</image>
<<include etc/colors_fonts_patterns.conf>>
<<include etc/housekeeping.conf>>
```
>**circos配置的单位概念**
>一共有4种单位：p, r, u, b
>p表示像素，1p表示1像素
>r表示相对大小，0.95r表示95% ring 大小。
>u表示相对chromosomes_unit的长度，如果chromosomes_unit = 1000，则1u就是千分之一的染色体长度。
>b表示碱基，如果染色体长1M，那么1b就是百万分之一的长度。

## 特殊图形展示(带链接)

[![](http://i.imgur.com/nxyUHDW.png)](http://www.circos.ca/documentation/tutorials/ideograms/spacing_breaks/images)

## 参考链接
1. [Circos教程(二):基础使用](http://starsyi.github.io/2016/06/23/Circos%E6%95%99%E7%A8%8B%EF%BC%88%E4%BA%8C%EF%BC%89%E5%9F%BA%E7%A1%80%E4%BD%BF%E7%94%A8/)
2. [陈连福：Circos的安装和简单使用](http://www.chenlianfu.com/?p=2342)
3. [Circos tutorial](https://irenexzwen.gitbooks.io/hello-gitbook/content/)