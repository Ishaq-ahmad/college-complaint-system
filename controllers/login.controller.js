
import bcrypt from "bcrypt";
import User from "../models/student-register.js";


export const loginPageData = async (req, res) => {
    try {
      const email = req.body.email?.trim().toLowerCase();
      const password = req.body.password;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required"
        });
      }
  
      // Find user
      const userExist = await User.findOne({ email });
  
      if (!userExist) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password"
        });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(
        password,
        userExist.password
      );
  
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password"
        });
      }
  
      // Check supported roles
      if (!["student", "admin"].includes(userExist.role)) {
        return res.status(403).json({
          success: false,
          message: "Invalid user role"
        });
      }
  
      // Save session
      req.session.user_id = userExist._id.toString();
      req.session.role = userExist.role;
      req.session.user_name = userExist.name;


      console.log("LOGIN USER:", userExist.email);
console.log("DATABASE ROLE:", userExist.role);
  
      req.session.save((err) => {
        if (err) {
          console.error("Session Save Error:", err);
  
          return res.status(500).json({
            success: false,
            message: "Could not save login session"
          });
        }

        console.log("SESSION BEFORE SAVE:", req.session);

        console.log("SESSION SAVED:");
        console.log("user_id:", req.session.user_id);
        console.log("role:", req.session.role);
  
        if (userExist.role === "admin") {
            console.log("REDIRECTING ADMIN...");
            return res.redirect("/admin/dashboard");
          }
        
          return res.redirect("/dashboard");
        
      });
  
    } catch (error) {
      console.error("Login Error:", error);
  
      return res.status(500).json({
        success: false,
        message: "Something went wrong during login"
      });
    }
  };