$(function(){
  App.Models.FrogModel = Backbone.Model.extend({
    initialize: function (options) {
      _.bindAll(this);
    },

    validate: function(attrs, options) {
      _.each(['#name_line', '#age_line'], function(el) {
        $(el+' .inline_error').hide();
      });

      var msg;
      if (!attrs.name) {
        msg = 'Please specify a name';
        $('#name_line').append('<span class="inline_error">'+msg+'</span>');
        return msg;
      }
      if (!attrs.age || isNaN(parseInt(attrs.age, 10)) || attrs.age <= 0 || attrs.age >= 100) {
        msg = 'Age should be between 0 and 100';
        $('#age_line').append('<span class="inline_error">'+msg+'</span>');
        return msg;
      }
    }
  });
});
