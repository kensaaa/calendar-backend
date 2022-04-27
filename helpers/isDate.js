const moment = require('moment')


//esto argumentos  estan en la documentacion de express-validator
// const isDate = (value, { req,location, path }) => {
//
//
//
const isDate = (value) => {

    //si regresammos false significa que ese campo no es correcto
    if (!value) return false

    const fecha = moment(value)
    if( fecha.isValid() ){
        return true
    } else {
        return false
    }


}


module.exports = {
    isDate
}
