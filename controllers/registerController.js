// checks if email is already in database
import bcrypt from "bcryptjs";
import pool from "../db.js";

export const isEmailTaken = async (email) => {
  const [rows] = await pool.execute(
    "SELECT userid FROM members WHERE email = ?",
    [email]
  );
  return rows.length > 0;
};

// encrypts password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// registers a new user
export const registerUser = async (
  firstName,
  lastName,
  address,
  city,
  zipCode,
  phone,
  email,
  hashedPassword
) => {
  const [result] = await pool.execute(
    "INSERT INTO members (fname, lname, address, city, zip, phone, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [firstName, lastName, address, city, zipCode, phone, email, hashedPassword]
  );
  return result.insertId;
};
