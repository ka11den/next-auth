import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect("mongodb+srv://kairexblin:kairexblin@cluster0.qgjaryh.mongodb.net/?retryWrites=true&w=majority");
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected");
    })

    connection.on("error", (err) => {
      console.log("MongoDB connection error" + err);
      process.exit();
    })

  } catch (error) {
    console.log(error);
  }
}
