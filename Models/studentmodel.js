
const {Schema,model} =require('mongoose')

const SampleSchema = new Schema({  
    studentId:{type:Number,unique:true},
    name:{type:String},
    rollno:{type:String},
    year:{type:String},
    department:{type:String},
    gender:{type:String}

})

module.exports=model('Student',SampleSchema)