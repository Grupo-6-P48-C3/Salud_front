const express=require('express')
const serverstatic=require('serve-static')
const path=require('path')

const app=express()

app.use('/',serverstatic(path.join(__dirname)))
app.get(/,*/, function(req,res){

})
const port=process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)