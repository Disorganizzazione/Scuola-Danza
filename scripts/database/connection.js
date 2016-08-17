

var connection =
{
  parameter:
  {
    host: "localhost",
    database: "scuola",
    user: "root",
    multipleStatements: true
  },

  get:
  function(password) {

    connection.parameter.password = password;
    return connection.parameter;
  }

};

module.exports.get = connection.get;
