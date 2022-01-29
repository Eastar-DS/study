const fakeUser = {
    username:"Dubu",
    loggedIn: false,
}

export const trending = (req,res) => res.render("home", {pageTitle : "Home", fakeUser : fakeUser})

export const see = (req,res) => res.render("watch", {pageTitle : "Video"})
export const edit = (req,res) => res.render("edit", {pageTitle : "Video"})