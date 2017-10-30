<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){
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
    magzineDictionaryAndInit(()=>console.log('分类列表加载完成'));
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
