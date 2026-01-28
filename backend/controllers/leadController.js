const Lead = require('../models/Lead');
const { validationResult } = require('express-validator');

// ===============================
// CRIAR NOVO LEAD
// ===============================
const createLead = async (req, res) => {
  // validações do express-validator
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const { name, email, phone, message } = req.body;

  try {
    // verifica se já existe lead com mesmo e-mail
    const leadExists = await Lead.findOne({ email });

    if (leadExists) {
      return res.status(409).json({
        success: false,
        message: 'Este e-mail já foi cadastrado.'
      });
    }

    // cria o lead
    await Lead.create({
      name,
      email,
      phone,
      message
    });

    return res.status(201).json({
      success: true,
      message: 'Obrigado! Entraremos em contato em breve.'
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'Erro no servidor. Tente novamente mais tarde.'
    });
  }
};

// ===============================
// LISTAR TODOS OS LEADS
// ===============================
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    return res.status(200).json(leads);

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'Erro ao buscar leads.'
    });
  }
};

module.exports = {
  createLead,
  getLeads
};
