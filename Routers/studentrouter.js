
const {Router} =require('express');
const router = Router();

const {create,getall,getbyid,update,remove}=require('../Controllers/studentcontroller')

router.post('/create',create)
router.get('/getall',getall)
router.get('/getbyid/:id',getbyid);
router.post('/update/:id',update);
router.post('/delete/:id',remove);
 

module.exports=router;