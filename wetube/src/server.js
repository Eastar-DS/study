//express에 관련된것과 server의 configuration에 관련된 코드만 처리하자.
import express from "express"
// const express = require("express")
import morgan from "morgan"
import session from "express-session"
import flash from "express-flash";
import {localsMiddleware} from "./middlewares"
import MongoStore from "connect-mongo"
import rootRouter from "./routers/rootRouter"
import videoRouter from "./routers/videoRouter"
import userRouter from "./routers/userRouter"
import apiRouter from "./routers/apiRouter"


const app = express()
const logger = morgan("dev")

app.set("view engine", 'pug')
app.set('views', process.cwd() + "/src/views" )
app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
    });

// const corsOptions = {
//     origin: 'http://localhost:4000',
//     credentials: true, 
//     };

// app.use(cors(corsOptions));
// app.use(cors());

app.use(logger)
app.use(express.urlencoded({extended:true}))
app.use(express.json());

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
app.use(flash());
app.use(localsMiddleware)

// /uploads는 uploads폴더를 url에서 어떻게 표현할지 정하는것.
// /hi로하면 /hi/avatars/file로 접속했을때 uploads폴더안에 있는 파일을 사용한다.
app.use("/uploads", express.static("uploads"))
// app.use("/assets", express.static("assets"))
app.use("/static", express.static("assets"))
app.use("/", rootRouter)
app.use("/videos", videoRouter)
app.use("/users", userRouter)
app.use("/api", apiRouter)

app.use("/convert",express.static("node_modules/@ffmpeg/core/dist"))



export default app
