import { Associate } from '../model/Associate';
import {Request, Response} from 'express';


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

    
    
};

export default new AssociateController();