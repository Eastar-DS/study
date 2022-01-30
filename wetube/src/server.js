//express에 관련된것과 server의 configuration에 관련된 코드만 처리하자.
import express from "express"
// const express = require("express")
import morgan from "morgan"
import session from "express-session"
import {localsMiddleware} from "./middlewares"
import MongoStore from "connect-mongo"
import rootRouter from "./routers/rootRouter"
import videoRouter from "./routers/videoRouter"
import userRouter from "./routers/userRouter"



const app = express()
const logger = morgan("dev")

app.set("view engine", 'pug')
app.set('views', process.cwd() + "/src/views" )
app.use(logger)
app.use(express.urlencoded({extended:true}))
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave:false,
        saveUninitialized:false,
        store: MongoStore.create({ mongoUrl: process.env.DB_URL}, )
    })
)
// app.use((req,res,next) => {
//     // res.locals.sexy = "you"
//     req.sessionStore.all((error, sessions) => {
//         console.log(sessions)
//         next()
//     })
// })

app.use(localsMiddleware)


app.use("/", rootRouter)
app.use("/videos", videoRouter)
app.use("/users", userRouter)


export default app
