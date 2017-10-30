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
                            <h3>订单编号：${data[i].order_id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单总价：￥${data[i].total_prices}</h3>
                            <h3>订单创建时间：${new Date(data[i].created_at*1000).toLocaleString()}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单状态：${data[i].order_status}</h3>
                            <p>收货人:${data[i].consignee}</p>
                            <p>收货地址-${data[i].address}:${data[i].country}${data[i].province}${data[i].city}${data[i].district}</p>
                            <p>手机号：${data[i].mobile}</p>
                            <p>邮政编号：${data[i].zip_code}</p>
                            <h3></h3>
                        </div>
                    `;
//              TODO:这里一个报错-空白数据
              if(!data[i].goods_list) continue;
              for(var j=0;j<data[i].goods_list.length;j++){
                var obj=data[i].goods_list[j];
                html+=`
                            <ul class="cart-item" data-id="">
                                <img src="${obj.goods_thumb}" alt="">
                                <li><a href="detail?cat_id=${obj.cat_id}&goods_id=${obj.goods_id}">${obj.goods_name}</a></li>
                                <li>数量：${obj.goods_number}件</li>
                                <li>￥${obj.goods_number*obj.goods_price}</li>
                            </ul>
                        `;
              }
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
    text-align: left;
  }
  /*.order-item h3{*/
    /*text-align: left;*/
  /*}*/
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
