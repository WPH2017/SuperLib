<template>
  <div>
    <div class="register">
      <img src="/static/img/nlicon.png" alt="">
      <p>手机号<input type="text" id="mobile" name="mobile" value="" placeholder="输入手机号" ><span class="tip usernameTip"></span></p>
      <p>验证码<input type="text" id="code" name="code" value="" placeholder="输入验证码" > <span class="codeimgchange"><img src="" alt=""> 看不清换一张</span></p>
      <p>创建密码<input type="password" id="createPass" name="newpass" value="" placeholder="6-20位字符组成，区分大小写"></p>
      <p>密码确认<input type="password" id="confirm" placeholder="确认密码"><span class="confirmTip"></span></p>
      <p class="small"><input type="checkbox" checked="true" id="check">同意 <a href="javascript:void(0)">良仓注册条款</a></p>
      <input type="button" value="立即注册" id="register">
      <p class="registerTip"></p>
      <p class="more"><a href="login">登录良仓</a></p>
    </div>
  </div>
</template>

<script>
  export default {
    mounted(){
      //输入与验证样式设置
      $('#mobile').focus(function () {
        $(this).css("outline","none");
      });
      $('#createPass,#confirm').on({
        focus:function () {
          $(this).css("outline","none");
        },
        blur:function () {
          if($(this).val().length<6){
            $('.confirmTip').html("长度不对，请重新输入").css("color","red");
          }else{
            $('.confirmTip').html("");
          }
        }
      });
      $('#confirm').change(function () {
        if($('#createPass').val()!=$('#confirm').val()){
          $('.confirmTip').html("两次密码输入不一致，请重新输入").css("color","red");
          $('#createPass,#confirm').css("outline","red solid 1px");
        }
      });

      //验证手机号是否存在
      $('#mobile').change(function () {
        $.ajax({
          "type": "POST",
          "url": "http://h6.duchengjiu.top/shop/api_user.php",
          "data": {
            "status":"check",
            "username":$('#mobile').val(),
            "contentType":"application/x-www-form-urlencoded"
          },
          "dataType":"json",
          "success": function (response) {
            if(response.code===0){
              $('.usernameTip').html(response.message).css("color","green");
              $('#mobile').css("outline","green solid 2px");
            }else if(response.code===2001){
              $('.usernameTip').html(response.message).css("color","red");
              $('#mobile').css("outline","red solid 1px");
            }
          }
        });
      });

      //绑定注册按钮
      $('#register').click(function(){
        var username=$('#mobile').val();
        var password=$('#createPass').val();
        $.ajax({
          "type":"POST",
          "url":"http://h6.duchengjiu.top/shop/api_user.php",
          "data":{
            "status":"register",
            "username":username,
            "password":password,
            "contentType":"application/x-www-form-urlencoded"
          },
          "dataType":"json",
          "success":function(response){
            if(response.code===0){
              $('.registerTip').html(response.message+",开始跳转~").css("color","green");
              $.ajax({
                "type": "POST",
                "url": "http://h6.duchengjiu.top/shop/api_user.php",
                "data":{
                  "status":"login",
                  "username": username,
                  "password": password
                },
                "dataType":"json",
                "contentType":"application/x-www-form-urlencoded",
                "success":function (response) {
                  var data=response.data;
                  if(response.code===0){
                    for(var prop in data){
                      if(data.hasOwnProperty(prop)){
                        localStorage.setItem(prop,data[prop]);
                      }
                    }
                    setTimeout(function () {
                      alert('注册成功，点击两秒后自动跳转~')
                      location.href="index";
                    },2000);
                    //如有hash值，则跳转到hash
                    // location.href=location.hash?location.hash.substr(10):"index.html";
                  }else{
                    $('.registerTip').html(response.message).css("color","red");
                  }
                }
              });
            }
          }
        });
      });
    }
  }
</script>

<style>
  *{
    padding: 0;
    margin: 0;
  }
  body{
    background-color: #999;
    color: #fff;
    font-weight: bold;
  }
  .register{
    position: relative;
    margin: 0 auto;
    width: 565px;
    line-height:60px;
  }
  .register>img{
    display: block;
    margin: 0 auto;
    margin-top: 80px;
    margin-bottom: 40px;
  }
  .register input{
    border:none;
    outline: none;
  }
  .register input[type="text"],.register input[type="password"]{
    position: absolute;
    right:120px;
    padding-left:30px;
    width: 290px;
    height: 50px;
    color: #fff;
    background-color: #ccc;
  }
  .register input::placeholder{
    font-size:14px;
    font-weight: bold;
    color: #fff;
  }
  .register input:focus::placeholder{
    color:transparent;
  }
  .register #code{
    right:190px;
    width: 220px;
  }
  .register .codeimgchange{
    display: block;
    position: absolute;
    top:290px;
    right:40px;
    font-size:12px;
    cursor: pointer;
  }
  .register p.small{
    margin-left:130px;
    font-size:12px;
  }
  .register p.small>a{
    text-decoration: none;
    color: #2751d7;
  }
  #register{
    display: block;
    position: relative;
    margin: 0 auto;
    padding: 0;
    width: 300px;
    height: 50px;
    cursor: pointer;
    border: 0;
    background: #25292e;
    font-size: 18px;
    color: #ffffff;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .register .more{
    text-align: right;
  }
  .register .more a{
    color: #fff;
  }
  .register .tip{
    float: right;
    margin-top:-65px;
    text-align: right;
    font-size:12px;
  }
  .register .confirmTip{
    position: relative;
    height: 12px;
    font-size:12px;
    line-height:12px;
    margin-left:153px;
  }
  .register .registerTip{
    width: 120px;
    margin: 0 auto;
    font-size:12px;

  }
</style>
