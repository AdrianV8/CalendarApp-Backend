/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check }  = require('express-validator')

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middleware/fields-validation');

const router = Router();

//? [] = colección de middleware
router.post(
    '/new', 
    [
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        check('email', 'El email es obligatorio.').isEmail(),
        check('password', 'La contraseña debe contener entre 6 y 12 caracteres.').isLength({min: 6, max: 16}),
        validarCampos
    ], 
    crearUsuario);

router.post(
    '/', 
    [
        check('email', 'El email no puede estar vacío.').isEmail(),
        check('password', 'La contraseña debe contener entre 6 y 12 caracteres.').isLength({min: 6, max: 16}),
        validarCampos
    ],
    loginUsuario);

router.get('/renew', revalidarToken);



module.exports = router;