/*
 *  Il modulo attende l'emissione degli eventi: screen1-ready, screen2-ready...
 *  ai quali sono legate le quattro funzioni all'interno dell'oggetto screens.
 *
 */
module.exports.bind = function(modules) {

      var $        = modules.$,
          database = modules.database,
          emitter  = modules.emitter;


          /*
           *  Oggetto che contiene le funzioni che legano gli elementi del DOM
           *  ai rispettivi handlers di cui sopra.
           */
          var main =
          {

            screen1:
            {

              /*
               *  L'oggetto mode racchiude informazioni e funzioni relative alla modalità
               *  corrente ('iscritti', 'corsi' o 'pagamenti').
               *
               */
              mode:
              {
                  //il nome della modalità corrente
                  mode: '',
                  //la funzione che cambia modalità
                  change:
                  function() {

                    //mostra il pulsante corrispondente alla vecchia modalità
                    $('#' + self().mode).show();
                    //nasconde la schermata legata alla vecchia modalità.
                    $('.' + self().mode).hide();

                    //aggiorna la modalità
                    self().mode = $(this).attr('id');

                    //nasconde il pulsante appena cliccato.
                    $(this).hide();
                    //mostra sullo screen2 la schermata della modalità cliccata.
                    $('.' + self().mode).show();
                    //nasconde la fase non attuale ('ricerca' o 'lavoro')
                    $(main.screen2.button_switch.hidden).hide();

                  },

                  bind:
                  function(choice) {

                    //assegna la prima modalità scelta.
                    self().mode = choice;

                    //handler pulsanti che cambiano modalità
                    $('#screen1 header').on('click', 'div', self().change);

                }
              },
              //fine oggetto mode
                bind:
                function(choice) {

                  //lega i sensori di eventi per la transizione di modalità
                  self().mode.bind(choice);

                }
            },


            screen2:
            {

              /*
               *  Oggetto che contiene informazioni e funzioni relative al bottone di
               *  switch.
               */
                button_switch:
                {
                    //le due classi che si alternano.
                    hidden: '.search',
                    shown: '.work',
                    //la funzione che alterna le classi.
                    transition:
                    function() {

                      $(self().shown).hide();                    //nasconde la fase vecchia
                      $('.' + main.screen1.mode.mode + self().hidden).show(); //mostra la nuova fase
                                                                      //ma solo intersecandola con la
                                                                      //modalità corrente.
                      //switch tra hidden e shown
                      var temp = self().shown;
                      self().shown = self().hidden;
                      self().hidden = temp;
                    },

                    bind:
                    function() {

                      //handler pulsante che cambia fase.
                      $('#switch').on('click', self().transition);

                    }
                },
                //fine oggetto button_switch

                /*
                 *    search_form è contenuto in screen2, vedi sotto.
                 */

                bind:
                function() {

                  //lega i sensori di eventi al bottone di switch
                  self().button_switch.bind();

                  //funzione che lega tutti gli handlers del form di ricerca 'iscritti'
                  self().search_form.iscritti.bind();

                  //funzione che lega tutti gli handlers del form di ricerca 'pagamenti'
                  self().search_form.pagamenti.bind();

                }
            },

            screen3:
            {
                bind:
                function() {


                }
            },

            screen4:
            {
                bind:
                function(choice) {


                    //choice contiene l'id dell'elemento scelto dal menù.
                    //qua si emette l'evento di click con tale id, in modo
                    //che venga richiamata la funzione mode.change.
                    $('#' + choice).click();
                }
            }
          };


      main.screen2.search_form = {};


      main.screen2.search_form.iscritti =
      {

        reference: null,

        /*
         *  Oggetto che contiene informazioni e funzioni relative ai radio
         *  butttons:una volta che il radio button viene cliccato, se al momento
         *  del mousedown è gia selezionato, allora l'utente lo sta deselezionando.
         *  Nell'altro caso allora si ha il comportamento di default.
         *  Lo stato di wasChecked viene aggiornato e subito dopo controllato
         *  da click.
         */
        radio:
        {
          wasChecked: true,

          mousedown:
          function(e) {

            self().wasChecked = $(this).prop('checked');

          },

          click:
          function(e) {

            if(self().wasChecked)

              $(this).prop('checked', false);

          }

        },
        //fine oggetto radio

        avanzate:
        function() {

          $('.avanzate').toggle();

        },

        applica:
        function(e) {

          e.preventDefault();
          emitter.emit('select');

        },

        //funzione che resetta il form iscritti, portando tutto a null,
        //per poi emettere l'evento di submit.
        reset:
        function() {

          self().reference
          .find("input")
           .each( function() {

             if($(this).is('[type=text]'))

              $(this).val('');

             else if('[type=radio]')

              $(this).prop('checked', false);

           });

           self().reference
            .submit();
        },

        bind:
        function() {

          self().reference = $('.iscritti.search form');

          //handlers che modificano il comportamento di default dei
          //radio buttons
          self().reference
          .find('input[type=radio]')
            .on('mousedown', self().radio.mousedown)
            .on('click', self().radio.click);

          //bottone ricerca avanzata nella classe iscritti
          self().reference
          .find('.ricerca-avanzata')
            .on('click', self().avanzate);

          //bottone che resette l'intero form
          self().reference
          .find('.reset')
            .on('click', self().reset)

          //evento di submit del form .iscritti.search
          self().reference
            .on('submit', self().applica);
        }

      }




      main.screen2.search_form.pagamenti =
      {

        reference: null,

        month:
        function() {

          var month  = $(this);
          var status = month.attr('data-value');

          switch(status) {

            case 'null':

              month.attr('data-value', '1');
              month.html('P');
              break;

            case '1':

              month.attr('data-value','-1');
              month.html('NP');
              break;

            case '-1':

              month.attr('data-value', '0');
              month.html('A');
              break;

            case '0':

              month.attr('data-value', 'null');
              month.html('');
              break;

          }

        },

        reset:
        function() {

          self().reference
          .find('.month')
            .each(function() {

              $(this).html('');
              $(this).attr('data-status','null');

            });

            self().reference.submit();
        },

        applica:
        function(e) {

          e.preventDefault();
          emitter.emit('select');

        },

        bind:
        function() {

          self().reference = $('.pagamenti.search form');

          self().reference
          .find('.month')
            .on('click', self().month);

          self().reference
            .find('.reset')
              .on('click', self().reset);

          self().reference
          .on('submit', self().applica);

        }
      }

      /*
       *  Il ciclo lega gli eventi con i rispettivi handlers.
       */
      for(var i = 1; i <= 4; i++)

        emitter.on('screen' + i + '.ready', main['screen' + i].bind);


      /*
       *  La funzione self ritorna il campo self della funzione chiamante.
       */
      function self() {

        return self.caller.self;

      }

      /*
       *    Questa funzione anonima, naviga la struttura ad albero composta nella
       *    presente modulo, ad ogni proprietà, nel caso sia una una funzione allora
       *    aggiunge il riferimento all'oggetto che la contiene, chiamato self.
       *    Nel caso in cui sia invece un oggetto, richiama la stessa funzione (il riferimento
       *    è ottenuto con arguments.callee) con tale oggetto come parametro.
       *    La funzione all'inizio si richiama da sola, con main come parametro.
       *
       */
      (function (obj) {

        for(var key in obj) {

          var this_function = arguments.callee;


          var field = obj[key],
              type = typeof field;

          switch (type)
          {
            case 'function':

              field.self = obj;
              break;

            case 'object':

                this_function(field);
                break;
          }
        }

      })(main);


};
