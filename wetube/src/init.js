//DB와 Video import하고
import "./db"
import "./models/Video"
import app from "./server"

//우리 app을 작동시킬거야. 포트랑 app을 가져와야겠네
//먼저 server.js에서 app을 configure하고 export해주자.
const PORT = 4000;

const handleListening = () => 
    console.log(`✅Server Listening on port http://localhost:${PORT}`)

app.listen(PORT, handleListening)