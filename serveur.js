const express=require ('express')
const app=express()
const dotenv=require('dotenv')
const connectDB=require('./config/conectDB')
const cors=require ('cors')
app.use(express.json())


dotenv.config({path:"./config/.env"})
const port=process.env.PORT ||5000
connectDB()
app.use (cors())
app.use('/api/',require('./routes/UserRouter'))
app.use('/api/',require('./routes/taskRoutes'))
app.listen(port,(err)=>{
    err ? console.log(err):console.log("server is running in port ",port)
})