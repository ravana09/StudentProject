
const {Router} =require('express');
const router = Router();

const {addmark,getallmark,getbyidmark,updatemark,removemark}=require('../Controllers/markcontroller')

router.post('/addmark',addmark)
router.get('/getallmark',getallmark) 
router.get('/getbyidmark/:id',getbyidmark);
router.post('/updatemark/:id',updatemark);
router.post('/removemark/:id',removemark);

module.exports=router;