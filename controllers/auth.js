const { response } = require('express');
const { validationResult }  = require('express-validator');

//? req = Es lo que el usuario solicita
//? res = Es lo que nosotros devolvemos

const crearUsuario = (req, res = response) => {
    
    const {name, email, password} = req.body;

    //! Manejo de errores
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        })
    }

    res.json({
        ok: true,
        msg: 'register',
        name,
        email,
        password,
    })
};
const loginUsuario = (req, res = response) => {

    const {email, password} = req.body;
    //! Manejo de errores
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        })
    }
    
    res.json({
        ok: true,
        msg: 'login',
        email,
        password,
    })
};
const revalidarToken = (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'renew'
    })
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};