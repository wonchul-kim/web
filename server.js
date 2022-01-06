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
const login_info = fs.readFileSync('./database.json');
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


app.get('/api/customers', (req, res) =>  { // 해당 경로에 접속하여서 다음의 명령들을 수행하겠다. 
    // connection.connect();
    connection.query(
        "SELECT * FROM customers", 
        (err, rows, fields) => {
            console.log(err)
            console.log(rows)
            res.send(rows);
        }
    );
});

app.listen(port, () => console.log(`Listening on port ${port}`));



