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
    const videos = await Video.find({})
    console.log(videos)
    return res.render("home", {pageTitle : "Home", videos})
    // try{
    //     const videos = await Video.find({})
    //     return res.render("home", {pageTitle : "Home", videos})  
    // } catch {
    //     return res.render("server-error")
    // }
}
export const watch = (req,res) => {
    // const id = req.params.id
    const {id} = req.params
    return res.render("watch", {pageTitle : `Watching: `, })
}
export const getEdit = (req,res) => {
    const {id} = req.params
    return res.render("edit", {pageTitle : `Editing: `,  })
}

export const postEdit = (req,res) => {
    const { id } = req.params
    const { title } = req.body
    return res.redirect(`/videos/${id}`)
}

export const getUpload = (req,res) => {
    return res.render("upload", {pageTitle : `Upload Video`,  })
}

export const postUpload = async (req,res) => {
    const { title, description, hashtags } = req.body
    try {
        await Video.create({
        // const video = new Video({
            title,
            description,
            createdAt: Date.now(),
            hashtags: hashtags.split(",").map(word => `#${word}`),
                
        })
        return res.redirect(`/`)
    } catch(error) {
        console.log(error)
        return res.render("upload", {
            pageTitle : `Upload Video`, 
            errorMessage: error._message, 
        })
    }
    // await video.save()
}