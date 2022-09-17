import { Emails } from '../model/Emails';
import { Associate } from '../model/Associate';
import {Request, Response} from 'express';

export class EmailsController{
   async getAll(req:Request, res:Response){
        try{
            const getEmails = await Emails.findAll({ include: Associate });
            return res.json(getEmails);
        }catch(e){
            return res.json({msg: "Fail to get all users", status: 500, route: '/get/emails'})
        }
   };
   async getById(req:Request, res: Response){
    try{
        const {id} = req.params;
        const emailId = await Emails.findOne({where: {id_email: id}});
        return res.json(emailId);
    }catch(e){
        return res.json({msg: "Fail to bring user by id", status: 500, route: '/get/email/:id'});
    }
};
};



export default new EmailsController();