import { body } from "express-validator";

export const complaintValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Complaint title is required.")
    .bail()
    .isLength({ min: 5, max: 20 })
    .withMessage("Title must be between 5 and 15 characters."),

  body("category")
    .notEmpty()
    .withMessage("Please select a category.")
    .bail()
    .isIn([
      "Academic",
      "Hostel",
      "Transport",
      "Library",
      "Fees",
      "IT",
      "Administration",
      "Other"
    ])
    .withMessage("Please select a valid category."),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Complaint description is required.")
    .bail()
    .isLength({ min: 10, max: 2000 })
    .withMessage(
      "Description must be between 10 and 2000 characters."
    )
];