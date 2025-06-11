
const {Schema ,model} =require('mongoose')

const SampleSchema = new Schema({
    studentId:{type:Number},
    subject1:{type:Number},
    subject2:{type:Number},
    subject3:{type:Number}
})

module.exports =model('Marks',SampleSchema)