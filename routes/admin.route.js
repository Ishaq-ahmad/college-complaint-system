import express from "express";
import {
  adminDashboard,
  adminComplaints,
  adminComplaintsDetail,
  updateStatus,
  allStudents,
  registerUserPage,
  registerUser
} from "../controllers/admin.controller.js";

import {
  isAdmin,
  authenticated
} from "../middlewares/isAdmin.middleware.js";

const router = express.Router();

// Admin Dashboard
router.get(
  "/dashboard",
  authenticated,
  isAdmin,
  adminDashboard
);

// All Complaints
router.get(
  "/complaints",
  authenticated,
  isAdmin,
  adminComplaints
);

// Complaint Details
router.get(
  "/complaints/:id",
  authenticated,
  isAdmin,
  adminComplaintsDetail
);

// Update Complaint Status
router.post(
  "/complaints/:id",
  authenticated,
  isAdmin,
  updateStatus
);


router.get('/all-students', allStudents)


router.get('/404', (req, res)=> {
   res.render('auth/404', {layout: false})
})



router.get('/register', registerUserPage)
router.post('/register', registerUser)
export default router;