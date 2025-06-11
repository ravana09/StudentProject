
const GetborrowingModel =require('../Models/borrowingmodel')
const GetlibraryModel =require('../Models/librarymodel')

exports.borrow = async(req,res,next)=>{
    try
    {
    const {bookId,name,date} = req.body;
    const SampleDoc = new GetborrowingModel({bookId,name,date});
    await SampleDoc.save();

    const updatedObject ={};
    updatedObject.availabilityStatus ="Borrowed";
    const updatedRecord = await GetlibraryModel.findOneAndUpdate({bookId},updatedObject, {new:true});
    
    return res.status(201).json({message:"Record Addded Successfully",data:SampleDoc});
    }
    catch(err){
        return res.status(400).json({error:'Something is wrong',message:err.message})
    }
}

exports.returnbook = async (req, res, next) => {
    try {
        const { bookId, returndate } = req.body;

        const updateReturn = {};
        if (returndate) updateReturn.returndate = returndate;

        // Update the return date for the borrowing record
        const updatereturnRecord = await GetborrowingModel.findOneAndUpdate(
            { bookId },
            updateReturn,
            { new: true }
        );

        const updatedObject = {};
        updatedObject.availabilityStatus = "Available";

        // Update the availability status of the book in the library collection
        const updatedRecord = await GetlibraryModel.findOneAndUpdate(
            { bookId },
            updatedObject,
            { new: true }
        );

        return res.status(201).json({ message: "Book Returned Successfully", data: updatedRecord });
    } catch (err) {
        return res.status(400).json({ error: 'Something is wrong', message: err.message });
    }
};


exports.borrowedbooks =async(req,res,next)=>{
    try{
        // const getdata = await GetlibraryModel.find({availabilityStatus:"Borrowed"});

     let query=[
        {
          '$lookup': {
            'from': 'libraries', 
            'localField': 'bookId', 
            'foreignField': 'bookId', 
            'as': 'borrow'
          }
        }, {
          '$project': {
            'returndate': 1, 
            'bookId': 1, 
            'name': 1, 
            'date': 1, 
            'title': {
              '$arrayElemAt': [
                '$borrow.title', 0
              ]
            }, 
            'author': {
              '$arrayElemAt': [
                '$borrow.author', 0
              ]
            }, 
            'genre': {
              '$arrayElemAt': [
                '$borrow.genre', 0
              ]
            }, 
            'availabilityStatus': {
              '$arrayElemAt': [
                '$borrow.availabilityStatus', 0
              ]
            }
          }
        }, {
          '$match': {
            'availabilityStatus': 'Borrowed', 
            'returndate': {
              '$exists': false
            }
          }
        }
      ]

          const getdata = await GetborrowingModel.aggregate(query);

         if(!getdata){
             return res.status(400).json({message:"No Records found.." })
         }
        return res.status(201).json({data:getdata})
    }
    catch(err){ 
        return res.status(400).json({error:err.message})
    }
}