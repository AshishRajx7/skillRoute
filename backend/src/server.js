import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";

import config from "./config/config.js";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import skillPathRoutes from "./routes/skillPathRoutes.js";
import stepRoutes from "./routes/stepRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";

const app = express();

// Connect to database
connectDB();

// ----------------------------------------------------------
// CORS CONFIG
// ----------------------------------------------------------
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://your-production-frontend.com", // replace this
  "https://www.your-production-frontend.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow mobile apps/postman
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("CORS blocked: origin not allowed"), false);
    },
    credentials: true,
  })
);

// Custom headers to satisfy browser preflight
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// ----------------------------------------------------------
// SECURITY HEADERS
// ----------------------------------------------------------
app.use(helmet());

// ----------------------------------------------------------
// RATE LIMITING (prevents abuse, bots, brute-force)
// ----------------------------------------------------------
app.use(
  "/api/",
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 200, // limit each IP
    message: "Too many requests, slow down."
  })
);

// ----------------------------------------------------------
// BODY PARSER
// ----------------------------------------------------------
app.use(express.json({ limit: "2mb" })); // safe size limit

// Gzip compression
app.use(compression());

// ----------------------------------------------------------
// ROUTES
// ----------------------------------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/paths", skillPathRoutes);
app.use("/api/steps", stepRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/test", testRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    environment: config.nodeEnv,
    version: "1.0.0",
  });
});

// Global error handler
app.use(errorHandler);

// ----------------------------------------------------------
// START SERVER
// ----------------------------------------------------------
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
