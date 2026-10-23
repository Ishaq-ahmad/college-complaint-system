
import "dotenv/config";
import MongoStore from "connect-mongo";
import express from "express";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import { fileURLToPath } from "url";

import studentRoutes from "./routes/student.route.js";
import adminRoutes from "./routes/admin.route.js";
import connectDB from "./configs/mongoDB.js";

const app = express();

await connectDB();

const __filename = fileURLToPath(import.meta.url);
const rootDir = path.dirname(__filename);

app.set("views", path.join(rootDir, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(rootDir, "public")));
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
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      ttl: 60 * 60 * 24
    }),
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user_id
    ? {
        _id: req.session.user_id,
        name: req.session.user_name,
        role: req.session.role
      }
    : null;

  next();
});

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


if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
