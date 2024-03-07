import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

import dbConnection from "./config/database.js";
import { errorMiddleware } from "./middleware/error.js";
import ErrorHandler from "./utils/errorHandler.js";

import cart from "./routes/cartRoute.js";
import product from "./routes/productRoute.js";
import user from "./routes/userRoute.js";
import variant from "./routes/variantRoute.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

// Config
dotenv.config({ path: "./server/config/config.env" });

process.env.GOOGLE_APPLICATION_CREDENTIALS;

// Database connection
dbConnection();

initializeApp({
  credential: applicationDefault(),
  projectId: process.env.PROJECT_ID,
});

// route
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", variant);
app.use("/api/v1", cart);

app.get("/", (req, res) => res.send("[1,2,3,4,5]"));

app.post("/api/v1/send", (req, res) => {
  const receivedToken = req.body.fcmToken;

  const message = {
    notification: {
      title: "New Notifications",
      body: "This is a Test Notification",
    },
    token: receivedToken,
  };

  getMessaging()
    .send(message)
    .then((response) => {
      res.status(200).json({
        message: "Successfully sent message",
      });
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      res.status(400);
      res.send(error);
      console.log("Error sending message:", error);
    });
});

app.all("*", (req, res, next) => {
  //   res
  //     .status(404)
  //     .json({ success: false, message: `${req.originalUrl} Resource Not Found` });

  next(new ErrorHandler(`${req.originalUrl} Resource Not Found`, 404));
});

// ErrorHandling Middleware
app.use(errorMiddleware);

export default app;
