var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // to support URL-encoded bodies
app.use(bodyParser.urlencoded()); // to support URL-encoded bodies

var mysql = require('mysql')
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'fiszki'
});

connection.connect()

app.post('/', function(req, res) {
    console.log(`Update database with words: ${req.body.p}, ${req.body.h}`);
    console.log(req.body.h);

    connection.query(`INSERT INTO words (polish, spanish) VALUES('${req.body.p}', '${req.body.h}');`, function (err, rows, fields) {
        if (err) throw err
    })
    res.sendFile(__dirname + '/main.html');
});


app.get('/', function(req, res){
    console.log('i co');
    res.sendFile(__dirname + '/main.html');
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});




