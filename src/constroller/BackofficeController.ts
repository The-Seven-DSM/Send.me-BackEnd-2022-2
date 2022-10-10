import { Request, Response } from 'express';
import { Backoffice } from '../model/Backoffice';


export class BackofficeController {
    async auth(req: Request, res: Response) {
        const { email, senha } = req.body;
        try {
            const auth = await Backoffice.findOne({ where: { email: email, senha: senha } });
            return res.json(auth);
        } catch (e) {
            return res.json({ msg: "Fail to auth user", status: 500, route: '/auth/associate' });
        }
    }
}


export default new BackofficeController();