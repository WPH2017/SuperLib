<template>
  <div>
    <nav-header></nav-header>
    <div class="content-box">
      <div class="content">
        <ul class="step">
          <li class="step1">1. 购物车订单</li>
          <li class="step2">2. 订单生成</li>
          <li class="step3">3. 付款</li>
        </ul>
        <table class="cart-table">
          <tr class="h-tr">
            <th>
              <input type="checkbox">全选
            </th>
            <th>良品</th>
            <th>数量</th>
            <th>单价（元）</th>
            <th>小计（元）</th>
            <th>操作</th>
          </tr>
          <!--模板开始-->
          <!--<tr class="item">-->
          <!--<td>-->
          <!--<input type="checkbox">-->
          <!--<img src="" alt="">-->
          <!--</td>-->
          <!--<td><a href="">Bradley Sliver Blue 电光蓝触觉系列腕表一只</a>-->
          <!--</td>-->
          <!--<td>-->
          <!--<button>-</button>-->
          <!--<span> 1 </span>-->
          <!--<button>+</button>-->
          <!--</td>-->
          <!--<td>-->
          <!--price-->
          <!--</td>-->
          <!--<td>-->
          <!--amount-->
          <!--</td>-->
          <!--<td>-->
          <!--oparator-->
          <!--</td>-->
          <!--</tr>-->
          <!--模板结束-->
        </table>
        <div class="summary">
          <p>良品总价 / <span class="number">￥0.00</span></p>
          <br><button class="submit">立即结算</button>
          <br><a href="index" class="continue"> 继续购物 </a>
        </div>
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
      $.ajax({
        "type":"GET",
        "url":"http://h6.duchengjiu.top/shop/api_cart.php",
        "data":{
          "token":localStorage.getItem("token")
        },
        "success":function (response) {
          console.log(response)
          if(response.data.length>0){
            //循环加载模板字面量
            for(var i=0;i<response.data.length;i++){
              var obj=response.data[i];
              var html=`<tr class="item" data-id="${obj.goods_id}">
                            <td>
                                <input type="checkbox">
                                <img src="${obj.goods_thumb}" alt="">
                            </td>
                            <td><a href="">${obj.goods_name}</a>
                            </td>
                            <td>
                                <button class="numless">- </button>
                                <span class="goodsnum">${obj.goods_number}</span>
                                <button class="nummore"> +</button>
                            </td>
                            <td class="goodsprice">
                                ${obj.goods_price}
                            </td>
                            <td class="goodsamount">
                                ${obj.goods_price*obj.goods_number}
                            </td>
                            <td>
                                <a href="javascript:void(0)" class="cart-delete">删除</a>
                            </td>
                        </tr>`;

              $('.cart-table').html($('.cart-table').html()+html);
            }
            //加载前先计算总价
            updateSum();
            //绑定全选按钮事件
            $('.cart-table th input:checkbox').click(function () {
              var chk=$('.cart-table th input:checkbox').prop("checked");
              // $('.cart-table th input:checkbox').prop("checked",chk);
              $('.cart-table .item input').each(function () {
                $(this).prop("checked",chk);
              });
              updateSum();
            });

            //绑定单个商品按钮事件
            $('.cart-table .item input').click(function () {
              updateSum();
            });

            //绑定商品数量增减事件
            $('.numless').each(function (index) {
              $(this).click(function () {
                var oNum=$('.goodsnum').eq(index);
                var temp=1*oNum.html()-1;
                if(temp<0){
                  temp=0;
                }
                if(temp>10){
                  temp=10;
                }
                oNum.html(temp);
                $('.goodsamount').eq(index).html(temp*$('.goodsprice').eq(index).html());
              });
            });
            $('.nummore').each(function (index) {
              $(this).click(function () {
                var oNum=$('.goodsnum').eq(index);
                var temp=1*oNum.html()+1;
                if(temp<0){
                  temp=0;
                }
                if(temp>10){
                  temp=10;
                }
                oNum.html(temp);
                $('.goodsamount').eq(index).html(temp*$('.goodsprice').eq(index).html());
              })
            })
          }

          //计算总价
          //用到了自定义绑定事件，每当小计改变就给总价赋值
          $('.goodsamount').bind('DOMNodeInserted',function () {
            updateSum();
          });

          //封装改变总价函数
          function updateSum() {
            var sum=$('.number','.summary');
            var temp=0;
            $('.goodsamount').each(function () {
              if($(this).parent().find('input:checkbox').is(':checked')){
                temp+=1*$(this).html();
              }
            });
            sum.html("￥"+temp);
          }

          //删除当前商品
          $('.cart-delete').each(function(){
            $(this).click(function () {
              if(!confirm("确定要删除当前商品吗？")) return;
              var aim=$(this);
              console.log($(this).parent().parent().attr("data-id"));
              $.ajax({
                "type":"POST",
                "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem("token"),
                "data":{
                  // "token":localStorage.getItem("token"),
                  "goods_id":$(this).parent().parent().attr("data-id"),
                  "number":0,
                  // "user_id":localStorage.getItem("user_id")
                },
                "success":function (response) {
                  aim.parent().parent().remove();
                  location.reload();
                }
              });
            })
          })
        }
      });
      $('button.submit').click(function () {
        if(!localStorage.getItem("token")){
          if(confirm("还未登录，需要为你跳转吗？")){
            location.href="login#callback="+location.href;
            return;
          }
          //选择不跳转就不执行下面
          return;
        }
        //确定购物车
        //1. 删除没有选中的商品
        $('.goodsamount').each(function () {
          //没选中的商品
          if(!$(this).parent().find('input:checkbox').is(':checked')){
            $.ajax({
              "type":"POST",
              "url":"http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem("token"),
              "data":{
                "goods_id":$(this).parent().attr("data-id"),
                "number":0
              },
              "success":function (response) {
                console.log("删除一个商品");
                // location.reload();
              }
            });
          }
        });
        //2. 本地存储总价
        localStorage.setItem("summary",$('.number','.summary').html());
        //跳转
        location.href="settle#callback="+location.href;
      });
      init()
    }
  }
</script>

<style>
  @import "../../static/css/common.css";
  .step{
    position: relative;
    width: 400px;
    margin:20px auto;
    overflow: hidden;
  }
  .step li{
    float: left;
    padding:0 30px;
    font-size: 13px;
    text-align: center;
  }
  .step li:first-of-type{
    color: #0c6eba;
    background-color: #eee;
  }
  .step li:nth-of-type(2){
    border:1px solid #5c5c5c;
    border-width: 0 1px;
  }
  .cart-table{
    width: 100%;
    border-spacing: 0;
  }
  .cart-table th,.cart-table td{
    border-spacing: 0;
  }
  .cart-table th{
    color: #666;
    font-weight:normal;
    font-size:15px;
    height: 52px;
    border-bottom: 2px solid #ccc;
    text-align: center;
  }
  .cart-table tr th:first-of-type{
    width: 120px;
    text-align: left;
  }
  .cart-table tr th:nth-of-type(2){
    width: 310px;
  }
  .cart-table tr th:nth-of-type(3){
    width: 130px;
  }
  .cart-table tr th:nth-of-type(4){
    width: 170px;
  }
  .cart-table tr th:nth-of-type(5){
    width: 170px;
  }
  .cart-table tr th:last-of-type{
    width: 100px;
  }
  .cart-table td{
    height: 100px;
    font-size:13px;
    color: #6c6c6c;
    font-weight:normal;
    text-align: center;
    border-bottom: 2px solid #ccc;
  }
  .cart-table td>img {
    width: 70px;
    height: 70px;
  }
  .cart-table tr td:first-of-type,.cart-table tr td:nth-of-type(2){
    text-align: left;
  }
  .cart-table td>input[type="checkbox"]{
    float: left;
  }
  .cart-table .item button{
    color: #6c6c6c;
    width: 12px;
    border:0;
    outline: none;
    cursor: pointer;
    background-color: transparent;
  }
  .cart-table .item button:hover{
    background-color: #eee;
  }
  .summary{
    text-align: center;
  }
  .summary p{
    margin:10px 0 -10px 0;
  }
  .summary .number{
    font-size:20px;
    font-weight:bold;
    color: #0066ff;
  }
  .summary .submit{
    width: 168px;
    height: 30px;
    color: #fff;
    background-color: #7fa6c5;
    outline:0;
    border: 0;
    cursor: pointer;
  }
  .summary .continue{
    display: block;
    margin-top:16px;
  }
  .summary .continue::before{
    content: '—————';
  }
  .summary .continue::after{
    content: '—————';
  }

</style>
