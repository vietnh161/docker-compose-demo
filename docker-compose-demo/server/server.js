var express = require('express');
var config = require("config");
var cors = require("cors");
var bodyParser = require("body-parser");
var data = require("./data.json")

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

var host = config.get("server.host");
var port = config.get("server.port");

var services = require('./services')

app.post('/add', (req, res) => {
    let todo = req.body.todo;
    let item = {
        todo: todo
    }
    services.addTodo(item)
    .then(result => {
        res.json({msg: "ok"})
    }).catch(err => {
        res.json({msg: "not oke", data: err})
    })
   
});

app.get('/get', (req, res) => {
    services.getAll()
    .then( result => {
        res.json({msg:"oke",data : result});
    }).catch(err => {
        res.json({msg: "nott oke", data: err})
    })
    
});


app.delete('/delete/:id',(req, res) => {
    var id = req.params.id;
    services.deleteTodo(id)
    .then(result => {
        res.json({msg: "ok", data: data})
    }).catch(err => {
        res.json({msg: "nottt oke", data: err})
    })
    
})

app.listen(port, function(){
    console.log("server is running on port ", port)
})