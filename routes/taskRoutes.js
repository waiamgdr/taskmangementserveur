const express=require('express')
const router = express.Router()
const userMiddleware= require("../middleware/UserMiddleware")
const {creatTask, getTask, deleteUserTask, updateUserTask}=require('../controlles/taskControlles')
router.post("/createTask",userMiddleware,creatTask)
router.get("/getusertaks",userMiddleware,getTask)
router.delete("/deletetusertak/:id",userMiddleware,deleteUserTask)
router.put("/updateusertak/:id",userMiddleware,updateUserTask)
module.exports=router