import express from "express";
const router = express.Router();

import {
  dashboard,
  loginPage,
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
import {checkHomePage} from '../middlewares/homePage.middleware.js'

// Public routes
router.get("/", checkHomePage, landingPage);
router.get("/login", loginPage);
router.post("/login", loginPageData);

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