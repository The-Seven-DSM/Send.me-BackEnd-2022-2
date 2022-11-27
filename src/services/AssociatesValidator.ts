import { body } from "express-validator";

class AssociatesValidator {
  associateBodyValidation() {
    return [
      body("nome").notEmpty().withMessage("Name field must have a valid value"),
      body("email")
        .notEmpty()
        .withMessage("Email field must have a valid value"),
      body("genero")
        .notEmpty()
        .withMessage("Sex field must have a valid value"),
    ];
  }
}

export default new AssociatesValidator();
