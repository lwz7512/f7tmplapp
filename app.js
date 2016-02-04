//****** require module config ******
require.config({
  paths: {
    handlebars: "lib/handlebars",
    text: "lib/text",
    hbs: "lib/hbs",
  },
  shim: {
    handlebars: {
      exports: "Handlebars"
    }
  },
  config: {
    'app':{'version': 0.1}//@2015/07/02
  }
});

/******** app module definition ***********/
define("app",
       ["js/router",
        "js/utils",
        "js/partials",
        "js/service.dao",
        "js/uicontroller"], function(router, Utils, partials, dao, controller) {


  //hide splash, @2015/11/10
  if(navigator.splashscreen) navigator.splashscreen.hide();

  //>>>important!
  //place here to process the first page in main view
  router.init();

  // Initialize your app
  var f7 = new Framework7({
    modalTitle: '应用提示',
    animateNavBackIcon: true,
    modalButtonOk: '确定',
    modalButtonCancel: '取消',
    template7Pages: true,//enable Template7 rendering for pages @2015/08/20
  });

  var mainView = f7.addView('.view-main', {
    dynamicNavbar: true,
    domCache: true,
    animatePages: false,
  });

  //add app level event listener
  //@2015/08/07
  controller.init(f7);
  // cache app
  router.complete(f7);

  // init patials
  partials.init();

  // init service
  dao.init(f7);


  return {
    f7: f7,
    mainView: mainView,
    router: router,
    utils: Utils
  };

});
