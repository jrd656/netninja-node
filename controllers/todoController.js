var bodyParser = require('body-parser');
var mongoose = require('mongoose');    

//Connect to the mongoDB database
mongoose.connect('mongodb+srv://test2:test2@cluster0-gvtj8.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }  );

//create a schema - this is like a blueprint for our data
var todoSchema = new mongoose.Schema({
    item: String
});

//create a model called 'Todo'. The variable is also called Todo.
// mongoose.model is a mongoose function with parameters <name> and <schema> 
var Todo = mongoose.model('Todo', todoSchema);

//create some Todo's in the database
/* DO I WANT TO REMOVE THIS? */
var itemOne = Todo({item: 'Testing Wed 07:57'}).save(function(err){
    if (err) throw err;
    console.log('item saved');
});

//var data = [{item: 'get milk'}, {item:'walk dog'}, {item:'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});
 
module.exports = function(app){

app.get('/todo', function(req,res){
    Todo.find({}, function(err,data){
        if (err) throw err;
    res.render('todo', {todos: data});
    });
});

app.post('/todo', urlencodedParser,function(req,res){
    // get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err,data){
        if (err) throw err;
        res.json(data);
    });
});

app.delete('/todo/:item', function(req,res){
    //delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
        if (err) throw err;
        res.json(data);
    });
});

};