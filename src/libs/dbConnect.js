let mongoose;
let connection = {};

async function dbConnect() {
  if (typeof window !== "undefined") {
    throw new Error("dbConnect should not be called in the browser");
  }

  if (!mongoose) {
    mongoose = (await import('mongoose')).default;
  }

  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;
