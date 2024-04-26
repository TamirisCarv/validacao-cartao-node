import { PrismaClient } from "@prisma/client"; //objeto do framework - converte função js para sql
import prismaClient from "../../prisma";

interface CardRequest {
  num: string;
  nomeProp: string;
  validade: string;
  digitoSeg: string;
  user_id: string;
}

class CreateCardService {
  async execute({
    num,
    nomeProp,
    validade,
    digitoSeg,
    user_id,
  }: CardRequest) {

    if (!num) {
      throw new Error("Número do cartão não foi enviado!");
    }
    if (!nomeProp) {
      throw new Error("Nome do proprietário do cartão não foi enviado!");
    }
    if (!validade) {
      throw new Error("Validade do cartão não enviada!");
    }
    if (!digitoSeg) {
      throw new Error("Dígito de segurança do cartão não enviado!");
    }

    const CardAlreadyExists = await prismaClient.cartao.findFirst({
      where: {
        num: num,
      },
    });

    if (CardAlreadyExists) {
      throw new Error("Cartão já cadastrado!");
    }

    // const senhaHash = await hash(senha, 8);

    const card = await prismaClient.cartao.create({
      data: {
        num: num,
        nomeProp: nomeProp,
        validade: validade,
        digitoSeg: digitoSeg,
        id_usuario: user_id
      },
      select: {
        id: true,
        num: true,
        nomeProp: true,
        validade: true,
        digitoSeg: true,
      },
    });
    return card;

    // return {ok:true}
  }
}

export { CreateCardService };
