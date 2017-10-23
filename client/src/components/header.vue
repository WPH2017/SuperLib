<template>
  <div>
    <div class="header-box">
      <div class="header">
        <a href="index.html"><i class="logo"></i></a>
        <div class="h-nav">
          <ul>
            <li class="login"><a href="./mobilelogin">登录 </a>&nbsp;&nbsp;<a href="./register">注册</a></li>
            <li class="line"></li>
            <li class="sub cart-list"><a href="cart">购物车</a>
              <div class="subnav subnav1">
                <div class="card1 card-cart">
                  <!--你的购物车暂时没有商品...-->
                  <!--<div class="card-cart-item" data-id="${data.goods_id}">-->
                  <!--<a href="detail.html?id=${data.goods_id}"><img src="${data.goods_thumb}" alt=""></a>-->
                  <!--<a href="detail.html?id=${data.goods_id}">${data.goods_name}</a><br>-->
                  <!--数量：${data.goods_number}件<span class="card-amount">￥${data.goods_number*data.goods_price}</span>-->
                  <!--</div>-->
                </div>
                <a href="javascript:void(0)">
                  <div class="card2"></div>
                </a>
              </div>
            </li>
            <li class="line"></li>
            <li class="sub"><a href="javascript:">消息</a>
              <div class="subnav subnav2">
                <ul>
                  <li><a href="javascript:void(0)"><span>动态</span><small>0</small></a></li>
                  <li><a href="javascript:void(0)"><span>评论</span><small>0</small></a></li>
                  <li><a href="javascript:void(0)"><span>私信</span><small>0</small></a></li>
                  <li><a href="javascript:void(0)"><span>粉丝</span><small>0</small></a></li>
                  <li><a href="javascript:void(0)"><span>喜欢</span><small>0</small></a></li>
                  <li><a href="javascript:void(0)"><span>通知</span><small>0</small></a></li>
                </ul>
              </div>
            </li>
            <li class="line"></li>
            <li class="add"><a href="addGoods.html">添加良品</a></li>
          </ul>
        </div>
        <div class="c-nav">
          <ul>
            <li class="none"><a href="index.html">首页</a></li>
            <li>
              <a href="shop.html">商店</a>
              <div class="subbox">
                <div class="list">
                  <table>
                    <tr class="r1">
                      <td><img src="/static/img/list-icon/23687.png" alt=""><br><span>家居</span></td>
                      <td><img src="/static/img/list-icon/23685.png" alt=""><br><span>家具</span></td>
                      <td><img src="/static/img/list-icon/23686.png" alt=""><br><span>文具</span></td>
                      <td><img src="/static/img/list-icon/23683.png" alt=""><br><span>数码</span></td>
                      <td><img src="/static/img/list-icon/23682.png" alt=""><br><span>玩乐</span></td>
                      <td><img src="/static/img/list-icon/23684.png" alt=""><br><span>厨卫</span></td>
                      <td><img src="/static/img/list-icon/23680.png" alt=""><br><span>美食</span></td>
                    </tr>
                    <tr class="r0"></tr>
                    <tr class="r2">
                      <td><img src="/static/img/list-icon/23679.png" alt=""><br><span>男装</span></td>
                      <td><img src="/static/img/list-icon/23678.png" alt=""><br><span>女装</span></td>
                      <td><img src="/static/img/list-icon/23677.png" alt=""><br><span>童装</span></td>
                      <td><img src="/static/img/list-icon/23676.png" alt=""><br><span>鞋包</span></td>
                      <td><img src="/static/img/list-icon/23675.png" alt=""><br><span>配饰</span></td>
                      <td><img src="/static/img/list-icon/23681.png" alt=""><br><span>美护</span></td>
                      <td><img src="/static/img/list-icon/23674.png" alt=""><br><span>户外</span></td>
                    </tr>
                    <tr class="r0"></tr>
                    <tr class="r3">
                      <td><img src="/static/img/list-icon/23671.png" alt=""><br><span>植物</span></td>
                      <td><img src="/static/img/list-icon/23668.png" alt=""><br><span>图书</span></td>
                      <td><img src="/static/img/list-icon/23672.png" alt=""><br><span>艺术</span></td>
                      <td><img src="/static/img/list-icon/23669.png" alt=""><br><span>礼物</span></td>
                      <td><img src="/static/img/list-icon/23670.png" alt=""><br><span>推荐</span></td>
                    </tr>
                    <tr class="r0"></tr>
                  </table>
                  <p><a href="javascript:">查看所有品牌>></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:">最新到货>></a></p>
                </div>
                <div class="magazine">
                  <a href="javascript:void(0)">
                    <img src="/static/img/magazine.jpg" alt="">
                    <span>新视线：2015年7月刊</span>
                  </a>
                </div>
              </div>
            </li>
            <li id="magazine">
              <a href="magazine.html">杂志</a>
              <div class="subbox para">
                <!--<a href="">趣物</a>-->
              </div>
            </li>
            <li id="share">
              <a href="share.html">分享</a>
              <div class="subbox para">
                <!--<a href="">趣物</a>-->
              </div>
            </li>
            <li class="none"><a href="javascript:void(0)">达人</a></li>
            <li class="searchbox">
              <a href="javascript:void(0)" class="search-icon"></a>
              <div id="search">
                <input type="text" placeholder="search...">
              </div>
            </li>
          </ul>

        </div>
      </div>
      <div id="backBtn"></div>
      <a href="javascript:void(0)"><div class="contact">联系客服</div></a>
    </div>
  </div>
</template>

<script>

</script>
