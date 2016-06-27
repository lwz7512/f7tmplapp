/**
 * 当前业务模块的全部逻辑，该模块会被router自动载入并调用init方法
 * 注意下面：hbs!module/与/pageContent间的路径，即当前模块文件所在路径
 *
 * @2015/11/25
 */

define(["app", "hbs!module/adv-search/pageContent"], function(app, template){

  var $ = Dom7;
  var _page;

  function init(page){
    _page = page;
    
    //显示pageContent内容，当然这个操作可以在取完数据后进行，template()的参数里面可以放数据
    $(page.container).html(template());
    
    //派发全局事件给
    $(document).trigger('renderComplete', {page: _page});

    addEventHandler();
    
    
  }//end of init

  function addEventHandler(){
    app.utils.safeBind(document, 'active', activeHandler);
    
    //提交查询条件处理
    $('.button-submit').click(function(){
      var formdata = app.f7.formToJSON('#search-form');//获取表单数据
      console.log(formdata);
      //TODO, 模拟一个后台查询操作然后返回数据
      //$.post('url', formdata, callback);
      setTimeout(function(){
        
        //假装从后台得到数据了
        var result = ['task-0','task-1','task-2','task-3','task-4','task-5']
        //传递该数据到前一个页面的办法最简单办法就是存到app对象中，然后前一页来取
        app.queriedtasks = result;
        
        app.f7.hideIndicator();//查询结束
        closeMe();//自动关闭当前页以显示新结果
      }, 3000);
      app.f7.showIndicator();//显示进度条
    });//end of query handle...
    
  }
  
  function activeHandler(event){
    if(event.detail.page != _page.name) return;
    //go on in current page...
    console.log(_page.name+'is back...');
    
  }
  
 function closeMe(){
    //console.log("delay to close me...");
    //*** TRICK: delay to back the previous page, waiting for reinit the home page by framework...
    //@2015/07/02
    setTimeout(function(){
      _page.view.router.back({animatePages:false });
    }, 50);
  }
  

  return {
    init: init
  };

});
