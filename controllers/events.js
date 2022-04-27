const { response } = require('express')
const Evento = require('../models/Evento')


const getEvents = async( req , res = response ) => {

    //obtenemos eventos
    const eventos = await Evento.find()
                                //rellena con la informacion del usuario (el segundo argumento lo que quiero, si quiero todo lo dejo vacio)
                                .populate('user','name')


    res.json({
        ok: true,
        eventos
    })

}

const createEvent = async( req , res = response ) => {

    const evento = new Evento(req.body)

    try {
        //enviamos el id
        evento.user = req.uid
        //auque existan muchas propiedades en el body solo trabajo con las que digamos

        const eventoGuardado = await evento.save()

        res.json({
            ok:true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }

}

const updateEvent = async( req , res = response ) => {

    //primero tengo que tomar el valor del id que vien por url
    const eventId = req.params.id
    const uid = req.uid

    try {

        const evento = await Evento.findById(eventId)

        if(!evento){
            res.status(404).json({
                ok:false,
                msg:'evento no existe por ese id'
            })
        }
        //preguntamos que el usuario que hizo la peticion de actualizar el evento es el mismo que lo creo
        if( evento.user.toString() !== uid ){
            //toString me entrega el id y puedo comparar
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegios de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        //cuando se actualiza por defecto regresa el viejo documento
        // const eventoActualizado = await Evento.findByIdAndUpdate(evento.id, nuevoEvento)

        //si quiero regresar el ultimo objeto actualizado( agregar tercer argumento )
        const eventoActualizado = await Evento.findByIdAndUpdate(evento.id, nuevoEvento, { new:true })

        res.json({
            ok:true,
            evento:eventoActualizado
        })



        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }

}


const deleteEvent = async( req , res = response ) => {

    const eventId = req.params.id
    const uid = req.uid

    try {

        const evento = await Evento.findById(eventId)

        if(!evento){
            res.status(404).json({
                ok:false,
                msg:'evento no existe por ese id'
            })
        }
        
        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegios de eliminar este evento'
            })
        }

        await Evento.findByIdAndRemove(eventId)

        res.json({
            ok:true,
        })



        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }


}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}
