import { Associate } from '../model/Associate';
import {Request, Response} from 'express';

const nodemailer = require('nodemailer');
export class AssociateController{

    async create(req:Request, res:Response){

        try{
            const createUser = await Associate.create({...req.body});
            return res.json(createUser);
        }catch(e){
            return res.json({msg: "Fail to create user", status: 500, route: '/create/associate'});
        }
   };

   async getAll(req:Request, res:Response){
        try{
            const getUsers = await Associate.findAll();
            return res.json(getUsers);
        }catch(e){
            return res.json({msg: "Fail to get all users", status: 500, route: '/get/associates'})
        }
   };

   async getById(req:Request, res: Response){
        try{
            const {id} = req.params;
            const userId = await Associate.findOne({where: {id_associado: id}});
            return res.json(userId);
        }catch(e){
            return res.json({msg: "Fail to bring user by id", status: 500, route: '/get/associate/:id'});
        }
    };
    async sendmail(req:Request, res:Response){
        const {name} = req.body;
        const {email} = req.body;
        const {corpo} = req.body;
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

export default new AssociateController();