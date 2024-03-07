import bcrypt from "bcryptjs";
import fs from "fs";
import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      minLength: [3, "Name should have more than 3 characters"],
      maxLength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      valitade: [validator.isEmail, "Please Enter Valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    user: {
      type: String,
      default: "user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Mongoose Virtual Property
userSchema.virtual("createdAt").get(function () {
  return Date.now();
});

// Mongoose Document Middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Mongoose Document Middleware
userSchema.post("save", function (docs, next) {
  const path = "./server/document/user.txt";
  const content = `hello ${docs.name}\n`;

  fs.writeFileSync(path, content, { flag: "a" }, (err) =>
    console.log(err.message)
  );

  next();
});

// Mongoose Query Middleware
userSchema.pre(/^find/, function (next) {
  this.startTime = Date.now();
  next();
});

userSchema.post(/^find/, function (docs, next) {
  this.endTime = Date.now();

  const path = "./server/document/user.txt";
  const content = `Query took ${
    this.endTime - this.startTime
  } ms to fetch the documents\n`;

  fs.writeFileSync(path, content, { flag: "a" }, (err) =>
    console.log(err.message)
  );

  next();
});

// Mongoose Aggregate Middleware
userSchema.pre("aggregate", function (next) {
  // this.pipeline().unshift({ $match: { age: { $lte: 18 } } });

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
