import {Router} from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { isAuthenticated } from './middlewares/isAuthenticated';

import { CreateCardController } from './controllers/card/CreateCardController';
import { ValidacaoCardController } from './controllers/card/ValidacaoCardController';

const router = Router();

router.post('/user', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

router.post('/card', isAuthenticated, new CreateCardController().handle)
router.post('/cardvalidate', isAuthenticated, new ValidacaoCardController().handle)

export{router};

 
// // router.get('/teste', (req:Request, res: Response) => {
// //     return res.json({nome: 'Iasmim'});
// // })

// router.get('/teste', (req:Request, res: Response) => {
//     // throw new Error('erro ao fazer requisição');
//     return res.json({nome: 'Iasmim'});
// })

