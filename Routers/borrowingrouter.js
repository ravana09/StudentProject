
const {Router} =require('express');
const router = Router();

const {borrow,returnbook,borrowedbooks}=require('../Controllers/borrowingcontroller')

router.post('/borrow',borrow),
router.post('/returnbook',returnbook)
router.get('/borrowedbooks',borrowedbooks)
 
module.exports=router;



