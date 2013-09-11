$(function(){
  App.Routers.FrogRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'frogs/:id': 'frog',
      'frogs/:id/edit': 'frog_edit'
    },

    index: function(){
      var frogsView = new App.Views.FrogsView({
        collection: this.getFrogsCollection()
      });

      this.setAndRenderView(frogsView);
    },

    frog: function(id){
      var frogView = new App.Views.FrogView({
        collection: this.getFrogsCollection(),
        frogId: id
      });

      this.setAndRenderView(frogView);
    },

    frog_edit: function(id) {
      var frogView = new App.Views.FrogView({
        collection: this.getFrogsCollection(),
        frogId: id,
        edit: true
      });

      this.setAndRenderView(frogView);
    },

    getFrogsCollection: function() {
      if(!this.frogsCollection) {
        this.frogsCollection = new App.Collections.FrogsCollection();
      }

      return this.frogsCollection;
    },

    setAndRenderView: function(view) {
      this.currentView = view;
      $("#frog_app").html(this.currentView.$el);
      if(this.currentView.collection && !this.currentView.collection.fetched) {
        this.currentView.collection.fetch();
        this.currentView.collection.fetched = true;
      }
      else {
        this.currentView.render();
      }
    }

  });

});
