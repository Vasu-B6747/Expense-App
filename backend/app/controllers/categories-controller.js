const Category=require('../models/category-model')
const Expense=require('../models/expense-model')
const{validationResult}=require('express-validator')

const categoriesCtrl={}
//console.log(categoriesCtrl)
//This for all categories
categoriesCtrl.list=async (req,res)=>{
    try{
        const categories=await Category.find()
        res.json(categories)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}


// categoriesCtrl.list=(req,res)=>{
//     Category.find()
//     .then((categories)=>{
//         res.json(categories)
//     })
//     .catch((err)=>{
//         res.status(500).json({errors:'something went wrong'})
//     })
// }

//This for create categories
categoriesCtrl.creates=async(req,res)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const body=req.body;
        try{
            const category= await Category.create(body)
            res.status(201).json(category)
        }catch(err){
            console.log(err)
            res.status(500).json({error:'something went wrong'})
        }


}

// categoriesCtrl.creates=(req,res)=>{
//     const errors=validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()})
//     }
//     const body=req.body;
//     Category.create(body)
//     .then((category)=>{
//         res.status(201).json(category)
//     })
//     .catch((err)=>{
//         res.status(400).json(err)
//     })
// }

//This for get category by id

categoriesCtrl.findcat=async(req,res)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const id=req.params.id
        try{
            const category=await Category.findById(id)
            if(!category){
                return res.status(404).json({error:'category not found'})
            }
            res.json(category)
        }catch(err){
            console.log(err)
            res.status(500).json({errors:'something went wrong'})
        }
}





// categoriesCtrl.findcat=(req,res)=>{
//     const errors=validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()})
//     }
//     const id=req.params.id
//     Category.findById(id)
//     .then((category)=>{
//         if(!category){
//             return res.status(404).json({errors:'category not found'})
//         }
//         res.json(category)
//     })
//     .catch((err)=>{
//         res.json(err)
//     })
// }

//This for update category
categoriesCtrl.modify=async(req,res)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const id=req.params.id
        const body=req.body
        try{
            const category=await Category.findByIdAndUpdate(id,body,{new:true})
            if(!category){
                return res.status(404).json({error:'record not found'})
            }
            res.json(category)
        }catch(err){
            console.log(err)
            res.status(500).json({error:'something went wrong'})
        }


}



// categoriesCtrl.modify=(req,res)=>{
//     const errors=validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()})
//     }
//     const id=req.params.id
//     const body=req.body
//     Category.findByIdAndUpdate(id,body,{new:true})
//     .then((category)=>{
//         if(!category){
//             return res.status(404).json({errors:'category not found'})
//         }
//         res.json(category)
//     })
//     .catch((err)=>{
//         res.json(err)
//     })
// }

//This for remove category
categoriesCtrl.remove=async(req,res)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const id=req.params.id
        try{
            const category=await Category.findByIdAndDelete(id)
            const expenses=await Expense.deleteMany({category:id})
            if(!category){
                return res.status(404).json({error:'record not found'})
            }
           // res.json({notice:`sucessfully deleted ${category.name}`,category:category})
           res.json(category)
        }catch(err){
            console.log(err)
            res.status(500).json({error:'something went wrong'})
        }

}

// categoriesCtrl.remove=(req,res)=>{
//     const errors=validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()})
//     }
//     const id=req.params.id
//     Category.findByIdAndDelete(id)
//     .then((category)=>{
//         if(!category){
//             return res.status(404).json({errors:'Category not found'})
//         }
//         res.json(category)
//     })
//     .catch((err)=>{
//         res.json(err)
//     })
// }
//console.log(categoriesCtrl)
module.exports=categoriesCtrl