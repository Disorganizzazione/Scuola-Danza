

module.exports.bind = function (modules) {

  var $        = modules.$,
      database = modules.database,
      emitter  = modules.emitter;


      function choose() {

        var choice = $(this).attr('id');

        new_css();

        $('body').off('click', 'header div', choose);

        new_html(choice);

      }


      function new_css() {

        $('head')
         .append("<link id = 'screens-style' rel ='stylesheet' href = 'css/screens.css'>")
         .append("<link id = 'workbench-style' rel ='stylesheet' href = 'css/workbench.css'>");

      }

      function new_html(choice) {

          $('main')
          .load('./html/screens.html', function() {

            $('#menu-style').remove();

            var load_screen = function(index) {

              $('#screen' + index)
              .load('./html/screens/' + index + '.html',
                    function () {

                      emitter.emit('screen' + index + '.ready', choice);

                    });
            };

            for(var i = 1; i <= 4; i++)

              load_screen(i);

         });
      }

      $('body')
       .on('click', 'header div', choose);
};
