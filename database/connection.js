let mysql = require('mysql')
let config = require('../config/config')
const q = require('q')


function connectDatabase(query, value) {

    const pool = mysql.createPool({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.sql_db
    })


    let deferred = q.defer()
    pool.getConnection(function (err, connection) {
        if (err) {
            return deferred.reject({ message: "Can't connect to database." })
        } else {
            // Use the connection
            connection.query(query, value, function (error, results) {
                // When done with the connection, release it.
                // Handle error after the release.\
                if (error) {
                    console.log('error', error)
                    connection.destroy()
                    return deferred.reject({ message: 'Failure' })
                } else {
                    let dbRes = JSON.parse(JSON.stringify(results))
                    connection.destroy()
                    deferred.resolve({
                        dbData: dbRes
                    })
                }
            })
        }
    })
    return deferred.promise
}

module.exports = { connectDatabase }
