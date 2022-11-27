import express from "express";

import AssociateController from "../constroller/AssociateController";
import BackofficeController from "../constroller/BackofficeController";
import EmailsController from "../constroller/EmailsController";
import AssociatesValidator from "../services/AssociatesValidator";
import ErrorAnalysis from "../services/ErrorAnalysis";

const route = express.Router();

route.post("/auth", BackofficeController.auth);

route.get(
  "/associates",
  ErrorAnalysis.lookingForErros,
  AssociateController.getAll
);
route.get(
  "/associate/:id",
  ErrorAnalysis.lookingForErros,
  AssociateController.getById
);
route.post(
  "/associate",
  AssociatesValidator.associateBodyValidation(),
  ErrorAnalysis.lookingForErros,
  AssociateController.create
);
route.post(
  "/backoffice",
  ErrorAnalysis.lookingForErros,
  BackofficeController.create
);
route.delete("/associate/:id", AssociateController.delete);

route.get("/emails", ErrorAnalysis.lookingForErros, EmailsController.getAll);

route.get(
  "/email/:id",
  ErrorAnalysis.lookingForErros,
  EmailsController.getById
);

route.get(
  "/emailsByAssociateID/:Id",
  AssociateController.getEmailsByAssociateID
);

route.post("/sendEmail", EmailsController.sendEmail);
route.post("/sendEmails", EmailsController.sendEmails);
route.post("/validateEmail", EmailsController.validate);

export default route;
