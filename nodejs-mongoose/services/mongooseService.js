const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/sample_users')
const Schema = mongoose.Schema
const schema = new Schema({ _id: Number, name : String });
const UserModel = mongoose.model('User',schema)

//fetch all users
const findAll = (callback)=>{
        UserModel.find({},{_id :false, __v :false},(err,rows)=>{
            callback(err,rows)
        })
}
// fetch all users by name
const findByName = (uname, callback) =>{
        UserModel.find({name :uname},{_id :false, __v :false},(err,rows)=>{
           callback(err,rows)
        })
}
// add a new user document to the collection
const addUser = (user,callback)=>{
        const userObj = new UserModel({_id:user._id,name:user.name})
        UserModel.create(userObj,(err,result)=>{
            callback(err,result)
        })
}
const editUser = (user,callback)=>{
        let options ={ multi: true }
        UserModel.updateOne({_id:user._id},{name:user.name},options,(err,result)=>{
            callback(err,result)
        })
}
module.exports ={
    all : findAll,
    byName : findByName,
    add : addUser,
    edit : editUser
}
