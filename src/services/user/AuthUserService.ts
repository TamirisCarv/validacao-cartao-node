import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  login:string;
  senha: string;
}

class AuthUserService {
  async execute({ email, login, senha }: AuthRequest) {
    // console.log(email);

    // return{ok:true}

    const user = await prismaClient.usuario.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("Usuário ou senha incorretos!");
    }

    const senhaMatch = await compare(senha, user.senha);

    if (!senhaMatch) {
      throw new Error("Usuário ou senha incorretos!");
    }

    const token = sign(
      {
        nome: user.nome,
        usuario: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
  );

    return { 
      id: user.id,
      nome: user.nome,
      email: user.email,
      login: user.login,
      token: token
     };
  }
}

export { AuthUserService };
