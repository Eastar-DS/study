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

// /uploads는 uploads폴더를 url에서 어떻게 표현할지 정하는것.
// /hi로하면 /hi/avatars/file로 접속했을때 uploads폴더안에 있는 파일을 사용한다.
app.use("/uploads", express.static("uploads"))
// app.use("/assets", express.static("assets"))
app.use("/static", express.static("assets"))
app.use("/", rootRouter)
app.use("/videos", videoRouter)
app.use("/users", userRouter)


export default app
