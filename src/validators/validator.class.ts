import { body, param } from 'express-validator';

class UserValidator {
    validateRegisterForm() {
        return [
            body("fullname").
            trim().
            notEmpty().
            withMessage("fullname value shouldn't be empty"),
            body("username").
            trim().
            notEmpty().
            withMessage("username value shouldn't be empty"),
            body("password").
            trim().
            notEmpty().
            withMessage("password value shouldn't be empty").
            isLength({min:8,max:250}).
            withMessage("password minimal length is 8, maximal length is 250"),
            body("email").
            trim().
            notEmpty().
            withMessage("email value shouldn't be empty").
            isEmail().
            withMessage("not a valid email"),
        ];
    }

    validateLoginForm() {
        return [
            body("username").
            notEmpty().
            withMessage("username value shouldn't be empty"),
            body("password").
            notEmpty().
            withMessage("password value shouldn't be empty")
        ];
    }

    validateUpdateForm() {
        return [
            body("fullname").
            optional().
            trim().
            notEmpty().
            withMessage("fullname value shouldn't be empty"),
            body("username").
            optional().
            trim().
            notEmpty().
            withMessage("username value shouldn't be empty"),
            body("password").
            optional().
            trim().
            notEmpty().
            withMessage("password value shouldn't be empty").
            isLength({min:8,max:250}).
            withMessage("password minimal length is 8, maximal length is 250"),
            body("email").
            optional().
            trim().
            notEmpty().
            withMessage("email value shouldn't be empty").
            isEmail().
            withMessage("not a valid email"),
        ];
    }
}

class PostValidator {
    validateCreateForm() {
        return [
            body("title"). 
            trim().
            notEmpty(). 
            withMessage("title value shouldn't be empty"),
            body("desc").
            trim().
            notEmpty().
            withMessage("desc value shouldn't be empty")
        ]
    }
}

class CommentValidator {
    validateCreateComment() {
        return [
            body("content").
            trim().
            notEmpty(). 
            withMessage("content value should'n be empty")
        ]
    }
}

class GenericValidator {
    validateParam(value: string) {
        return [
            param(value).
            trim().
            notEmpty(). 
            withMessage(`param ${value} shouldn't be empty`)
        ]
    }

}

export const userValidator        = new UserValidator();
export const postValidator        = new PostValidator();
export const genericValidator     = new GenericValidator();
export const commentValidator     = new CommentValidator();
