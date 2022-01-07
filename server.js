const fs = require('fs'); // file에 접근할 수 있는 라이브러리이며, mysql에 로그인하기 위한 정보를 가져오기 위한 수단
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// app.get('/api/hello', (req, res) => {
//     res.send({message: 'hello express!'});
// });

// app.get('/api/customers', (req, res) => {
//     res.send([{
//         'id': 1,
//         'image': 'https://placeimg.com/64/64/1',
//         'name': "gilsoon nam",
//         'birthday': 891023,
//         'gender': "male",
//         'job': "student"
//       },
//       {
//         'id': 2,
//         'image': 'https://placeimg.com/64/64/2',
//         'name': "gildong hong",
//         'birthday': 921212,
//         'gender': "male",
//         'job': "student"
//       },
//       {
//         'id': 3,
//         'image': 'https://placeimg.com/64/64/3',
//         'name': "dongjeon jang",
//         'birthday': 811139,
//         'gender': "female",
//         'job': "worker"
//       }  
//       ])
// })

// to get data from mysql database
const login_info = fs.readFileSync('./db.json');
const conf = JSON.parse(login_info);
const mysql = require('mysql');

// to connect in mysql
const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
  });

connection.connect();

// client로부터 추가된 정보에 file이 포함되어 있고, 이 file을 처리하기 위해서는 multer라는 라이브러리가 필요 
const multer = require('multer');
// file처리를 위한 저장 공간을 설정
const upload = multer({dest: './upload'}); 

app.get('/api/customers', (req, res) =>  { // 해당 경로에 접속하여서 다음의 명령들을 수행하겠다. 
    // connection.connect();
    connection.query(
        "SELECT * FROM customers WHERE isDeleted = 0", 
        (err, rows, fields) => {
            console.log(err);
            console.log(rows);
            res.send(rows);
        }
    );
});

// 유저가 직접적으로 접속하기 위해서 upload 폴더를 공유하는데 이 공유 폴더의 이름은 image
app.use('/image', express.static('./upload'));
app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO customers VALUES (null, ? ,?, ?, ?, ?, now(), 0)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    
     connection.query(sql, params, 
        (err, rows, fields) => {
            console.log(err);
            console.log(rows);
            res.send(rows);
        }
    ); 
});

app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE customers SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
        })
})

app.listen(port, () => console.log(`Listening on port ${port}`));



