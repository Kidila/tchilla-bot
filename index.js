const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  res.send("Tchilla está online 👋");
});

// Rota que recebe mensagens do Z-API
app.post('/webhook', async (req, res) => {
  console.log("Mensagem recebida no webhook:", req.body);

  const msg = req.body.message?.body || '';
  const phone = req.body.message?.from || '';

  if (msg.toLowerCase().includes('gastei')) {
    const resp = `✅ Gasto registado! 💸\nMensagem: "${msg}"\nTchilla vai guardar e te avisa mais tarde com resumo.`;

    try {
      await axios.post(`https://api.z-api.io/instances/${process.env.Z_API_INSTANCE_ID}/token/${process.env.Z_API_TOKEN}/send-text`, {
        phone: phone,
        message: resp
      });
      console.log(`[${phone}] Mensagem enviada: ${msg}`);
    } catch (error) {
      console.error("Erro ao enviar resposta:", error.response?.data || error.message);
    }
  }

  res.sendStatus(200);
});

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Tchilla vivo na porta ${PORT}`);
});
