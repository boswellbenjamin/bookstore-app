import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("users/login", { message: req.flash("success") });
});

export default router;
