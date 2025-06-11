
const GetStudentModel = require('../Models/studentmodel')


 exports.create = async (req, res, next) => {
    try {
        let sample_studentId = 0;

        const LastDocument = await GetStudentModel.findOne().sort({ studentId: -1 });
        sample_studentId = LastDocument && !isNaN(LastDocument.studentId) ? LastDocument.studentId + 1 : 1;

        // Declare studentId explicitly
        const { name, rollno, year, department, gender } = req.body;
        const studentId = sample_studentId;  // Use this declaration

        const SampleData = new GetStudentModel({ studentId, name, rollno, year, department, gender });
        await SampleData.save();

        return res.status(201).json({ message: "Record added Successfully", data: SampleData });
    } catch (err) {
        return res.status(400).json({ error: 'Something is wrong', message: err.message });
    }
};


exports.getall =async(req,res,next)=>{
    try{
        const getdata = await GetStudentModel.find();

        if(!getdata){
            return res.status(400).json({message:"No Records found.." })
        }
        return res.status(201).json({data:getdata})
    }
    catch(err){
        return res.status(400).json({error:err.message})
    }
}


exports.getbyid = async(req,res)=>{
    try{
    const {id} = req.params;

    const data = await GetStudentModel.find({studentId:id});
    return res.status(200).json({data});      

    }
    catch(err){
        return res.status(400).json({message:err.message});
    }    
}



exports.update = async (req,res,next)=>{
    try{
        const {id} = req.params;
        const{name,rollno,year,department,gender} = req.body;
        
        const updatedObject = {};
        if(name) updatedObject.name = name ;
        if(rollno) updatedObject.rollno = rollno;
        if(year) updatedObject.year = year;
        if(department) updatedObject.department = department;
        if(gender) updatedObject.gender = gender;

        const updatedRecord = await GetStudentModel.findOneAndUpdate({studentId:id},updatedObject, {new:true});
        if(!updatedRecord){
            return res.status(400).json({error:'Record not found'});
        }
        res.status(200).json({message:"Record Updated Successfully", data : updatedRecord})      
    }
    catch(err){
        return res.status(400).json({message:err.message});
    }
}



exports.remove = async(req,res,next)=>{  
    try{         
        const {id} = req.params;
        const deletedRecord = await GetStudentModel.findOneAndDelete({studentId:id});
        if(!deletedRecord){
            return res.status(404).json({message:"Data not found"});
        }        
        return res.json({message:"Record deleted successfully",data:deletedRecord})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err.message})
    }
}



