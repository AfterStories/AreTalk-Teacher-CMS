var UpLoadURL = 'http://192.168.1.3:8090';


   function getCookie(c_name) {
  var c_value = document.cookie;
  var c_start = c_value.indexOf(" " + c_name + "=");
  if (c_start == -1) {
      c_start = c_value.indexOf(c_name + "=");
  }
  if (c_start == -1) {
      c_value = null;
  }
  else {
      c_start = c_value.indexOf("=", c_start) + 1;
      var c_end = c_value.indexOf(";", c_start);
      if (c_end == -1) {
          c_end = c_value.length;
      }
      c_value = unescape(c_value.substring(c_start, c_end));
  }
  return c_value;
}

 var Sessionid = getCookie("JSESSIONID");

$(function () {

            $(':radio').click(function () { 
              
                this.blur();this.focus();
                var selectedvalue = $(this).val();
                if (selectedvalue=='choose') {
                    $('.Anwser-choose').show();
                }else if (selectedvalue=='fillIn') {
                    $('.Anwser-choose').hide();
                }

            }); 

});


    $('#exercise-Type .btn').click(function(){
        //tab内容切换
        var cur = $(this).index();
        $('.Type-tab-main').eq(cur).show().siblings('.Type-tab-main').hide();
        
    })



    function getFileName(name){
     var json = name.split(".")
     return json[0];
    }

$(function () {
    'use strict';

$('.fileupload').each(function (){
    // Initialize the jQuery File Upload widget:
    $(this).fileupload({
        // Uncomment the following to send cross-domain cookies:
        //xhrFields: {withCredentials: true},
        url: UpLoadURL+'/AreTalkServer/Servlet/UploadHandleServlet',
        disableImageResize: false, 
        //预览图片尺寸
        previewMinWidth:200,
        previewMinHeight:100,
        previewMaxWidth:400,
        previewMaxHeight:150,        
        singleFileUploads: false,//一次只能上传一个文件
        change: function(e, data) {
                if(data.files.length > 1){
                    alert("Max 1 file are allowed selected")
                    return false;
                }
            }
    })
})



$('.fileupload').each(function (){


    // Enable iframe cross-domain access via redirect option:
    $(this).fileupload(
        'option',
        'redirect',

        window.location.href.replace(/\/[^\/]*$/,'/cors/result.html?%s')
        ).bind('fileuploaddone', function (e, data) {  

                    var exerciseID = data.result.files[0].id;
                    /* var exerciseTitle = getFileName(data.result.files[0].name);*/
                    var exerciseTitle = 'aaa'
                    var exerciseIMG = UpLoadURL+data.result.files[0].url;

var exerciseCard = '<div>已上传题目ID：<span id="exerciseID">'+exerciseID+'</span></div><div>题目名称：<span id="exerciseTitle">'+exerciseTitle+'</span></div><div>题目：</div><div id="contentBox"><img src='+exerciseIMG+' id="exerciseIMG"></div>'
                    $("#ShowUploadBox").append(exerciseCard);

           var anwserType = $("input[type='radio']:checked").val();
/*         $.ajax({
              type:'POST', 
              async:false,                         
              data:{
                    title:,
                    mp3Id:,
                    imgId:,
                    anwserA:,
                    anwserAId:,
                    anwserB:,
                    anwserBId:,
                    anwserC:,
                    anwserCId:,
                    anwserD:,
                    anwserDId:,
                    anwserType:anwserType,
                    exerciseDescribe:,
                    questionDescribe:,
                    questionDescribeId:,
                    realAnwser:,
                    exerciseTypeId:,

                  },       
              url: UpLoadURL+'/AreTalkServer/Web/Api/addLesson.action;jsessionid='+Sessionid,
              success:function(data) {
          
                  },
              error:function() {
                alert("失败啦，请重试")
                  }
              }); 
*/                    


        });  

});                     




    if (window.location.hostname === 'blueimp.github.io') {
        // Demo settings:
        $('.fileupload').fileupload('option', {
            url: '//jquery-file-upload.appspot.com/',
            // Enable image resizing, except for Android and Opera,
            // which actually support image resizing, but fail to
            // send Blob objects via XHR requests:
            disableImageResize: /Android(?!.*Chrome)|Opera/
                .test(window.navigator.userAgent),
            maxFileSize: 999000,
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
        });
        // Upload server status check for browsers with CORS support:
        if ($.support.cors) {
            $.ajax({
                url: '//jquery-file-upload.appspot.com/',
                type: 'HEAD'
            }).fail(function () {
                $('<div class="alert alert-danger"/>')
                    .text('Upload server currently unavailable - ' +
                            new Date())
                    .appendTo('.fileupload');
            });
        }
    } else {
        // Load existing files:
        $('.fileupload').addClass('fileupload-processing');
        $.ajax({
            // Uncomment the following to send cross-domain cookies:
            //xhrFields: {withCredentials: true},
            url: $('.fileupload').fileupload('option', 'url'),
            dataType: 'json',
            context: $('.fileupload')[0]
        }).always(function () {
            $(this).removeClass('fileupload-processing');
        }).done(function (result) {
            $(this).fileupload('option', 'done')
                .call(this, $.Event('done'), {result: result});

          
        });
    }

});
