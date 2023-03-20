const express = require('express');
const dbConnection = require('./database/config');
var cors = require('cors')
require('dotenv').config();


// ! Crear servidor de express
const app = express();

// * Base de datos
dbConnection();

// * CORS
app.use(cors())

// * Directorio público
app.use( express.static('public') );

// * Lectura y parseo del body de la petición
app.use( express.json() );

// * Rutas
// TODO: auth // crear usuario, login, renew
app.use('/api/auth', require('./routes/auth'))

// TODO: CRUD: eventos
app.use('/api/events', require('./routes/events'))

// * Escuchar peticiones
app.listen( process.env.PORT, () => { console.log(`servidor corriendo ${ process.env.PORT }`); } );
