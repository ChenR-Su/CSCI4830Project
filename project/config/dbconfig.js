var mysql = require('mysql');

//connection to db | running on Chen's EC2 Server
var pool = mysql.createPool({
    connectionLimit : 15,
    host : 'ec2-18-191-28-203.us-east-2.compute.amazonaws.com',
    port : '3306',
    user : 'remoteUser',
    password : 'Xym20000328!',
    database : 'semesterProject',
    timeout : 60 * 60 * 1000
})

exports.connectDB = function (callback) {
    pool.getConnection(function (err, connection) {
        if (err) throw console.log(err); // not connected!
        // Use the connection
        callback(connection);

        connection.release(error => error ? reject(error) : resolve());
    });
}
