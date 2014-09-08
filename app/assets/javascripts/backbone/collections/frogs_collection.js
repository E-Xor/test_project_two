;$(function(){
  App.Collections.FrogsCollection = Backbone.Collection.extend({
    model : App.Models.FrogModel,
    url : "/frogs",

    initialize: function () {
      App.Collections.FrogsCollection.__super__.initialize.apply(this, arguments);
    },

    parse: function (response) {
      if (typeof response !== 'undefined') {
        return response;
      }
      return [];
    }
  });
});
