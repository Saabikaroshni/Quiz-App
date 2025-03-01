const express = require("express");
const mdb = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require("cors");
const Signup = require("./models/signupSchema");

const app = express();
app.use(cors({origin:"https://quiz-app-five-beige.vercel.app/"}));
app.use(express.json());

const PORT = 3001;
dotenv.config();

mdb.connect("mongodb+srv://saabikaroshni:saabi2684@sjitmern2025.mytil.mongodb.net/Trivia-app")
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((err) => {
    console.log("Check your connection string", err);
  });

app.get("/", (req, res) => {
  res.send("<h1>Welcome back</h1>");
});

app.get("/static", (req, res) => {
  res.sendFile("C:\\Users\\joans\\OneDrive\\Documents\\desktop\\mern\\html_css\\index.html");
});

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newSignup = new Signup({
      firstName,
      lastName,
      phoneNumber,
      password: hashedPassword,
      email,
    });
    await newSignup.save();
    console.log("Signup successful");
    res.status(201).json({ message: "Signup Successful", isSignup: true });
  } catch (error) {
    res.status(400).json({ message: "Signup Unsuccessful", isSignup: false });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Signup.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      const isValidPassword = await bcrypt.compare(password, existingUser.password);
      if (isValidPassword) {
        res.status(201).json({ message: "Login successful", isLoggedin: true });
      } else {
        res.status(201).json({ message: "Incorrect password", isLoggedin: false });
      }
    } else {
      res.status(201).json({ message: "User not found, sign up first", isLoggedin: false });
    }
  } catch (error) {
    console.log("Login error");
    res.status(400).json({ message: "Login error, check your code", isLoggedin: false });
  }
});

app.listen(PORT, () => console.log("Server started successfully"));
