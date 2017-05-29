# hope

## 新建

``F:\hope\scripts\new.js``        hexo new 新建文章后自动用编辑器打开

## 备份

备份上传github命令
```r
git init
git add .
git commit -m "添加hexo源码文件作为备份"
git remote add origin https://github.com/tiramisutes/hope.git
git push -u origin master
```
现在在任何一台电脑上，只需要``git clone git@github.com:tiramisutes/hope.git``,即可完成将Hexo源文件复制到本地。
http://igeek.wang/2016/09/01/automatic-backup/

---

在本地编写完博客时，顺次执行以下命令，即可完成Hexo博客源文件的更新同步，保持Github上的hexo源码为最新版本。
```r
git add .
git commit -m "更新hexo源文件"
git push origin master
```
https://notes.wanghao.work/2015-07-06-自动备份Hexo博客源文件.html

---
然后每次更新博文并hexo deploy到服务器上之后，备份就自动启动并完成本地博客源文件的github备份。
=======
然后每次更新博文并hexo deploy到服务器上之后，备份就自动启动并完成本地博客源文件的github备份。
