import bcrypt from "bcryptjs";
import pool from "../db.js";

export const authenticateUser = async (email, password) => {
  try {
    const [rows] = await pool.execute(
      "SELECT userid, fname, lname, email, password FROM members WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return null; // User not found
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null; // Invalid password
    }

    // Return user data without password
    return {
      id: user.userid,
      firstName: user.fname,
      lastName: user.lname,
      email: user.email,
    };
  } catch (error) {
    throw error;
  }
};
