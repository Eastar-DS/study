import mongoose from "mongoose"

const videoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    // title: { type: String }
    description: {type: String, required: true},
    createdAt: {type:Date, required:true, default: Date.now },
    hashtags: [{ type: String}],
    meta: {
        view: { type: Number, default: 0, required:true},
        rating: { type: Number, default: 0, required:true},
    },
})

// "Video"는 몽구스에게 DB를 위해 모델의 이름을 말해주는것임.
const Video = mongoose.model("Video", videoSchema)
export default Video