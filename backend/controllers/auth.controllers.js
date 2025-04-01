import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import generateSetToken from "../utils/jwt.generator.js";

/**
 * Handles signup request.
 * 
 *
 * @param {Express.Request} req - The Express request object.
 * @param {Express.Response} res - The Express response object.
 *
 * @route POST /api/auth/signup
 *
 * @returns {Object} JSON response containing User data.
 * @throws {Object} Returns an error response if signup fails.
 */
export const signup = async (req, res) => {
  try {
    const { username, password, confirmPassword, instrument } = req.body;

    if (password != confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ error: "Username already exists: " + username });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let role = "player";
    if (instrument == "admin") {
      role = instrument;
    }

    const newUser = new User({
      username,
      password: hashedPassword,
      instrument: instrument,
      role,
    });

    if (newUser) {
      //Generate and set token, login user straight ahead.
      generateSetToken(newUser._id, res);
      await newUser.save();
      console.log("New user obj has been made.", newUser);

      // Create a copy of newUser without the password field, to return to client
      const userReturn = { ...newUser.toObject() };
      delete userReturn.password;

      res.status(201).json(userReturn);
    } else {
      res.status(400).json({ error: "Error in user creation" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    console.log("Error in auth controller ", error.message);
  }
  console.log("signup user");
};

/**
 * Handles login requests.
 *
 * @param {Express.Request} req - The Express request object.
 * @param {Express.Response} res - The Express response object.
 *
 * @route POST /api/auth/login
 *
 * @returns {Object} JSON response containing User data.
 * @throws {Object} Returns an error response if signup fails.
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const pass = await bcrypt.compare(password, user?.password || "");
    if (!user || !pass) {
      console.log("Invalid credentials");
      return res.status(400).json({ error: "Invalid user credentials." });
    }

    generateSetToken(user._id, res);

    // Create a copy of newUser without the password field, to return to client
    const userReturn = { ...user.toObject() };
    delete userReturn.password;

    res.status(201).json(userReturn);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    console.log("Error in login controller ", error.message);
  }
  console.log("Login user");
};
/**
 * Handles logout requests.
 *
 * @param {Express.Request} req - The Express request object.
 * @param {Express.Response} res - The Express response object.
 *
 * @route POST /api/auth/logout
 *
 * @returns {Object} JSON response containing User data.
 * @throws {Object} Returns an error response if signup fails.
 */
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out." });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
    console.log("Error in logout controller ", error.message);
  }
  console.log("Logout user");
};
