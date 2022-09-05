var express = require('express');
var app = express();

const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);


var bodyParser = require('body-parser');
var multer  = require('multer');
app.use(bodyParser.urlencoded({ extended: false }));

function connectDb(){
    const database = client.db("company");
    const conn =  database.collection("products");
    return conn;
}


// set the view engine to ejs
app.set('view engine', 'ejs');


// index page
app.get('/', async function(req, res) {
    const conn = connectDb();
    data = await conn.find().toArray();
  res.render('index',{data_obj:data});
});


app.post('/submitdata',async function(req,res){

    const coll =connectDb();
    data = await coll.insertOne(req.body);
    client.close();
    console.log("data inserted");
    
});


app.listen(8080);
