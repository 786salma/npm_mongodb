const express = require('express')
const app = express()
const parser = require('body-parser')
const userService = require('./service/userService');

app.use(parser.json())

app.get('/status',(req,res) => {
    res.send('System is working with mongodb!!');
}).listen(4200);

// fetch all users
app.get('/users',(req,res) => {
    res.setHeader('Content-Type','application/json')
    userService.fetchAll((data)=>{
        res.end(JSON.stringify(data))
    })
});

//fetch users by name
app.get('/users/findByName/:name',(req,res) => {
    res.setHeader('Content-Type','application/json')
    let uname = req.params.name
    userService.fetchByName(uname,(results) =>{
        res.end(JSON.stringify(results))
    })
});
// add a new user
app.post('/user/add',(req,res)=>{
    let userObj = req.body
    res.setHeader('Content-Type','application/json')
    userService.addUser(userObj,(err)=>{
        if(err) res.statusCode(400).end('User Couldnt be Added,please try again later')
        else res.end('User Added Successfully')
    })
})
// update an existing user
app.put('/user/edit',(req,res)=>{
    let userObj = req.body
    res.setHeader('Content-Type','application/json')
    userService.editUser(userObj,(err,result)=>{
        if(err) res.statusCode(400).end('User Couldnt be Added,please try again later')
        else{
                res.end(JSON.stringify({ message:'User Modified' ,response : result }))
                //res.redirect('/users')
        }
    })
})