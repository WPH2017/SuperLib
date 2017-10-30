<template>
  <div>
    <nav-header></nav-header>
    <div class="content-box">
      <div class="content">
        <div class="order-table">
          <h1>订单信息</h1>
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
    components: {
      navHeader,
      navFooter
    },
    mounted(){
      $.ajax({
        'type':'GET',
        'url':'http://h6.duchengjiu.top/shop/api_order.php?token='+localStorage.getItem("token"),
        'data':{
        },
        'success':function (response) {
          console.log(response);
          var data=response.data;
          if(data.length>0){
            for(var i=0;i<data.length;i++){
              var html=`<div class="order-item">
                            <h3>订单编号：${data[i].order_id}</h3>
                    `;
//              TODO:这里一个报错-空白数据
              for(var j=0;j<data[i].goods_list.length;j++){
                var obj=data[i].goods_list[j];
                html+=`
                            <ul class="cart-item" data-id="">
                                <img src="${obj.goods_thumb}" alt="">
                                <li><a href="detail?id=${obj.goods_id}">${obj.goods_name}</a></li>
                                <li>数量：${obj.goods_number}件</li>
                                <li>￥${obj.goods_number*obj.goods_price}</li>
                            </ul>
                        `;
              }
              html+=`
                            <p>收货人:</p>
                            <p>收货地址:${data[i].province}${data[i].city}${data[i].address}</p>
                            <p>手机号：${data[i].mobile}</p>
                            <h3>订单总价：￥${data[i].total_prices}</h3>
                        </div>
                    `;
              $('.order-table').append(html);
            }
            // for()
          }
        }
      })
      init()
    }
  }
</script>

<style>
  @import "../../static/css/common.css";
  .order-table{

  }
  .order-item{
    margin: 40px 0;
    background-color: #eee;
  }
  .order-item h3{
    text-align: center;
  }
  .cart-item{
    overflow: hidden;
    border-bottom: 1px solid #eee;
  }
  .cart-item img{
    float: left;
    width: 70px;
    margin-right:20px;
  }
  .cart-item li{
    float: left;
    margin-right:20px;
  }
  .cart-item li:first-of-type{
    width: 600px;
  }
  .order-item p{
    line-height: 28px;
  }
</style>
