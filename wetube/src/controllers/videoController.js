import User from "../models/User"
import Video from "../models/Video"


// {}는 search terms임. 비어있으면 모든형식을 찾는다는뜻
// Video.find({}, (error, videos) => {
//     if(error){
//         return res.render("server-error")
//     } else {
//         return res.render("home", {pageTitle : "Home", videos})
//     }
// })
export const home = async(req,res) => {
    const videos = await Video.find({}).sort({createdAt:"desc"})
    // console.log(videos)
    return res.render("home", {pageTitle : "Home", videos})
    // try{
    //     const videos = await Video.find({})
    //     return res.render("home", {pageTitle : "Home", videos})  
    // } catch {
    //     return res.render("server-error")
    // }
}
export const watch = async (req,res) => {
    // const id = req.params.id
    // console.log(req.params)
    const {id} = req.params
    // const video = await Video.findById(id)
    // owner의 ref를 User로 적어놨는데 굳이 이렇게 할필요없겠네? populate!
    // const owner = await User.findById(video.owner)
    const video = await Video.findById(id).populate("owner")
    // console.log(video)
    if(!video){
        return res.render("404", {pageTitle : `Video is not found`,  })
    } 
    return res.render("watch", {pageTitle : `Watching: ${video.title}`, video})
}
export const getEdit = async (req,res) => {
    const {id} = req.params
    const video = await Video.findById(id)
    if (!video) {
        return res.status(404).render("404", {pageTitle : `Video is not found`,  })
    }
    // 8.14 edit홈피에서 동영상 주인만 수정할 수 있게 해야함!
    // console.log(video.owner, _id)
    // console.log(typeof video.owner,typeof  _id) : object, string
    const {user : {_id}} = req.session
    if(String(video.owner) !== String(_id)){
        return res.status(403).redirect("/")
    }
    return res.render("edit", {pageTitle : `Editing: ${video.title}`, video, })
}

export const postEdit = async (req,res) => {
    const { id } = req.params
    // console.log(req.body)
    const {title, description, hashtags} = req.body
    // const video = await Video.findById(id)
    const video = await Video.exists({_id:id})
    if (!video) {
        return res.status(404).render("404", {pageTitle : `Video is not found`,  })
    }
    // 8.14 여기도 getEdit과 같이
    const {user : {_id}} = req.session
    if(String(video.owner) !== String(_id)){
        return res.status(403).redirect("/")
    }

    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags : Video.formatHashtags(hashtags)
    })
    // video.title = title
    // video.description = description
    // video.hashtags = hashtags
    //     .split(",")
    //     .map(word => word.startsWith('#') ? word : `#${word}`)
    // await video.save()
    return res.redirect(`/videos/${id}`)
}

export const getUpload = (req,res) => {
    return res.render("upload", {pageTitle : `Upload Video`,  })
}

export const postUpload = async (req,res) => {
    const {
        user: {_id}
    } = req.session
    // const file = req.file
    const {path : fileUrl} = req.file
    const { title, description, hashtags } = req.body
    try {
        //8.13 create는 return해주는게 있으므로 이걸 이용해서 user에 추가해주자.
        const newVideo = await Video.create({
        // const video = new Video({
            title,
            description,
            fileUrl,
            // fileUrl:file.path,
            owner: _id,
            hashtags : Video.formatHashtags(hashtags),                
        })
        //8.13
        const user = await User.findById(_id)
        user.videos.push(newVideo._id)
        user.save()

        return res.redirect(`/`)
    } catch(error) {
        console.log(error)
        return res.status(400).render("upload", {
            pageTitle : `Upload Video`, 
            errorMessage: error._message, 
        })
    }
    // await video.save()
}

export const deleteVideo = async (req,res) => {
    const {id} = req.params
    // 8.14 여기도! Edit과같이.
    const video = await Video.findById(id)
    if (!video) {
        return res.status(404).render("404", {pageTitle : `Video is not found`,  })
    }
    const {user : {_id}} = req.session
    if(String(video.owner) !== String(_id)){
        return res.status(403).redirect("/")
    }
    // 8.14댓글 user에있는 video목록도 지워줘야겠네?
    const user = await User.findById(_id);
    user.videos.splice(user.videos.indexOf(id),1);
    user.save();
    
    await Video.findByIdAndDelete(id)
    return res.redirect("/")
}

export const search = async(req, res) => {
    const {keyword} = req.query
    let videos = []
    if(keyword){
        videos = await Video.find({
            title: {
                // i : w 와 W를 구별하지않음. ignore. `^${keyword}`: keyword로시작
                // $regex: new RegExp(`^${keyword}`,"i"),
                $regex: new RegExp(keyword,"i"),
            }
        })
    }
    return res.render("search", {pageTitle : `Search Video`, videos})
}