const express=require('express');
const router=express.Router();

const dichVuController=require('../app/controllers/dichVuController');

router.get('/getAllDichVu',dichVuController.getAllDichVu);
router.get('/getDichVuByIdDV/:idDV',dichVuController.getDichVuByIdDV);
router.post('/addNewDichVu',dichVuController.addNewDichVu);
router.put('/updateDichVu/:idDV',dichVuController.updateDichVu);
router.put('/deleteDichVu/:idDV',dichVuController.deleteDichVu);


module.exports=router;