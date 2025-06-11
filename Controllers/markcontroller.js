const GetMarksModel =require('../Models/marksmodel')

exports.addmark = async(req,res,next)=>{
    try
    {
        const {studentId,subject1,subject2,subject3} = req.body;
        console.log(studentId)
        const data = await GetMarksModel.find({studentId:studentId});
 
        if(data.length>0){           
            return res.status(400).json({message:"Mark Already Entered this Student "});  
        }
        else{
            const SampleDoc = new GetMarksModel({studentId,subject1,subject2,subject3});
            await SampleDoc.save();       
            return res.status(201).json({message:"Record Addded Successfully",data:SampleDoc});
            
        }

    }
    catch(err){
        return res.status(400).json({error:'Something is wrong',message:err.message})
    }
}



exports.getallmark =async(req,res,next)=>{
    try{
        //const getdata = await GetMarksModel.find();

        let query=[
            [
                {
                  '$lookup': {
                    'from': 'students', 
                    'localField': 'studentId', 
                    'foreignField': 'studentId', 
                    'as': 'student'
                  }
                }, {
                  '$project': {
                    'studentId': 1, 
                    'subject1': 1, 
                    'subject2': 1, 
                    'subject3': 1, 
                    'name': {
                      '$arrayElemAt': [
                        '$student.name', 0
                      ]
                    }
                  }
                },     
              ]
            ]
    
            const getdata =await GetMarksModel.aggregate(query)
        if(!getdata){
            return res.status(400).json({message:"No Records found.." })
        }
        return res.status(201).json({data:getdata})
    }
    catch(err){
        return res.status(400).json({error:err.message})
    }
}


exports.getbyidmark = async (req, res) => {
    try {
        const { id } = req.params;
         
        let query = [
              {
                  '$match': { 'studentId': id}  // Match the studentId before lookup
              },
            {
                '$lookup': {
                    'from': 'students',
                    'localField': 'studentId',
                    'foreignField': 'studentId',
                    'as': 'student'
                }
            },
            {
                '$project': {
                    'studentId': 1,
                    'subject1': 1,
                    'subject2': 1,
                    'subject3': 1,
                    'name': {
                        '$arrayElemAt': [
                            '$student.name', 0
                        ]
                    }
                }
            }
        ];

        //const data = await GetMarksModel.aggregate(query);
        const data = await GetMarksModel.find({studentId:id});

        return res.status(200).json({ data });

    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};



exports.updatemark = async (req,res,next)=>{
    try{
        const {id} = req.params;
        const{subject1,subject2,subject3} = req.body;
        
        const updatedObject = {}; 
        if(subject1) updatedObject.subject1 = subject1 ;
        if(subject2) updatedObject.subject2 = subject2;
        if(subject3) updatedObject.subject3 = subject3;
   
        const updatedRecord = await GetMarksModel.findOneAndUpdate({studentId:id},updatedObject, {new:true});
        if(!updatedRecord){
            return res.status(400).json({error:'Record not found'});
        }
        res.status(200).json({message:"Record Updated Successfully", data : updatedRecord})      
    }
    catch(err){
        return res.status(400).json({message:err.message});
    }
}



exports.removemark = async(req,res,next)=>{  
    try{         
        const {id} = req.params;
        const deletedRecord = await GetMarksModel.findOneAndDelete({studentId:id});
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




