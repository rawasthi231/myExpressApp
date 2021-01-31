const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
//var db = require('../db');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

router.post('/form-submit', function(req, res){
    return res.send(req.body);
});

module.exports = router;