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
        
        try {
            const { id_email, nome, email, fk_id_associado , corpo } = req.body;
            await Emails.update({ envio: true, estado: true, corpo: corpo }, {
                where: {
                    id_email: id_email
                }
            });
            // const fk= await Associate.findOne({ where: { id_associado: fk_id_associado } });    
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'sendmeapifatec@gmail.com',
                    pass: 'rcgiwqnzzphvkqwz'
                }
            })
            transporter.sendMail({
                from: `${nome}<sendmeapifatec@gmail.com>`,
                to: `sendmeapifatec@gmail.com`,
                subject: 'Aviso Diário - Send.me',
                text: `${corpo}`
            })
            } catch (e) {
                return res.json(e)
            }
        

    };

    async updateEnvio(req: Request, res: Response) {
        const { id_email } = req.body;
        const id_email2: string[] = []

        for (let x = 0; x < id_email.length; x++) {
            if (id_email[x] !== null) {
                id_email2.push(id_email[x])
            }
        }
        try {
            await Emails.update({ envio: true }, {
                where: {
                    id_email: id_email2,
                    estado: true
                }
            });
        } catch (e) {
            return res.json(e)
        }
    };

    async sendmail(req: Request, res: Response) {
        const nome2: string[] = []
        const email2: string[] = []
        const corpo2: string[] = []
        const { id_email } = req.body;
        const id_email2: string[] = []

        const { nome, email, corpo } = req.body;
        for (let x = 0; x < nome.length; x++) {
            if (nome[x] !== null) {
                id_email2.push(id_email[x])
                nome2.push(nome[x])
                email2.push(email[x])
                corpo2.push(corpo[x])
            }
        }
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'sendmeapifatec@gmail.com',
                    pass: 'rcgiwqnzzphvkqwz'
                }
            })
            if (nome2.length == 1) {
                transporter.sendMail({
                    from: `${nome2}<sendmeapifatec@gmail.com>`,
                    to: `sendmeapifatec@gmail.com`,
                    subject: 'Aviso Diário - Send.me',
                    text: `${corpo2}${email2}`,
                }).then(() => res.send('email enviado com sucesso'))
            } else {
                for (let i = 0; i <= nome2.length; i++) {
                    transporter.sendMail({
                        from: `${nome2[i]}<sendmeapifatec@gmail.com>`,
                        to: `sendmeapifatec@gmail.com`,
                        subject: 'Aviso Diário - Send.me',
                        text: `${corpo2[i]} ${email2[i]}`,
                    }).then(() => res.send('email enviado com sucesso'))
                }
            }
        } catch (e) {
            return res.json(e)
        }

        try {
            await Emails.update({ envio: true }, {
                where: {
                    id_email: id_email2,
                    estado: true
                }
            });
        } catch (e) {
            return res.json(e)
        }



    };
};



export default new EmailsController();