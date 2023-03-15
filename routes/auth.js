/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check }  = require('express-validator')
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

//? [] = colección de middleware
router.post(
    '/new', 
    [
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        check('email', 'El email es obligatorio.').isEmail(),
        check('password', 'La contraseña debe contener entre 6 y 12 caracteres.').isLength({min: 6, max: 16})
    ], 
    crearUsuario);

router.post(
    '/', 
    [
        check('email', 'El email no puede estar vacío.').isEmail(),
        check('password', 'La contraseña debe contener entre 6 y 12 caracteres.').isLength({min: 6, max: 16})
    ],
    loginUsuario);

router.get('/renew', revalidarToken);



module.exports = router;