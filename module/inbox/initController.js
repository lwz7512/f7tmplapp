/**
 * 当前业务模块的全部逻辑，该模块会被router自动载入并调用init方法
 * 注意下面：hbs!module/与/pageContent间的路径，即当前模块文件所在路径
 *
 * @2015/11/25
 */

define(["app", "hbs!module/inbox/pageContent"], function(app, template){

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

    $('.information').click(function(){
      console.log('information...');
      app.mainView.router.load({
        url: 'page/home.html',
        reload: true, //FIX, for fix home scroll position @2015/08/27
      });
    });

    $('.inbox').click(function(){
      console.log('inbox...');
      app.mainView.router.load({
        url: 'page/inbox.html',
        reload: true, //FIX, for fix home scroll position @2015/08/27
      });
    });

    $('.upload').click(function(){
      app.mainView.router.load({
        url: 'page/upload.html',
        reload: true, //FIX, for fix home scroll position @2015/08/27
      });
    });

  }

  function activeHandler(event){
    if(event.detail.page != _page.name) return;
    //go on in current page...
    console.log(_page.name+'is back...');

  }

  return {
    init: init
  };

});
