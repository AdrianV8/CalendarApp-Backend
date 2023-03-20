const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId, // Avisa a Mongoose que es una referencia al id del user
        ref: 'Usuario',
        required: true
    }

});

//* ---- Configuraciones adicionales ----

// Config para eliminar las '_' del id, version, etc.
EventoSchema.method( 'toJSON', function(){
    const {__v, _id, ...Object} = this.toObject();
    Object.id = _id;
    return Object;
});

module.exports = model('Evento', EventoSchema);

