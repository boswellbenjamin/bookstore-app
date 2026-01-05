import express from "express";
import * as registerController from "../controllers/registerController.js";
import flash from "connect-flash";
const router = express.Router();

router.get("/success", (req, res, next) => {
  req.flash("success", "Account created successfully.");
  res.redirect("/login");
});

router.get("/", (req, res, next) => {
  res.render("users/register");
});

router.post("/", async (req, res, next) => {
  const {
    firstName,
    lastName,
    address,
    city,
    zipCode,
    phone,
    email,
    password,
  } = req.body;

  try {
    const hashedPassword = await registerController.hashPassword(password);
    const emailTaken = await registerController.isEmailTaken(email);
    if (emailTaken) {
      return res
        .status(400)
        .render("users/register", { error: "Email is already taken." });
    }
    const userId = await registerController.registerUser(
      firstName,
      lastName,
      address,
      city,
      zipCode,
      phone,
      email,
      hashedPassword
    );
    res.redirect("/register/success");
  } catch (error) {
    next(error);
  }
});

export default router;
