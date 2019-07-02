let express = require('express')

let app = express();
app.get("/user",(req,res)=>{
    res.json("hello world")
})

app.listen(8888)
