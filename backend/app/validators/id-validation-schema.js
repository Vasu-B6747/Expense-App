const idValidationSchema={
    id:{
        in:['params'],
        isMongoId:{
            errorMessage:'please provide valid id'
        }
    }
}
module.exports=idValidationSchema