import { Emails } from '../model/Emails';
import { Associate } from '../model/Associate';
import { Request, Response } from 'express';
const nodemailer = require('nodemailer');

export class EmailsController {
    async getAll(req: Request, res: Response) {
        try {
            const getEmails = await Emails.findAll({ include: Associate });
            return res.json(getEmails);
        } catch (e) {
            return res.json({ msg: "Fail to get all users", status: 500, route: '/get/emails' })
        }
    };
    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const emailId = await Emails.findOne({ where: { id_email: id } });
            return res.json(emailId);
        } catch (e) {
            return res.json({ msg: "Fail to bring user by id", status: 500, route: '/get/email/:id' });
        }
    };
    async validar(req: Request, res: Response) {
        var { id_email, corpo } = req.body;
        try {
            await Emails.update({ estado: true, corpo: corpo }, {
                where: {
                    id_email: id_email
                }
            });
            return res.json({ msg: "Email updated", status: 200, route: '/update/email/:id' })

        } catch (e) {
            return res.json(e)
        }

    };
    async Enviodireto(req: Request, res: Response) {
        const { id_email, corpo } = req.body;
        try {
            await Emails.update({ envio: true, estado: true ,corpo: corpo }, {
                where: {
                    id_email: id_email  
                }
            });
            return res.json({ msg: "Email updated", status: 200, route: '/update/email/:id' })

        } catch (e) {
            return res.json(e)
        }
    };
    async updateEnvio(req: Request, res: Response) {
        const { id_email, corpo } = req.body;
        try {
            await Emails.update({ envio: true, corpo: corpo }, {
                where: {
                    id_email: id_email,
                    estado: true
                }
            });
            return res.json({ msg: "Email updated", status: 200, route: '/update/email/:id' })

        } catch (e) {
            return res.json(e)
        }
    };

    async sendmail(req: Request, res: Response) {

        const { name, email, corpo } = req.body;
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'thorzinpitbull2020@gmail.com',
                    pass: 'pluwsnayivaghnmt'
                }
            })
            for (let i = 0; i < email.length; i++) {
                transporter.sendMail({
                    from: `${name[i]}<thorzinpitbull2020@gmail.com>`,
                    to: `thorzinpitbull2020@gmail.com`,
                    subject: 'Aviso Diário - Send.me',
                    text: `${corpo[i]}`
                }).then(() => res.send('email enviado com sucesso'))
            }
        } catch (e) {
            return res.json(e)
        }

    };
};



export default new EmailsController();