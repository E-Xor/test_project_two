$(function(){ // This runs when document ready
              // so we don't have to call new somwhere else
  App.Views.FrogsView = Backbone.View.extend({
    el: '#frog_app',

    template: $('#frogs_template').html(),

    events: {
      "click tr.clickable_row": "renderFrogView",
      "click #create_frog": "createNewFrog"
    },

    initialize: function() {
      App.Views.FrogsView.__super__.initialize.apply(this, arguments);
      _.bindAll(this);
      this.collection = this.options.collection;
      this.listenTo(this.collection, "sync", this.render);
    },

    render: function() {
      this.$el.html(this.template);

      this.collection.each(function(model){
        $('#frogs_table').append(new App.Views.FrogItemView({model: model}).render());
      });

      return this;
    },

    renderFrogView: function(event) {
      event.preventDefault();
      event.stopPropagation();  
      var frogId = $(event.target).parent().attr('frog-id');
      Backbone.history.navigate('#frogs/'+ frogId, true);
    },

    createNewFrog: function(event) {
      event.preventDefault();
      event.stopPropagation();  
      Backbone.history.navigate('#frogs/new', true);
    }

  });

});
