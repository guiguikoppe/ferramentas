const express = require("express");
const app = express();

app.use(express.json());

// Aqui você coloca o JSON direto:
let data = {
  ferramentas: [
    { id: 1, nome: "Martelo", preco: 25, disponivel: true },
    { id: 2, nome: "Chave de Fenda", preco: 15, disponivel: true },
    { id: 3, nome: "Alicate", preco: 32, disponivel: false },
    { id: 4, nome: "Serrote", preco: 54, disponivel: true }
  ]
};



app.get("/ferramentas", (req, res) => {
  res.json(data.ferramentas);
});


app.get("/ferramentas/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = data.ferramentas.find(f => f.id === id);

  if (!item) {
    return res.status(404).json({ erro: "Ferramenta não encontrada" });
  }

  res.json(item);
});


app.post("/ferramentas", (req, res) => {
  const { nome, preco, disponivel } = req.body;

  const novaFerramenta = {
    id: data.ferramentas.length + 1,
    nome,
    preco,
    disponivel
  };

  data.ferramentas.push(novaFerramenta);
  res.status(201).json(novaFerramenta);
});


app.put("/ferramentas/:nome", (req, res) => {
  const id = Number(req.params.id);
  const index = data.ferramentas.findIndex(f => f.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Ferramenta não encontrada" });
  }

  const { nome, preco, disponivel } = req.body;

  data.ferramentas[index] = {
    id,
    nome,
    preco,
    disponivel
  };

  res.json(data.ferramentas[index]);
});


app.delete("/ferramentas/:all", (req, res) => {
  const id = Number(req.params.id);
  const index = data.ferramentas.findIndex(f => f.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: "Ferramenta não encontrada" });
  }

  data.ferramentas.splice(index, 1);
  res.json({ mensagem: "Ferramenta removida com sucesso" });
});

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});