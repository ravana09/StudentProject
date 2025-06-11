
const GetLibraryModel =require('../Models/librarymodel')
 

 exports.create = async (req, res, next) => {
    try {
        let sample_bookId = 0;

        const LastDocument = await GetLibraryModel.findOne().sort({ bookId: -1 });
        sample_bookId = LastDocument && !isNaN(LastDocument.bookId) ? LastDocument.bookId + 1 : 1;

        // Declare studentId explicitly
        const { title,author,genre } = req.body;
        const bookId = sample_bookId;  // Use this declaration

        const SampleData = new GetLibraryModel({ bookId, title,author,genre,availabilityStatus:"Available" });
        await SampleData.save();

        return res.status(201).json({ message: "Book added successfully", data: SampleData });
    } catch (err) {
        return res.status(400).json({ error: 'Something is wrong', message: err.message });
    }
};




exports.getall =async(req,res,next)=>{
    try{
        const getdata = await GetLibraryModel.find();

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

    const data = await GetLibraryModel.find({bookId:id});
    return res.status(200).json({data});      

    }
    catch(err){
        return res.status(400).json({message:err.message});
    }    
}



exports.update = async (req,res,next)=>{
    try{
        const {id} = req.params;
        const{title,author,genre} = req.body;
        
        const updatedObject = {};
        if(title) updatedObject.title = title ;
        if(author) updatedObject.author = author;
        if(genre) updatedObject.genre = genre;
       // if(availabilityStatus) updatedObject.availabilityStatus = availabilityStatus;
 
        const updatedRecord = await GetLibraryModel.findOneAndUpdate({bookId:id},updatedObject, {new:true});
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
        const deletedRecord = await GetLibraryModel.findOneAndDelete({bookId:id});
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

