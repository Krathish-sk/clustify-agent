const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const config = require("./config");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } /* 10 MB file size */,
  fileFilter: (req, file, cb) => {
    const allowedExtensions = [".txt", ".docker"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return cb(new Error("Only .txt and .docker files are allowed"));
    }
    cb(null, true);
  },
});

// MongoDB connection
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
});

// Prompt Schema
const promptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  files: [
    {
      filename: String,
      originalName: String,
      mimetype: String,
      size: Number,
      path: String,
    },
  ],
  response: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
const Prompt = mongoose.model("Prompt", promptSchema);

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

// Routes

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, config.saltRounds);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        joinDate: user.joinDate,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error during registration" });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        joinDate: user.joinDate,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error during login" });
  }
});

// Get user profile
app.get("/api/user/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        joinDate: user.joinDate,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error fetching profile" });
  }
});

// Submit prompt with files
app.post(
  "/api/prompts",
  authenticateToken,
  upload.array("files", 10),
  async (req, res) => {
    try {
      const { prompt } = req.body;
      const files = req.files
        ? req.files.map((file) => ({
            filename: file.filename,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            path: file.path,
          }))
        : [];

      // Mock AI processing - replace with actual AI integration
      const response = `Thank you for your prompt: "${prompt}". I've received ${files.length} file(s) for processing. This is a mock response from the server. In a real implementation, this would be processed by an AI agent.`;

      const newPrompt = new Prompt({
        userId: req.user.userId,
        prompt,
        files,
        response,
      });

      await newPrompt.save();

      res.status(201).json({
        message: "Prompt processed successfully",
        response,
        promptId: newPrompt._id,
      });
    } catch (error) {
      console.error("Error processing prompt:", error);
      res.status(500).json({ error: "Server error processing prompt" });
    }
  }
);

// Get user's prompts
app.get("/api/prompts", authenticateToken, async (req, res) => {
  try {
    const prompts = await Prompt.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    res.status(201).json({ prompts });
  } catch (error) {
    res.status(500).json({ error: "Server error fetching prompts" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ message: "Clustify Agent API is running!" });
});

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${PORT}`);
});
