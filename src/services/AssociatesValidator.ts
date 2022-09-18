import { body, param } from "express-validator";

class AssociatesValidator{
    associateBodyValidation(){
        return[
            // body("id").notEmpty().withMessage("Id value must be a valid number"),
            
            body("nome").notEmpty().withMessage("Name field must have a valid value"),

            body("email").notEmpty().withMessage("Email field must have a valid value"),

            body("genero").notEmpty().withMessage("Sex field must have a valid value")
        ]
    };
    
    // associateIdValidation(){
    //     return [
    //         param("id").notEmpty().withMessage("Id value must not be empty")
    //     ]
    // };
};

export default new AssociatesValidator();