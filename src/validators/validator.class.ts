import { body, param } from 'express-validator';

class UserValidator {
    checkUserRegisterForm() {
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

    checkUserLoginForm() {
        return [
            body("username").
            notEmpty().
            withMessage("username value shouldn't be empty"),
            body("password").
            notEmpty().
            withMessage("password value shouldn't be empty")
        ]
    }
}

class PostValidator {
    checkPostForm() {
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

    checkPostId() {
        return [
            param("id"). 
            trim().
            notEmpty().
            withMessage("param id shouldn't be empty")
        ]
    }
}

export const userValidator = new UserValidator();
export const postValidator = new PostValidator();

