const Category = require("../models/category-model")

const categoryValidationSchema={
    name:{
        in:['body'],
        exists:{errorMessage:'name field is required'},
        notEmpty:{errorMessage:'name field is not empty'},
        trim:true,
        custom:{
            options:async function(value){
                //const category=await Category.findOne({name:{$regex:value,$option:'i'}})
                const category=await Category.findOne({name:value.toLowerCase()})
                if(!category){
                    return true
                }
                throw new Error('category name is already exists try with give new name')
            }
        }
    }
}
module.exports=categoryValidationSchema