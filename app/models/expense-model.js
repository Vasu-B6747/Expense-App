const mongoose=require('mongoose')
const {Schema,model}=mongoose
//expense schema
const expenseSchema=new Schema({
    expenseDate:Date,
    title:String,
    amount:Number,
    category:{type:Schema.Types.ObjectId,ref:'Category'},
    description:String

},{timestamps:true})
//Create a model for Expense Schema
const Expense=model('Expense',expenseSchema)
module.exports=Expense
