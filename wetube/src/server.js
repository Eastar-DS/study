import express from "express"
// const express = require("express")

const PORT = 4000;

const app = express()

const handlehome = () => console.log("Somebody try to get")

app.get("/", handlehome)

const handleListening = () => console.log(`✅Server Listening on port http://localhost:${PORT}`)

app.listen(PORT, handleListening)