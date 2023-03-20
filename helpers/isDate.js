
const moment = require('moment')

const isDate = (value, { req, location, path }) => {
    //! Validar fechas para express validator
    if(!value) return false;

    const fecha = moment(value);
    if( fecha.isValid() ){
        return true;
    }else{
        return false;
    }
    

}


module.exports = {isDate};