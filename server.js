import "dotenv/config";

import express from "express";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";

import studentRoutes from "./routes/student.route.js";
import adminRoutes from "./routes/admin.route.js";
import connectDB from "./configs/mongoDB.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    name: "college_cms_sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    }
  })
);

app.use(expressLayouts);
app.set("layout", "layouts/main");

app.use("/", studentRoutes);
app.use("/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).render("auth/404", {
    title: "404 - Page Not Found",
    layout: false
  });
});

// Confirm DB connection before handling a request.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    res.status(500).send("Database connection failed");
  }
});

export default app;