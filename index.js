const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const PORT = 3000;

// Rota inicial
app.get("/", (req, res) => {
  res.json({
    mensagem: "Balsas Experience API funcionando!"
  });
});

// Listar todas as atrações
app.get("/atracoes", async (req, res) => {
  try {
    const atracoes = await prisma.atracao.findMany();
    res.json(atracoes);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar atrações."
    });
  }
});

// Buscar atração pelo ID
app.get("/atracoes/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const atracao = await prisma.atracao.findUnique({
      where: { id }
    });

    if (!atracao) {
      return res.status(404).json({
        erro: "Atração não encontrada."
      });
    }

    res.json(atracao);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar atração."
    });
  }
});

// Criar uma atração
app.post("/atracoes", async (req, res) => {
  try {
    const atracao = await prisma.atracao.create({
      data: req.body
    });

    res.status(201).json(atracao);
  } catch (error) {
    res.status(400).json({
      erro: "Erro ao cadastrar atração."
    });
  }
});

// Atualizar uma atração
app.put("/atracoes/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const atracao = await prisma.atracao.update({
      where: { id },
      data: req.body
    });

    res.json(atracao);
  } catch (error) {
    res.status(400).json({
      erro: "Erro ao atualizar atração."
    });
  }
});

// Excluir uma atração
app.delete("/atracoes/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
s
   await prisma.atracao.delete({
  where: { id }
});

res.status(204).send();
  } catch (error) {
    res.status(400).json({
      erro: "Erro ao excluir atração."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Balsas Experience API rodando na porta ${PORT}`);
});