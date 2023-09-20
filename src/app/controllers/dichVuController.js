const connection=require('../../config/connection');
class dichVuController{
    //GET[/getAllDichVu]
    async getAllDichVu(req,res){
        // truy vấn SQL lấy tất cả ds dịch vụ trong bảng
        const querry="SELECT * FROM dichvu WHERE hienThi = 1 ";
        connection.query(querry, (err,results)=>{
            if (err) {
                console.error('Lỗi truy vẫn SQL: ' + err.message);
            } else {
                res.send(results);
            } 
        })        
    }
    //GET[/getDichVu:id
    async getDichVuByIdDV(req,res){
        const{idDV}=req.params.idDV;
        const selectedQuerry="SELECT * FROM dichvu WHERE idDV=? AND hienThi=1";
        const selectedValue=[idDV];

        connection.query(selectedQuerry,selectedValue,(err,result)=>{
            if (err) {
                console.error('Lỗi khi truy vấn SQL :', err);
                return;
            }
            if(result.length==0){
                res.status(404).json({ success: false, message: 'Không tìm thấy dịch vụ với idDV ' + idDV });
            }else{

                const DichVu=result[0];
                res.json({success:true,DichVu});
            }
        })

    }

    // POST[/addNewDichVu]
    async addNewDichVu(req,res){
        const {ten,giaThue,hienThi}=req.body;

        const insertQuery = `INSERT INTO dichVu (ten, giaThue, hienThi)
        VALUES (?, ?, ?)`;
        const insertValues=[ten,giaThue,hienThi];

        connection.query(insertQuery,insertValues,(err,result)=>{
            if (err) {
                console.error('Lỗi khi thực hiện truy vấn SQL :', err);
                res.status(500).json({ success: false, message: 'Lỗi khi thêm dịch vụ' });
                return;
              }
              res.json({ success: true, message: 'Dịch vụ đã được thêm thành công' });

        })
    }
    // PUT[/updateDichVu/:idDV]
    async updateDichVu(req,res){
        const idDV=req.params.idDV;
        const{ten,giaThue,hienThi}=req.body;
        
        const updateQuery="UPDATE dichvu SET ten = ?, giaThue = ?,hienThi=? WHERE idDV = ?";
        const updateValues=[ten,giaThue,hienThi,idDV];
        connection.query(updateQuery,updateValues,(err,result)=>{
            if (err) {
                console.error('Lỗi khi cập nhật dich vu:', err);
                res.status(500).json({ success: false, message: 'Lỗi khi cập nhật dich vu' });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ success: false, message: 'Không tìm thấy dich vu' });
                return;
            }
            console.log("====",updateValues)
        
            res.json({ success: true, message: 'cập nhật thành công' });
            
        })

    }

    // PUT[/delete/:idDV]
    async deleteDichVu(req,res){
        const idDV=req.params.idDV;
        const {hienThi}=req.body;

        const updateQuery = 'UPDATE dichvu SET hienThi = ? WHERE idDV = ?';

        connection.query(updateQuery,[hienThi,idDV],(err,result)=>{
            if (err) {
                console.error('Lỗi:', err);
                res.status(500).json({ success: false, message: 'Lỗi' });
                return;
              }
          
              if (result.affectedRows === 0) {
                res.status(404).json({ success: false, message: 'Không tìm thấy dich vu' });
                return;
              }
          
              res.json({ success: true, message: 'Dich đã được xoá thành công' });
        })

    }


}
module.exports= new dichVuController();