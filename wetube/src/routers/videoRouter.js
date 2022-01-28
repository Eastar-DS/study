import express from "express"
import {see, edit} from "../controllers/videoController"

const videoRouter = express.Router()



videoRouter.get("/:id(\\d+)", see)
videoRouter.get("/:id(\\d+)/edit", edit)


export default videoRouter 