const jwt = require('jsonwebtoken');

const generateJWT = ( uid, name ) => {

    return new Promise( (resolve, reject) => {

        const payload = {uid, name}

        //! Firmar el token
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '5h'
        }, (err, token) => {
            // Si no se genera el token
            if(err){
                console.log(err);
                reject('No se pudo generar el token.');
            }   
            // Si sale bien
            resolve(token);
        })


    })

}

module.exports = {
    generateJWT
}