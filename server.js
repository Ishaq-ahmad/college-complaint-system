import express from "express";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";

import studentRoutes from "./routes/student.route.js";
import adminRoutes from "./routes/admin.route.js";
import connectDB from "./configs/mongoDB.js";

const app = express();



import 'dotenv/config'

app.set("view engine", "ejs");

// Database
await connectDB();

// General middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Session middleware
app.use(
  session({
    name: "college_cms_sid",
    secret: process.env.SESSION_SECRET || "college-cms-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false, // Local HTTP development ke liye
      sameSite: "lax"
    }
  })
);

// Layout setup
app.use(expressLayouts);
app.set("layout", "layouts/main");

// Student routes
app.use("/", studentRoutes);

// Admin routes
app.use("/admin", adminRoutes);

app.use((req, res) => {
    res.status(404).render("auth/404", {
      title: "404 - Page Not Found",
      layout: false
    });
  });
  

app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000");
});

export default app