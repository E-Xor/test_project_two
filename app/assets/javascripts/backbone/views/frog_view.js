$(function(){ // This runs when document ready
              // so we don't have to call new somwhere else
  App.Views.FrogView = Backbone.View.extend({
    el: '#frog_app',

    template: $('#frog_form_template').html(),

    events: {
      "click #edit_frog_form": 'toggleEditFrog',
      'click #cancel_edit_frog_form': 'toggleEditFrog',
      'click button#save_edit_frog_form': 'saveFrog'
    },

    initialize: function(options) {
      //App.Views.FrogView.__super__.initialize.apply(this, arguments);
      _.bindAll(this);

      this.collection = this.options.collection;
      this.frogId = this.options.frogId;
      this.options.edit ? this.edit = this.options.edit : this.edit = false;
      this.listenTo(this.collection,'sync', this.render);
    },

    render: function() {
      var attributes;

      if(this.frogId == 'new') {

        this.edit = true;
        this.newFrogModel = new App.Models.FrogModel;
        this.newFrogModel.set({
            'name':'',
            'age': ''
          },
          {'silent': true} // Don't fire an event
        );
        attributes = this.newFrogModel.attributes;

      }
      else {

        attributes = this.collection.get(this.frogId).attributes;

      }
      _.extend(attributes, {edit: this.edit});

      var m = Mustache.render(this.template, attributes);
      var el = this.$el.html(m);

      return this;
    },

    toggleEditFrogEventHandler: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.toggleEditFrog();
    },

    toggleEditFrog: function() {
      this.edit = !this.edit;
      this.render();
      var edit_path = '';
      if(this.edit) {
        edit_path = '/edit';
      }
      Backbone.history.navigate('#frogs/'+ this.frogId + edit_path, false);
    },

    saveFrog: function(e) {
      this.$el.find('#throbber').show();

      if(this.frogId == 'new') {
        var modelForUpdate = this.newFrogModel;
      }
      else {
        var modelForUpdate = this.collection.get(this.frogId);
      }

      modelForUpdate.set({
          'name': this.$el.find('#name').val(),
          'age': this.$el.find('#age').val(),
          'authenticity_token': $("meta[name=csrf-token]").attr('content')
        },
        {'silent': true} // Don't fire an event
      );

      self = this;
      modelForUpdate.save(
        modelForUpdate.toJSON(),
        {
          success: function(model, response, options){
            self.$el.find('#throbber').hide();
            self.toggleEditFrog();
          },
          error: function(model, response, options){
            self.$el.find('#throbber').fadeOut(2000);
            var errorMessage = response.responseJSON.error.replace(/[&<>"'\/#]/g,'');
            if($('.error').length){
              $('.error').text(errorMessage);
            }
            else {
              self.$el.append('<div class="error">' +  errorMessage + '</div>');
            }
          },
          wait: true 
        }
      );
    }

  });

});
