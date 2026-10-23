import express from "express";

import {
  dashboard,
  loginPage,
  // loginPageData,
  registerPage,
  registerPageData,
  complaints,
  newComplaintPage,
  newComplaint,
  complaint_detail_page,
  LogOut,
  profile
} from "../controllers/studentController.js";

import {
  loginPageData
} from "../controllers/login.controller.js";


import { landingPage } from "../controllers/landing_page.controller.js";

import { authenticated } from "../middlewares/isAdmin.middleware.js";
import { isStudent } from "../middlewares/isStudent.middleware.js";
import { checkComplaintValidation } from "../middlewares/check_validation.js";
import { complaintValidation } from "../validator/complaint.validator.js";
const router = express.Router();

// Public routes
router.get("/", landingPage);
router.get("/login", loginPage);
router.post("/login", loginPageData);
router.get("/register", registerPage);
router.post("/register",   registerPageData);

// Protected student routes
router.get("/dashboard", authenticated, isStudent, dashboard);
router.get("/complaints", authenticated,isStudent, complaints);
router.get("/new-complaint", authenticated, newComplaintPage);
router.post("/new-complaint", authenticated,complaintValidation, checkComplaintValidation,  newComplaint);
router.get("/complaints/:id", authenticated, complaint_detail_page);
router.get("/profile", authenticated, profile);

// Logout
router.post("/logout", authenticated, LogOut);

export default router;