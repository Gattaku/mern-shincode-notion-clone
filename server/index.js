const express = require("express");
const app = express();
const PORT = 5000;
require("dotenv").config();
const mongoose = require("mongoose");
const authRoute = require("./src/v1/routes/auth");

app.use(express.json());
app.use("/api/v1", authRoute);

app.get("/", (req, res) => {
    res.send("Hello Express");
});

//DBに接続
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MONGODBに接続中・・・");
        app.listen(PORT, () => { console.log("サーバー起動中・・・") })
    } catch (error) {
        console.log(error);
    }
};
connectDB();

