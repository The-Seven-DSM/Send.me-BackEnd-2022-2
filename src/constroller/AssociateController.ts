import {v4 as uuidv4} from 'uuid';
import { Associate } from '../model/Associate';
import express, {Request, Response} from 'express';

export class AssociateController{

    async create(req:Request, res:Response){
        const id = uuidv4();
        try{
            const createUser = await Associate.create({...req.body, id});
            return res.json(createUser);
        }catch(e){
            return res.json({msg: "Fail to create user", status: 500, route: '/create/associate'});
        }
   };
};