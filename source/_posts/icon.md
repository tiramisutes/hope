title: Icons
date: 2015-10-07 13:56:31
tags: icon
categories: Hexo
---
<i class="fa fa-bullhorn fa-3x"></i> Setting up Font Awesome can be as simple as adding two lines of code to your website, or you can be a pro and
customize the LESS yourself! Font Awesome even plays nicely with<a href="http://getbootstrap.com">Bootstrap 3</a>!
##<i class="fa fa-pencil-square-o"></i>Paste the following code into the <head> section of your site's HTML.
``` bash
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
```
###如果font-awesome.min.css文件在本地，则按一下操作：
<i class="fa fa-hand-lizard-o"></i> 进入<i class="fa fa-chain-broken"></i> <a style="line-height: 1.5;" href="http://fontawesome.io/#modal-download" target="_blank">fontawesome</a>下载字体<i class="fa fa-font"></i>和相应的CSS<i class="fa fa-th"></i>文件。
![](http://7xk19o.com1.z0.glb.clouddn.com/font.png)
<p></p>
<i class="fa fa-hand-lizard-o"></i> 找到下载<i class="fa fa-download"></i>压缩文件<i class="fa fa-file-archive-o"></i>中的fonts<i class="fa fa-file"></i>和css<i class="fa fa-file"></i>文件夹，将其中内容拷贝<i class="fa fa-files-o"></i>到自己站点下。
![](http://7xk19o.com1.z0.glb.clouddn.com/font2.png)
``` bash
your blog address\themes\jacman\source\font   修改字体文件
your blog address\jacman\source\css    修改字体相应的css
```
<i class="fa fa-hand-lizard-o"></i> following code into the <head> section of your site's HTML.
``` bash
<link href="/css/font-awesome.min.css" rel="stylesheet">  
```
##<i class="fa fa-pencil-square-o"></i>Examples
###Basic Icons
<i class="fa fa-camera-retro"></i> fa-camera-retro
``` bash
<i class="fa fa-camera-retro"></i> fa-camera-retro
```
###Larger Icons
<i class="fa fa-camera-retro fa-lg"></i> fa-lg
<i class="fa fa-camera-retro fa-2x"></i> fa-2x
<i class="fa fa-camera-retro fa-3x"></i> fa-3x
<i class="fa fa-camera-retro fa-4x"></i> fa-4x
<i class="fa fa-camera-retro fa-5x"></i> fa-5x
``` bash
<i class="fa fa-camera-retro fa-lg"></i> fa-lg
<i class="fa fa-camera-retro fa-2x"></i> fa-2x
<i class="fa fa-camera-retro fa-3x"></i> fa-3x
<i class="fa fa-camera-retro fa-4x"></i> fa-4x
<i class="fa fa-camera-retro fa-5x"></i> fa-5x
```
###Fixed Width Icons
  <a class="list-group-item" href="#"><i class="fa fa-home fa-fw"></i>&nbsp; Home</a>
  <a class="list-group-item" href="#"><i class="fa fa-book fa-fw"></i>&nbsp; Library</a>
  <a class="list-group-item" href="#"><i class="fa fa-pencil fa-fw"></i>&nbsp; Applications</a>
  <a class="list-group-item" href="#"><i class="fa fa-cog fa-fw"></i>&nbsp; Settings</a>
``` bash
<div class="list-group">
  <a class="list-group-item" href="#"><i class="fa fa-home fa-fw"></i>&nbsp; Home</a>
  <a class="list-group-item" href="#"><i class="fa fa-book fa-fw"></i>&nbsp; Library</a>
  <a class="list-group-item" href="#"><i class="fa fa-pencil fa-fw"></i>&nbsp; Applications</a>
  <a class="list-group-item" href="#"><i class="fa fa-cog fa-fw"></i>&nbsp; Settings</a>
</div>
```
###List Icons
  <li><i class="fa-li fa fa-check-square"></i>List icons</li>
  <li><i class="fa-li fa fa-check-square"></i>can be used</li>
  <li><i class="fa-li fa fa-spinner fa-spin"></i>as bullets</li>
  <li><i class="fa-li fa fa-square"></i>in lists</li>
``` bash
<ul class="fa-ul">
  <li><i class="fa-li fa fa-check-square"></i>List icons</li>
  <li><i class="fa-li fa fa-check-square"></i>can be used</li>
  <li><i class="fa-li fa fa-spinner fa-spin"></i>as bullets</li>
  <li><i class="fa-li fa fa-square"></i>in lists</li>
</ul>
```
###Bordered & Pulled Icons
<i class="fa fa-quote-left fa-3x fa-pull-left fa-border"></i>
...tomorrow we will run faster, stretch out our arms farther...
And then one fine morning— So we beat on, boats against the
current, borne back ceaselessly into the past.
``` bash
<i class="fa fa-quote-left fa-3x fa-pull-left fa-border"></i>
...tomorrow we will run faster, stretch out our arms farther...
And then one fine morning— So we beat on, boats against the
current, borne back ceaselessly into the past.
```
###Animated Icons
<i class="fa fa-spinner fa-spin"></i>
<i class="fa fa-circle-o-notch fa-spin"></i>
<i class="fa fa-refresh fa-spin"></i>
<i class="fa fa-cog fa-spin"></i>
<i class="fa fa-spinner fa-pulse"></i>
``` bash
<i class="fa fa-spinner fa-spin"></i>
<i class="fa fa-circle-o-notch fa-spin"></i>
<i class="fa fa-refresh fa-spin"></i>
<i class="fa fa-cog fa-spin"></i>
<i class="fa fa-spinner fa-pulse"></i>
```
###Rotated & Flipped
<i class="fa fa-shield"></i> normal<br>
<i class="fa fa-shield fa-rotate-90"></i> fa-rotate-90<br>
<i class="fa fa-shield fa-rotate-180"></i> fa-rotate-180<br>
<i class="fa fa-shield fa-rotate-270"></i> fa-rotate-270<br>
<i class="fa fa-shield fa-flip-horizontal"></i> fa-flip-horizontal<br>
<i class="fa fa-shield fa-flip-vertical"></i> icon-flip-vertical
``` bash
<i class="fa fa-shield"></i> normal<br>
<i class="fa fa-shield fa-rotate-90"></i> fa-rotate-90<br>
<i class="fa fa-shield fa-rotate-180"></i> fa-rotate-180<br>
<i class="fa fa-shield fa-rotate-270"></i> fa-rotate-270<br>
<i class="fa fa-shield fa-flip-horizontal"></i> fa-flip-horizontal<br>
<i class="fa fa-shield fa-flip-vertical"></i> icon-flip-vertical
```
###Stacked Icons
<span class="fa-stack fa-lg">
  <i class="fa fa-square-o fa-stack-2x"></i>
  <i class="fa fa-twitter fa-stack-1x"></i>
</span>
fa-twitter on fa-square-o<br>
<span class="fa-stack fa-lg">
  <i class="fa fa-circle fa-stack-2x"></i>
  <i class="fa fa-flag fa-stack-1x fa-inverse"></i>
</span>
fa-flag on fa-circle<br>
<span class="fa-stack fa-lg">
  <i class="fa fa-square fa-stack-2x"></i>
  <i class="fa fa-terminal fa-stack-1x fa-inverse"></i>
</span>
fa-terminal on fa-square<br>
<span class="fa-stack fa-lg">
  <i class="fa fa-camera fa-stack-1x"></i>
  <i class="fa fa-ban fa-stack-2x text-danger"></i>
</span>
fa-ban on fa-camera
``` bash
<span class="fa-stack fa-lg">
  <i class="fa fa-square-o fa-stack-2x"></i>
  <i class="fa fa-twitter fa-stack-1x"></i>
</span>
fa-twitter on fa-square-o<br>
<span class="fa-stack fa-lg">
  <i class="fa fa-circle fa-stack-2x"></i>
  <i class="fa fa-flag fa-stack-1x fa-inverse"></i>
</span>
fa-flag on fa-circle<br>
<span class="fa-stack fa-lg">
  <i class="fa fa-square fa-stack-2x"></i>
  <i class="fa fa-terminal fa-stack-1x fa-inverse"></i>
</span>
fa-terminal on fa-square<br>
<span class="fa-stack fa-lg">
  <i class="fa fa-camera fa-stack-1x"></i>
  <i class="fa fa-ban fa-stack-2x text-danger"></i>
</span>
fa-ban on fa-camera
```
###Bootstrap 3 Examples
<a class="btn btn-danger" href="#">
  <i class="fa fa-trash-o fa-lg"></i> Delete</a>
<a class="btn btn-default btn-sm" href="#">
  <i class="fa fa-cog"></i> Settings</a>

<a class="btn btn-lg btn-success" href="#">
  <i class="fa fa-flag fa-2x pull-left"></i> Font Awesome<br>Version 4.4.0</a>

<div class="btn-group">
  <a class="btn btn-default" href="#"><i class="fa fa-align-left"></i></a>
  <a class="btn btn-default" href="#"><i class="fa fa-align-center"></i></a>
  <a class="btn btn-default" href="#"><i class="fa fa-align-right"></i></a>
  <a class="btn btn-default" href="#"><i class="fa fa-align-justify"></i></a>
</div>

<div class="input-group margin-bottom-sm">
  <span class="input-group-addon"><i class="fa fa-envelope-o fa-fw"></i></span>
  <input class="form-control" type="text" placeholder="Email address">
</div>
<div class="input-group">
  <span class="input-group-addon"><i class="fa fa-key fa-fw"></i></span>
  <input class="form-control" type="password" placeholder="Password">
</div>

<div class="btn-group open">
  <a class="btn btn-primary" href="#"><i class="fa fa-user fa-fw"></i> User</a>
  <a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#">
    <span class="fa fa-caret-down"></span></a>
  <ul class="dropdown-menu">
    <li><a href="#"><i class="fa fa-pencil fa-fw"></i> Edit</a></li>
    <li><a href="#"><i class="fa fa-trash-o fa-fw"></i> Delete</a></li>
    <li><a href="#"><i class="fa fa-ban fa-fw"></i> Ban</a></li>
    <li><a href="#"><i class="i"></i> Make admin</a></li>
  </ul>
</div>
``` bash
<a class="btn btn-danger" href="#">
  <i class="fa fa-trash-o fa-lg"></i> Delete</a>
<a class="btn btn-default btn-sm" href="#">
  <i class="fa fa-cog"></i> Settings</a>

<a class="btn btn-lg btn-success" href="#">
  <i class="fa fa-flag fa-2x pull-left"></i> Font Awesome<br>Version 4.4.0</a>

<div class="btn-group">
  <a class="btn btn-default" href="#"><i class="fa fa-align-left"></i></a>
  <a class="btn btn-default" href="#"><i class="fa fa-align-center"></i></a>
  <a class="btn btn-default" href="#"><i class="fa fa-align-right"></i></a>
  <a class="btn btn-default" href="#"><i class="fa fa-align-justify"></i></a>
</div>

<div class="input-group margin-bottom-sm">
  <span class="input-group-addon"><i class="fa fa-envelope-o fa-fw"></i></span>
  <input class="form-control" type="text" placeholder="Email address">
</div>
<div class="input-group">
  <span class="input-group-addon"><i class="fa fa-key fa-fw"></i></span>
  <input class="form-control" type="password" placeholder="Password">
</div>

<div class="btn-group open">
  <a class="btn btn-primary" href="#"><i class="fa fa-user fa-fw"></i> User</a>
  <a class="btn btn-primary dropdown-toggle" data-toggle="dropdown" href="#">
    <span class="fa fa-caret-down"></span></a>
  <ul class="dropdown-menu">
    <li><a href="#"><i class="fa fa-pencil fa-fw"></i> Edit</a></li>
    <li><a href="#"><i class="fa fa-trash-o fa-fw"></i> Delete</a></li>
    <li><a href="#"><i class="fa fa-ban fa-fw"></i> Ban</a></li>
    <li><a href="#"><i class="i"></i> Make admin</a></li>
  </ul>
</div>
```
<i class="fa fa-link"></i> Contribution from ：http://fontawesome.io/examples/