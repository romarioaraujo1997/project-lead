const Lead = require('../models/Lead');
const { validationResult } = require('express-validator');

const createLead = async (req, res) => {
    // 1. Verifica erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, phone, message } = req.body;

    try {
        // 2. Verifica se o lead já existe
        const leadExists = await Lead.findOne({ email });
        if (leadExists) {
            return res.status(409).json({ 
                success: false, 
                message: 'Este e-mail já foi cadastrado.' 
            });
        }

        // 3. Cria o novo lead
        const lead = await Lead.create({ name, email, phone, message });

        res.status(201).json({
            success: true,
            message: 'Obrigado! Entraremos em contato em breve.'
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Erro no servidor. Tente novamente mais tarde.' 
        });
    }
};

module.exports = { createLead };