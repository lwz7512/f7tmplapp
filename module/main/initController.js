/**
 * 当前业务模块的全部逻辑，该模块会被router自动载入并调用init方法
 * 注意下面：hbs!module/与/pageContent间的路径，即当前模块文件所在路径
 *
 * @2015/11/25
 */
define(["app", "hbs!module/main/pageContent"], 
       function(app, template){

  var $ = Dom7;//模拟jquery的符号，这样看着舒服
  var _page;
  
  var tasklist;//需要动态赋值


  function init(page){
    _page = page;//缓存一个页面对象方便后面操作
    
    tasklist = [
      '小区名称:果园西里小区1<br/>客户名称<br/>编号:BJ-801-150807-2 环节:订单受理与开通预约<br/> 客户帐号:18301106230 <br/>是否上门收费: 套餐金额:',
      '小区名称:果园西里小区2<br/>客户名称<br/>编号:BJ-801-150807-2 环节:订单受理与开通预约<br/> 客户帐号:18301106230 <br/>是否上门收费: 套餐金额:',
      '小区名称:果园西里小区3<br/>客户名称<br/>编号:BJ-801-150807-2 环节:订单受理与开通预约<br/> 客户帐号:18301106230 <br/>是否上门收费: 套餐金额:',
      '小区名称:果园西里小区4<br/>客户名称<br/>编号:BJ-801-150807-2 环节:订单受理与开通预约<br/> 客户帐号:18301106230 <br/>是否上门收费: 套餐金额:',
      '小区名称:果园西里小区5<br/>客户名称<br/>编号:BJ-801-150807-2 环节:订单受理与开通预约<br/> 客户帐号:18301106230 <br/>是否上门收费: 套餐金额:'
    ];
    
    //动态显示pageContent内容，当然这个操作可以在取完数据后进行，template()的参数里面可以放后台取到的数据
    //一般通过 $.getJSON()方法 取回的数据就是js对象，可以处理完直接丢给模板
    $(page.container).html(template());
    
    //派发全局事件给uicontroller
    $(document).trigger('renderComplete', {page: _page});

    addEventHandler();
    
    getTaskInit();
    getTaskFinishInit();
    
    //初始化搜索条...不然搜索不起作用
    var mySearchbar = app.f7.searchbar('.form-a',{
        searchList: '.list-block-search',
        searchIn: '.item-title-small'
    });
    
    
    var container = Handlebars.compile("{{> infoSub}}");
    console.log(container);
    
  }//end of init
  


  function getTaskInit(){
    $('#tabname1').html("待办工单("+4+")");

    $('#tasklist').find('ul').html("");

    var t7data=[];
    for (var i=0;i<3;i++){
      var type = i%2?'apple':'banana';
      t7data[i] = {
        taskdata: tasklist[i], 
        tid: i,
        type: type//模拟个属性看观察模板怎么处理
      };
    }

    var container = Handlebars.compile("{{> task}}");
    var tasksHTML = container(t7data);
    $('#tasklist').find('ul').html(tasksHTML);
  }

  function getTaskFinishInit(){
    $('#tabname2').html("已办工单("+3+")");

    var t7data=[];
    for (var i=0;i<3;i++){
      
      t7data[i]={'taskdata':tasklist[i]+"<br/>完成", tid: i};
    }
    var container = Handlebars.compile("{{> task}}");
    var tasksHTML = container(t7data);
    $('#taskfinishlist').find('ul').html(tasksHTML);
  }
  

  function addEventHandler(){
    //凡事添加在document上的事件，都要以安全的方式添加监听，即保证只有一个监听器
    app.utils.safeBind(document, 'active', activeHandler);
  }
  
  function activeHandler(event){
    if(event.detail.page != _page.name) return;
    //go on in current page...
    console.log(_page.name+' is back...');
    
    //如果是从高级查询页返回，则app.queriedtasks就有值了
    if(app.queriedtasks){
      tasklist = app.queriedtasks;
      getTaskInit();
      getTaskFinishInit();
    }
  }

  //注意这个东西，每个requirejs模块都要有这个对象返回，作为对外暴露的方法
  return {
    init: init
  };

});
