//Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connect } = require("./utils/database/connect")


const api = require('./api/routes/user.routes');



//Ejecutamos la funcion que conecta con la db
connect();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.use('/public', express.static('public'));

app.use('/api', api)
app.listen(3000, () => {
    console.log("Node server listening on port 3000");
});
// Definimos el puerto desde el dotenv y si no lo hubiera el 4000
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Manejamos los errores
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});