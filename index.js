const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  const msg = req.body.message?.body || '';
  const phone = req.body.message?.from || '';

  if (msg.toLowerCase().includes('gastei')) {
    const resp = `✅ Gasto registado! 💸\nMensagem: "${msg}"\nTchilla vai guardar e te avisa mais tarde com resumo.`;
    await axios.post(`https://api.z-api.io/instances/${process.env.Z_API_INSTANCE_ID}/token/${process.env.Z_API_TOKEN}/send-text`, {
      phone: phone,
      message: resp
    });
    console.log(`[${phone}] ${msg}`);
  }
  res.sendStatus(200);
});

app.listen(3000, () => console.log('✅ Tchilla vivo na porta 3000'));
app.get("/", (req, res) => {
  res.send("Tchilla está online 👋");
});
