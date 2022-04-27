const { response } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next) => {

    //Lo voy a recibir en los headers x-token
    const token = req.header('x-token')
    
    //validarJWT
    //token no viene
    if(!token){
        return res.status(401).json({
            ok: false,
            msg:'no hay token en la peticion'
        })
    }

    //es la validacion si el token falla dispara el catch
    try {

        //nos pide el token , key secret
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED)

        //voy modificar la request
        req.uid = uid
        req.name = name
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        })
    }

    next()
}


module.exports = {
    validarJWT
}
