const { Schema, model } = require('mongoose')

//esto como quiero que lusca mis usuarios
const EventoSchema = Schema({
        //se escribe diferente ( required )
    title:{
        type:String,
        required:true
    },
    notes:{
        type: String,
    },
    start:{
        type: Date,
        required:true
    },
    end:{
        type: Date,
        required:true
    },
    
    user:{
        //esto es una referencia a otro usuario
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
})


//configuarcion adicionales

EventoSchema.method('toJSON', function(){
    //con esto obtengo a todo el objeto que se recializa
    const {__v,_id,...object} = this.toObject()
    object.id = _id
    //esto no modifica la base de datos solo como lo veo en la funcion toJSON
    return object
})

module.exports = model('Evento',EventoSchema)
