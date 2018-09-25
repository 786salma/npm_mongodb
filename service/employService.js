employs = [
    {
        id: 1,
        name :'Salma',
        email : '786salma@gmail.com',
        salary : 50000
    },
    {
        id: 2,
        name : 'John',
        email : 'john@gmail.com',
        salary : 55000
    }
]
function fetchAllEmploys(){
    return employs
}
function findBySalary(salary){
    return employs.filter(e => e.salary >= salary);
}
// export 
module.exports.employs = fetchAllEmploys
module.exports.bySalary = findBySalary
