const mysql = require('mysql');
const conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pass@word1',
  database : 'sample'
});

const fetchAll = (callback)=>{
    conn.query('SELECT * from sample.user',(err,results,fields)=>{
        callback(err,results)
    })
    //conn.end()
}
const fetchNames =(callback) =>{
    conn.query('SELECT name from user',(err,rows)=>{
        callback(err,rows)
    })
}
const addUser = (user,callback)=>{
    let query =`INSERT INTO user values(${user.id},'${user.name}')`
    conn.query(query,(err,result)=>{
        callback(err,result)
    })
}
const editUser = (user,callback)=>{
    let query =`UPDATE user SET name='${user.name}' WHERE id=${user.id}`
    conn.query(query,(err,result)=>{
        callback(err,result)
    })
}
const sum = (callback)=>{
    let query = `SET @total=0; CALL sample.sum(5, 2,@total); SELECT @total; `
    conn.query(query,(err,result)=>{
        callback(err,result)
    })
}
const fetchAllBySP =() =>{
    conn.query(`CALL sample.fetchUsers();`,(err,result)=>{
        console.log(result)
    })
}

module.exports= {
    all : fetchAll,
    allNames : fetchNames,
    add : addUser,
    edit : editUser,
    sum : sum,
    bySP : fetchAllBySP
}
