
var fs = require('./fs');


var components =
{
  basic:     null,
  pagamenti: null,
  iscritti:  null,
  corsi:     null,
  monitor:   null
};


for (var key in components) {

  var load = function(file) {

      fs.readFile('./html/components/' + file + '.html', 'UTF-8',

      function (err, html) {

        if(err)

          alert(err);

        components[file] = html;

      }
  );

  load(key);

}



for(var prop in components) {

  alert(components[prop]);

}



/*

function turnToListItems(selected) {

        var itemlist = '';

        selected.forEach(

            function(obj) {

                var html = htmlString.replace(/<!--(.*?)-->/gm, function(matched) {

                            return "" + obj[matched.slice(4, matched.length - 3)];
                    });

                itemlist += html;
            }
        );

        return itemlist;
}*/
