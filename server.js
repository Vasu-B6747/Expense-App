const express=require('express')
const app=express()
const {checkSchema}=require('express-validator')
const cors= require('cors')
const configureDB=require('./config/db')


const categoriesCtrl=require('./app/controllers/categories-controller')
const expensesCtrl = require('./app/controllers/expenses-controller')
const categoryValidationSchema=require('./app/validators/category-validation-schema')
const idValidationSchema = require('./app/validators/id-validation-schema')
const expenseValidationSchema=require('./app/validators/expense-validation-schema')


const port=3035
configureDB()
app.use(express.json())
app.use(cors())


//curd operations on categories
app.get('/all-categories',categoriesCtrl.list)
app.post('/create-categories',checkSchema(categoryValidationSchema),categoriesCtrl.creates)
app.get('/category/:id',checkSchema(idValidationSchema),categoriesCtrl.findcat)
app.put('/update-category/:id',checkSchema(categoryValidationSchema),checkSchema(idValidationSchema),categoriesCtrl.modify)
app.delete('/remove-category/:id',checkSchema(idValidationSchema),categoriesCtrl.remove)

//curd operations on expenses
app.get('/all-expenses',expensesCtrl.list)
app.post('/create-expense', checkSchema(expenseValidationSchema), expensesCtrl.create)
app.get('/expense/:id',checkSchema(idValidationSchema),expensesCtrl.show)
app.delete('/remove-expense/:id',checkSchema(idValidationSchema),expensesCtrl.destroy)
app.put('/update-expense/:id',checkSchema(expenseValidationSchema),checkSchema(idValidationSchema),expensesCtrl.modify)


app.listen(port,()=>{
    console.log('server is running on port:',port)
})