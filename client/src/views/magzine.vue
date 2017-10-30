<template>
  <div>
    <nav-header></nav-header>
    <div class="content-box">
    <div class="content">
        <p class="ti"><i>Journal</i><small> 杂志</small></p>
        <ul class="nav">
            <li><a href="">所有杂志</a></li>
        </ul>
        <div class="mag-box"></div>
        <div class="pager">
            <button id="pager-head">第一页</button>
            <button id="pageup">上一页</button>
            <div class="pager-as"><nobr class="pager-move">
                <!-- 生成按钮 -->
            </nobr></div>
            <button id="pagedown">下一页</button>
            | 跳转到
            <input type="text">页
            <button id="pager-confirm">确定</button>
        </div>
        <script type="text/template" id="magStr">
            <div class="magbox">
                <a href="<%detailurl%>"><img src="<%imgsrc%>" alt=""></a>
                <p><nobr><%par%></nobr></p>
                <a href="<%linkback%>" class="goto"><%class%></a>
            </div>
        </script>
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
      var cat_id=catchCatId();
      function catchCatId() {
        var str = location.search.substr(1).match(/cat_id=[\d]+/);
        try{
          return str[0].split('=')[1];
        }catch (e){
          return '69';
        }
      }
      console.log(cat_id)
      //小导航导入
      $.ajax({
        "url":"http://h6.duchengjiu.top/shop/api_cat.php",
        "type":"GET",
        "success":function (json) {
          $(json.data).each(function () {
            var name=$(this)[0].cat_name;
            var tid=$(this)[0].cat_id;
            $(".content .nav").append('<li><a href="magzine?cat_id='+tid+'">'+name+'</a></li>');
          });
        }
      });
      //初始化
      //1. magzine分类映射字典生成
      // 字典保存到本地，用于显示类别名称
      var magzineDictionaryAndInit=function (call,args) {
        //如果本地已存在，则跳过初始化
        if(localStorage.getItem('magzineClassList')) return call(args);
        var magzineClassList={};//保存字典
        $.ajax({
          "url":"http://h6.duchengjiu.top/shop/api_cat.php",
          "type":"GET",
          "success":function (json) {
            $(json.data).each(function () {
              var name=$(this)[0].cat_name;
              var tid=$(this)[0].cat_id;
              $(".subbox",$("#magzine")).append(function(){
                return '<a href="magzine?cat_id='+tid+'">'+name+'</a>';
              });
              //将类别名称存入类别id中
              magzineClassList[$(this)[0].cat_id]=$(this)[0].cat_name;
              localStorage.setItem('magzineClassList',JSON.stringify(magzineClassList));
            });
            call(args);
          }
        });
      };
      magzineDictionaryAndInit(pageChange,(function () {
        //用一个立即执行函数来返回应该取到的值
        //如果当前类别没有变化，就继续保持页数；类别变了之后，则直接到第一页
        if(cat_id===localStorage.getItem('cat_id')) {
          if(!localStorage.getItem('page_number')) {
            localStorage.setItem('page_number','1');
          };
          return localStorage.getItem('page_number');
        }
        return '1';
      })());

      //绑定跳转业务
      //！ 还未做刷新停留原地实现
      function pageChange(page) {
        page=page*1;
        var className=JSON.parse(localStorage.getItem('magzineClassList'));
        $.ajax({
          "type": "GET",
          "url": "http://h6.duchengjiu.top/shop/api_goods.php?cat_id="+cat_id+"&page=" + page + "&pagesize=24",
          "success": function (response) {
            console.log(response)
            //先清空容器
            $('.mag-box').html('');
            $(response.data).each(function () {
              var data=$(this)[0];
              var dictionary = {
                "detailurl": "detail?cat_id=" + cat_id + "&goods_id=" + data.goods_id,
                "imgsrc": data.goods_thumb,
                "par": data.goods_name,
                "linkback": "magzine?cat_id=" + cat_id,
                "class": className[cat_id]
              };
              var tempHtml = $("#magStr").html().replace(/<%([a-zA-Z]+)%>/g, function (match, $1, index, str) {
                return dictionary[$1];
              });
              $(".mag-box").append(tempHtml);
            });
            //pager逻辑
            var pageCount=response.page.page_count;
            // if (page > pageCount) return alert('到达商品列表底部');
            //
            // if(page===1){
            $('.pager-as nobr').html('');
            for(var i=0;i<pageCount;i++){
              var temp="<a href='javascript:'>"+(i+1)+"</a>";
              $('.pager-as nobr').append(temp);
            }
            $('.pager-as nobr a').click(function () {
              pageChange(1 * $(this).html());
            });
            $('.pager-as nobr a').eq(page-1).css('background-color','#7fa6c5').siblings().css('background-color','#eee');
            // }
            //按钮滚动进行
            $('.pager a').each(function () {
              if(page>9){
                $('.pager-move').css('left',-(page-9)*32);
              }
              if(page>pageCount){
                alert('最后一页了~')
              }
            });
            //保存当前处理的序列，用于后续的页面处理
            localStorage.setItem('page_number', page);
            localStorage.setItem('cat_id',cat_id);
          }
        });
      }

      $('#pager-head').click(function () {
        pageChange(1);
      });
      $('#pageup').click(function () {
        var temp = 1 * localStorage.getItem("page_number");
        temp--;
        pageChange(temp);
      });
      $('#pagedown').click(function () {
        var temp = 1 * localStorage.getItem("page_number");
        temp++;
        if (temp < 0) {
          temp = 0;
        }
        pageChange(temp);
      });
      $('#pager-confirm').click(function () {
        pageChange(1 * $('.pager input').val());
      });
      init()
    }
  }
</script>

<style>
  @import "../../static/css/common.css";
  .content{
    overflow: hidden;
  }
  .content p.ti{
    margin:30px 0;
    text-align: center;
    font:bold 50px/50px Microsoft Yahei;
  }
  .content p small{
    font-size:30px;
  }
  .content .nav{
    width: 100%;
    border-bottom:1px solid #eee;
    overflow: hidden;
  }
  .content .nav li{
    float: left;
  }
  .content .nav li a{
    display: block;
    width: 70px;
    height: 30px;
    line-height:20px;
    text-align: center;
  }
  .mag-box{
    margin-bottom:20px;
    overflow: hidden;
  }
  .pager{
    font-size: 12px;
    text-align: right;
  }
  .pager a{
    display: inline-block;
    width: 24px;
    margin:4px;
    text-align: center;
    background-color: #eee;
  }
  .pager button{
    width: 50px;
    height: 20px;
    color: #fff;
    background-color: #7fa6c5;
    outline:0;
    border: 0;
    cursor: pointer;
  }
  #pager-head{
    background-color: #2751d7;
  }
  .pager input{
    width: 26px;
  }
  .pager-as{
    position: relative;
    display: inline-block;
    max-width: 320px;
    overflow: hidden;
    margin-bottom:-8px;
  }
  .pager-move{
    display: block;
    position: relative;
    top: 0;
  }
  .magbox{
    float:left;
    margin:25px 23px 0 0;
    width: 318px;
    text-align: center;
  }
  .mag-box div.magbox:nth-child(3n){
    margin:25px 0 0 0;
  }
  .magbox img{
    width: 318px;
    height: 318px;
  }
  .magbox p{
    margin: 0;
    padding: 0 20px;
    height:20px;
    font-size:14px;
    line-height:20px;
    text-overflow:ellipsis;
    overflow: hidden;
  }
  .magbox .goto{

  }

</style>
