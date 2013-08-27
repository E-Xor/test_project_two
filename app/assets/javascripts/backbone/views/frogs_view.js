$(function(){ // This runs when document ready
              // so we don't have to call new somwhere else
  App.Views.FrogsView = Backbone.View.extend({
    el: '#frogs_table',

    events: {},

    initialize: function() {
      _.bindAll(this);
      this.collection = new App.Collections.FrogsCollection();
      this.collection.fetch();
      this.listenTo(this.collection,'sync', this.render);
    },

    render: function() {
      var self = this;

      this.collection.each(function(model){
        self.$el.append(new App.Views.FrogView({model: model}).render());
      });

      return this;
    }

  });

  var frogsView = new App.Views.FrogsView();
});
