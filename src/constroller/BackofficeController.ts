import { Request, Response } from "express";
import { Backoffice } from "../model/Backoffice";

export class BackofficeController {
  async auth(req: Request, res: Response) {
    const { email, senha } = req.body;
    try {
      const user = await Backoffice.findOne({
        where: { email: email, senha: senha },
      });
      if (user) return res.json(user);
      return res.status(401).json({ error: "Email or password incorrect" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: "Cannot auth user" });
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
