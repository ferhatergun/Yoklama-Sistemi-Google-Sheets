const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter");


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());
dotenv.config();

app.use("/user", userRouter);

app.listen(5000, () => console.log("running on 5000"));
