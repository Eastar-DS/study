//express에 관련된것과 server의 configuration에 관련된 코드만 처리하자.
import express from "express"
// const express = require("express")
import morgan from "morgan"
import globalRouter from "./routers/globalRouter"
import videoRouter from "./routers/videoRouter"
import userRouter from "./routers/userRouter"



const app = express()
const logger = morgan("dev")

app.set("view engine", 'pug')
app.set('views', process.cwd() + "/src/views" )
app.use(logger)
app.use(express.urlencoded({extended:true}))
app.use("/", globalRouter)
app.use("/videos", videoRouter)
app.use("/users", userRouter)


export default app
