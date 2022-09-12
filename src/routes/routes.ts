import express from "express";
import AssociateController from "../constroller/AssociateController";

const route = express.Router();

route.post('/create/associate',
    AssociateController.create
);

route.get('/get/associates',
    AssociateController.getAll
);

export default route;