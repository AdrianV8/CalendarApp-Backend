/**
 * Events Routes:
 *  /api/events
 */

const { Router } = require('express');
const { check }  = require('express-validator')

const { validarJWT } = require('../middleware/validar-jwt');
const { actualizarEvento, getEventos, crearEvento, borrarEvento } = require("../controllers/events");
const { validarCampos } = require('../middleware/fields-validation');
const { isDate } = require('../helpers/isDate');

const router = Router();

/**
 * Todas las peticiones pasan por JWT
 *? Cualquier petición que esté debajo de 'router.use(validarJWT)' validará el token
 */

router.use(validarJWT); 

// Obtener eventos
router.get('/:uid', getEventos);

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title','El titulo es obligatorio.').not().isEmpty(),
        check('start','Tienes que ingresar una fecha de inicio.').custom(isDate),
        check('end','Tienes que ingresar una fecha de finalización.').custom(isDate),
        validarCampos
    ],
    crearEvento);

// Actualizar evento
router.put(
    '/:id', 
    [
        check('title','El titulo es obligatorio.').not().isEmpty(),
        check('start','Tienes que ingresar una fecha de inicio.').custom(isDate),
        check('end','Tienes que ingresar una fecha de finalización.').custom(isDate),
        validarCampos
    ],
    actualizarEvento);

// Borrar evento
router.delete('/:id', borrarEvento);


module.exports = router;


