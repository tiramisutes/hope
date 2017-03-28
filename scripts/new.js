var _exec = require('child_process').exec;

hexo.on('new', function(data){
// both ways work
//_exec('"D:\\Program Files (x86)\\Adobe\\Adobe Dreamweaver CS5\\Dreamweaver.exe" ' + data.path);
_exec('start "" "D:\\Program Files (x86)\\Adobe\\Adobe Dreamweaver CS6\\Dreamweaver.exe" ' + data.path);
});