const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Substitua pela sua conexão real do MongoDB Atlas
mongoose.connect('mongodb+srv://USUARIO:SENHA@SEUCLUSTER.mongodb.net/SEUBANCO?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado com sucesso!'))
.catch(err => console.error('Erro ao conectar no MongoDB:', err));

const parcelaSchema = new mongoose.Schema({
  cliente: String,
  seguradora: String,
  vencimento: String
});

const Parcela = mongoose.model('Parcela', parcelaSchema);

app.get('/parcelas', async (req, res) => {
  const parcelas = await Parcela.find();
  res.json(parcelas);
});

app.post('/parcelas', async (req, res) => {
  const nova = new Parcela(req.body);
  await nova.save();
  res.json(nova);
});

app.delete('/parcelas/:id', async (req, res) => {
  await Parcela.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});