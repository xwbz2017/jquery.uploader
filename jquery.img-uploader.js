/**
 * 图片上传并预览js
 * <input type="hidden" name="file" data-multiple="true" data-maxnum="3" data-maxsize="3000">
 *      $('[name=file]').xwbzImg({
            url: '/xx/xx/xx'
        });
 * @author xwbz
 * @version 0.2-20180603
 */
;(function($, window, document) {
    var ImgUploader = function(ele, opt) {
        this.$element = ele;
        this.defaults = {
            'url': undefined, // 服务器上传地址
            'resultKey': 'url', // 服务器返回值字段名
            'error': function(err){console.error(err)} // 自定义异常捕获
        };
        this.options = $.extend({}, this.defaults, opt);
        this.defaultImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABLCAIAAAB7tddWAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1Q0VBNzA0MjEyMDUxMUUzODk2Q0JFM0Q1RjE4QkExQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1Q0VBNzA0MzEyMDUxMUUzODk2Q0JFM0Q1RjE4QkExQyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjAzNDA2MkY1MTIwMzExRTM4OTZDQkUzRDVGMThCQTFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjAzNDA2MkY2MTIwMzExRTM4OTZDQkUzRDVGMThCQTFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+K6izdgAAAvpJREFUeNrsnFmPqkAQhWmX667gEp9c/v+/MkSDG+4LrvdcSYgRbw/0ALZQ9WBUJOn+uqvqHGCG3e93hUJRUoSAQBAIAkEgCASBIBAE4neRicEcII51Xb/dbnjPGOt0OqlUKok7ApN3jIKwY6DUIBAEgkAQCALho/X47TeXy8U0TcuyrtdrZKPs9/v2m8FgINYgf9QX/gTV+Xw2DCNKBJKmxmKxsAVc0kEcDgfyGq8CNp/Pa5qWy+WiHG6v13v7/XPt6Ha7Al5D3HQ1Go1sNkvtU8lkMsmtESSoCASBSFqEW/DQ0tbr9W63O51OKK6FQkFV1XQ6nSwQ0OOTyQSvjknZbDaA0mq1QCQafSFFasxmM4eCE1Do0+lUQrcSFggsPhzq20NgsVqtkpIax+MxMs+C/aXruvMxaonND75J9W5hUWWxuYAVdRfTg8EplUphGJywQPAFuBd5Dlhw/aDwwgVtCDgCdzph1QisG+dosVjkn44WYxjGC4XnvBuNRtvt9gtA2Hv47SGsZKVS4ef8eDzG4vMVCrpSgEU3xPbZbDar1erLl1AQ7XabU8xAAXvB3XffBnIHwkR2QcUYq9fr5XIZOxkTg6BEkeNLKdQF7AWPFBy1AoUmu8RG/HmE91nxM+J/ORIr07VcLvf7feCt+stAQGIBRNJtOJolDAhdj/hXGj5+u+TzIKAF+MbkK00XFta2BhDRUE0/9gv8Elogbu4TBW8+nyPhHSeuaVqtVuNQC6TzyQUCXsg0TbfyAxfIKogr9ynP1GJyYQZ57qbg7AuIRfclKZwSlDqWBQSmxM9zFALYh+fFBwJJSkNgqeFxSrAPw+EQ9QJew7Is2Sj8FgSW2nu1gylYPkKRMsRTA+4IcjA2fxsnDkLOq/IfACFP54uP1yAQBIJAEIh4gWCPkHk+GJ7AjU/fICJ+qlIghEfoDwQMtRjvyLYDRih4rsDT+bBM9tP5kuhrzN++e6SqqvCdYUb/SIO6BoEgEASCQBAIAkEgCEQg8VeAAQAB1bbO2qoeewAAAABJRU5ErkJggg==';
        this.fileHtml = '<input type="file" class="xwbz-img-file-box" accept="image/*" style="display:none">';
        this.imgboxHtml = '<div class="xwbz-img-parent-box"></div>';
        this.imgEditFlag = undefined;
    };
    var imgBoxClickFunc = function(){
        $(this).closest(".xwbz-img-parent-box").find(".xwbz-img-file-box").trigger("click");
    }, imgBoxMouseenterFunc = function () {
        $(this).children('div').slideDown();
    }, imgBoxMouseleaveFunc = function(){
        $(this).children('div').stop().slideUp();
    }, imgBoxDivEditFunc = function(e, uploader){
        var $this = $(e);
        uploader.imgEditFlag = "idx_" + $this.parent().parent().data('idx');
        $this.parent().parent().siblings(".xwbz-img-file-box").prop("multiple", false).trigger("click");
    }, imgBoxDivDeleteFunc = function(e, uploader){
        var $this = $(e);
        var idx = $this.parent().parent().data('idx');
        var $urlBox = $this.closest(".xwbz-img-parent-box").siblings(uploader.$element.selector);
        var urls = $urlBox.val();
        var urlArr = urls ? urls.split(',') : [];
        urlArr.splice(idx, 1);
        $urlBox.val(urlArr.join(','));
        uploader.showImgBox($urlBox, $urlBox.data('multiple'));
    };
    ImgUploader.prototype = {
        init: function () {
            var me = this;
            if(!me.options.url) return me.options.error('未配置服务器上传地址');

            me.$element.each(function(_, item){
                var $this = $(item);

                var $imgbox = $(me.imgboxHtml).appendTo($this.parent());
                var $file = $(me.fileHtml).appendTo($imgbox);

                var isMultiple = $this.data('multiple');
                if(isMultiple) {
                    $file.prop("multiple", true);
                }

                var maxNum = $this.data('maxnum');
                if(maxNum){
                    $file.attr("data-maxnum", maxNum);
                }
                me.showImgBox($this, isMultiple);
            });
            $(".xwbz-img-file-box").off("change").on("change", function(){
                var $this = $(this);
                var $ele = $this.parent().siblings(me.$element.selector);
                var maxNum = ~~($ele.data('maxnum'));
                var num = ~~($ele.attr('data-num'));
                var maxsize = ~~($ele.attr('data-maxsize'));
                var isEdit = me.imgEditFlag;
                var fileObjs = $this[0].files; // js 获取文件对象
                if(!isEdit && maxNum && (fileObjs.length + num) > maxNum){
                    me.options.error("最多还能选" + (maxNum - num) + "张图片");
                    $this.val('');
                    return;
                }

                if(fileObjs.length){
                    // FormData 对象
                    var form = new FormData();
                    // 可以增加表单数据: form.append("author", "hooyes");
                    for(var i=0;i<fileObjs.length;i++){
                        if(maxsize && fileObjs[i].size > maxsize){
                            me.options.error(fileObjs[i].name + '(' + fileObjs[i].size + '字节)文件大小超出限制(' + maxsize + '字节)');
                            $this.val('');
                            return;
                        }
                        form.append("file"+i, fileObjs[i]);       // 文件对象
                    }
                    $.ajax({
                        type: 'POST',
                        url: me.options.url,
                        data: form,
                        cache: false,
                        processData: false,
                        contentType: false
                    }).success(function(res, msg, xhr){
                        var urls = res[me.options.resultKey].join(',');
                        if(isEdit) {
                            me.editImgUrl($this, urls);
                            return;
                        }
                        me.addImgUrl($this, urls);
                        $this.val('');
                    }).error(function(xhr, msg){
                        if(isEdit) {
                            me.imgEditFlag = false;
                            $this.prop("multiple", true);
                        }
                        me.options.error("上传失败，图片格式必须为JPG,JPEG,PNG");
                    });
                }
            });
            var styles = '.xwbz-img-parent-box{position: relative;min-height: 100px;}' +
                '.xwbz-img-parent-box img{height: 100px;width: 100px;}' +
                '.xwbz-img-parent-box>div{position: relative;height: 100px;width: 100px;float: left;box-shadow: 2px 2px 2px #ccc;margin:5px;}' +
                '.xwbz-img-parent-box>div>div{position: relative;height: 30px;width:100px;display:none;top:-100px}' +
                '.xwbz-img-parent-box>div>div>a:first-child{width: 49%; color:white; background: red; position: relative; float: left; text-align: center; display: block; padding: 5px;box-sizing: border-box;}' +
                '.xwbz-img-parent-box>div>div>a:last-child{width: 49%; color:white; position: relative;background: rgba(0,0,0,0.5); float: left; text-align: center; display: block; padding: 5px;box-sizing: border-box;}';
            var styleElem=document.createElement("style");
            styleElem.setAttribute("type","text/css");
            document.getElementsByTagName("head")[0].appendChild(styleElem);
            if(styleElem.styleSheet){//IE
                styleElem.styleSheet.cssText = styles;
            }else {
                styleElem.appendChild(document.createTextNode(styles));
            }
            return me.$element;
        },
        showImgBox: function($d, isMultiple) {
            var me = this;
            var $imgParent = $d.siblings(".xwbz-img-parent-box");
            $imgParent.children('div').remove();
            var urlArr = $d.val() ? $d.val().split(',') : [];

            for(i=0;i<urlArr.length;i++) if(!urlArr[i]) urlArr.splice(i--,1);

            $d.attr('data-num', urlArr.length);
            // 是否能上传，能上传时在图片框最后会有一个上传的图片按钮
            var hasUpBtn = false;
            if (isMultiple) {
                var maxNum = ~~($d.data('maxnum'));
                if (maxNum) {
                    if (urlArr.length < maxNum) {
                        urlArr.push(me.defaultImg);
                        hasUpBtn = true;
                    }
                } else {
                    hasUpBtn = true;
                    urlArr.push(me.defaultImg);
                }
            } else{
                hasUpBtn = true;
            }
            if (!urlArr.length) {
                urlArr.push(me.defaultImg);
            }
            var imgHtml;
            if (isMultiple) {
                imgHtml = '<div><img class="xwbz-img-box" src=""><div><a class="img-del-btn">✖</a><a class="img-edit-btn">✎</a></div></div>';
            } else {
                imgHtml = '<div><img class="xwbz-img-box" src=""></div>';
            }
            for (var i in urlArr) {
                if (urlArr[i]) {
                    var $img = $(imgHtml);
                    $img.find("img").attr("src", urlArr[i]);
                    $img.attr('data-idx', i);
                    $imgParent.append($img);
                }
            }
            if (hasUpBtn) {
                $imgParent.find(".xwbz-img-box:last").on("click", imgBoxClickFunc);
            }
            if (isMultiple) {
                var $canEditBox;
                if (hasUpBtn) {
                    $canEditBox = $imgParent.find(".xwbz-img-box:not(:last)").parent();
                } else {
                    $canEditBox = $imgParent.find(".xwbz-img-box").parent();
                }
                $canEditBox.off("mouseenter").off("mouseleave")
                    .on("mouseenter", imgBoxMouseenterFunc)
                    .on("mouseleave", imgBoxMouseleaveFunc);
                $imgParent.find(".img-del-btn").on("click", function(){imgBoxDivDeleteFunc(this, me)});
                $imgParent.find(".img-edit-btn").on("click", function(){imgBoxDivEditFunc(this, me)});
            }
        },
        addImgUrl: function($file, url){
            var me = this;
            var $urlBox = $file.parent().siblings(me.$element.selector);
            var isMultiple = $urlBox.data('multiple');
            if(isMultiple) {
                var urls = $urlBox.val();
                var urlArr = urls ? urls.split(',') : [];
                urlArr.push(url);
                $urlBox.val(urlArr.join(','));
            }else{
                $urlBox.val(url);
            }
            me.showImgBox($urlBox, isMultiple);
        },
        editImgUrl: function($file, url){
            var me = this;
            var $urlBox = $file.parent().siblings(me.$element.selector);
            var idx = ~~(me.imgEditFlag.replace('idx_', ''));
            var urls = $urlBox.val();
            var urlArr = urls ? urls.split(',') : [];
            urlArr[idx] = url;

            $urlBox.val(urlArr.join(','));
            var isMultiple = $urlBox.data('multiple');
            if(isMultiple){
                $file.prop("multiple", true);
                delete me.imgEditFlag;
            }
            me.showImgBox($urlBox, isMultiple);
        }
    };
    // 提供使用插件的入口
    $.fn.xwbzImg = function(options) {
        return new ImgUploader(this, options).init();
    }
})(jQuery, window, document);






