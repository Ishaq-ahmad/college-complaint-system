import { body } from "express-validator";

export const registerValidation = [
body("name")
.trim()
.notEmpty()
.withMessage("Name is required.")
.isLength({ min: 5 })
.withMessage("Name must be at least 5 characters long."),

body("email")
.trim()
.notEmpty()
.withMessage("Email is required.")
.isEmail()
.withMessage("Please enter a valid email address.")
.normalizeEmail(),

body("password")
.notEmpty()
.withMessage("Password is required.")
.isLength({ min: 8 })
.withMessage("Password must be at least 8 characters long.")
];
