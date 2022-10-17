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
}

export default new BackofficeController();
