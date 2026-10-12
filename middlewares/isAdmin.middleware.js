

export const authenticated = (req, res, next) => {
    if (!req.session.user_id) {
      return res.redirect("/login");
    }
  
    next();
  };
  
  
  export const isAdmin = (req, res, next) => {
    if (req.session.role !== "admin") {
      return res.status(403).render("auth/dinied-page", {
        title: "Access Denied",
        layout: false,
        role: req.session.role,
        message: "You do not have permission to access this page.",
      });
    }
  
    next();
  };