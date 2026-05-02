const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //check user exists are not
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    //hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create User
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await user.save();
    res.status(201).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error registering user",
    });
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check User
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    //create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secretkey", //later we move to .env file
      { expiresIn: "1d" },
    );

    res.json({
      message: "Login Successfull",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error logging in",
    });
  }
});

module.exports = router;
