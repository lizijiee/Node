var url = require('url');

var testUrl = 'http://localhost:8080/doadd?name=11&sex=11&age=111';
console.log(url.parse(testUrl, true).query.name)
// true 前 query: 'name=11&sex=11&age=111'
// true 后  query: { name: '11', sex: '11', age: '111' }