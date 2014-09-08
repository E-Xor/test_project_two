;$(function(){
  App.Routers.FrogRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'frogs': 'index',
      'frogs/new': 'frog_new',
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

    frog_new: function(id) {
      var frogNewView = new App.Views.FrogView({
        collection: this.getFrogsCollection(),
        edit: true
      });

      this.setAndRenderView(frogNewView);
    },

    frog_edit: function(id) {
      var frogEditView = new App.Views.FrogView({
        collection: this.getFrogsCollection(),
        frogId: id,
        edit: true
      });

      this.setAndRenderView(frogEditView);
    },

    getFrogsCollection: function() {
      if(!this.frogsCollection) {
        this.frogsCollection = new App.Collections.FrogsCollection();
      }

      return this.frogsCollection;
    },

    setAndRenderView: function(view, force) {
      if(this.currentView) {this.currentView.remove();}
      this.currentView = view;
      $("#frog_app").html(this.currentView.$el);
      if((this.currentView.collection && !this.currentView.collection.fetched)||force) {
        this.currentView.collection.fetch();
        this.currentView.collection.fetched = true;
      }
      else {
        this.currentView.render();
      }
      window.scrollTo(0, 0);
    }

  });

});
