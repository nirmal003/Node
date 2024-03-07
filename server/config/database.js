import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((data) =>
      console.log(`DB Connect with ${data.connection.host} Successfully`)
    )
    .catch((err) => console.log(err));
};

export default dbConnection;
