import express from "express";
import AssociateController from "../constroller/AssociateController";
import EmailsController from "../constroller/EmailsController";
import { Emails } from "../model/Emails";
import AssociatesValidator from "../services/AssociatesValidator";
import ErrorAnalysis from "../services/ErrorAnalysis";
const route = express.Router();

route.post('/create/associate',
    AssociatesValidator.associateBodyValidation(),
    ErrorAnalysis.lookingForErros,
    AssociateController.create
);

route.get('/get/associates',
    ErrorAnalysis.lookingForErros,
    AssociateController.getAll
);

route.get('/get/emails',
    ErrorAnalysis.lookingForErros,
    EmailsController.getAll
);

route.get('/get/associate/:id',
    // AssociatesValidator.associateIdValidation(),
    ErrorAnalysis.lookingForErros,
    AssociateController.getById
);

route.get('/get/email/:id',
    // AssociatesValidator.associateIdValidation(),
    ErrorAnalysis.lookingForErros,
    EmailsController.getById
);

route.post('/send',
    EmailsController.sendmail
)

export default route;