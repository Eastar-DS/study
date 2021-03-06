import mongoose from "mongoose"

const videoSchema = new mongoose.Schema({
    title: {type: String, required: true, trim:true, maxlength: 20},
    // title: { type: String }
    fileUrl: {type: String, required: true,},
    thumbUrl: { type: String, required: true },
    description: {type: String, required: true, trim:true, minlength: 5},
    createdAt: {type:Date, required:true, default: Date.now },
    hashtags: [{ type: String, trim:true, }],
    meta: {
        views: { type: Number, default: 0, required:true},
        rating: { type: Number, default: 0, required:true},
    },
    comments: [
        { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
      ],
    // ref : 어떤 모델과 연결할거냐?
    owner:{type: mongoose.Schema.Types.ObjectId, required:true, ref:'User'}
})

// 3번째 static!
videoSchema.static('formatHashtags', function(hashtags) {
    return hashtags
        .split(",")
        .map( (word) => word.startsWith("#") ? word : `#${word}`)
})

// 1번째 방법
// videoSchema.pre('save', async function(){
//     // console.log('we are about to say : ',this)
//     this.hashtags = this.hashtags[0]
//         .split(",")
//         .map( (word) => word.startsWith("#") ? word : `#${word}`)
// })

// "Video"는 몽구스에게 DB를 위해 모델의 이름을 말해주는것임.
const Video = mongoose.model("Video", videoSchema)
export default Video