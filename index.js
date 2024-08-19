require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./utils/db");
const router = require("./router/auth-router");
const contactroute = require('./router/contact.router');
const serviceroute=require('./router/service.router')
const adminRoute=require("./router/admin.router");
const errorMiddleware = require('./middlewares/error.middleware');

const corsOptions = {
  origin: ["http://localhost:5175", "http://localhost:5173","https://orderonline.vercel.app/"], // Allow both origins
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));




// Add this line if you need to parse JSON bodies
app.use(express.json());


app.use('/api/auth', router);
app.use('/api/form', contactroute);
app.use('/api/data', serviceroute);
//ADmin ROUTE
app.use("/api/admin",adminRoute);
// Place your error middleware at the end
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
