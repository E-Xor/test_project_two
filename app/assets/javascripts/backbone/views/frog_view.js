;$(function(){ // This runs when document ready
              // so we don't have to call new somwhere else
  App.Views.FrogView = Backbone.View.extend({
    id: 'frog_details',

    template: JST['templates/frogs/frog'],

    events: {
      "click #edit_frog_form": 'toggleEditFrogEventHandler',
      'click #cancel_edit_frog_form': 'cancelHandler',
      'click #save_edit_frog_form': 'saveFrog',
      'click #delete_frog_form': 'deleteFrog'
    },

    initialize: function(options) {
      App.Views.FrogView.__super__.initialize.apply(this, arguments);
      _.bindAll(this);

      this.collection = this.options.collection;
      this.frogId = this.options.frogId;

      this.$el.addClass("flip-container");
      if(this.options.edit) {
        this.edit = this.options.edit;
        this.$el.addClass("rotate");
      } 
      else {
       this.edit = false;
     }

      this.listenTo(this.collection,'sync', this.render);
    },

    render: function() {
      var attributes;

      if(!this.frogId && this.edit) {
        
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
        attributes = this.collection.get(this.frogId).attributes;
      }

      var m = this.template(attributes);
      var el = this.$el.html(m);

      return this;
    },

    toggleEditFrogEventHandler: function(e) {
      e.preventDefault();
      e.stopPropagation();
      this.toggleEditFrog();
    },

    toggleEditFrog: function() {
      this.$el.toggleClass("rotate");
      this.edit = !this.edit;
      var edit_path = '';
      if(this.edit) {
        edit_path = '/edit';
      }
      Backbone.history.navigate('#frogs/'+ this.frogId + edit_path, false);
    },

    handleError: function(model, response, options){
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

      var modelForUpdate;

      if(!this.frogId) {
        modelForUpdate = this.newFrogModel;
      }
      else {
        modelForUpdate = this.collection.get(this.frogId);
      }

      modelForUpdate.set({
          'name': this.$el.find('#name').val(),
          'age': this.$el.find('#age').val(),
          'authenticity_token': $("meta[name=csrf-token]").attr('content')
        },
        {'silent': true} // Don't fire an event
      );

      if(modelForUpdate.isValid()) { // Explicitly validate

        self = this;
        var originalText = this.startThrobber($(e.target));

        if(!this.frogId) {
          this.collection.create(
            modelForUpdate.toJSON(),
            {
              success: function(model, response, options){
                self.stopThrobber($(e.target), originalText);
                self.frogId = response.id;
                self.toggleEditFrog();
              },
              error: function(model, response, options){
                self.stopThrobber($(e.target), originalText);
                self.handleError(model, response, options);
              },
              wait: true 
            }
          );
        }
        else {
          modelForUpdate.save(
            modelForUpdate.toJSON(),
            {
              success: function(model, response, options){
                self.stopThrobber($(e.target), originalText);
                self.toggleEditFrog();
              },
              error: function(model, response, options){
                self.stopThrobber($(e.target), originalText);
                self.handleError(model, response, options);
              },
              wait: true 
            }

          );
        }
      }
    },

    deleteFrog: function(e) {
      e.preventDefault();
      e.stopPropagation();

      var modelForDeletion = this.collection.get(this.frogId);

      if(confirm("You're about to delete a frog "+ modelForDeletion.get('name') + ' ' + this.frogId +". That can't be undone.")) {
        self = this;
        modelForDeletion.destroy(
          {
            success: function(model, response, options){
              Backbone.history.navigate('frogs', true);
            },
            error: function(model, response, options){
              self.handleError(model, response, options);
            },
            wait: true 
          }

        );
      }

    },

    cancelHandler: function(e) {
      e.preventDefault();
      e.stopPropagation();
      if(!this.frogId) {
        Backbone.history.navigate('', true);
      }
      else {
        this.toggleEditFrogEventHandler(e);
      }
    },

    startThrobber: function($el){ // Move to a separate lib
      var originalText = $el.text();
      $el.addClass('disabled');
      $el.addClass('throbberBtn');

      var originaWidth = $el.outerWidth(); 
      var bgPositionX = $el.outerWidth()/2 - 9 + 'px';
      var bgPositionY = $el.outerHeight()/2 - 9 + 'px';

      $el.html('&nbsp;');
      $el.css({
          'width': originaWidth + 'px',
          'background-position': bgPositionX + ' ' + bgPositionY
      });

      return originalText;
    },

    stopThrobber: function($el, originalText){ // Move to a separate lib
        $el.removeClass('disabled');
        $el.removeClass('throbberBtn');
        $el.text(originalText);
    }

  });

});
