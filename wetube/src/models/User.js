import bcrypt from "bcrypt"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    avatarUrl: {type: String,},
    socialOnly: {type: Boolean, default:false},
    username: {type: String, required: true, unique: true},
    password: {type: String, },
    name: {type: String, required: true},
    location: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    videos: [
        {type: mongoose.Schema.Types.ObjectId, ref:'Video'},
    ]
})

userSchema.pre("save", async function() {
    //8.14 업로드를할때 save가실행되면서 비밀번호가 바뀌는일이 발생한다. 버그수정!
    if(this.isModified("password")){
        // console.log(this.password)
        this.password = await bcrypt.hash(this.password, 5)
        // console.log(this.password)
    }
})

const User = mongoose.model("User", userSchema)

export default User