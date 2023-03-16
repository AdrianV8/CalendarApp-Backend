const express = require('express');
const dbConnection = require('./database/config');
require('dotenv').config();


// ! Crear servidor de express
const app = express();

// * Base de datos
dbConnection();

// * Directorio público
app.use( express.static('public') );

// * Lectura y parseo del body de la petición
app.use( express.json() );

// * Rutas
app.use('/api/auth', require('./routes/auth'))
// TODO: auth // crear usuario, login, renew
// TODO: CRUD: eventos

// * Escuchar peticiones
app.listen( process.env.PORT, () => { console.log(`servidor corriendo ${ process.env.PORT }`); } );
