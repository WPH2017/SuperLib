<template>
  <div>
    <div class="login">
      <img src="/static/img/logo_icon.png" alt="">
      <input id="username" name="username" value="" placeholder="手机号/邮箱/用户名" >
      <input id="password" type="password" name="password" value="" placeholder="密码" >
      <p class="small"><input type="checkbox" checked="checked">自动登录</p>
      <p class="forget"><a href="javascript:void(0)">忘记密码？</a></p>
      <p class="tip"></p>
      <input type="button" value="登录良仓" id="login">
      <div class="other"></div>
      <p class="link">
        <a href="#" class="qq"></a>
        <a href="#" class="weibo"></a>
        <a href="#" class="douban"></a>
        <a href="#" class="qqweibo"></a>
      </p>
      <p class="register"><a href="register">注册良仓</a></p>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    $('#username,#password').focus(function () {
      $(this).css("box-shadow","none");
    });

    $('#login').click(function () {
      var username = $('#username').val();
      var password = $('#password').val();

      if(!username||!password){
        if(!username){
          $('#username').css("box-shadow","inset 0 0 0 2px red");
        }
        if(!password){
          $('#password').css("box-shadow","inset 0 0 0 2px red");
        }
        return;
      }

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
            //如有hash值，则跳转到hash
            location.href=location.hash?location.hash.substr(10):"index";
          }else{
            $('.tip').html(response.message).css("color","red");
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
  a{
    text-decoration: none;
  }
  .login{
    position: relative;
    margin: 0 auto;
    width: 300px;
  }
  .login>img{
    display: block;
    margin: 0 auto;
    margin-top: 280px;
    margin-bottom: 40px;
  }
  #username{
    background: url(/static/img/usericon.png) no-repeat 8px 10px;
  }
  #password{
    background: url(/static/img/passicon.png) no-repeat 8px 10px;
  }
  #username,#password{
    display: block;
    margin-top: 20px;
    padding-left:60px;
    border: 0;
    font-size: 18px;
    line-height: 50px;
    width:240px;
    height:50px;
    outline: none;
    color: #fff;
    background-color: #ccc;
  }
  input::placeholder{
    color: #fff;
    font-weight:bold;
    font-size:15px;
  }
  input:focus::placeholder{
    color: transparent;
  }
  #login{
    outline: none;
    cursor: pointer;
    width: 300px;
    height: 50px;
    border: 0;
    background: #25292e;
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    margin-top: 9px;
    margin-bottom: 30px;
  }
  .small{
    margin-top: 20px;
    font-size: 13px;
    font-weight:normal;
  }
  .forget{
    position: absolute;
    right: 0;
    top:286px;
    font-size:13px;
    font-weight:normal;
  }
  .forget a{
    color: #fff;
  }
  .tip{
    height: 16px;
    font-size: 13px;
  }
  .link{
    float: left;
    overflow: hidden;
  }
  .link a{
    float: left;
    display: block;
    margin-right:14px;
    width: 24px;
    height: 22px;
  }
  .qq{
    background: url("/static/img/qqnormal.png");
  }
  .qq:hover{
    background: url("/static/img/qqmouse.png");
  }
  .weibo{
    background: url("/static/img/xinlangnormal.png");
  }
  .weibo:hover{
    background: url("/static/img/xinlangmouse.png");
  }
  .douban{
    background: url("/static/img/doubannormal.png");
  }
  .douban:hover{
    background: url("/static/img/doubanmouse.png");
  }
  .qqweibo{
    background: url("/static/img/tengxunnormal.png");
  }
  .qqweibo:hover{
    background: url("/static/img/tengxunmouse.png");
  }
  .register{
    text-align: right;
    font-size:13px;
  }
  .register a{
    text-decoration-line: underline;
    color:#fff;
  }
</style>
