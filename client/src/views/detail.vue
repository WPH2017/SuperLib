<template>
  <div>
    <nav-header></nav-header>
    <div class="content-box">
      <div class="content">
        <p class="dir"></p>
        <div class="left">
          <div class="main">
            <div class="result">
              <!--用于展示结果-->
            </div>
          </div>
        </div>
        <div class="right"></div>
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
    components: {
      navHeader,
      navFooter
    },
    mounted() {
      //商品详情页
      //1. 获取当前url中的cat_id和goods_id
      var str = location.search.substr(1);
      var valueJson = {};
      var valueArr = str.match(/\w+=(\w+)/g);
      for (var i = 0; i < valueArr.length; i++) {
        var temp = valueArr[i].split("=");
        //每一个键名存入json，每一个键值存入键中
        //结果格式：{cat_id:69,goods_id:256718}
        valueJson[temp[0]] = temp[1];
      }

      //数组处理的方法
      // str.replace(/&*\w+=(\w+)/g,function (match,$1,index,str) {
      //     value.push($1);
      //     return $1;
      // });

      //首先，查找商品详情
      //查到后查询购物车信息
      //查到购物信息后绑定添加事件
      $.ajax({
        "url": "http://h6.duchengjiu.top/shop/api_goods.php?goods_id=" + valueJson.goods_id,
        "type": "GET",
        "success": function (response) {
          var data = response.data[0];
          //修改当前所在的目录
          $("p.dir").html(function () {
            var html = "<a href='index'>良仓</a> > <a href='magzine?cat_id=" + valueJson.cat_id + "'>" + JSON.parse(localStorage.getItem("magzineClassList"))[valueJson.cat_id] + "</a> > " + data.goods_name;
            return html;
          });


//          var html=``;
//          $('.img-detail',$goods).html(html);

          let html = `  <div class="img-detail">
                          <img src="${data.goods_thumb}" alt="">
                          <div class="sm-img">
                              <img src="${data.goods_thumb}" alt="">
                              <img src="${data.goods_thumb}" alt="">
                              <img src="${data.goods_thumb}" alt="">
                              <img src="${data.goods_thumb}" alt="">
                              <img src="${data.goods_thumb}" alt="">
                          </div>
                        </div>
                        <div class="goods-content">
                          <h4>${data.goods_name} <br><small>荧光 包邮 运费险 新款</small></h4>
                          <p><span>描述：</span><br>${data.goods_desc}</p>
                          <p><span>价格：</span><em>${data.price}</em></p>
                          <p><span>运费：</span>此处没有数据，请不要请求我~</p>
                          <p>
                              <span>数量：</span>
                              <button class="minus">-</button>
                              <input type="text" value="1" id="d-goods-number">
                              <button class="add">+</button>&nbsp;&nbsp;&nbsp;&nbsp;
                              <small>库存: ${data.goods_number} 件 *此处讲道理是0，不要问我为什么~</small>
                          </p>
                          <p>
                              <span></span>
                              <button id="pay-it-rightnow">立即购买</button>
                              <button id="add-to-cart" data-goods-id="${data.goods_id}">加入购物车</button>
                          </p>
                          <p>
                              <span>分享</span>
                              <a href=""><i class="fa fa-weibo"></i></a>
                              <a href=""><i class="fa fa-wechat"></i></a>
                              <a href=""><i class="fa fa-google-plus"></i></a>
                              <a href=""><i class="fa fa-facebook"></i></a>
                          </p>
                        </div>`;
          //TODO:生成节点，并绑定事件(怎么做到append前绑定事件)
          var $html = $(html);

          $('.result').html('').append($html);

          //点击增加减少商品数量
          var input = $('#d-goods-number');
          $('.add').click(function () {
            //TODO:接口缺陷，暂时不做；此处if用来限制选取商品的数量，不能大于库存数
            // if(input.val()<data.goods_number){
            input.val(1 * input.val() + 1);
            // }
          });
          $('.minus').click(function () {
            if (input.val() > 1) {
              input.val(1 * input.val() - 1);
            }
          });



//          $(".result").html("");
//          $(".result").append($('<img src="'+data.goods_thumb+'"/><p>'+data.goods_name+'</p><p>'
//            +data.goods_desc+'</p>' +'</p><p>价格：'+data.price+'元</p>'
//            +'</p><p>数量：</p>'));

          //保存当前处理的商品
          localStorage.setItem("now_goods", data.goods_id);

          //查到商品详情后，从购物车api中读取该商品的已选数量
          $.ajax({
            "type": "GET",
            "url": "http://h6.duchengjiu.top/shop/api_cart.php",
            "data": {
              "token": localStorage.getItem("token")
            },
            "success": function (response) {
              var data = response.data;
              localStorage.setItem('goods_number', 0);
              for (var i = 0; i < data.length; i++) {
                if (data[i]['goods_id'] === localStorage.getItem('now_goods')) {
                  localStorage.setItem('goods_number', data[i]['goods_number']);
                  break;
                }
              }

              //查到购物车中该商品信息之后，再绑定添加到购物车
              $('#add-to-cart').click(function () {
                if (!localStorage.getItem("token")) {
                  alert("您还未登录请在跳转的页面进行登录操作！");
                  location.href = "login#callback=" + location.href;
                  return;
                }

                var goods_id = $(this).attr('data-goods-id');
                var num = 1 * input.val();

                //提交购物信息
                var num = 1 * (input.val() || localStorage.getItem('goods_number'));
                $.ajax({
                  "type": "POST",
                  "url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.getItem('token'),
                  "data": {
                    "goods_id": goods_id,
                    "number": num,
                  },
                  "success": function (response) {
                    localStorage.setItem('goods_number', num)
                  }
                })
              })

              $('#pay-it-rightnow').click(function () {
                if (!localStorage.getItem("token")) {
                  alert("您还未登录请在跳转的页面进行登录操作！");
                  location.href = "login#callback=" + location.href;
                  return;
                }
                //提交购物信息
                var num = 1 * localStorage.getItem('goods_number');
                num = num ? num : 1;
                $.ajax({
                  "type": "POST",
                  "url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.getItem('token'),
                  "data": {
                    "goods_id": localStorage.getItem("now_goods"),
                    "number": num,
                  },
                  "success": function (response) {
                    location.href = 'cart';
                  }
                })
              })
            }
          });
        }
      });
      init();
    }
  }
</script>

<style lang="less">
  @import "../../static/css/common.css";
  @import "../../static/css/font-awesome.min.css";

  p.dir {
    margin-bottom: 20px;
    font-size: 12px;
    color: #878787;
  }

  .left {
    float: left;
    width: 730px;

  }
  .picChange {
    float: left;
    width: 350px;
  }
  .right {
    float: right;
  }
  .content {
    overflow: hidden;
  }

  .result{
    margin-top:30px;
    margin-bottom: 30px;
    float: left;
    .img-detail{
      float: left;
      width: 40%;
      &>img{
        width: 100%;
      }
      .sm-img{
        margin-top:10px;
        padding: 0 10px;
        &>img{
          float: left;
          margin-right:10px;
          width: calc(17%);
          &:last-of-type{
            margin-right:0;
          }
        }
      }
    }
  }

  .goods-content{
    float: right;
    width: 56%;
    padding-left: 10px;
    text-align: left;
    h4{
      font-size: 20px;
      font-weight: 900;
      &>small{
        color: #f58787;
        font-weight:bold;
      }
    }
    p{
      margin:21px 0;
      span{
        display: inline-block;
        width: 60px;
      }
      &:nth-of-type(2) em{
        font-size:26px;
        font-weight:900;
      }
      &:nth-of-type(4){
        input[type="text"]{
          width: 40px;
          height: 30px;
          padding:0;
          text-align: center;
          border: none;
          /*border: 1px solid #ccc;*/
          /*outline: none;*/
        }
        button{
          width: 40px;
          height: 30px;
          box-shadow: 0 0 2px 1px #eee;
          transition: all .3s;
          background: #fff;
          border: 1px solid #000;
          font-size: 18px;
          color: #000;
          &:hover{
            background: #000;
            color: #fff;
          }
        }
      }
      &:nth-of-type(6){
        a{
          i{
            color: #666;
            font-size:18px;
            margin-right:10px;
            transition: all .3s;
          }
          &:hover i{
            color: #000;
          }
        }
      }
    }
    button{
      border: none;
      outline: none;
    }
    button#pay-it-rightnow{
      width: calc(36%);
      height: 40px;
      line-height:1;
      border:1px solid #000;
      color: #000;
      background: #fff;
      transition: all .3s;
      &:hover{
        color: #fff;
        background: #000;
      }
    }
    button#add-to-cart{
      width: calc(36%);
      height: 40px;
      line-height:1;
      color: #fff;
      background: #000;
      transition: all .3s;
      &:hover{
        box-shadow: 0 1px 1px 1px #ccc;
      }
    }
  }


/*todo:待刪除*/
  .buyit, .addit, .shareit {
    display: inline-block;
    margin-top: 10px;
    width: 160px;
    height: 32px;
    border: none;
    color: black;
    line-height: 32px;
    font-size: 13px;
    border: 1px solid black;
    background-color: #fff;
    outline: none;
    cursor: pointer;
  }

  .buyit {
    width: 330px;
    height: 42px;
    color: #fff;
    background-color: #000;
  }

  .addit {
    margin-right: 6px;
  }

  .addit:hover, .shareit:hover {
    color: #fff;
    background-color: #000;
  }

</style>
