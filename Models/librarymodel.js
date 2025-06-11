

const {Schema ,model} =require('mongoose')

const SampleSchema = new Schema({
    bookId:{type:Number},
    title:{type:String},
    author:{type:String},
    genre:{type:String},
    availabilityStatus:{type:String,enum:["Available", "Borrowed"]}
})

module.exports =model('library',SampleSchema)