var kejieNO;
layui.config({
  base: '../../src/js/lib/'
}).extend({
  zyupload: 'zyupload'
});

layui.use(['jquery', 'form', 'upload','laydate'], function() {
  var $ = layui.jquery,
  layedit = layui.layedit,
  form = layui.form();

  var laydate = layui.laydate;


 form.on('select(kejieNO)', function(data){
   kejieNO = data.value;
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


  
  var Sessionid = getCookie("JSESSIONID");
  var Lessonid= window.parent.Lessonid;

 



      function send(){

        $.ajax({
              dataType:'json',
              type:'POST',
              data:{title:$("#kejietitle").val(),
                    lessonId:Lessonid,
                    classNo:kejieNO,
                    lessonDescribe:$("#kejiedesc").val(),
                    startTime:$("#kejiestartime").val(),
                    endTime:$("#kejieendtime").val()
                  },       
              url: 'http://192.168.188.16:8090/AreTalkServer/Web/Api/editLessonClassInfo.action;jsessionid='+Sessionid,
              success:function(data) {
                      alert("提交成功");           
                  }
              }); 

  }; 
 


