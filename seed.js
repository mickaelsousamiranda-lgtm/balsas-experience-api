const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const atracoes = [
    {
      nome: 'Praça Getúlio Vargas',
      descricao: 'Praça localizada na região central de Balsas.',
      endereco: 'Centro, Balsas - MA',
      tags: ['Praça', 'Lazer']
    },
    {
      nome: 'Rio Balsas',
      descricao: 'Um dos principais atrativos naturais do município de Balsas.',
      endereco: 'Balsas - MA',
      tags: ['Natureza', 'Rio']
    },
    {
      nome: 'Catedral do Sagrado Coração de Jesus',
      descricao: 'Igreja localizada na região central de Balsas.',
      endereco: 'Balsas - MA',
      tags: ['Religioso', 'Cultura']
    }
  ];

  for (const atracao of atracoes) {
    await prisma.atracao.create({
      data: {
        nome: atracao.nome,
        descricao: atracao.descricao,
        endereco: atracao.endereco,
        tags: {
          connectOrCreate: atracao.tags.map((tag) => ({
            where: { nome: tag },
            create: { nome: tag }
          }))
        }
      }
    });
  }

  console.log('Atrações cadastradas com sucesso!');
}

main()
  .catch((erro) => {
    console.error(erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });