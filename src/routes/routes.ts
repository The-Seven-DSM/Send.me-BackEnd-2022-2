import express from "express";
import AssociateController from "../constroller/AssociateController";
import ErrorAnalysis from "../services/ErrorAnalysis";

const route = express.Router();

route.post('/create/associate',
    AssociateController.create
);

route.get('/get/associates',
    ErrorAnalysis.lookingForErros,
    AssociateController.getAll
);

route.get('/get/associate/:id',
    ErrorAnalysis.lookingForErros,
    AssociateController.getById
);

export default route;