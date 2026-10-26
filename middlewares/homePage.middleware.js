export const checkHomePage= (req, res, next) => {
    if (req.session.user_id) {
        if(req.session.role === 'student'){
            return res.redirect('/dashboard');
        } else if(req.session.role === 'admin'){
            return res.redirect('/admin/dashboard');
        }

        res.render('landing-page')
    }
    next();
}