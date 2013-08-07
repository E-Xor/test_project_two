$(function(){ // This runs when document ready
              // so we don't have to call new somwhere else
  App.Views.FrogsView = Backbone.View.extend({
    el: '#app',

    events: {},

    //template: ,

    initialize: function() {
      console.log('FrogsView initialize');
      this.render();
    },

    render: function() {
      console.log('FrogsView render');
      this.$el.html("Backbone works");
    }

  });

  var frogsView = new App.Views.FrogsView();
});
