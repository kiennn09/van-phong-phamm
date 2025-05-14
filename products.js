const products = [
  { id: 1, name: "Bút Gel - Gel xóa được", price: 25000, category: "pen", image: "https://product.hstatic.net/1000230347/product/banner_4_dcecff80a8624c46b05d54b9bc67d45f_1__4b15247002d84f4d9d8980871acca8b7.png", rating: 4.5 },
  { id: 2, name: "Bìa lỗ - bìa lá đa năng A4", price: 45000, category: "notebook", image: "https://product.hstatic.net/1000230347/product/423saf_c4eda94cc51246fca3881b6daac1fc47.jpg", rating: 4.2 },
  { id: 3, name: "Hộp bút SP TP-PCA019/MR", price: 60000, category: "pen", image: "https://product.hstatic.net/1000230347/product/4asf_34983fe1f6294739a69afcbec51acaff.jpg", rating: 4.0 },
  { id: 4, name: "Máy tính văn phòng Flexio CAL-009", price: 250000, category: "stationery", image: "https://product.hstatic.net/1000230347/product/artboard_1_copy_cd75a5af63cf4788ad2104292ec96212.jpg", rating: 4.8 },
  { id: 5, name: "Ruột bút bi BPR-08 - Dùng cho bút bi TL-036", price: 5000, category: "pen", image: "https://product.hstatic.net/1000230347/product/fdsf_36841285099e4977a8ada272b01c0aac.jpg", rating: 4.1 },
  { id: 6, name: "Bút chì gỗ 2B GP-027", price: 20000, category: "pen", image: "https://product.hstatic.net/1000230347/product/421s_c04cd707420d48639c28985f8064b384.jpg", rating: 4.4 },
  { id: 7, name: "Bút bi Maxxie Điểm 10 TP-05t", price: 35000, category: "pen", image: "https://product.hstatic.net/1000230347/product/but-bi-maxxie-thien-long-diem-10-tp-05_ca7b8d11c86b46a58714fc857c971929.jpg", rating: 4.6 },
  { id: 8, name: "Bút Bi TL-097", price: 15000, category: "pen", image: "https://product.hstatic.net/1000230347/product/artboard_3_copy_8f01c213f3a9441dab0f3ceec27a670e.jpg", rating: 4.0 },
  { id: 9, name: "Bút bi - Ballpoint Pen Candee TL-019", price: 30000, category: "pen", image: "https://product.hstatic.net/1000230347/product/artboard_1_copy_2-1_dfb177d6d6254f818b82dda3bd74b390.jpg", rating: 4.7 },
  { id: 10, name: "Sách giúp bé làm quen môi trường Điểm 10 TP-LQMT02", price: 35000, category: "notebook", image: "https://product.hstatic.net/1000230347/product/1_f25f790d53554aea9f9d0cb235d0aa16.jpg", rating: 4.3 },
  { id: 11, name: "Sách hướng dẫn tô màu theo chủ đề cho bé khám phá thiên nhiên Arty Mouse Colokit COLORING AB-C001/AR", price: 20000, category: "notebook", image: "https://product.hstatic.net/1000230347/product/46sdf_60b8d8de709345338d2f0ac67c7b781f.jpg", rating: 4.1 },
  { id: 12, name: "Combo 10 Bìa bao sách Điểm 10 TP-BC01", price: 50000, category: "notebook", image: "https://product.hstatic.net/1000230347/product/5432sdf_1405e6d0466e475e858ed10bfec0e549.jpg", rating: 4.5 },
  { id: 13, name: "Sách hướng dẫn vẽ bằng màu nước Arty Mouse Colokit PAINTING AB-C004/AR", price: 65000, category: "notebook", image: "https://product.hstatic.net/1000230347/product/453fdsf_5ceb146275fd4494bda6b80ff859958e.jpg", rating: 4.9 },
  { id: 14, name: "Bộ sách Academic Listening Builder", price: 200000, category: "notebook", image: "https://product.hstatic.net/1000230347/product/upload_e4cc89ab1d2d452aa097ac216fd19ba8.jpg", rating: 4.6 },
  { id: 15, name: "Ream giấy A4 70 gsm IK Copy (500 tờ) - Hàng nhập khẩu Indonesia", price: 70000, category: "tool", image: "https://product.hstatic.net/1000230347/product/new26_227dafd725ce4ff3a1f65de31d4f2a4f.jpg", rating: 4.4 },
  { id: 16, name: "Combo giấy in văn phòng IK siêu tiết kiệm", price: 140000, category: "tool", image: "https://product.hstatic.net/1000230347/product/432dsgh_caa930d283254e3da62218cb2574ae04.jpg", rating: 4.2 },
  { id: 17, name: "Combo giấy in văn phòng IK Copy A4 80 gsm siêu tiết kiệm", price: 140000, category: "tool", image: "https://product.hstatic.net/1000230347/product/342safgfd_8aace3f939634d64960bee0032981aa5.jpg", rating: 4.0 },
  { id: 20, name: "Máy tính khoa học Flexio Fx509VN - Có hơn 240 tính năng", price: 300000, category: "stationery", image: "https://product.hstatic.net/1000230347/product/artboard_1_copy_a8c9d709215c4c6585c2cd8ca198f43f.jpg", rating: 4.9 },
  { id: 21, name: "Máy tính Flexoffice FLEXIO CAL-05P", price: 200000, category: "stationery", image: "https://product.hstatic.net/1000230347/product/432asdgfdh_683ed85e2c6640e88df0568a1d7a74da.jpg", rating: 4.5 },
  { id: 22, name: "Máy tính văn phòng Flexio CAL-011", price: 450000, category: "stationery", image: "https://product.hstatic.net/1000230347/product/artboard_1_copy_f7536bcfc2f94ce6a82346a47427bedf.jpg", rating: 4.7 },
  { id: 23, name: "Máy tính khoa học Flexio FX680VN", price: 350000, category: "stationery", image: "https://product.hstatic.net/1000230347/product/fx680vn3_955b4386c9de4aeea6566759d83d4830.jpg", rating: 4.6 },
  { id: 24, name: "Máy tính Flexoffice FLEXIO CAL-03S", price: 250000, category: "stationery", image: "https://product.hstatic.net/1000230347/product/cal-03s__8__83d5b1b4b1e24f33a42efdaec5c518fb.jpg", rating: 4.4 }
];

export default products;
