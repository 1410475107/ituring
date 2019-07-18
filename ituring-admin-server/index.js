const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const multer = require('multer');
// var upload = multer({ dest: 'uploads/' });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().valueOf() + '-' + Math.random().toString().substr(2, 8) + '.' + file.originalname.split('.').pop())
    }
});

const upload = multer({ storage: storage });

const app = express();
const host = 'http://lulaoshi:81/';
// 接受post过来的额数据
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// 数据库连接
const mydb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'ituring',
    port: 3306
});
mydb.connect();

// 跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    // 支持cookie  必须指定具体的域名 
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
app.get('/', (req, res) => {
    res.send('首页');
});

// 启用cookie
let secret = 'app.h5190304.com';
app.use(cookieParser(secret));
// 启用session
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 7 * 24 * 3600000 }
}))


app.post('/login', (req, res) => {
    let sql = 'SELECT * FROM admin WHERE name = ? LIMIT 1';
    mydb.query(sql, [req.body.name], (err, result) => {
        if (err) {
            console.log(err);
            res.json({ r: 'err' });
            return;
        }
        // 检查账号是否存在  []  {}  ==>  true
        if (result.length == 0) {
            res.json({ r: 'name-not-exist' });
            return;
        }
        //检查密码是否正确  用户输入的密码 不等于 数据库里面的密码
        if (req.body.passwd != result[0].passwd) {
            res.json({ r: 'passwd-err' });
            return;
        }
        // 记录coookie和session
        req.session.aid = result[0].aid;
        req.session.name = result[0].name;

        res.send({ r: 'ok' });
    });
});

//提供session信息的路由
app.get('/check', (req, res) => {
    console.log(req.session);
    res.json({ aid: req.session.aid, name: req.session.name });
});
// 接受上传的图片
app.post('/uploads', upload.single('images'), function (req, res, next) {
    // console.log(req.file);
    res.json({ imgsrc: host + 'uploads/' + req.file.filename });
});
//编辑器上传图片接口
app.post('/uploadimgs', upload.array('myimgs'), function (req, res, next) {
    let r = {
        "errno": 0,
        "data": []
    };
    console.log(req.files);
    for (let ind = 0; ind < req.files.length; ind++) {
        const e = host + 'uploads/' + req.files[ind].filename;
        r.data.push(e);
    }
    res.json(r);
});

// 对图片进行静态资源托管
app.use('/uploads', express.static('uploads'));

// 后面所有的操作必须建立在登录成功的情况之下
app.use((req, res, next)=>{
    if(req.session.aid){
        next();
    }else{
        res.send({r:'access-forbidden'});
    }
});

// 添加书籍路由
app.post('/addbook', (req, res) => {
    let d = req.body;
    let sql = 'INSERT INTO books(bookname, aid,name,writer,type,imgsrc,`desc`,info,addtimes) VALUES(?,?,?,?,?,?,?,?,NOW())';
    let data = [d.bookname, req.session.aid, req.session.name, d.writer, JSON.stringify(d.type), d.imgsrc, d.desc, d.info];
    mydb.query(sql, data, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ r: 'err' });
            return;
        }
        console.log(result);
        res.json({ r: 'ok' });

    });
});

// 获取书籍列表
app.get('/booklist', (req, res) => {
    let sql = 'SELECT * FROM books WHERE status = 1';
    mydb.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ r: 'err' });
            return;
        }
        // 对数据进行处理
        res.json(result);
    });
});

// 删除书籍路由
app.post('/delbook', (req, res) => {
    let bid = req.body.bid;
    let sql = 'UPDATE  books SET status = 0 WHERE bid = ?';
    mydb.query(sql, bid, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ r: 'err' });
            return;
        }
        console.log(result);
        res.json({ r: 'ok' });
    });
});

// 获取书籍的原始信息
app.get('/getbook', (req, res) => {
    let bid = req.query.bid;
    let sql = 'SELECT * FROM books WHERE bid = ?';
    mydb.query(sql, bid, (err, result) => {
        if (err) {
            console.log(err);
            res.json({ r: 'err' });
            return;
        }
        console.log(result);
        result[0].type = JSON.parse(result[0].type);
        res.json(result[0]);
    });
});

app.listen(81, () => {
    console.log(`Server started on 81`);
});
