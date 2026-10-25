import User from "../models/student-register.js";
import Complaint from "../models/complaint.model.js";
import bcrypt from "bcrypt";
export const adminDashboard = async (req, res) => {

  try {
    
  const complaints = await Complaint.find().populate('student', 'name email').sort({ createdAt: -1 });

  const total_complaints= complaints.length
    res.render("admin/admin_dashboard", {
      title: "Admin Dashboard",
      activePage: "dashboard",
      user: {
        name: req.session.user_name,
        role: req.session.role
      },
      total_complaints,
      complaints
    });
  }catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);
  
    return res.status(500).send("Admin dashboard failed. Check server logs.");
  }

  };



export const adminComplaints = async (req, res) => {
try {
  
  const complaints = await Complaint.find().populate('student', 'name email').sort({ createdAt: -1 });

    const total_complaints= complaints.length
    res.render("admin/admin_allcomplaints", {
      title: "Admin Complaints",
      sideLink: 'All Complaints',
      activePage: "complaints",
      user: {
        name: req.session.user_name,
        role: req.session.role,
      },
      total_complaints,
      complaints
    });


  
} catch (error) {

  console.error("Get Complaints Error:", error);
  
  return res.status(500).send("Internal Server Error");

  
}

}



//  ========= Update page =============
export const adminComplaintsDetail = async(req, res) =>{
  
  try {
    const complaint = await Complaint.findById(req.params.id).populate('student', 'name email').sort({ createdAt: -1 });

    if (!complaint) {
      return res.status(404).send("Complaint not found");
    }

    res.render("admin/complaint_detail_page", {
      title: "Complaint Details",
      activePage: "detail",
      user: {
        name: req.session.user_name,
        role: req.session.role,
       
      },
      complaint
    });
  } catch (error) {
    console.error("Get Complaints Error:", error);
    return res.status(500).send("Internal Server Error");
  }

}



// ======= update status card =========

export const updateStatus = async (req, res) => {
try {
  const { status } = req.body;
  const id = req.params.id
 
 const complaint = await Complaint.findByIdAndUpdate(id, { status: status });

 if (!complaint) {
  return res.status(404).send("Complaint not found");
}

  return res.redirect(`/admin/complaints/${id}`);

} catch (error) {
  console.log(error);
  return res.status(500).send(`Internal Server Error :  ${error}` );
  
}
};



// ======== All Students =========

export const allStudents = async (req, res) => {

  const users = await User.find({role: 'student'}).sort({ createdAt: -1 });
  if(!users){
    return res.redirect('/views/admin/admin_dashboard.ejs')
  }
  res.render("admin/allStudents", {
    title: "All Students",
    activePage: "all_students",
    user: {
      name: req.session.user_name,
      role: req.session.role,
    },
    users
  });

}





// get register page

export const registerUserPage = (req, res) => {

  res.render("admin/registerUser", {
     
      title: "Student Register",
     
      layout: false
  });
};

// register user 


export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).render("admin/registerUser", {
        title: "Student Register",
        layout: false,
        error: "Passwords do not match."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(400).render("admin/registerUser", {
        title: "Student Register",
        layout: false,
        error: "An account with this email already exists."
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: passwordHash,
      role: "student"
    });

    await user.save();

    return res.redirect("/admin/all-students");
  } catch (error) {
    console.error("Register User Error:", error);

    return res.status(500).render("admin/registerUser", {
      title: "Student Register",
      layout: false,
      error: "Unable to create the student account. Please try again."
    });
  }
};
