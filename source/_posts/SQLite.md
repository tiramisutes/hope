title: SQLite数据库简单操作
date: 2016-03-22 13:43:04
tags: SQLite
categories: Bioinformatics
---
##SQLite数据库整体查询命令
###dot-commands
``` bash
$sqlite3 
sqlite> .help
.backup ?DB? FILE      Backup DB (default "main") to FILE
.bail ON|OFF           Stop after hitting an error.  Default OFF
.databases             List names and files of attached databases
.dump ?TABLE? ...      Dump the database in an SQL text format
                         If TABLE specified, only dump tables matching
                         LIKE pattern TABLE.
.echo ON|OFF           Turn command echo on or off
.exit                  Exit this program
.explain ON|OFF        Turn output mode suitable for EXPLAIN on or off.
.genfkey ?OPTIONS?     Options are:
                         --no-drop: Do not drop old fkey triggers.
                         --ignore-errors: Ignore tables with fkey errors
                         --exec: Execute generated SQL immediately
                       See file tool/genfkey.README in the source 
                       distribution for further information.
.header(s) ON|OFF      Turn display of headers on or off
.help                  Show this message
.import FILE TABLE     Import data from FILE into TABLE
.indices ?TABLE?       Show names of all indices
                         If TABLE specified, only show indices for tables
                         matching LIKE pattern TABLE.
.load FILE ?ENTRY?     Load an extension library
.mode MODE ?TABLE?     Set output mode where MODE is one of:
                         csv      Comma-separated values
                         column   Left-aligned columns.  (See .width)
                         html     HTML <table> code
                         insert   SQL insert statements for TABLE
                         line     One value per line
                         list     Values delimited by .separator string
                         tabs     Tab-separated values
                         tcl      TCL list elements
.nullvalue STRING      Print STRING in place of NULL values
.output FILENAME       Send output to FILENAME
.output stdout         Send output to the screen
.prompt MAIN CONTINUE  Replace the standard prompts
.quit                  Exit this program
.read FILENAME         Execute SQL in FILENAME
.restore ?DB? FILE     Restore content of DB (default "main") from FILE
.schema ?TABLE?        Show the CREATE statements
                         If TABLE specified, only show tables matching
                         LIKE pattern TABLE.
.separator STRING      Change separator used by output mode and .import
.show                  Show the current values for various settings
.tables ?TABLE?        List names of tables
                         If TABLE specified, only list tables matching
                         LIKE pattern TABLE.
.timeout MS            Try opening locked tables for MS milliseconds
.width NUM NUM ...     Set column widths for "column" mode
.timer ON|OFF          Turn the CPU timer measurement on or off
```
##SQLite数据类型
<li>text</li>
<li>integer </li>
<li>real </li>
<li>NULL, used for missing data, or no value </li>
<li>BLOB, which stands for binary large object, and stores any type of object as bytes </li>
注：SQLite并没有强制同列必须使用相同类型的数据，每个表的每一列都有优先类型（type affinity），但为了下游分析方便，最好同一列保持相同数据类型。
当某一列是混合数据类型时，排序原则为：NULL values, integer and real values (sorted numerically), text values, and finally blob values。
##数据库内容查询
###万能的SELECT命令
语法：
``` bash
SELECT <columns> FROM <tablename>;
```
基本形式：SELECT选择指令从一个table中抓取所有列的所有行（columns设定为<code>*</code>）。
选取特定列：不同列之间逗号分隔（SELECT trait, chrom, position, strongest_risk_snp, pvalue FROM gwascat LIMIT 5;）
SELECT语句除了在sqlite中交互查询外，还可在命令行中直接查询
``` bash
#交互
sqlite> SELECT * FROM gwascat;
#命令行
sqlite3 gwascat.db "SELECT * FROM gwascat" > results.txt
```
<i class="fa fa-commenting-o"></i>SQLite默认输出不规则，可做以下设置输出排列整齐易读输出：
``` bash
sqlite> SELECT trait, chrom, position, strongest_risk_snp, pvalue
   ...> FROM gwascat LIMIT 5;
trait|chrom|position|strongest_risk_snp|pvalue
Asthma and hay fever|6|32658824|rs9273373|4.0e-14
Asthma and hay fever|4|38798089|rs4833095|5.0e-12
Asthma and hay fever|5|111131801|rs1438673|3.0e-11
Asthma and hay fever|2|102350089|rs10197862|4.0e-11
Asthma and hay fever|17|39966427|rs7212938|4.0e-10
sqlite> .header on
sqlite> .mode column
sqlite> SELECT trait, chrom, position, strongest_risk_snp, pvalue
   ...> FROM gwascat LIMIT 5;
trait                 chrom       position    strongest_risk_snp  pvalue
--------------------  ----------  ----------  ------------------  ----------
Asthma and hay fever  6           32658824    rs9273373           4.0e-14
Asthma and hay fever  4           38798089    rs4833095           5.0e-12
Asthma and hay fever  5           111131801   rs1438673           3.0e-11
Asthma and hay fever  2           102350089   rs10197862          4.0e-11
Asthma and hay fever  17          39966427    rs7212938           4.0e-10
```
<i class="fa fa-cog fa-spin"></i>SELECT可选参数：
LIMIT	输出查询行数
``` bash
sqlite> SELECT * FROM gwascat LIMIT 2;
```
ORDER BY 	输出结果排序
``` bash
SELECT author, trait, journal FROM <tablename> ORDER BY author DESC LIMIT 5; 
#（按author降序排序），排序有助于异常值检测。
#若所指定排序列含由NULL值，可通过 IS NOT NULL 排除NULL值
SELECT chrom, position, trait, strongest_risk_snp, pvalue FROM  <tablename> WHERE pvalue IS NOT NULL ORDER BY pvalue LIMIT 5;
```
WHERE	数据筛选
``` bash
SELECT chrom, position, trait, strongest_risk_snp, pvalue FROM <tablename> WHERE lower(strongest_risk_snp) = "rs429358";
#SQLite大小写敏感，所以匹配时最好用lower() 转换。
```
多条件筛选：
``` bash
sqlite> SELECT chrom, position, strongest_risk_snp, pvalue FROM gwascat
   ...> WHERE chrom IN ("1", "2", "3") AND pvalue < 10e-11
   ...> ORDER BY pvalue LIMIT 5;
#或者
sqlite> SELECT chrom, position, strongest_risk_snp, pvalue
   ...> FROM gwascat WHERE chrom = "22"
   ...> AND position BETWEEN 24000000 AND 25000000
   ...> AND pvalue IS NOT NULL ORDER BY pvalue LIMIT 5;
```
AS	对原始数据的修改：
``` bash
sqlite> SELECT lower(trait) AS trait,
   ...> "chr" || chrom || ":" || position AS region FROM gwascat LIMIT 5;
#||为连接运算符，用来连接两个字符串
#NULL的替换，ifnull()函数
sqlite> SELECT ifnull(chrom, "NA") AS chrom, ifnull(position, "NA") AS position,
   ...> strongest_risk_snp, ifnull(pvalue, "NA") AS pvalue FROM gwascat
   ...> WHERE strongest_risk_snp = "rs429358";
```
<i class="fa fa-cutlery"></i>更多SQLite内置函数
Function	Description
ifnull(x, val)	If x is NULL, return with val, otherwise return x; shorthand for coalesce() with two arguments
min(a, b, c, …)	Return minimum in a, b, c, …
max(a, b, c, …)	Return maximum in a, b, c, …
abs(x)	Absolute value
coalesce(a, b, c, ...)	Return first non-NULL value in a, b, c, … or NULL if all values are NULL
length(x)	Returns number of characters in x
lower(x)	Return x in lowercase
upper(x)	Return x in uppercase
replace(x, str, repl)	Return x with all occurrences of str replaced with repl
round(x, digits)	Round x to digits (default 0)
trim(x, chars), ltrim(x, chars), rtrim(x, chars)	Trim off chars (spaces if chars is not specified) from both sides, left side, and right side of x, respectively.
substr(x, start, length)	Extract a substring from x starting from character start and is length characters long
###集合函数（Aggregate）
count(colname)函数：
返回总行数（无视NULL的存在）：sqlite> SELECT count(*) FROM gwascat;
若colname是具体某列则返回出去NULL值的总行数.
其他相似函数：avg(x),max(x),min(x),sum(x),total(x)
<i class="fa fa-modx"></i>计算列非重复值(unique)个数
``` bash
sqlite> SELECT count(DISTINCT 列) AS unique_rs FROM gwascat;
```
###行分组(GROUP BY)
``` bash
sqlite> SELECT chrom, count(*) FROM gwascat GROUP BY chrom;
chrom       count(*)
----------  ----------
            70
1           1458
10          930
11          988
12          858
13          432
[...]
#列重命名，降序，分组计算
sqlite> SELECT chrom, count(*) as nhits FROM gwascat GROUP BY chrom
   ...> ORDER BY nhits DESC;
chrom       nhits
----------  ----------
6           1658
1           1458
2           1432
3           1033
11          988
10          930
[...]
#多列分组，不同列之间逗号分隔
sqlite> select strongest_risk_snp, strongest_risk_allele, count(*) AS count
   ...> FROM gwascat GROUP BY strongest_risk_snp, strongest_risk_allele
   ...> ORDER BY count DESC LIMIT 10;
strongest_risk_snp  strongest_risk_allele  count
------------------  ---------------------  ----------
rs1260326           T                      22
rs2186369           G                      22
rs1800562           A                      20
rs909674            C                      20
rs11710456          G                      19
```
##自己动手写数据库
we'll use the basic SQL syntax to create tables and insert records into tables. Then load data into SQLite using Python's sqlite3 module.
###创建tables
基本语法：
``` bash
CREATE TABLE tablename(
  id integer primary key,
  column1 column1_type,
  column2 column2_type,
  ...
);
```
注意到所有SQLite数据库第一列总是id integer primary key，primary key是非重复整数来识别table中每一条记录。
创建table：
``` bash
$ sqlite3 practice.dbsqlite> CREATE TABLE variants(
   ...>   id integer primary key,
   ...>   chrom text,
   ...>   start integer,
   ...>   end integer,
   ...>   strand text,
   ...>   name text);
```
###数据写入table
基本语法：
``` bash
INSERT INTO tablename(column1, column2)
VALUES (value1, value2);
```
###建立索引
基本语法：
``` bash
sqlite> CREATE INDEX <columns-name_idx> ON <tablename>(<columns-name>);
#察看索引
sqlite> .indices
columns-name_idx
#删除索引
sqlite> DROP INDEX columns-name_idx;
```
###修改/删除table
删除：DROP TABLE 
修改：ALTER TABLE
##python中交互操作SQLite
###连接SQLite数据库并创建table
create_table.py
``` bash
import sqlite3

# the filename of this SQLite database
db_filename = "variants.db"

# initialize database connection
conn = sqlite3.connect(db_filename) #connect() 连接数据库

c = conn.cursor() #在python中用cursor()与SQLite数据库交互

table_def = """\ 
CREATE TABLE variants(
  id integer primary key,
  chrom test,
  start integer,
  end integer,
  strand text,
  rsid text);
"""

c.execute(table_def)  #SQL语法，相当于确认
conn.commit()  #提交跟新内容到SQLite数据库
conn.close()   #关闭与数据库的连接
```
###数据载入table
load_variants.py
``` bash
##load_variants.py data.txt
import sys
import sqlite3
from collections import OrderedDict

# the filename of this SQLite database
db_filename = "variants.db"

# initialize database connection
conn = sqlite3.connect(db_filename)
c = conn.cursor()

## Load Data
# columns (other than id, which is automatically incremented
tbl_cols = OrderedDict([("chrom", str), ("start", int), 
                        ("end", int), ("strand", str),
                        ("rsid", str)])

with open(sys.argv[1]) as input_file:
    for line in input_file:
        # split a tab-delimited line
        values = line.strip().split("\t")

        # pair each value with its column name
        cols_values = zip(tbl_cols.keys(), values)
		# use the column name to lookup an appropriate function to coerce each
        # value to the appropriate type
        coerced_values = [tbl_cols[col](value) for col, value in cols_values]

        # create an empty list of placeholders
        placeholders = ["?"] * len(tbl_cols)

        # create the query by joining column names and placeholders quotation
        # marks into comma-separated strings
        colnames = ", ".join(tbl_cols.keys())
        placeholders = ", ".join(placeholders)
        query = "INSERT INTO variants(%s) VALUES (%s);"%(colnames, placeholders)

        # execute query
        c.execute(query, coerced_values)

conn.commit() # commit these inserts
conn.close()
```
