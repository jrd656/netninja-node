var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

// set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controller
todoController(app);

//liisten to port
app.listen(3000);
console.log('you are listening to port 3000');