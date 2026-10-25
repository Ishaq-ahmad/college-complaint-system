import { body, validationResult } from "express-validator";
import { Layout } from "lucide";

export const checkComplaintValidation = (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).render("students/newComplaint", {

        title: "New Complaint",
        activePage: "newComplaint",
        errors: errors.array(),
        user: {
            name: req.session.user_name,
            role: req.session.role
        }
      });
    }
  
    next();
  };


export const checkRegisterValidation = (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).render("students/register", {
        layout: false,
        title: "Register Account",
        activePage: "register",
        errors: errors.array(),
        user: {
            name: req.session.user_name,
            role: req.session.role,
          },
      });
    }
  
    next();
  };
