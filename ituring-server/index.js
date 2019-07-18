const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// 文件上传的相关配置
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
const host = 'http://lulaoshi:82/';
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
    res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
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
}));


app.get('/', (req, res) => {
    res.send('网站首页');
});

//  获取书本列表信息
app.get('/booklist', (req, res) => {
    // *最好写成具体的字段
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

// 获取书本信息详情的路由
app.get('/bookinfo', (req, res) => {
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

// 对图片进行静态资源托管
app.use('/uploads', express.static('uploads'));

app.listen(82, () => {
    console.log(`Server started on 82`);
});
