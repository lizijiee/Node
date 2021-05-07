function add() {
    console.log('add')
};

function del() {
    console.log('del')
};
// exports.变量名= 方法名/属性名
exports.bb = add
module.exports.del = del
