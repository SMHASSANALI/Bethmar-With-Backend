const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AuthRoute = require("./routes/Authentication.route.js");

const connectToMongoDB = require("./db/db.js");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: `${process.env.CLIENT_URL}`,
        credentials: true,
    })
);

app.use("/api/auth", AuthRoute);

// app.use("*", (req, res) => {
//     res.status(404).json({ message: "Route not found" });
// });

const PORT = process.env.PORT || 8000;

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT || 8000}`);
    connectToMongoDB();
});