const express = require('express');
const bodyParser = require('body-parser');
const requests = require('requests');
const con = require('./db');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('signin', { link: "user-signup", msg: "" });
});

app.get('/user-signup', function (req, res) {
    res.render('signup', { link: "/" });
});

app.post('/signup-form-submit', function (req, res) {
    const userData = req.body;
    let d = new Date(userData.dob);
    let pass = d.toJSON().slice(0, 10).split`-`.join``;
    let values = [
        [userData.name, userData.email, userData.mobile, userData.dob, userData.address, userData.role, pass]
    ];
    var query = "INSERT INTO users(name, email, mobile, dob, address, role, password) VALUES ?";
    con.query(query, [values], (err, data) => {
        if (err) throw err;
        else res.render('signin', { link: "user-signup", msg: "You account has been created successfully.<br>Your default password is your DoB inYYYYMMDD format." })
    });
});
app.post('/signin-form-submit', function (req, res) {
    const userData = req.body;
    var query = "SELECT * FROM users WHERE email = '" + userData.email + "' AND password = '" + userData.password + "'";
    //res.send(query);
    con.query(query, (err, result) => {
        if (err) throw err;
        else
            res.render('dashboard', { userName: result[0].name });
    });
});

app.get('/temp', (req, res) => {
    requests(
        `http://api.openweathermap.org/data/2.5/weather?q=${req.query.city}&APPID=6ff134d388836546c6671d6f99ff50cf&units=metric`
        )
    .on("data", (result) => {
        var dataObject = JSON.parse(result);
        var data = [dataObject];
        res.send(`City : ${data[0].name}, Temp : ${data[0].main.temp}`);
        res.end();
    })
    .on("end", (err) => {
        res.send(err);
    })
});


app.listen(3000, () => {
    console.log('My server is running on port 80')
});

module.exports = app;