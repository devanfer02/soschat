import { body, param } from 'express-validator';

class UserValidator {
    checkUserRegisterForm() {
        return [
            body("fullname").
            notEmpty().
            withMessage("fullname value shouldn't be empty"),
            body("username").
            notEmpty().
            withMessage("username value shouldn't be empty"),
            body("password").
            notEmpty().
            withMessage("password value shouldn't be empty"),
            body("email").
            notEmpty().
            withMessage("email value shouldn't be empty"),
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
            notEmpty(). 
            withMessage("title value shouldn't be empty"),
            body("desc").
            notEmpty().
            withMessage("desc value shouldn't be empty")
        ]
    }

    checkPostId() {
        return [
            param("id"). 
            notEmpty().
            withMessage("param id shouldn't be empty")
        ]
    }
}

export const userValidator = new UserValidator();
export const postValidator = new PostValidator();

