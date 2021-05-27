var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '116.255.186.69',
  user     : 'studata',
  password : 'admin123',
  database : 'studata'
});
 
connection.connect();

//var sql ="INSERT INTO t_students (name,email,age) VALUES ('小张','22@111.com',26)"
 
//connection.query(sql, function (error, results, fields) {
//  if (error) throw error;
//  console.log('The solution is: ', results);
//});
 
//connection.end();

exports.myDb = function (sql) {
    var promise = new Promise(function (reslove, reject) {
        connection.query(sql, function (error, results, fields) {
            if (error) reject
            reslove(results)
        })
    })

    return promise
}





