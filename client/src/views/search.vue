<template>
  <div>
    <nav-header></nav-header>
    <div class="content-box">
      <div class="content">
        <p class="dir">
          <!--目录-->
        </p>
        <p class="result-main"></p>
        <div class="result-container">
          <!-- 搜索结果 -->
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
      var str=location.search.substr(1);
      var text=decodeURIComponent(str.match(/wrd=(\S+)/)[1]);

      //发起搜索请求
      $.ajax({
        "type":"GET",
        "url":"http://h6.duchengjiu.top/shop/api_goods.php",
        "data":{
          "search_text":text,
        },
        "success":function(response){
          console.log(response);
          $('p.dir').html("<a href='index.html'>良仓</a> > 搜索结果："+text);
          if(response.code===0){
            $('p.result-main').html('为你搜到与“'+text+'”相关的良品 '+response.page.count+' 件');
            var className=JSON.parse(localStorage.getItem('magzineClassList'));
            var html='';
            var data=response.data;
            for(var i=0;i<data.length;i++){
              var json=data[i];
              html+=`
                        <div class="result-box">
                            <a href="detail?cat_id=${json.cat_id}&goods_id=${json.goods_id}"><img src="${json.goods_thumb}" alt=""></a>
                            <p><nobr>${json.goods_name}</nobr></p>
                            <a href="">${className[json.cat_id]}</a>
                        </div>
                    `;
            }
            $('.result-container').html('');
            $('.result-container').append(html);
          }else if(response.code===1){
            $('.result-container').html('未搜索到与“ '+text+' ”相关的商品').css({
              'font-size':20,
              'color':'#aaa',
              'text-align':'center',
              'height':100
            });
          }
        }
      });
      init();
    }
  }
</script>

<style>
  @import "../../static/css/common.css";
  p.dir{
    margin-bottom:20px;
    font-size:12px;
    color: #878787;
  }
  .result-main{
    text-align: center;
    color: #999;
  }
  .result-container{
    overflow: hidden;
  }

  .result-box{
    float:left;
    margin:25px 25px 0 0;
    width: 180px;
    text-align: center;
  }
  .result-container div.result-box:nth-child(5n){
    margin:25px 0 0 0;
  }
  .result-box img{
    width: 180px;
    height: 180px;
  }
  .result-box p{
    margin: 0;
    padding: 0 20px;
    height:20px;
    font-size:14px;
    line-height:20px;
    text-overflow:ellipsis;
    overflow: hidden;
  }
</style>
