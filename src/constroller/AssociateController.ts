import { Emails } from "../model/Emails";
import { Associate } from "../model/Associate";
import { Request, Response } from "express";

export class AssociateController {
  async create(req: Request, res: Response) {
    try {
      const newAssociate = await Associate.create({ ...req.body });
      return res.json(newAssociate);
    } catch (e) {
      return res.status(500).json({ error: "Cannot create associate" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const associates = await Associate.findAll();
      return res.json(associates);
    } catch (e) {
      return res.status(500).json({ error: "Cannot get all associates" });
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const associate = await Associate.findOne({
        where: { id_associado: id },
      });
      return res.json(associate);
    } catch (e) {
      return res.status(500).json({ error: "Associate not found" });
    }
  }

  async getEmailsByAssociateName(req: Request, res: Response) {
    const { name } = req.params;

    try {
      const emails = await Associate.findAll({
        where: { nome: name },
        include: Emails,
      });
      return res.json(emails);
    } catch (e) {
      return res
        .status(500)
        .json({ error: "Cannot get emails by associate name" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const userToBeDeleted = await Associate.findOne({
        where: { id_associado: id },
      });

      if (!userToBeDeleted) {
        return res.status(404).json({ error: "Associate not found" });
      }

      await userToBeDeleted.destroy();
      return res.sendStatus(204);
    } catch (e) {
      return res.status(500).json({ error: "Cannot delete associate" });
    }
  }
}

export default new AssociateController();
