var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('booksDB', ['books']);
var port = 8080;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/books', function (req, res) {
  db.books.find(function (err, docs) {
    res.json(docs);
  });
});

app.post('/books', function (req, res) {
  db.books.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/books/:id', function (req, res) {
  var id = req.params.id;
  db.books.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/books/:id', function (req, res) {
  var id = req.params.id;
  db.books.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {availability: req.body.availability}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(port);
console.log("Server running on port "+port);