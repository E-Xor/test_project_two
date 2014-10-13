;(function(){
  NgApp.directive("imageDrop",
    function () {
      return {
        restrict: "A",
        link: function (scope, element, attrs) {

          onDrag = function(e){
            e.preventDefault();
            event.dataTransfer.effectAllowed = 'copy';
            return false;
          };
          element.on('dragover',  onDrag);
          element.on('dragenter', onDrag);

          element.on('drop', function(e){ 
            e.preventDefault();

            angular.element('#player-picture-current').hide();
            var $playerPictureNew = angular.element('#player-picture-new')
            angular.element('#player-picture-new').show();

            var file = e.originalEvent.dataTransfer.files[0];
            scope.fileName = file.name;

            var reader = new FileReader();
            reader.onload = function(evt) {
              // No file size check, it will be resized

              if (['image/png', 'image/jpeg', 'image/gif'].indexOf(file.type) == -1) {
                alert("File type should be png, jpg or gif");
                return false;
              }

              return scope.$apply(function() {
                file = evt.target.result;

                img = new Image();
                img.src = file;

                if (img.height > 1000 || img.width > 1000) {
                  if (img.height > img.width) {
                    var new_hight = 1000;
                    var new_width = Math.round(img.width * new_hight / img.height);
                  } else {
                    var new_width = 1000;
                    var new_hight = Math.round(img.height * new_width / img.width);
                  }
                  var canvas = document.createElement('canvas');
                  canvas.width = new_width;
                  canvas.height = new_hight;
                  var ctx = canvas.getContext('2d');
                  ctx.drawImage(img, 0, 0, new_width, new_hight);
                  resized_file = canvas.toDataURL("image/png");
                } else {
                  resized_file = file;
                }

                scope.file = resized_file;
                $playerPictureNew.attr('alt', 'New player picture');
              });
            
            };

            reader.readAsDataURL(file);

            return false;
          });
        }
      };
    }
  );
})();
