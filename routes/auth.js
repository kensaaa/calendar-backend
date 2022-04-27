const { Router } = require('express') 
//el check valida un campo en particular
const { check } = require('express-validator')
const router = Router()
const { crearUsuario,loginUsuario,revalidarToken } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos')
const {validarJWT} = require('../middlewares/validar-jwt')

router.post(
    '/new',
    [//middleware
        check('name','el nombre es obligatorio').not().isEmpty(),
        check('email','el email es obligatorio').isEmail(),
        check('password','el password debe de ser de 6 caracteres').isLength({ min:6 }),
        //colocamos nuestro middleware personalizado, para que haga la validacion
        validarCampos,
    ],
    crearUsuario
)

router.post(
    '/',
    [
        check('email','el email es obligatorio').isEmail(),
        check('password','el password es obligatorio').isLength({min:6}),
        validarCampos,
    ],
    loginUsuario
)

//el objetivo del renew es verificar su jason webToken acutal , van hacer un procedimiento y va regrsar un 
//nuevo json web token, el cliente lo recibe , el token se actualiza en su aplicacion, con el objetivo de prolongar
//el tiempo, y tambien sirve como metodo de autentificacion
//
// ejm se cierra app, ol abres verificas te tienes el token, y te lo renuevan para que tengas mas tiempo de trabajo
router.get('/renew',validarJWT, revalidarToken)

module.exports = router;
