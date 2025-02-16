import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState) {
    console.log("Already MongoDB Connected...!");
    return;
  }

  mongoose
    .connect(
      "mongodb+srv://codesnippet02:dhNGkGJUIdK62KLc@cluster0.ukvoa.mongodb.net/",
      {
        dbName: "Next_JS_E_Commerce",
      }
    )
    .then((msg) => console.log("MongodB Connected Successfully...!"))
    .catch((err) => console.log(err.message));
};

export default connectDB;
