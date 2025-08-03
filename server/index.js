import express from "express";
import { connectDB } from "./conf/db.js";
import dotenv from "dotenv";
import cors from "cors";
import cookie from "cookie-parser";
import router from "./routes/user.js";
import routerpost from "./routes/post.js";
import routerComments from "./routes/commect.js";
dotenv.config();
const app = express();

// connectDB
connectDB();
app.use(express.json());
app.use(cookie());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1", router);
app.use("/api/v2", routerpost);
app.use("/api/v3", routerComments);

let PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server connect", PORT);
});
