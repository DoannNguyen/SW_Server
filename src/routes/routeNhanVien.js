const express=require('express');
const router=express.Router();

const nhanVienController=require('../app/controllers/nhanVienController');

router.get('/getAllNhanVien',nhanVienController.getAllNhanVien);
router.get('/getNhanVienByIdNV/:idNV',nhanVienController.getNhanVienByIdNV);
router.post('/addNewNhanVien',nhanVienController.addNewNhanVien);
router.put('/updateNhanVien/:idNV',nhanVienController.updateNhanVien);
router.put('/deleteNhanVien/:idNV',nhanVienController.deleteNhanVien);
router.post('/login',nhanVienController.login);

module.exports=router;