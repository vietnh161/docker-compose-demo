var q = require('q')
var db = require("./common/database");

var conn = db.getConnection();

function addTodo(post) {
    if (post) {
        var defer = q.defer();
        var query = conn.query("INSERT INTO list SET ?", post, (err, result) => {
            if (err) defer.reject(err);
            else defer.resolve(result);


        });
        return defer.promise;
    }
    return false;
}

function deleteTodo(id) {
    if (id) {
        var defer = q.defer();
       // console.log(post)
        var query = conn.query("DELETE FROM list WHERE id = ?",[id], (err, result) => {
            if (err) defer.reject(err);
            else defer.resolve(result);


        });
        return defer.promise;
    }
    return false;
}
function getAll() {

    var defer = q.defer();
    var query = conn.query('select * from list ', (err, result) => {
        if (err) defer.reject(err);
        else defer.resolve(result);
    });
    return defer.promise;
}

module.exports = {
    addTodo: addTodo,
    deleteTodo:deleteTodo,
    getAll: getAll,
}