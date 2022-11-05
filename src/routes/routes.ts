import express from "express";
import AssociateController from "../constroller/AssociateController";
import EmailsController from "../constroller/EmailsController";
import AssociatesValidator from "../services/AssociatesValidator";
import ErrorAnalysis from "../services/ErrorAnalysis";
import BackofficeController from "../constroller/BackofficeController";
const route = express.Router();

route.post('/auth', BackofficeController.auth);

route.post('/create/associate',
    AssociatesValidator.associateBodyValidation(),
    ErrorAnalysis.lookingForErros,
    AssociateController.create
);
route.post('/create/backoffice',
    ErrorAnalysis.lookingForErros,
    BackofficeController.create
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

route.get('/perfil:nome',
    AssociateController.get
)
 
route.post('/send',
    EmailsController.sendmail,
    // EmailsController.updateEnvio,
)
route.post('/send/direto',
    EmailsController.Enviodireto,
    // EmailsController.sendmail
)
route.post('/validar',
    EmailsController.validar
)

route.post('/delete/:id',
    AssociateController.delete
)

export default route;