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


    async create(req: Request, res: Response) {

        try {
            const createBackoffice = await Backoffice.create({ ...req.body });
            return res.json(createBackoffice);
        } catch (e) {
            return res.json({ msg: "Fail to create Backoffice", status: 500, route: '/create/backoffice' });
        }
    };
}







export default new BackofficeController();