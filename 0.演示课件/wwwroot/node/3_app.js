var path = require('path');

var testPath = 'd:/www/node/test1.js';

//path.basename()  --- 取路径的最后一层
//path.dirname()   ---去掉路径的最后一层

console.log(path.basename(testPath));

console.log(path.dirname(testPath));

var mypath = path.join(__dirname, 'wwwrooot', 'node', 'nodetest', 'test.js');

console.log(mypath);

var objPath = path.parse(mypath);

console.log(objPath);

var strPath = path.format(objPath);

console.log(strPath);



