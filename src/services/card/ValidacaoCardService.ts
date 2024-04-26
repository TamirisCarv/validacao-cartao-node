import { PrismaClient } from "@prisma/client"; //objeto do framework - converte função js para sql
import prismaClient from "../../prisma";

interface CardRequest {
  num: string,
  user_id: string,
}

class ValidacaoCardService {
  async execute({
    num,
    user_id,
  }: CardRequest) {

    // passo 1 = recuperar os dados do cartão utilizando número

    console.log(user_id)

    const card = await prismaClient.cartao.findFirst({
        where: {
          num: num,
        },
      });

    // passo 2 = comparar se o id do usuário que está no cartão é igual ao id do usuário que está logado (user_id)

    if (!card) {
        throw new Error("Cartão não encontrado!");
    }
    
    // passo 3 = retornar a resposta verificando se o usuário logado é igual ao usuário que está no cartão (true/false)
    if (card.id_usuario !== user_id) {
        throw new Error("Esse cartão não pertence a esse usuário!");
      }

    return {
        mensagem: 'Esse cartão pertence a esse usuário!'
    }

  }
   
}

export { ValidacaoCardService };
