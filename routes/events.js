/**
 * Events Routes:
 *  /api/events
 */

const { Router } = require('express');
const { validarJWT } = require('../middleware/validar-jwt');
const { actualizarEvento, getEventos, crearEvento, borrarEvento } = require("../controllers/events");

const router = Router();

/**
 * Todas las peticiones pasan por JWT
 *? Cualquier petición que esté debajo de 'router.use(validarJWT)' validará el token
 */

router.use(validarJWT); 

// Obtener eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post('/', crearEvento);

// Actualizar evento
router.put('/:id', actualizarEvento);

// Borrar evento
router.delete('/:id', borrarEvento);


module.exports = router;


