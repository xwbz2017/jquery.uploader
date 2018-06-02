# jquery.uploader
> 自己写的jquery上传插件。目前有图片上传，以后会有文件上传
## jquery.img-uploader
图片上传并预览插件
### 使用方法
1. 先引入jquery，再引入这个js
> 本人使用的是jquery版本1.12.4，估摸着1.7.x以上吧 \
> 其中的css是直接写在js里的orz
2. 首先需要一个存放上传结果的地方
> 一般是隐藏域、文本框 \
> data-multiple="true" 代表可以上传多张图片 \
> data-maxnum="3" 代表最多多少张图片，与data-multiple有关联，默认不限 \
> data-maxsize="3000" 代表限制图片文件大小，字节为单位
```
<input type="hidden" name="file" data-multiple="true" data-maxnum="3" data-maxsize="3000">
```
3. 初始化插件
> [name=file]选中的是上面的隐藏域 \
> 暂时可配置的就下面三项，因为目前就用到这些。(懒
```
$('[name=file]').xwbzImg({
    url: '/xx/xx/xx', // 服务器上传地址
    resultKey: 'url', // 服务器返回值字段名
    'error': function(err){console.error(err)} // 自定义异常捕获
});
```
