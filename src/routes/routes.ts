import express from "express";
import AssociateController from "../constroller/AssociateController";

const route = express.Router();

route.post('/create/associate',
    AssociateController.create
)

export default route;