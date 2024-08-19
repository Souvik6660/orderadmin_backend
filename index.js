require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./utils/db");
const router = require("./router/auth-router");
const contactroute = require('./router/contact.router');
const serviceroute = require('./router/service.router');
const adminRoute = require("./router/admin.router");
const errorMiddleware = require('./middlewares/error.middleware');

const corsOptions = {
  origin: ["http://localhost:5175", "http://localhost:5173", "https://orderonline.vercel.app"],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// API routes
app.use('/api/auth', router);
app.use('/api/form', contactroute);
app.use('/api/data', serviceroute);
app.use("/api/admin", adminRoute);

// Error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database, server not started", error);
  }
};

startServer();
