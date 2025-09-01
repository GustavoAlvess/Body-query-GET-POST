// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";
import dados from "./src/data/dados.js";
const { bruxos, varinhas, pocoes, animais} = dados;
// Criar aplicação com Express e configurar para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis de ambiente e definir constante para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal GET para "/"
app.get("/", (req, res) => {
  res.send("🚀 Servidor funcionando...");
});

// Query Parameters no Node.js - API de Hogwarts
app.get("/bruxos", (req, res) => {
  const { casa, ano, especialidade, nome } = req.query;
  let resultado = bruxos;

  if (casa) {
    resultado = resultado.filter(
      (b) => b.casa.toLowerCase() === casa.toLowerCase()
    );
  }

  if (ano) {
    resultado = resultado.filter((b) => b.ano == ano);
  }

  if (especialidade) {
    resultado = resultado.filter((b) =>
      b.especialidade.toLowerCase().includes(especialidade.toLowerCase())
    );
  }

  if (nome) {
    resultado = resultado.filter((b) =>
      b.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  res.status(200).json({
    total: resultado.length,
    data: resultado,
  });
});
// Aqui vão todas suas Rotas

app.post("/bruxos", (req, res) => {
  // Acessando dados do body
  const { nome, casa, ano, varinha, mascote, patrono, especialidade, vivo } =
    req.body;

  console.log("Dados recebidos:", req.body);

  // Validação básica
  if (!nome || !casa) {
    return res.status(400).json({
      success: false,
      message: "Nome e casa são obrigatórios para um bruxo!",
    });
  }

  // Criar novo bruxo
  const novoBruxo = {
    id: bruxos.length + 1,
    nome,
    casa: casa,
    ano: parseInt(ano),
    varinha: varinha,
    mascote: mascote,
    patrono: patrono,
    especialidade: especialidade || "Em desenvolvimento",
    vivo: vivo,
  };

  // Adicionar à lista de bruxos
  bruxos.push(novoBruxo);

  res.status(201).json({
    success: true,
    message: "Novo bruxo adicionado a Hogwarts!",
    data: novoBruxo,
  });
});

// Query Parameters no Node.js - API de Hogwarts
app.get("/varinhas", (req, res) => {
  const { material, nucleo } = req.query;
  let resultado = varinhas;

  if (material) {
    resultado = resultado.filter((b) =>
      b.material.toLowerCase().includes(material.toLowerCase())
    );
  }

  if (nucleo) {
    resultado = resultado.filter((b) =>
      b.nucleo.toLowerCase().includes(nucleo.toLowerCase())
    );
  }

  res.status(200).json({
    total: resultado.length,
    data: resultado,
  });
});
// Query Parameters no Node.js - API de Hogwarts
app.get("/pocoes", (req, res) => {
  const { nome, efeito } = req.query;
  let resultado = pocoes;

  if (nome) {
    resultado = resultado.filter((b) =>
      b.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  if (efeito) {
    resultado = resultado.filter((b) =>
      b.efeito.toLowerCase().includes(efeito.toLowerCase())
    );
  }

  res.status(200).json({
    total: resultado.length,
    data: resultado,
  });
});
app.get("/animais", (req, res) => {
  const { tipo, nome } = req.query;
  let resultado = animais;

  if (tipo) {
    resultado = resultado.filter((b) =>
      b.tipo.toLowerCase().includes(tipo.toLowerCase())
    );
  }

  if (nome) {
    resultado = resultado.filter((b) =>
      b.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  res.status(200).json({
    total: resultado.length,
    data: resultado,
  });
});


app.post("/varinhas", (req, res) => {
  // Acessando dados do body
  const { material, nucleo, comprimento } =
    req.body;

  console.log("Dados recebidos:", req.body);

  // Validação básica
  if (!material || !nucleo || !comprimento) {
    return res.status(400).json({
      success: false,
      message: "Material, Núcleo e comprimento são obrigatórios para uma varinhas!",
    });
  }

  // Criar novo bruxo
  const novaVarinha = {
    id: varinhas.length + 1,
    material,
    nucleo,
    comprimento
  };

  // Adicionar à lista de bruxos
  varinhas.push(novaVarinha);

  res.status(201).json({
    success: true,
    message: "Nova varinha adicionada!",
    data: novaVarinha,
  });
});

// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});
