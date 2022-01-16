// const express = require("express")
import express from "express"
import morgan from "morgan"

const PORT = 4002;

const app = express()
const logger = morgan("dev")

// const handleHome = (req, res) => console.log("somebody is trying to go home")
// app.get("/", () => console.log("somebody is trying to go home"))
const handleHome = (req, res) => {
    // return res.end()
    return res.send("Hello Newbie!")
}

app.use(logger)
app.get("/", handleHome)



const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}❤`)

app.listen(PORT, handleListening)