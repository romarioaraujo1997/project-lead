const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'E-mail é obrigatório'],
        unique: true, // Impede duplicatas no banco
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Por favor, use um e-mail válido'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Telefone é obrigatório']
    },
    message: {
        type: String,
        required: false
    }
}, {
    timestamps: true // Adiciona createdAt e updatedAt automaticamente
});

module.exports = mongoose.model('Lead', leadSchema);