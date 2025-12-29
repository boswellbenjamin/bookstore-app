import express from "express";
import * as registerController from "../controllers/registerController.js";
const router = express.Router();

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
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
});

export default router;
