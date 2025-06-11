
const {Schema ,model} =require('mongoose')

const SampleSchema = new Schema({
    bookId:{type:Number},
    name:{type:String},
    date:{type:String},   
    returndate:{type:String},
 
})

module.exports =model('borrowing',SampleSchema)