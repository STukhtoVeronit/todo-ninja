var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var data = [{item: 'buy milk'}, {item: 'walk dog'}, {item: 'kick some ass'}];

//connect to Db
try {
    mongoose.connect('mongodb://localhost:27017/nodetodo', { useNewUrlParser: true });
}catch (e) {
    console.log(e);
}
var todoShema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoShema);
// DB preparation end

module.exports = function (app) {
  
  app.use(bodyParser.urlencoded({
      extended: true
  }));
  app.use(bodyParser.json());

  app.get('/', function (req, res) {
      Todo.find({}, function (err, data) {
          if (err) throw err;
          res.render('todo', {todos: data});
      });
  });

  app.get('/todo', function (req, res) {
    Todo.find({}, function (err, data) {
        if (err) throw err;
        res.render('todo', {todos: data});
    });
  });

  app.post('/todo', function (req, res) {
    var newTodo = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function (req, res) {
    Todo.find({item: req.params.item.replace(/\-/g, '-')}).remove(function (err, data) {
        if (err) throw err;
        res.json(data);
    });
  });
};