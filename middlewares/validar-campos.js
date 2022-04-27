const { response } = require('express')
const { validationResult } = require('express-validator')
//un middle es casi 99% igual a un controlador

//next es callback, que se llama cuando todo el middleware se ejecuta correctamente
const validarCampos = (req,res = response,next) => {
    	
    const errors = validationResult( req )
    if ( !errors.isEmpty() ){
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        })
    }

    //si hay ningun error llamo al next
    next()
}

module.exports = {
    validarCampos
}
