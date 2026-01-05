import express from "express";
import * as loginController from "../controllers/loginController.js";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("users/login", { message: req.flash("success") });
});

router.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await loginController.authenticateUser(email, password);

    if (user) {
      // Set user session
      req.session.user = user;
      req.flash("success", `Welcome back, ${user.firstName}!`);
      res.redirect("/");
    } else {
      res.render("users/login", { error: "Invalid email or password" });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Could not log out.");
    }
    res.redirect("/login");
  });
});

export default router;
