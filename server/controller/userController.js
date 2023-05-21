const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

  async function getUser(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error retrieving user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async function loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user._id }, "23e4234", {
        expiresIn: "1h",
      });
      res.json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async function registerUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      const newUser = new User({ name, email, password });
      await newUser.save();

      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("Error during user registration:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

module.exports={
    registerUser,
    loginUser,
    getUser
}
