const Expense=require('../models/expense-model')
const{validationResult}=require('express-validator')
const expensesCtrl={}
//This for all Expenses
expensesCtrl.list=async(req,res)=>{
    try{
        const expense=await Expense.find()
        res.json(expense)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'somethig went wrong'})
    }
}


// expensesCtrl.list=(req,res)=>{
//     Expense.find()
//     .then((expense)=>{
//         res.json(expense)
//     })
//     .catch((err)=>{
//         res.json(err)
//     })
// }

//This for create expense
expensesCtrl.create=async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try{
        const expense=await Expense.create(body)
        res.status(201).json(expense)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    }
}


// expensesCtrl.addEx =(req,res)=>{
//     const errors=validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()})
//     }
//     const body=req.body
//     Expense.create(body)
//     .then((expense)=>{
//         res.status(201).json(expense)
//     })
//     .catch((err)=>{
//         res.status(400).json(err)
//     })
// }

//This for delete Expense
expensesCtrl.destroy=(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id = req.params.id
    Expense.findByIdAndDelete(id)
    .then((expense)=>{
        if(!expense){
            return res.status(404).json({error:'expense not found'})
        }
        res.json(expense)
    })
    .catch((err)=>{
        res.json(err)
    })
}

//This for update Expense
expensesCtrl.modify=(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    const id=req.params.id
    Expense.findByIdAndUpdate(id,body,{new:true})
    .then((expense)=>{
        if(!expense){
            return res.status(404).json({error:'expense not found'})
        }
        res.json(expense)
    })
    .catch((err)=>{
        res.json(err)
    })
}

//This for get expense by id
    expensesCtrl.show=(req,res)=>{
        const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
        const id=req.params.id
        Expense.findById(id)
        .then((expense)=>{
            if(!expense){
                return res.status(404).json({errror:'expense not found'})
            }
            res.json(expense)
        })
        .catch((err)=>{
            res.json(err)
        })
    }

module.exports=expensesCtrl