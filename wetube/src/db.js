import mongoose from "mongoose"

// DB에 연결
mongoose.connect("mongodb://127.0.0.1:27017/wetube")
// mongoose.connect("mongodb://127.0.0.1:27017/wetube", { useNewUrlParser:true})

//connections에 대한 엑세스주기.
const db = mongoose.connection
//연결의 성공여부나 에러를 console.log로 출력하자.
const handleOpen = () => console.log("✅ Connected to DB")
const handleError = (error) => console.log("❌ DB Error", error)
db.on("error", handleError)
//connection이 열릴 때 이벤트가 한번 발생하면 함수를 호출
db.once("open", handleOpen)