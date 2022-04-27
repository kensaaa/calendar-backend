const jwt = require('jsonwebtoken')

//un inconveniente que esta libreria trabaje en callback y no es promesas 

//si el token es manipulado ya no es valido

const generarJWT = (uid,name) => {

    return new Promise((resolve,reject) => {

        const payload = { uid, name }

        //sing() con esto firmamos el token
        // 1 argumento payload
        // 2 argumento secretkey o privet key( palabra unica complicado que ayude al backend saber si es el que yo genere o no ,crear una variable de entorno )
        //el que tenga esa palabra pobra firmar los tokens (reinical server refreque variable entorno)
        //3 argumento opciones 
        //4. argumento  el un callback que es dispara un error( en caso que no se pueda firmar) y el token
        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn:'2h'
        },(err,token)=>{
            //si existe el error envio en reject
            if ( err ){
                //de esta forma para no comprometer informacion del servidor
                console.log(err)
                reject( 'No se pudo generar el token' )
            }
            // si no hay error resuelvo la promesa con el token
            resolve(token)

        })

    })
}


module.exports = {
    generarJWT
}
