import User from "../models/student-register.js";
import Complaint from "../models/complaint.model.js";
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
  } catch (error) {
    console.log(error);
    res.redirect('/admin/404');
    
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

export const registerUser= async (req, res)=>{
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
  
  
    return res.status(201).json({ message: "User registered successfully!", user });
  
  } catch (error) {
     res.status(500).json({message: error.message})
  }
   
  
   
  
  }