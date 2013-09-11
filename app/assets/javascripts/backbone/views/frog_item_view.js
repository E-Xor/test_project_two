$(function(){
  App.Views.FrogItemView = Backbone.View.extend({
    template: $('#frog_row_template').html(),

    initialize: function() {
      App.Views.FrogItemView.__super__.initialize.apply(this, arguments);
      _.bindAll(this);
    },

    render: function() {
      var m = Mustache.render(this.template, this.model.attributes);
      return m;
    },

  });

});
