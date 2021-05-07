var path = require('path');
var testPath = 'd:/www/node/test1.js';
/* 
    1. path.basename()
    2. path.dirname();
*/
// console.log( path.basename(testPath)) //test1.js 取路径的最后一层
// console.log( path.dirname(testPath)) // d:/www/node 去掉路径的最后一层
var myPath = path.join(__dirname, 'wwwroot', 'node', 'nodetest', 'test.js')
console.log(myPath) //D:\工作\项目文件\github下载\Node\1.wwwroot\wwwroot\node\nodetest\test.js
// 尝试把字符串转化成对象
var objPath = path.parse(myPath);
console.log(objPath)
/* 
{ root: 'D:\\',
  dir:
   'D:\\工作\\项目文件\\github下载\\Node\\1.wwwroot\\wwwroot\\node\\nodetest',
  base: 'test.js',
  ext: '.js',
  name: 'test' }
*/
var strPath = path.format(objPath);
console.log(strPath) //D:\工作\项目文件\github下载\Node\1.wwwroot\wwwroot\node\nodetest\test.js 