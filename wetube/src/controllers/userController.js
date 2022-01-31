import User from "../models/User"
import bcrypt from "bcrypt"
import fetch from "node-fetch"
import { redirect } from "express/lib/response"

export const getJoin = (req,res) => res.render("join", {pageTitle: "Join"})
export const postJoin = async (req,res) => {
    // console.log(req.body)
    const { name, username, email, password, password2, location} = req.body
    const pageTitle = "Join"
    if(password !== password2) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "Password confirmation does not match."
        })
    }
    const exists = await User.exists({$or: [{username},{email}]})
    if(exists){
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "This username/email is already taken."
        })
    }
    // const emailExists = await User.exists({email})
    // if(emailExists){
    //     return res.render("join", {
    //         pageTitle,
    //         errorMessage: "This email is already taken."
    //     })
    // }
    try {
        await User.create({
            name,
            username,
            email,
            password,
            location,
        })
        return res.redirect("/login")
    } catch(error) {
        return res.status(400).render("upload", {
            pageTitle : `Upload Video`, 
            errorMessage: error._message, 
        })
    }
}
export const getLogin = (req,res) => res.render("login", {pageTitle: "Login"})
export const postLogin = async (req,res) => {
    const {username, password} = req.body
    const pageTitle = "Login"
    const user = await User.findOne({username, socialOnly:false})
    // check if account exists
    if(!user){
        return res
            .status(400)
            .render("login", {
                pageTitle,
                errorMessage: "An account with this username does not exists.",
            })
    }
    // check if password correct
    // console.log(user.password)
    const ok = await bcrypt.compare(password, user.password)
    if(!ok){
        return res
            .status(400)
            .render("login", {
                pageTitle,
                errorMessage: "Wrong password.",
            })
    }
    req.session.loggedIn = true
    req.session.user = user
    return res.redirect("/")
}

export const startGithubLogin = (req,res) => {
    const baseUrl = `https://github.com/login/oauth/authorize`
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup:false,
        scope: "read:user user:email",
    }
    const params = new URLSearchParams(config).toString()
    const finalUrl = `${baseUrl}?${params}`
    // console.log(finalUrl)
    return res.redirect(finalUrl)
}

export const finishGithubLogin = async (req,res) => {
    const baseUrl = "https://github.com/login/oauth/access_token"
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code
    }
    const params = new URLSearchParams(config).toString()
    const finalUrl = `${baseUrl}?${params}`
    const tokenRequest = await ( await fetch(finalUrl, {
        method:"POST",
        headers:{
            Accept: "application/json",
        },
    })
    ).json()
    // const json = await data.json()
    // console.log(json)
    // res.send(JSON.stringify(json))
    if("access_token" in tokenRequest) {
        //access api
        const {access_token} = tokenRequest
        const apiUrl = "https://api.github.com"
        const userData = await (
            await fetch(`${apiUrl}/user`, {
            headers: {
                Authorization: `token ${access_token}`,
            },
        })
        ).json()
        // console.log(userData)
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
            headers: {
                Authorization: `token ${access_token}`,
            },
        })
        ).json()
        // console.log(emailData)
        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified ===true
            )
        if(!emailObj) {
            return res.redirect("/login")
        }
        // 여기까지 문제없이 왔으면 유저데이터건 이메일이건 다 활용가능!
        let user = await User.findOne({email: emailObj.email})
        if(!user) {
            user = await User.create({
                name:userData.name? userData.name : "Unknown",
                avatarUrl:userData.avatar_url ,
                username:userData.login,
                email:emailObj.email,
                password:"",
                socialOnly:true,
                location:userData.location,
            })            
        } 
            // create an account
            req.session.loggedIn = true
            req.session.user = user
            return res.redirect("/")        
    } else {
        return res.redirect("/login")
    }
}

export const logout = (req,res) => {
    req.session.destroy()
    return res.redirect("/")
}

export const getEdit = (req,res) => {
    return res.render("edit-profile", {pageTitle: "Edit Profile"})
}
export const postEdit = async (req,res) => {
    const { 
        session: {
            user: { _id }, 
        },
        body : { name, email, username, location,},
        file,
     } =  req
    //  console.log(file)
    //const i = req.session.user.id
    // const { name, email, username, location,} = req.body
    const updatedUser = await User.findByIdAndUpdate(_id, {
        name,
        email, 
        username, 
        location,
        },
        // findByIdAndUpdate는 업데이트 전의 user를 리턴하므로 new:true를 적어주자.
        { new: true}
    )
    //유저는 업데이트했는데 세션은 업데이트 안했네? 홈피에서 이메일이 안바뀐다야
    req.session.user = updatedUser
    // req.session.user={
    //     ...req.session.user,
    //     name,
    //     email,
    //     username,
    //     location,
    // }
    return res.redirect("/users/edit")
}

export const getChangePassword = (req,res) => {
    return res.render("users/change-password", {pageTitle: "Change Password"})
}
export const postChangePassword = async (req,res) => {
    //비번바꿨네? 잘했어~를 보내줘
    const { 
        session: {
            user: { _id }, 
        },
        body : { oldPassword, newPassword, newPasswordConfirmation, },
    } =  req
    const ok = await bcrypt.compare(oldPassword, user.password)
    if(newPassword !== newPasswordConfirmation) {
        return res.status(400).render("/users/change-password", {
            pageTitle: "Change Password",
            errorMessage: "The password does not match the confirmation",
        })
     }
     if(!ok) {
         return res.status(400).render("/users/change-password", {
            pageTitle: "Change Password",
            errorMessage: "The current password is incorrect",
        })
     }
     const user = await User.findById(_id)
     user.password = newPassword
    //  console.log(user.password)
     await user.save()
    //  console.log(user.password)
    // logout시키려는데 세션이랑 비교해야하네또! 
    // req.session.user.password = user.password
    return res.redirect("/users/logout")
}