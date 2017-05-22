$(function() {
  //登录提交表单
  $(".login_form").submit(function() {
    if($("input[type='text']").val() == ""||$("input[type='password']").val() == ""){
    $(".errorlog").text("请输入账号和密码");
  }else{
    var SuccessFun = function(data) {
      setCookie("userName",data.userName,30);
      window.location.href = ""
    };
    var ErrorFun = function(log) {
      $(".errorlog").text("错误");
    };
    AJAX_POST("",$(".login_form").serialize(),SuccessFun,ErrorFun);
  };
  return false;
  })
})
