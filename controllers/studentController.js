import bcrypt from 'bcrypt'
import User from "../models/student-register.js";
import Complaint from '../models/complaint.model.js';

// ======== Get Login Page ========
export const loginPage = (req, res) => {
    res.render("auth/login", {
        title: "Student Login",
        layout: false
    });
};

export const registerPage = (req, res) => {

    res.render("students/register", {
       
        title: "Student Register",
       
        layout: false
    });
};



//  ==========  POST  Registration page Data =============
export const registerPageData= async (req, res)=>{
try {
  
  const {name, email, password, confirmPassword} = req.body;

 if(password != confirmPassword){
 return  res.status(400).json({
        success: false, message: 'Password does not match'})
 }
  //  hash password 
  const passwordHash = await bcrypt.hash(password, 12);

  // find user 
  const existingUser= await User.findOne({email})
  if (existingUser){
  return res.status(400).json({
        success: false, message: 'User already exist'})
  }



  // save data in schema / collection
  const user = new User({
    name,
    email,
    password: passwordHash
  });



  // save data in db
  await user.save();


  return res.redirect('/login');

} catch (error) {
   res.status(500).json({message: error.message})
}
 

 

}


export const dashboard = async(req, res) => {
  const userId = req.session.user_id;

  // Check login
    if (!userId) {
        return res.redirect("/login");
      }

  // Get only logged-in student's complaints
      const complaints = await Complaint.find({
          student: userId
      }).sort({ createdAt: -1 });

      const total_complaints= complaints.length

    res.render("students/student_dashboard", {
        title: "Student Dashboard",
        activePage: "dashboard",
        user: {
            name: req.session.user_name,
            role: req.session.role
          },
        complaints,
        total_complaints
    });
};



export const complaints = async (req, res) => {
  try {



      const userId = req.session.user_id;

      // Check login
      if (!userId) {
          return res.redirect("/login");
      }

      // Get only logged-in student's complaints
      const complaints = await Complaint.find({
          student: userId
      }).sort({ createdAt: -1 });

      return res.render("students/complaints", {
          title: "My Complaints",
          activePage: "complaints",
          user: {
            name: req.session.user_name,
            role: req.session.role
          },
          complaints
      });

  } catch (error) {

      console.error("Get Complaints Error:", error);

      return res.status(500).json({
          success: false,
          message: "Failed to load complaints"
      });
  }
};



// ======== Get Complaints page ========
export const newComplaintPage = (req, res) => {
  res.render("students/newComplaint", {
      title: "Complaints",
      activePage: "complaints",
      user: {
        name: req.session.user_name,
        role: req.session.role
      }
  });
} 

// ======== Post New Complaint Page Data ========

export const newComplaint = async (req, res) => {
  try {

      const {
          title,
          category,
          description
      } = req.body;

      // Check login
      if (!req.session.user_id) {
          return res.redirect("/login");
      }

      // Create complaint
      const complaint = new Complaint({
         student: req.session.user_id,
          title,
          category,
          description
      });

      // Save to MongoDB
      await complaint.save();

      // Redirect after successful submission
      return res.redirect("/complaints");

  } catch (error) {

      console.error("Complaint Error:", error);

    
  }
};


// complaint detail page
export const complaint_detail_page = async (req, res) => {
    try {
      const userId = req.session.user_id;
  
      if (!userId) {
        return res.redirect("/login");
      }
  
      const complaint = await Complaint.findOne({
        _id: req.params.id,
        student: userId
      });
  
      if (!complaint) {
        return res.status(404).send("Complaint not found");
      }
  
      return res.render("students/complaint_detail_page", {
        title: "Complaint Details",
       
        activePage: "detail",
        user: {
          name: req.session.user_name,
          role: req.session.role
        },
        complaint
      });
  
    } catch (error) {
      console.error("Complaint Detail Error:", error);
  
      return res.status(500).send("Something went wrong");
    }
  };





//   ==== Log Out ========

export const LogOut = (req, res) => {
  
  req.session.destroy((err) => {
  if (err) {
  console.error("Logout Error:", err);
  return res.status(500).send("Unable to logout");
  }

  res.clearCookie("college_cms_sid");
  

  
  return res.redirect("/");
 
  
  });
  };
  
  


  // ===== profile =======

  export const profile = async (req, res) => {
    try {
        const userId = req.session.user_id;

        if (!userId) {
            return res.redirect("/login");
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.redirect("/login");
        }


        const complaints= await Complaint.find({
            student: userId
        }).sort({ createdAt: -1 });
        const totalComplaints = complaints.length

        const adminComplaints= await Complaint.find().sort({ createdAt: -1 });
        const totalAdminComplaints = adminComplaints.length

        res.render("profile", {
            title: "My Profile",
            activePage: "profile",
            user,
            complaints,
            totalComplaints,
            adminComplaints,
            totalAdminComplaints
        });

    } catch (error) {
        console.error("Profile Error:", error);
        res.status(500).send("Server Error");
    }
};