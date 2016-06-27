({
    baseUrl: './src',
    dir: './dist',
    modules: [
        {
            name: 'app',
            include: ['text', 'hbs']
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
      handlebars: "js/lib/handlebars",
      text: "js/lib/text",
      hbs: "js/lib/hbs",
    },
    shim: {
      handlebars: {
        exports: "Handlebars"
      }
    }
})
