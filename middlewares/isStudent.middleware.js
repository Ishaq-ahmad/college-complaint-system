
export const isStudent = (req, res, next) => {
    if(req.session.role === 'student'){
        next()
    } else {
        return res.status(403).render("auth/dinied-page", {
            title: "Access Denied",
            layout: false,
            role: req.session.role,
            message: "You do not have permission to access this page.",
          });    }
}