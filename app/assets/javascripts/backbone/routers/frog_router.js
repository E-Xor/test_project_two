$(function(){
  App.Routers.FrogRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'frogs/:id': 'frog'
    },

    index: function(){
      console.log('index from App.Router.FrogRouter');
    },

    frog: function(){
      console.log('frog from App.Router.FrogRouter∆');
    }
  });
});
