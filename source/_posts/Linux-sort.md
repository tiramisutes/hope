title: Linux-sort
date: 2015-07-25 14:21:10
tags: Linux
categories: Linux
---
Sort is a Linux program used for printing lines of input text files and concatenation of all files in sorted order. Sort command takes blank space as field separator and entire Input file as sort key. It is important to notice that sort command don't actually sort the files but only print the sorted output, until your redirect the output.

This article aims at deep insight of Linux 'sort' command with 14 useful practical examples that will show you how to use sort command in Linux.

### First we will be creating a text file (tecmint.txt) to execute 'sort' command examples. Our working directory is '/home/$USER/Desktop/tecmint.

The option '-e' in the below command enables interpretion of backslash and /n tells echo to write each string to a new line.

``` bash
$ echo -e "computer\nmouse\nLAPTOP\ndata\nRedHat\nlaptop\ndebian\nlaptop" > tecmint.txt
```
### Before we start with 'sort' lets have a look at the contents of the file and the way it look.
``` bash
$ cat tecmint.txt
```

### Now sort the content of the file using following command.
``` bash
$ sort tecmint.txt
```
Note: The above command don't actually sort the contents of text file but only show the sorted output on terminal.

### Sort the contents of the file 'tecmint.txt' and write it to a file called (sorted.txt) and verify the content by using cat command.
``` bash
$ sort tecmint.txt > sorted.txt
$ cat sorted.txt
```

### Now sort the contents of text file 'tecmint.txt' in reverse order by using '-r' switch and redirect output to a file 'reversesorted.txt'. Also check the content listing of the newly created file.
``` bash
$ sort -r tecmint.txt > reversesorted.txt
$ cat reversesorted.txt
```

### We are going a create a new file (lsl.txt) at the same location for detailed examples and populate it using the output of 'ls -l' for your home directory.
``` bash
$ ls -l /home/$USER > /home/$USER/Desktop/tecmint/lsl.txt
$ cat lsl.txt
```

Now will see examples to sort the contents on the basis of other field and not the default initial characters.

### Sort the contents of file 'lsl.txt' on the basis of 2nd column (which represents number of symbolic links).
``` bash
$ sort -nk2 lsl.txt
```
Note: The '-n' option in the above example sort the contents numerically. Option '-n' must be used when we wanted to sort a file on the basis of a column which contains numerical values.


### Sort the contents of file 'lsl.txt' on the basis of 9th column (which is the name of the files and folders and is non-numeric).
``` bash
$ sort -k9 lsl.txt
```
### It is not always essential to run sort command on a file. We can pipeline it directly on the terminal with actual command.
``` bash
$ ls -l /home/$USER | sort -nk5
```

### Sort and remove duplicates from the text file tecmint.txt. Check if the duplicate has been removed or not.
``` bash
$ cat tecmint.txt
$ sort -u tecmint.txt
```

Rules so far (what we have observed):
``` bash
Lines starting with numbers are preferred in the list and lies at the top until otherwise specified (-r).
Lines starting with lowercase letters are preferred in the list and lies at the top until otherwise specified (-r).
Contents are listed on the basis of occurrence of alphabets in dictionary until otherwise specified (-r).
Sort command by default treat each line as string and then sort it depending upon dictionary occurrence of alphabets (Numeric preferred; see rule – 1) until otherwise specified.
```
### Create a third file 'lsla.txt' at the current location and populate it with the output of 'ls -lA' command.
``` bash
$ ls -lA /home/$USER > /home/$USER/Desktop/tecmint/lsla.txt
$ cat lsla.txt
```

Those having understanding of 'ls' command knows that 'ls -lA'='ls -l' + Hidden files. So most of the contents on these two files would be same.

### Sort the contents of two files on standard output in one go.
``` bash
$ sort lsl.txt lsla.txt
```

Notice the repetition of files and folders.

### Now we can see how to sort, merge and remove duplicates from these two files.
``` bash
$ sort -u lsl.txt lsla.txt
 ```

Notice that duplicates has been omitted from the output. Also, you can write the output to a new file by redirecting the output to a file.

### We may also sort the contents of a file or the output based upon more than one column. Sort the output of 'ls -l' command on the basis of field 2,5 (Numeric) and 9 (Non-Numeric).
``` bash
$ ls -l /home/$USER | sort -t "," -nk2,5 -k9
```

That's all for now. In the next article we will cover a few more examples of 'sort' command in detail for you. Till then stay tuned and connected to Tecmint. Keep sharing. Keep commenting. Like and share us and help us get spread.

More info: [sort](http://www.tecmint.com/sort-command-linux/)