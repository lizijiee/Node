//引入路由模块
var Router = require('koa-router');

var router = new Router();

var model_db = require('../models/db');


router.get('/', async function (ctx) {

    var sql = "SELECT * FROM t_students";

    var data = await model_db.myDb(sql);

    //console.log(data);
  
    ctx.render('index.html', {
        stus: data
    })

})

router.get('/add', async function (ctx) {
    ctx.render('add.html')

})

router.post('/doadd', async function (ctx) {
    //获取用户所填写的信息

    var msg = ctx.request.body;

    //console.log(msg);

    var sql =`INSERT INTO t_students(name,sex,age,email,tel) VALUES('${msg.name}','${msg.sex}',${msg.age},'${msg.email}',${msg.tel})`

    var data = await model_db.myDb(sql);

    ctx.redirect('/')


})

router.get('/del', async function   (ctx) {

    //获取要删除的id
    var msg = ctx.request.query;
    //console.log(msg);

    var sql = `DELETE FROM t_students WHERE id=${msg.id}`

    var data = await model_db.myDb(sql);

    ctx.redirect('/')

})

router.get('/updata', async function (ctx) {

    //获取用户所编辑的 id

    var msg = ctx.request.query;

    var sql = `SELECT * FROM t_students WHERE id=${msg.id}`;

    var data = await model_db.myDb(sql)

    ctx.render('edit', {
        msgs: data
    })

})

router.post('/doupdata', async function (ctx) {

   

    //获取到最新的数据
    var newmsg = ctx.request.body;

    //console.log(newmsg)

    var sql = `UPDATE t_students set name='${newmsg.name}',sex='${newmsg.sex}',age='${newmsg.age}',email='${newmsg.email}',tel=${newmsg.tel} WHERE id=${newmsg.id}`;

    var data = await model_db.myDb(sql);

    ctx.redirect('/')

})


module.exports = router;