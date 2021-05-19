function add() {
    console.log('新增')
}

function del() {
    console.log('删除')
}

//exports.变量名=方法名/属性名

exports.add = add;

module.exports.del = del;