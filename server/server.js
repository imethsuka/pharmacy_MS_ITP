import express from "express";
import cors from "cors";
import "dotenv/config";

const app=express();
const PORT = process.env.PORT || "5170";

app.use(cors());
app.use(express.json({limit: "20mb"}));

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`)
});






























// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const app = express();
// require ("dotenv").config();


// const PORT = process.env.PORT || 8070;

// app.use(cors());
// app.use(bodyParser.json());

// const URL = process.env.MONGODB_URL;

// mongoose.connect(URL, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopologyL: true,
//     useFindAndModify: false
// })

// const connection = mongoose.connection;
// connection.once("open", () => {
//     console.log("Database Connection Sucessful")
// })

// app.listen(PORT, () => {
//     console.log('Server is running on  ${PORT}')
// })