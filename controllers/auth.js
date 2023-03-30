const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require("../models/usuario-model");
const { generateJWT } = require('../helpers/jwt')

//? req = Es lo que el usuario solicita
//? res = Es lo que nosotros devolvemos

//! Crear Usuario
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
        // Generar JWT (Json Web Token)
        const token = await generateJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error. Hable con el administrador.",
        });

    }
};

//! Login Usuario
const loginUsuario = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        // Comprobar que el usuario exista
        let usuario = await Usuario.findOne({email});
        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o la contraseña no son correctos.'
            });
        }

        // Confirmar las passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );
        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o la contraseña no son correctos.'
            });
        }

        // Generar JWT (Json Web Token)
        const token = await generateJWT(usuario.id, usuario.name)
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error. Hable con el administrador.",
        });
    }

};

//! Revalidar token del usuario
const revalidarToken = async(req, res = response) => {

    const {uid, name} = req;

    const newToken = await generateJWT( uid, name )

    res.json({
        ok: true,
        uid,
        name,
        token: newToken
    });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
