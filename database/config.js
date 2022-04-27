const mongoose = require('mongoose')

const dbConnection = async() => {
    //ocupamos un try porque puede fallar
    try {
        //el primer argumento esto es una cadena de conexion, recomendarion colocar en .env porque puede cambiar
        //la cadena la obtengo de mongoDB compass cuando quiero ingresar (favoritos)
// DB_CNN=mongodb+srv://mern_user:LVACsdcvJVAMIcdE@cluster0.lqypk.mongodb.net/mern_calendar
        // agregamos mern_calendar al final porque esa es la base de datos donde tiene que grabar (aunque no exista)
        await mongoose.connect(process.env.DB_CNN);

        //si todo esto lo hace correctamente
        //tenemos que llamar esta funcion en el index
        console.log('DB online')


    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de inicializar base de datos')
    }
}

module.exports = dbConnection
