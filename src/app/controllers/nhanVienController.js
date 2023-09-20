const connection=require('../../config/connection');
const { format } = require('date-fns');

class nhanVien{
  // GET[/getAllNhanVien]
  async getAllNhanVien(req,res ){
    // truy vấn SQL lấy tất cả ds nhân viên trong bảng
    const querry="SELECT * FROM nhanvien WHERE hienThi = 1 AND idVT != 'admin'";
    connection.query(querry, (err,results)=>{
        if (err) {
            console.error('Lỗi truy vẫn SQL: ' + err.message);
          } else {
            res.send(results);
          } 
    })
  }
  // GET[/getNhanVien:idNV]
  async getNhanVienByIdNV(req,res) {
    const { idNV } = req.params; 
    const selectQuery = "SELECT * FROM nhanvien WHERE idNV = ? AND hienThi=1";
    const selectValues = [idNV];
    
  
    connection.query(selectQuery, selectValues, (err, result) => {
      if (err) {
        console.error('Lỗi khi truy vấn SQL :', err);
        return;
      }
    
      if (result.length === 0) {
        res.status(404).json({ success: false, message: 'Không tìm thấy nhân viên với idNV ' + idNV });
      } else {

        const NhanVien = result[0];
        res.json({ success:true, NhanVien });
      }
    });
  }

  // POST[/addnewNhanVien]
  async addNewNhanVien(req,res) {
    const { idNV, matKhau, hoTen, ngaySinh, gioiTinh, diaChi, anh, hienThi, idVT ,dienThoai} = req.body;
    
    const checkID = "SELECT COUNT(*) AS count FROM nhanvien WHERE idNV = ?";
    const checkValues = [idNV];
    const ngaySinhValue=new Date(ngaySinh);

    connection.query(checkID, checkValues, (checkErorr, checkResult) => {
    if (checkErorr) {
      console.error('Lỗi khi kiểm tra idNV:', checkErorr);
      return;
    }
    if (checkResult[0].count > 0) {
      res.status(400).json({ success: false, message: 'idNV đã tồn tại trong bảng' });
    } else {
      const insertQuery = `INSERT INTO nhanvien (idNV, matKhau, hoTen, ngaySinh, gioiTinh, diaChi, anh, hienThi, idVT,dienThoai)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
      const insertValues = [idNV, matKhau, hoTen, ngaySinhValue, gioiTinh, diaChi, anh, hienThi, idVT,dienThoai];

      connection.query(insertQuery, insertValues, (err, results) => {
        if (err) {
          console.error('Lỗi khi thực hiện truy vấn SQL để thêm nhân viên:', err);
          res.status(500).json({ success: false, message: 'Lỗi khi thêm nhân viên' });
          return;
        }

        res.json({ success: true, message: 'Nhân viên đã được thêm thành công' });
        console.log("====",insertValues)
      });
      }
    });
  }

  // PUT[/updateNhanVien:idNV]
  async updateNhanVien(req,res){
    const idNV = req.params.idNV; 
    const { matKhau, hoTen, ngaySinh, gioiTinh, diaChi, anh, hienThi, idVT, dienThoai } = req.body;
    const ngaySinhValue=new Date(ngaySinh);
  
    // Truy vấn SQL để cập nhật thông tin nhân viên dựa trên idNV
    const updateQuery = `UPDATE nhanvien SET matKhau = ?, hoTen = ?, ngaySinh = ?, gioiTinh = ?, diaChi = ?, anh = ?, hienThi = ?, idVT = ?, dienThoai = ?
    WHERE idNV = ?`;
  
    const updateValues = [matKhau, hoTen, ngaySinhValue, gioiTinh, diaChi, anh, hienThi, idVT, dienThoai, idNV];
  
    connection.query(updateQuery, updateValues, (err, results) => {
      if (err) {
        console.error('Lỗi khi cập nhật thông tin nhân viên:', err);
        res.status(500).json({ success: false, message: 'Lỗi khi cập nhật thông tin nhân viên' });
        return;
      }
  
      if (results.affectedRows === 0) {
        res.status(404).json({ success: false, message: 'Không tìm thấy nhân viên với idNV đã cho' });
        return;
      }
      console.log("====",updateValues)

      res.json({ success: true, message: 'Thông tin nhân viên đã được cập nhật thành công' });
    });   

  }
  // PUT[/delete/:id]
  async deleteNhanVien(req,res){    
    const idNV = req.params.idNV; 
    const { hienThi } = req.body;
  
    const updateQuery = 'UPDATE nhanvien SET hienThi = ? WHERE idNV = ?';
  
    connection.query(updateQuery, [hienThi, idNV], (err, results) => {
      if (err) {
        console.error('Lỗi:', err);
        res.status(500).json({ success: false, message: 'Lỗi' });
        return;
      }
  
      if (results.affectedRows === 0) {
        res.status(404).json({ success: false, message: 'Không tìm thấy nhân viên với idNV đã cho' });
        return;
      }
  
      res.json({ success: true, message: 'Nhân viên đã được xoá thành công' });
    });
  }
  // POST[/login]
  async login(req,res){
    const { idNV, matKhau } = req.body;
    const querry = "SELECT * FROM nhanvien WHERE idNV = ? AND hienThi = 1";
    const selectValues = [idNV];

    connection.query(querry, selectValues, async (err, result) => {
      if (err) {
        console.error('Lỗi khi thực hiện truy vấn SQL:', err);
        return;
      }

      if (result.length === 0) {
        res.status(401).json({ success: false, message: 'Tên đăng nhập không tồn tại' });
      } else {
        const storedPassword = result[0].matKhau;
        if (storedPassword === matKhau) {
          res.json({ success: true, message: 'Đăng nhập thành công' });
        } else {
          res.status(401).json({ success: false, message: 'Mật khẩu sai' });
        }
      }
    });
  }

    

}
module.exports=new nhanVien();