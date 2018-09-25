const express = require('express')
const app = express()
const parser =require('body-parser')
const service = require('./services/sqlService')

app.use(parser.json())

// fetch all users from mysql
app.get('/users',(req,res)=>{
    service.all((err,data)=>{
        if(err) res.send(JSON.stringify({data:[], error: err}))
        else res.send(JSON.stringify({data : data , error: []}))
    })
}).listen(3000,()=>{
    console.log('Server started at 3000')
})

app.use(parser.json())

// fetch all user names from mysql
app.get('/users/names',(req,res)=>{
    service.allNames((err,data)=>{
        if(err) res.send(JSON.stringify({data:[], error: err}))
        else res.send(JSON.stringify({data : data , error: []}))
    })
})

// add a new user
app.post('/user/add',(req,res)=>{
    const user = req.body
    service.add(user,(err,data)=>{
        if(err) res.send(JSON.stringify({data:[], error: err}))
        else res.send(JSON.stringify({data : data , error: []}))
    })
})
//edit an existing user
app.put('/user/edit',(req,res)=>{
    const user = req.body
    service.edit(user,(err,data)=>{
        if(err) res.send(JSON.stringify({data:[], error: err}))
        else res.send(JSON.stringify({data : data , error: []}))
    })
})
app.get('/sum',(req,res)=>{
    service.sum((err,result)=>{
        if (err) res.send(JSON.stringify({data:[], error: err}))
        else res.send(JSON.stringify({data:result,error:[]}))
    })
})
// status service
app.get('/status',(req,res)=>{
    //service.bySP()
    res.send('SQL Service is working')
})
