export const landingPage = (req, res) => {
    res.render("landing_page", {
        title: "Landing Page",
        layout: false
    });
};