
module.exports.bind = function (modules) {

  var $        = modules.$,
      database = modules.database,
      emitter  = modules.emitter;

  //larghezza della barra laterale.
  var ASIDE_WIDTH = 55;


   var drag =
   {

     vertical:
     function() {

       var mousemove = function (e) {

         var left = '' + (e.pageX - ASIDE_WIDTH) + 'px';
         resize(left);

       };

       var mouseup = function (e) {

         var width = $('main').css('width');
         width = width.slice(0, width.length - 2);
         var left = '' + ((e.pageX - ASIDE_WIDTH)*100)/width + '%';

         resize(left);

         $('body')
          .off('mousemove', mousemove)
          .off('mouseup', mouseup);
        };


        function resize(left) {
          $('#vertical').css('left', left);
          $('.screen-right').css('left', left);
          $('.screen-left').css('width', left);
          $('#corners').css('left', left);
        }

        $('body')
         .on('mousemove', mousemove)
         .on('mouseup', mouseup);

    },

    horizontal:
    function() {

      var mousemove = function (e) {
        var top = '' + e.pageY + 'px';
        resize(top);
      };

      var mouseup = function (e) {

          var height = $('main').css('height');
          height = height.slice(0, height.length - 2);

          var top = '' + (e.pageY * 100)/height + '%';

          resize(top);

          $('body')
            .off('mousemove', mousemove)
            .off('mouseup',mouseup);
        };

          function resize (top) {
            $('#horizontal').css('top', top);
            $('.screen-bottom').css('top', top);
            $('.screen-top').css('height', top);
            $('#corners').css('top', top);
          }

          $('body')
          .on('mousemove', mousemove)
          .on('mouseup', mouseup);

    },

    both:
    function () {

      drag.vertical();
      drag.horizontal();
    }
  };


   $('body')
    .on('mousedown', '#vertical', drag.vertical)
    .on('mousedown', '#horizontal', drag.horizontal)
    .on('mousedown', '#corners', drag.both);
}
