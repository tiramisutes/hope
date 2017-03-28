// Add a tail to every post from copyright.md
// Great for adding copyright info

var fs = require('fs');

hexo.extend.filter.register('before_post_render', function(data){
    if(data.copyright == false) return data;
    var file_content = fs.readFileSync('copyright.md');
    if(file_content && data.content.length > 50) 
    {
        data.content += file_content;
        var permalink = '\n<h3><p>本文固定链接：' + data.permalink+'  转载请注明出处！</p></h3>';
        data.content += permalink;
    }
    return data;
});