const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/usuario-model");

//? req = Es lo que el usuario solicita
//? res = Es lo que nosotros devolvemos

const crearUsuario = async (req, res = response) => {

    const {email, password} = req.body;

    try {
        
        // Comprobar que no exista un usuario con el mismo correo
        let usuario = await Usuario.findOne({email});
        
        if( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese correo.'
            });
        }

        // Usamos el Schema del Usuario para enviar el body de la petición
        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Grabar en la base de datos
        await usuario.save();

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error. Hable con el administrador.",
        });

    }
};
const loginUsuario = (req, res = response) => {
    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: "login",
        email,
        password,
    });
};
const revalidarToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: "renew",
    });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
