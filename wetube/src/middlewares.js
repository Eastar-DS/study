export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "Wetube"
    res.locals.loggedIn = Boolean(req.session.loggedIn)
    res.locals.loggedInUser = req.session.user || {}
    // console.log(res.locals)

    // next() 쓰는거 까먹지말구!!
    next()
}

export const protectorMiddleware = (req, res, next) => {
    if(req.session.loggedIn){
        next()
    } else {
        req.flash("error", "Not authorized");
        return res.redirect("/login")
    }
    
}

export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn){
        return next()
    } else {
        req.flash("error", "Not authorized");
        return res.redirect("/")
    }
    
}


import multer from "multer"
export const avatarUpload = multer({dest: "uploads/avatars/", limits: {
    fileSize: 3000000,
}})
export const videoUpload = multer({dest: "uploads/videos/", limits: {
    fileSize: 200000000,
}})