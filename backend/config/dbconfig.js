var mysql = require('mysql');

//connection to db | running on Adi's EC2 Server
var pool = mysql.createPool({
    connectionLimit : 15,
    host : 'ec2-18-222-239-220.us-east-2.compute.amazonaws.com',
    user : 'newmysqlremoteuser',
    password : 'password',
    database : 'semesterProject'
})

exports.connectDB = function (callback) {
    pool.getConnection(function (err, connection) {
        if (err) throw console.log(err); // not connected!
        // Use the connection
        callback(connection);

        connection.release();
    });
}
