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
    async sendmail(req:Request, res:Response){
        
        const {name} = req.body;
        const {email} = req.body;
        const {corpo} = req.body;
        // const { id } = req.params;
        // await Emails.update({ id_email: id }, {
        //     where: {
        //       envio: true
        //     }
        //  });
        try{
            const transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,   
                        auth: {
                            user: 'thorzinpitbull2020@gmail.com',
                            pass: 'pluwsnayivaghnmt'
                        }
                    })
                    for(let i = 0; i < email.length; i++){
                        transporter.sendMail({
                            from: `${name[i]}<thorzinpitbull2020@gmail.com>`,
                            to: `thorzinpitbull2020@gmail.com`,
                            subject:'Aviso Diário - Send.me',
                            text: `${corpo[i]}`
                        }).then(() => res.send('email enviado com sucesso'))
                    }                    
        }catch(e) {
            return res.json(e)
        }
        
    };
};



export default new EmailsController();