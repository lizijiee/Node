var url = require('url');

var testurl = 'http://localhost:8080/doadd?name=11&sex=11&age=111';

//console.log(testurl)

//console.log(url.parse(testurl))

console.log(url.parse(testurl,true).query.name)

