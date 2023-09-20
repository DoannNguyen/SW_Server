const connection=require('../../config/connection');

class sanPhamController{
    //GET[/getAllSanPham]
    async getAllSanPham(req,res){
        const querry="SELECT * FROM sanpham WHERE hienThi = 1 ";
        connection.query(querry, (err,results)=>{
            if (err) {
                console.error('Lỗi truy vẫn SQL: ' + err.message);
            } else {
                res.send(results);
            } 
        })        
    }
    //GET[/getSanPham:id
    async getSanPhamByidSP(req,res){
        const{idSP}=req.params.idSP;
        const selectedQuerry="SELECT * FROM sanpham WHERE idSP=? AND hienThi=1";
        const selectedValue=[idSP];

        connection.query(selectedQuerry,selectedValue,(err,result)=>{
            if (err) {
                console.error('Lỗi khi truy vấn SQL :', err);
                return;
            }
            if(result.length==0){
                res.status(404).json({ success: false, message: 'Không tìm thấy san pham với idSP ' + idSP });
            }else{

                const SanPham=result[0];
                res.json({success:true,SanPham});
            }
        })

    }

    // POST[/addNewSanPham]
    async addNewSanPham(req,res){
        const {ten,giaThue,hienThi}=req.body;

        const insertQuery = `INSERT INTO sanpham (ten, giaThue, hienThi)
        VALUES (?, ?, ?)`;
        const insertValues=[ten,giaThue,hienThi];

        connection.query(insertQuery,insertValues,(err,result)=>{
            if (err) {
                console.error('Lỗi khi thực hiện truy vấn SQL :', err);
                res.status(500).json({ success: false, message: 'Lỗi khi thêm ' });
                return;
              }
              res.json({ success: true, message: 'San Pham đã được thêm thành công' });

        })
    }
    // PUT[/updateSanPham/:idSP]
    async updateSanPham(req,res){
        const idSP=req.params.idSP;
        const{ten,giaThue,hienThi}=req.body;
        
        const updateQuery="UPDATE sanpham SET ten = ?, giaThue = ?,hienThi=? WHERE idSP = ?";
        const updateValues=[ten,giaThue,hienThi,idSP];
        connection.query(updateQuery,updateValues,(err,result)=>{
            if (err) {
                console.error('Lỗi khi cập nhật san pham:', err);
                res.status(500).json({ success: false, message: 'Lỗi khi cập nhật san pham' });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ success: false, message: 'Không tìm thấy san pham' });
                return;
            }
            console.log("====",updateValues)
        
            res.json({ success: true, message: 'cập nhật thành công' });
            
        })

    }

    // PUT[/delete/:idSP]
    async deleteSanPham(req,res){
        const idSP=req.params.idSP;
        const {hienThi}=req.body;

        const updateQuery = 'UPDATE sanpham SET hienThi = ? WHERE idSP = ?';

        connection.query(updateQuery,[hienThi,idSP],(err,result)=>{
            if (err) {
                console.error('Lỗi:', err);
                res.status(500).json({ success: false, message: 'Lỗi' });
                return;
              }
          
              if (result.affectedRows === 0) {
                res.status(404).json({ success: false, message: 'Không tìm thấy san pham' });
                return;
              }
          
              res.json({ success: true, message: 'đã xoá thành công' });
        })

    }    
}
module.exports=new sanPhamController();