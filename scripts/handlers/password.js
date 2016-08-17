

module.exports.bind = function(modules) {

    var $        = modules.$,
        database = modules.database,
        emitter  = modules.emitter;

    /*
     *  Funzione richiamata ad ogni evento di submit
     */
    var password = function(e) {

          e.preventDefault(); //impedisce la reazione di default, che per l'evento di submit ricarica la pagina.

          //prende il valore immesso.
          var typed = $('#password-form input').val();

          typed = 'hateandmerda1';

          //lo passa a access.attempt.
          database.connect(typed, access.attempt);
    };



    /*
     *  Oggetto che contiene le funzioni relative ai tentativi di accesso
     *  al database.
     */
    var access =
    {

      /*   booleano che serve per dimostrare se è stato fatto
       *   un tentativo (fallimentare) di entrare.
       */
        error_occurred: false,

        /*     funzione che tenta l'ingresso al database. Nel caso in cui
        *      ci sia un errore richiama access.wrong altrimenti richiama access.correct.
        */
        attempt:
        function(err) {

          if(err)

            access.wrong();

          else

            access.correct();
        },

        /*     funzione che porta error_occurred a true e stampa il messaggio
        *      di errore.
        */
        wrong:
        function () {


          if(!access.error_occurred)
          {
              $('#password-form p').show();
              access.error_occurred = true;
          }

          $('#password-form input').val('');

        },

        /*     funzione che carica il nuovo css elimnando quello vecchio, e
         *     carica il nuovo html, dopo aver rimosso il sensore di eventi per
         *     la submission.
        */
        correct:
        function () {

          new_css();

          $('body')
          .off('submit', '#password-form', password)
          .load('./html/main.html', function() {

              $('#password-style').remove();

              $('main')
               .load('./html/menu.html');

            });
        }

     };


     function new_css() {

       $('head')
        .append("<link id = 'main-style' rel ='stylesheet' href = 'css/main.css'>")
        .append("<link id = 'menu-style'  rel ='stylesheet' href = 'css/menu.css'>");

     }


      $('body')
        .on('submit','#password-form', password);

};
