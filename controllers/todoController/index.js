var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some ass'}];

module.exports = function (app) {

  app.get('/todo', function (req, res) {
    res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodedParser, function (req, res) {
    console.log("hi" + req.body);
    data.push(req.body);

    res.json(data);
  });
  app.delete('/todo', function (req, res) {

  });
};