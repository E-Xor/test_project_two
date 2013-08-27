$(function(){
  App.Views.FrogView = Backbone.View.extend({
    tagName: "tr",

    events: {
      'click #frog_table tr': "handleRowClick"
    },

    template: $('#frog_row').html(),

    initialize: function() {
      _.bindAll(this);
    },

    render: function() {
      var m = Mustache.render(this.template, this.model.attributes);
      return m;
    },

    handleRowClick: function() {
      console.log('handleRowClick');
    }

  });

});
