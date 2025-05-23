const express = require("express");
const bp = require('body-parser');
const app = express();
const ejs = require('ejs');
const mongodb = require('mongodb');
const mc = mongodb.MongoClient;

const url = 'mongodb+srv://mokarohit1274:Rohith1274@rohitform.jip8y0p.mongodb.net/?retryWrites=true&w=majority&appName=rohitform';

app.set('view engine', 'ejs');
app.use(bp.urlencoded({ extended: true }));

let collection; 

mc.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to database');

    const db = client.db('mydb');
    collection = db.collection('mycollection');
  })
  .catch(error => console.error('Database connection failed:', error));
app.get('/', (req, res) => {
  res.render('home', { in1: null, in2: null });
});

app.post('/home', (req, res) => {
  if (!collection) {
    return res.send("Database not initialized.");
  }

  collection.insertOne(req.body)
    .then(result => {
      console.log('Data inserted:', result);
      res.render('home', { in1: req.body.in1, in2: req.body.in2 }); 
    })
    .catch(error => console.error(error));
});


app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
