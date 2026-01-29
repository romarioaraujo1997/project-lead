// Altere para a URL do seu backend após o deploy
const API_URL = 'https://project-lead-api.onrender.com/api/leads'; 

const form = document.getElementById('leadForm');
const statusDiv = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            statusDiv.textContent = data.message;
            statusDiv.style.color = "green";
            form.reset();
        } else {
            throw new Error(data.message || 'Erro ao enviar.');
        }
    } catch (error) {
        statusDiv.textContent = error.message;
        statusDiv.style.color = "red";
    }
});