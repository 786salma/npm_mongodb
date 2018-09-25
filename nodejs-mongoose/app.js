const express = require('express')
const parser = require('body-parser')
const app = express()
const userService = require('./services/mongooseService')

app.use(parser.json())

//fetch all users from mongo
app.get('/users',(rq,rs)=>{
    rs.setHeader('content-type','application/json')
    // fetch all users from mongo via mongoose
    userService.all((err,rows)=>{
        if(err) rs.end('Error Occured')
        else{
            rs.end(JSON.stringify(rows))
        }
    })    
}).listen(4200,(err)=>{
    if(err) throw err
    else console.log('Server running at 4200')
})

// fetch all users by their name
app.get('/users/byName/:name',(req,res)=>{
    res.setHeader('content-type','application/json')
    const name = req.params.name
    userService.byName(name,(err,data)=>{
        if(err) res.end('Error Occured')
        else res.end(JSON.stringify(data))
    })
})

// add a new user
app.post('/user/add',(req,res)=>{
    res.setHeader('content-type','application/json')
    const user = req.body
    userService.add(user,(err,result)=>{
        if(err) {
            res.end(JSON.stringify({message:'Error Occured ',err}))
        }
        else{
            res.end(JSON.stringify({message:'User Added Successfully'}))
        }
    })
})
// edit an existing document 
app.put('/user/edit',(req,res)=>{
    res.setHeader('content-type','application/json')
    const user = req.body
    userService.edit(user,(err,result)=>{
        if(err) {
            console.log(err)
            res.end(JSON.stringify({message:'Error Occured '}))
        }
        else{
            res.end(JSON.stringify({message:'User Updated'}))
        }
    })
})
