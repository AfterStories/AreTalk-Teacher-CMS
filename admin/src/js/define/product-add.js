
  var Lang; var teachLang;var lessonType;

layui.config({
  base: '../../src/js/lib/'
}).extend({
  zyupload: 'zyupload'
});
layui.use(['jquery', 'form', 'upload','laydate',"layer"], function() {
  var $ = layui.jquery,
  layedit = layui.layedit,
  layer = layui.layer,
  form = layui.form();

  var laydate = layui.laydate;
    



 form.on('select(Lang)', function(data){
   Lang = data.value;
});      
  
  form.on('select(teachLang)', function(data){
   teachLang = data.value;
});
  form.on('select(lessonType)', function(data){
   lessonType = data.value;
});

});


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



  
    var pic1;var pic2;
   


    var img1 = document.getElementById('img1'),
        img2 = document.getElementById('img2');

    var imgData = null;var imgData2 = null;
            
            


$("#img1").change(function(a){
var imgFile1 = new FileReader();  
imgFile1.readAsDataURL(img1.files[0]); 

imgFile1.onload = function() {  
  imgData = this.result;
  pic1 = imgData;       

  var pos = imgData.indexOf("4")+2;
  pic1 = imgData.substring(pos, imgData.length - pos);//去掉Base64:开头的标识字符


  }
});
                
$("#img2").change(function(a){
  var imgFile2 = new FileReader();
  imgFile2.readAsDataURL(img2.files[0]);



      imgFile2.onload = function () { 
       imgData2 = this.result;
        pic2 = imgData2;          

        var pos2 = imgData2.indexOf("4")+2;
        pic2 = imgData2.substring(pos2, imgData2.length - pos2);//去掉Base64:开头的标识字符            
                  

              }; 
});

   var Sessionid = getCookie("JSESSIONID");
 function send(){

      
        var lessontitle = $("#lessontitle").val(),
            lessonduration = $("#lessonduration").val(),
            lessonhour = $("#lessonhour").val(),
            lessonStudents = $("#lessonStudents").val(),
            startime = $("#startime").val(),
            endtime = $("#endtime").val(),
            singleprice = $("#singleprice").val(),
            sumprice = $("#sumprice").val(),
            lessontdesc = $("#lessontdesc").val();


         $.ajax({
              dataType:'json',
              type:'POST', 
              async:false,                         
              data:{title:lessontitle,
                    type:lessonType,
                    classhour:lessonhour,
                    duration:lessonduration,
                    totalStudentCount:lessonStudents,
                    langId:Lang,
                    teachLangId:teachLang,
                    singlePrice:singleprice,
                    totalPrice:sumprice,
                    lessonDescribe:lessontdesc,
                    startTime:startime,
                    endTime:endtime,
                    avatarC:pic1,
                    avatarD:pic2
                  },       
              url: 'http://192.168.1.3:8090/AreTalkServer/Web/Api/addLesson.action;jsessionid='+Sessionid,
              success:function(data) {
                          layer.alert('添加课程成功~', {
                            skin: 'layui-layer-molv' //样式类名
                            ,closeBtn: 0
                          }, function(){
                            parent.layer.closeAll();
                          });              
                  },
              error:function(data,a,b,c) {
                alert("失败啦，请重试")
                  }
              }); 


 }; 