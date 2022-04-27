// Todas estas peticiones tienen que estar validadas JWT
// api/events/
// Obtener eventos
const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { createEvent, updateEvent, deleteEvent, getEvents } = require('../controllers/events')
const { validarJWT } = require('../middlewares/validar-jwt')
const { isDate } = require('../helpers/isDate')

const router = Router()
//obtener eventos






router.use(validarJWT)

router.get(
    '/',
    getEvents
)


router.post(
    '/',
    [ 
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','fecha de inicio es obligatoria').custom(isDate),
        check('end','fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    createEvent
)


//uctualizar un event
router.put(
    '/:id',
    [ 
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','fecha de inicio es obligatoria').custom(isDate),
        check('end','fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    updateEvent 
)



//uctualizar un event
router.delete(
    '/:id',
    deleteEvent
)
//

module.exports = router;
