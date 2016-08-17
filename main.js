
/*
 *  Aggiunge all'oggetto $ il riferimento alla gui e al frame della finestra.
 */
$.gui              =    require('nw.gui');
$.frame            =    $.gui.Window.get();

/*
 *  Richiede events, per poi richiamare il costruttore di EventEmitter.
 */
var events         =    require('events');


/*
 *  modules è l'oggetto che costiene i moduli da passare agli handlers:
 *
 *  -database
 *  -emitter
 *  -$
 */
var modules        =
{
  database: require('./scripts/database/db'),
  emitter:  new events.EventEmitter(),
  $: $
};

/*
 *  handlers è l'oggetto in cui vengono raggruppati tutti i gestori di eventi.
 */
var handlers       =
{
        resize:    require('./scripts/handlers/resize'),
        screens:   require('./scripts/handlers/screens'),
        main:      require('./scripts/handlers/refresh'),
        menu:      require('./scripts/handlers/menu'),
        password:  require('./scripts/handlers/password')
};


$().ready(function () {

  //da mettere in un foglio css
    $('*').css("-webkit-user-select", "none");

    /**
     *      Richiama le funzioni bind dei moduli handlers
     */
     for(var module_name in handlers)

       handlers[module_name].bind(modules);



    /**
     *      Carica la pagina iniziale, per l'immissione della password, (vedi pagina "password.html").
     */
    $('head').append("<link id = 'password-style' rel = 'stylesheet' href= 'css/password.css'>");
    $('body').load('./html/password.html');

});
