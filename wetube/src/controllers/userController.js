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
export const edit = (req,res) => res.send("EditUser")
