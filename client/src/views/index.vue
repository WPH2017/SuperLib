<template>
  <div>
    <nav-header></nav-header>
    <div class="content-box">
      <div class="content">
        <div class="carousel">
          <div class="box">
            <div class="imgbox">
              <img src="/static/img/1055.jpg" alt="">
              <img src="/static/img/1053.jpg" alt="">
              <img src="/static/img/1052.jpg" alt="">
              <img src="/static/img/1050.jpg" alt="">
              <img src="/static/img/1049.gif" alt="">
              <img src="/static/img/1045.jpg" alt="">
              <img src="/static/img/1039.jpg" alt="">
              <img src="/static/img/1037.jpg" alt="">
            </div>
          </div>
          <div class="left-arrow"></div>
          <div class="right-arrow"></div>
          <div class="pick">
            <ul>
              <li class="main"></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <div class="banner">
          <a href="javascript:void(0)"><img src="/static/img/28260.jpg" alt=""></a>
          <a href="javascript:void(0)"><img src="/static/img/28161.jpg" alt="" class="big"></a>
          <a href="javascript:void(0)"><img src="/static/img/28262.jpg" alt=""></a>
          <a href="javascript:void(0)"><img src="/static/img/28259.jpg" alt="" class="fix"></a>
          <a href="javascript:void(0)"><img src="/static/img/28258.jpg" alt=""></a>
        </div>
        <div class="container">
          <p class="title">人气良品</p>
          <img class="loading" src="/static/img/busy.gif">
          <!-- 视图插入 -->
        </div>
        <a href="magzine"><i class="more"></i></a>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import navHeader from '@/components/header'
  import navFooter from '@/components/footer'

  import init from '../../static/js/common'


  export default {
    components:{
      navHeader,
      navFooter
    },
    mounted(){
      //1. 轮播图
      var carouselIt = function () {
        var carousel = $('.carousel');
        var imgbox = $('.imgbox');
        var pick = $('.pick');
        var lis = $('li', pick);
        var lbtn = $(".left-arrow");
        var rbtn = $(".right-arrow");
        var img = $('img', imgbox);
        var imgIndex = 0;//当前图片下标

        imgbox.append(img.eq(0).clone());
        img = $('img', imgbox);

        var timer = setInterval(function () {
          imgIndex++;
          if (imgIndex > 8) {
            imgIndex = 1;
          }
          move(imgIndex);
        }, 3000);

        //移入停止，移出开始
        carousel.mouseenter(function () {
          clearInterval(timer);
        });
        carousel.mouseleave(function () {
          timer = setInterval(function () {
            imgIndex++;
            if (imgIndex > 8) {
              imgIndex = 1;
            }
            move(imgIndex);
          }, 3000);
        });

        //绑定按钮
        lbtn.click(function () {
          if (imgbox.is(':animated')) return;
          imgIndex--;
          if (imgIndex < 0) {
            imgIndex = -1;
            imgIndex = move(imgIndex);
            return;
          }
          move(imgIndex);
        });
        rbtn.click(function () {
          if (imgbox.is(':animated')) return;
          imgIndex++;
          if (imgIndex > 8) {
            imgIndex = 1;
          }
          move(imgIndex);
        });

        //绑定轮播指示按钮
        lis.click(function () {
          imgIndex = $(this).index();
          if (imgbox == 0) {
          }
          move(imgIndex);
        });

        //轮播业务
        function move(i) {
          if (i == -1) {
            imgbox.animate({"left": -img.eq(8).position().left}, 0);
            imgbox.animate({"left": -img.eq(7).position().left}, 500);
            lis.eq(7).addClass("main").siblings().removeClass();
            return 7;
          }
          if (i == 8) {
            imgbox.animate({"left": -img.eq(i).position().left}, 500);
            imgbox.animate({"left": -img.eq(0).position().left}, 0);
            lis.eq(0).addClass("main").siblings().removeClass();
            return;
          }
          lis.eq(i).addClass("main").siblings().removeClass();
          imgbox.animate({"left": -img.eq(i).position().left}, 500);
        }
      };
      carouselIt();
      //2. 主体数据导入
      $('.loading').css("display", "block");
      $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_goods.php?page=1&pagesize=21",
        "type": "GET",
        "success": function (json) {
          // console.log(json)
          $('.loading').css("display", "none");
          var html = "";
          // setTimeout(function(){
          //写入数据
          var oContainer = document.getElementsByClassName("container")[0];
          for (var i = 0; i < json.data.length; i++) {
            var html = "<a href='detail?cat_id=" + json.data[i].cat_id + "&goods_id=" + json.data[i].goods_id + "'><img src=" + json.data[i].goods_thumb + " alt=''><div class='detail'><p class='price'>" + json.data[i].price + "</p><p class='name'>" + json.data[i].goods_name + "</p><p class='intro'>" + json.data[i].goods_desc + "</p></div></a><div class='lable'><a href='javascript:void(0)'><img src='' alt=''><span>EON</span></a><div class='heart'><a href='javascript:void(0)'><span class='num'>1200</span></a><img src='/static/img/heart.png' alt=''></div></div>";
            var temp = document.createElement("div");
            temp.className = "goodbox";
            temp.innerHTML = html;
            oContainer && oContainer.appendChild(temp);
          }
          //3. 点星星变红，加数字
          var aHeart = document.getElementsByClassName("heart");
          for (var i = 0; i < aHeart.length; i++) {

            aHeart[i].onclick = function () {
              var oNum = this.getElementsByClassName("num")[0];
              var oImg = this.getElementsByTagName("img")[0];
              oNum.innerHTML = parseInt(oNum.innerHTML) + 1;
              oImg.src = "/static/img/heart_red.png";
            }
          }
        }
      })
      init();
    }
  }
</script>

<style>
  @import "../../static/css/common.css";
  .loading{
    margin: 0 auto;
    display: none;
  }
  .carousel{
    position: relative;
    width: 100%;
    margin:80px 0 60px 0;
    padding-bottom:10px;
  }
  .carousel .box{
    position: relative;
    width: 100%;
    height: 475px;
    overflow: hidden;
  }
  .carousel .box .imgbox{
    position: absolute;
    left:0;
    width: 1800%;
    height: 475px;
  }
  .carousel .box .imgbox img{
    float: left;
  }
  .carousel .box:hover+.left-arrow,.carousel .box:hover+.left-arrow+.right-arrow{
    display: block;
  }
  .carousel .left-arrow,.carousel .right-arrow{
    position: absolute;
    top: 250px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    border-radius: 50%;

    /*display: none;*/
  }
  .carousel .left-arrow{
    left:20px;
    background: url("/static/img/arrow-left.png") no-repeat;
    background-position: 14px 9px;
    background-color: rgba(0, 0, 0, 0.40);
  }
  .carousel .right-arrow{
    right:20px;
    background: url("/static/img/arrow-right.png") no-repeat;
    background-color: rgba(0, 0, 0, 0.40);
    background-position: 18px 9px;
  }
  .carousel .left-arrow:hover,.carousel .right-arrow:hover{
    opacity: .5;
  }
  .carousel .pick{
    position: relative;
    margin: 10px auto;
    width: 230px;
    height: 4px;
  }
  .carousel .pick li{
    float: left;
    margin: 0 4px;
    width: 20px;
    height: 4px;
    background-color: #ccc;
    cursor: pointer;
  }
  .carousel .pick li.main{
    background-color: #292f34;
  }

  .banner{
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  .banner img{
    float: left;
    margin:0 23px 23px 0;
  }
  .banner a:nth-of-type(3) img,.banner a:nth-of-type(5) img{
    margin-right:0;
  }
  .banner .fix{
    position: absolute;
    top:214px;
    left: 0;
  }

  .container{
    width: 100%;
    margin-top: 10px;
    overflow: hidden;
  }
  .container p.title{
    height: 40px;
    line-height: 40px;
    margin-bottom: 30px;
    font-size: 12px;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
  .goodbox{
    position: relative;
    float: left;
    width: 316px;
    height: 366px;
    margin: 0 20px 20px 0;
    overflow: hidden;
  }
  .goodbox:nth-of-type(3n){
    margin-right: 0;
  }
  .goodbox .detail{
    position: absolute;
    top: 0;
    left: 0;
    width: 316px;
    height: 316px;
    background-color: rgba(0, 0, 0, 0.80);
    z-index: 3;
    display: none;
  }
  .goodbox a:hover .detail{
    display: block;
  }
  .goodbox .price{
    padding: 20px 0 0 20px;
    font: italic bold 24px SimHei;
    color: #0c6eba;
  }
  .goodbox .name{
    padding:100px 30px 0;
    text-align: center;
    font:bold 14px Microsoft Yahei;
    color: #fff;
  }
  .goodbox .intro{
    padding: 4px 40px 0;
    text-align: center;
    font-size: 12px;
    color: #fff;
  }
  .goodbox>a>img{
    width: 316px;
    height: 316px;
    background-color: #fff;
    z-index: 1;
  }

  .goodbox .lable{
    position: relative;
    margin-top: 6px;
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    color: #999;
  }
  .goodbox .lable a{
    font-size: 16px;
    color: #999;
  }
  .goodbox .lable a img{
    float: left;
    width: 40px;
    height: 40px;
  }
  .goodbox .heart{
    float: right;
    width: 55px;
  }

  .goodbox .heart img{
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-top:2px;
  }

  .more{
    position: relative;
    margin: 0 auto;
    width: 148px;
    height: 50px;
    background: url("/static/img/icon.png");
    background-position: 0 -687px;
  }
  .more:hover{
    background-position: 0 -640px;
  }
</style>
