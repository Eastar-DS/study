export const trending = (req,res) => res.send("Trending videos!")

export const see = (req,res) => {
    console.log(req.params)
    res.send("WatchVideo")
}
export const edit = (req,res) => {
    console.log(req.params)
    res.send("handleEdit")
}