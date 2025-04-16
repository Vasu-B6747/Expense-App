const mongoose=require('mongoose')
const configureDB=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/exp-app-oct24')
    .then(()=>{
        console.log('connected to db')
    })
    .catch((err)=>{
        console.log('error connection to db',err)
    })
}
module.exports=configureDB