import { Request, Response } from "express";
import { ValidacaoCardService } from "../../services/card/ValidacaoCardService";


class ValidacaoCardController {
  async handle(req: Request, res: Response) {
    const { num } = req.body;
    const user_id = req.user_id;

    const validacaoCardService = new ValidacaoCardService();
    const validation = await validacaoCardService.execute({
      num,
      user_id,
    });

    return res.json(validation);
  }
}

export {ValidacaoCardController};
