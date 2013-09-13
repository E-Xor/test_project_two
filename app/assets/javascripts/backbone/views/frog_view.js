$(function(){ // This runs when document ready
              // so we don't have to call new somwhere else
  App.Views.FrogView = Backbone.View.extend({
    el: '#frog_app',

    template: $('#frog_form_template').html(),

    events: {
      "click #edit_frog_form": 'toggleEditFrogEventHandler',
      'click #cancel_edit_frog_form': 'toggleEditFrogEventHandler',
      'click #save_edit_frog_form': 'saveFrog',
      'click #delete_frog_form': 'deleteFrog'
    },

    initialize: function(options) {
      App.Views.FrogView.__super__.initialize.apply(this, arguments);
      _.bindAll(this);

      this.collection = this.options.collection;
      this.frogId = this.options.frogId;
      if(this.options.edit) { this.edit = this.options.edit; } else { this.edit = false; }
      this.listenTo(this.collection,'sync', this.render);
    },

    render: function() {
      var attributes;

      if(!this.frogId) {

        this.edit = true;
        this.newFrogModel = new App.Models.FrogModel();
        this.newFrogModel.set({
            'name':'',
            'age': ''
          },
          {'silent': true} // Don't fire an event
        );
        attributes = this.newFrogModel.attributes;

      }
      else {

        var modelForRender = this.collection.get(this.frogId);
        if(!modelForRender){ return this; }
        attributes = modelForRender.attributes;

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
      this.render();
    },

    toggleEditFrog: function() {
      this.edit = !this.edit;
      var edit_path = '';
      if(this.edit) {
        edit_path = '/edit';
      }
      Backbone.history.navigate('#frogs/'+ this.frogId + edit_path, false);
    },

    handleError: function(model, response, options){
      this.$el.find('#throbber').fadeOut(2000);
      var errorMessage = response.responseJSON.error.replace(/[&<>"'\/#]/g,'');
      if($('.error').length){
        $('.error').text(errorMessage);
      }
      else {
        this.$el.append('<div class="error">' +  errorMessage + '</div>');
      }
    },

    saveFrog: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.$el.find('#throbber').show();
      var modelForUpdate;

      if(!this.frogId) {
        modelForUpdate = this.newFrogModel;
      }
      else {
        modelForUpdate = this.collection.get(this.frogId);
      }

      if(!modelForUpdate){ return this; }
      modelForUpdate.set({
          'name': this.$el.find('#name').val(),
          'age': this.$el.find('#age').val(),
          'authenticity_token': $("meta[name=csrf-token]").attr('content')
        },
        {'silent': true} // Don't fire an event
      );

      self = this;

      if(!this.frogId) {
        this.collection.create(
          modelForUpdate.toJSON(),
          {
            success: function(model, response, options){
              self.$el.find('#throbber').hide();
              self.frogId = response.id;
              self.toggleEditFrog();
            },
            error: self.handleError,
            wait: true 
          }
        );
      }
      else {
        modelForUpdate.save(
          modelForUpdate.toJSON(),
          {
            success: function(model, response, options){
              self.$el.find('#throbber').hide();
              self.toggleEditFrog();
            },
            error: self.handleError,
            wait: true 
          }

        );
      }
    },

    deleteFrog: function(e) {
      e.preventDefault();
      e.stopPropagation();

      var modelForDeletion = this.collection.get(this.frogId);

      if(!modelForDeletion) { return this; }
      if(confirm("You're about to delete a frog "+ modelForDeletion.get('name') + ' ' + this.frogId +". That can't be undone.")) {
        self = this;
        modelForDeletion.destroy(
          {
            success: function(model, response, options){
              self.$el.find('#throbber').hide();
              this.frogId = undefined;
              Backbone.history.navigate('', true);
            },
            error: self.handleError,
            wait: true 
          }

        );
      }
    }

  });

});
