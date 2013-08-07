App.Routers.FrogRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  index: function(){
    console.log('index from App.Router.FrogRouter');
  }
});
