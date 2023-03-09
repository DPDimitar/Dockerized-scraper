const express = require('express')
const cors = require('cors')

const app = express()
const bodyParser = require("body-parser")
const {Client} = require('pg')

const client = new Client({
    user: "admin",
    host: "database",
    database: "mydb",
    password: "admin1234",
    dialect: "postgres",
    port: 5432
})

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

client.connect((err, client) => {
    if (err) {
        return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})

app.get('/get-properties', (req, res, next) => {
    console.log("All properties")
    res.set('Access-Control-Allow-Origin','*')
    client.query('SELECT * FROM properties').then(result => {
        res.send(result.rows)
    })
})


const server = app.listen(5000, '0.0.0.0', function () {
    console.log("starting the server at port", server.address().port)
})

