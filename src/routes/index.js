const routeNhanVien=require('./routeNhanVien');
const routeDichVu=require('./routeDichVu');
const routeSanPham=require('./routeSanPham');



function routers(index){
    index.use('/',routeNhanVien);
    index.use('/',routeDichVu);
    index.use('/',routeSanPham);

}
module.exports=routers;