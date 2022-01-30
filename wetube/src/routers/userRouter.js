import express from "express"
import { startGithubLogin, finishGithubLogin, logout, edit, remove} from "../controllers/userController"

const userRouter = express.Router()


userRouter.get("/logout", logout)
userRouter.get("/edit", edit)
userRouter.get("/github/start", startGithubLogin)
userRouter.get("/github/finish", finishGithubLogin)


export default userRouter