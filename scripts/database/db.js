

var connection        =  require('./connection');
var mysql             =  require('mysql');


var db;


function connectDB(password, callback) {

    var parameter = connection.get(password);
    db = mysql.createConnection(parameter);

    db.connect(callback);
}


/**
*   funzione fantoccio
*/
function select(descriptor, callback) {

  var err = undefined;
  var selected = [];

  callback(err, selected);

}


module.exports.connect  =   connectDB;
module.exports.select   =   select;
