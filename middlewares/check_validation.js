import { body, validationResult } from "express-validator";

export const checkComplaintValidation = (req, res, next) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).render("students/newComplaint", {
        title: "New Complaint",
        activePage: "complaints",
        errors: errors.array(),
        user: {
            name: req.session.user_name,
            role: req.session.role,
          },
      });
    }
  
    next();
  };