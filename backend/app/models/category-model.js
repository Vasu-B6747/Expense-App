const mongoose=require('mongoose')
const {Schema,model}=mongoose
const categorySchema=new Schema({
    name:{type:String}
},{timestamps:true})
const Category=model('Category',categorySchema);
module.exports=Category
