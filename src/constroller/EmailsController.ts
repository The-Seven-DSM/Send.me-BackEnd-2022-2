import { Request, Response } from "express";
import nodemailer from "nodemailer";

import { Emails } from "../model/Emails";
import { Associate } from "../model/Associate";

export class EmailsController {
  async getAll(req: Request, res: Response) {
    try {
      const getEmails = await Emails.findAll({ include: Associate });
      return res.json(getEmails);
    } catch (e) {
      console.error(e);
      return res.status(404).json({ error: "Cannot get all emails" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const email = await Emails.findOne({ where: { id_email: id } });
      return res.json(email);
    } catch (e) {
      console.error(e);
      return res.status(404).json({ error: "Email not found" });
    }
  }

  async validate(req: Request, res: Response) {
    var { id_email, corpo } = req.body;

    try {
      await Emails.update(
        { estado: true, corpo },
        {
          where: {
            id_email: id_email,
          },
        }
      );
      return res.sendStatus(204);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Cannot validate email" });
    }
  }

  async sendEmail(req: Request, res: Response) {
    const { id_email, nome, email, corpo, corpo2 } = req.body;

    const emailBody = corpo ?? corpo2;

    try {
      await Emails.update(
        { envio: true, estado: true, corpo: corpo },
        {
          where: {
            id_email: id_email,
          },
        }
      );

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "sendmefatec@gmail.com",
          pass: "wegxjxnyacgsqeah",
        },
      });
      transporter.sendMail({
        from: `${nome}<sendmefatec@gmail.com>`,
        to: `sendmefatec@gmail.com`,
        subject: "Aviso Diário - Send.me",
        text: `${email}     ${emailBody}`,
      });

      return res.sendStatus(204);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Cannot send email" });
    }
  }

  async update(req: Request, res: Response) {
    const { id_email } = req.body;
    const id_email2: string[] = [];

    id_email.forEach((id: string) => {
      id && id_email2.push(id);
    });

    try {
      await Emails.update(
        { envio: true },
        {
          where: {
            id_email: id_email2,
            estado: true,
          },
        }
      );
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Cannot update email" });
    }
  }

  async sendEmails(req: Request, res: Response) {
    const { id_email, nome, email, corpo } = req.body;

    const names: string[] = [];
    const emails: string[] = [];
    const emailBody: string[] = [];
    const id_email2: string[] = [];

    nome.forEach((name: string, index: number) => {
      if (name) {
        id_email2.push(id_email[index]);
        names.push(nome[index]);
        emails.push(email[index]);
        emailBody.push(corpo[index]);
      }
    });

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "sendmefatec@gmail.com",
          pass: "wegxjxnyacgsqeah",
        },
      });

      names.forEach((name, index) => {
        transporter.sendMail({
          from: `${name}<sendmefatec@gmail.com>`,
          to: `sendmefatec@gmail.com`,
          subject: "Aviso Diário - Send.me",
          text: `${emails[index]}      ${emailBody[index]}`,
        });
      });

      await Emails.update(
        { envio: true },
        {
          where: {
            id_email: id_email2,
            estado: true,
          },
        }
      );

      return res.sendStatus(204);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Cannot send emails" });
    }
  }
}

export default new EmailsController();
