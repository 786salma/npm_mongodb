const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'
const dbName = 'sample_users'
// find All Users
const fetchAll = (callback)=>{
    MongoClient.connect(url, (err, client) => {
        client.db(dbName).collection('users').find({}).toArray((err,data)=>{
                callback(data)
            })
        client.close()
    })
}
// find Users by Name
const fetchByName = (uname,callback)=>{
    MongoClient.connect(url, (err, client) => {
        client.db(dbName).collection('users').find({ name: uname}).toArray((err,results)=>{
            callback(results)
        })
        client.close()
    })
}

// find Users by id
const fetchById = (id,callback)=>{
    MongoClient.connect(url, (err, client) => {
        client.db(dbName).collection('users').find({ _id: parseInt(id)}).toArray((err,results)=>{
            callback(results)
        })
        client.close()
    })
}
// delete Users by id
const deleteById = (id,callback)=>{
    MongoClient.connect(url, (err, client) => {
        client.db(dbName).collection('users').deleteOne({ _id: parseInt(id)})
        callback(err)
        client.close()
    })
}



const addUser = (user,callback)=>{
    MongoClient.connect(url,(err,client)=>{
        const collection = client.db(dbName).collection('users')
        collection.insert(user)
        callback(err)
        client.close()
    })
}
const editUser = (user,callback)=>{
    MongoClient.connect(url,(err,client)=>{
        const collection = client.db(dbName).collection('users')
        collection.updateOne({ _id : user._id }
            , { $set: { name : user.name } },(err,response)=>{
                callback(err,response)
            })
            client.close()
    })
}
module.exports = {
    fetchAll : fetchAll,
    fetchByName : fetchByName,
    fetchById : fetchById,
    deleteById : deleteById,
    addUser : addUser,
    editUser :editUser
}