CREATE TABLE IF NOT EXISTS SanPham(
    idSP INT AUTO_INCREMENT PRIMARY KEY,
    ten VARCHAR(255) NOT NULL,
    giaThue FLOAT,
    hienThi INT

    );    
CREATE TABLE IF NOT EXISTS DichVu(
    idDV INT AUTO_INCREMENT PRIMARY KEY,
    ten VARCHAR(255) NOT NULL,
    giaThue FLOAT,
    hienThi INT
    );   
CREATE TABLE IF NOT EXISTS NhanVien(
    idNV VARCHAR(255) PRIMARY KEY,
    matKhau VARCHAR(255) NOT NULL,
    hoTen VARCHAR(255) NOT NULL,
    ngaySinh DATE NOT NULL,
    gioiTinh VARCHAR(255),
    diaChi VARCHAR(255),
    anh VARCHAR(100000),
    hienThi INT,
    idVT VARCHAR(255),
    dienThoai VARCHAR(11)
    );
CREATE TABLE IF NOT EXISTS KhachHang(
    idKH INT AUTO_INCREMENT PRIMARY KEY,
    tenKH1 VARCHAR(255) NOT NULL,
    tenKH2 VARCHAR(255) NOT NULL,
    diaChi1 VARCHAR(255),
    diaChi2 VARCHAR(255),
    hienThi INT);  
    
CREATE TABLE IF NOT EXISTS HopDong(
    idHD INT AUTO_INCREMENT PRIMARY KEY,
    tienCoc FLOAT NOT NULL,
    tongTien FLOAT NOT NULL,
    ghiChu VARCHAR(255),
    ngayTao DATE,
    hienThi INT,
    idNV VARCHAR(255),
    idKH INT,
    FOREIGN KEY (idNV) REFERENCES NhanVien(idNV),
    FOREIGN KEY (idKH) REFERENCES KhachHang(idKH)   
);  
CREATE TABLE IF NOT EXISTS HopDongChiTiet(
    idHDCT INT AUTO_INCREMENT PRIMARY KEY,
    giam FLOAT NOT NULL,
    ngayThucHien DATE,
    idHD INT,
    idSP INT,
    idDV INT,    
    FOREIGN KEY (idHD) REFERENCES HopDong(idHD),
    FOREIGN KEY (idSP) REFERENCES SanPham(idSP),
    FOREIGN KEY (idDV) REFERENCES DichVu(idDV)       
);
CREATE TABLE IF NOT EXISTS ThongBao(
    idTB INT AUTO_INCREMENT PRIMARY KEY,
    hienThi INT,
    idHDCT INT,
    FOREIGN KEY (idHDCT) REFERENCES HopDongChiTiet(idHDCT)   
);  
CREATE TABLE IF NOT EXISTS CongViec(
    idCV INT AUTO_INCREMENT PRIMARY KEY,
    hienThi INT,
    ghiChu VARCHAR(255),
    idHDCT INT,
    FOREIGN KEY (idHDCT) REFERENCES HopDongChiTiet(idHDCT)   
);  
CREATE TABLE IF NOT EXISTS ThamGia(
    idTG INT AUTO_INCREMENT PRIMARY KEY,
    idCV INT,
    idNV VARCHAR(255),
    FOREIGN KEY (idCV) REFERENCES CongViec(idCV),
    FOREIGN KEY (idNV) REFERENCES NhanVien(idNV)    
); 

INSERT INTO VaiTro (name) VALUES("admin");
INSERT INTO VaiTro (name) VALUES ("Thợ Ảnh");
INSERT INTO VaiTro (name) VALUES ("Make Up");
INSERT INTO VaiTro (name) VALUES ("Lái Xe");
INSERT INTO VaiTro (name) VALUES ("Nhân Viên");
INSERT INTO VaiTro (name) VALUES ("Hậu Cần");

INSERT INTO NhanVien VALUES ("admin","abcxyz","Admin",2002-12-2,"Nam","Đà Nẵng","",1,"admin");
INSERT INTO NhanVien VALUES ("ngocnt1","abcxyz","Ngọc Gianr",2002-12-2,"Nam","Đà Nẵng","",1,"Thợ Ảnh");
INSERT INTO NhanVien VALUES ("tuannt2","abcxyz","Tuấn Đăng",2002-12-2,"Nam","Đà Nẵng","",1,"Thợ Ảnh");
INSERT INTO NhanVien VALUES ("namnt","abcxyz","Nam Nguyễn",2002-12-2,"Nam","Đà Nẵng","",1,"Thợ Ảnh");
INSERT INTO NhanVien VALUES ("nguyennv","abcxyz","Ngọc Nguyên",2002-12-2,"Nam","Đà Nẵng","",1,"Thợ Ảnh");
    
   