
module.exports.bind = function (modules) {

  var $        = modules.$,
      database = modules.database,
      emitter  = modules.emitter;


      var refresh = function () {

        var descriptor = createDescriptor();

        database.select(descriptor, function(err, selected) {

            if(err)

              alert(err);

              else
              {
                var list = generateList(selected);
                showOnDom(list);
              }

            });

            updateSearchMonitor();
      }


      /**
       *  Funzione che genera il descriptor.
       *
       */
      function createDescriptor() {

        var descriptor = {};
        descriptor.pagamenti = {};

        $('.iscritti.search input')
         .filter(function() {             //filtra solo gli input con valori consistenti.

           if($(this).is('[type=text]'))  //se l'input è testuale

            return $(this).val() !== ''; //ritorna solo se non è vuoto

           else if($(this).is('[type=radio]')) //se l'input è un radio button

            return $(this).is(':checked');  //ritorna solo se è selezionato

         })
         .each(function() {   //per ognuno degli input filtrati

           var name  = $(this).attr('name'),
               value = $(this).val();


           descriptor[name] = value;  //aggiunge al descriptor

         });



         $('.pagamenti.search form .month')
          .filter(function() {

            return $(this).attr('data-value') !== null;

          })
          .filter(function() {

            var name  = $(this).attr('name'),
                value = $(this).attr('data-value');

            descriptor.pagamenti[name] = value;

          });


         //TODO aggiungere i corsi al descriptor
         //TODO aggiungere i pagamenti al descriptor

         return descriptor;

      }


      function generateList(selected) {

      }


      function updateSearchMonitor(descriptor) {

      }


      function showOnDom() {

      }

      emitter.on('select', refresh);

};
