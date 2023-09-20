const express=require('express');
const router=express.Router();

const sanPhamController=require('../app/controllers/sanPhamController');

router.get('/getAllSanPham',sanPhamController.getAllSanPham);
router.get('/getSanPhamByidSP/:idSP',sanPhamController.getSanPhamByidSP);
router.post('/addNewSanPham',sanPhamController.addNewSanPham);
router.put('/updateSanPham/:idSP',sanPhamController.updateSanPham);
router.put('/deleteSanPham/:idSP',sanPhamController.deleteSanPham);


module.exports=router;