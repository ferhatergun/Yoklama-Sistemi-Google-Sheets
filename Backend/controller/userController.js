const googleSheetsAuth = require("../services/googleSheetsAuth");
const getSheetsRow = require("../services/getSheetsRow");
const toLowerCase = require("../utils/toLowerCase");

const userAttendance = async (req, res) => {
  // Yoklama İşlemini gerçekleştiren fonksiyon
  const { studentIndex } = req.body; // Öğrenci indexini al
  const spreadsheetId = process.env.SPREAD_SHEET_ID; // Google Sheets belge kimliği
  try {
    const { client, googleSheets } = await googleSheetsAuth(); // Yetkilendirme al
    const { getRows } = await getSheetsRow(); // Tablodaki tüm verileri al

    // Öğrenci numarasının bulunduğu sütunu bul
    const studentColumnIndex =
      getRows.data.values[0].indexOf("öğrenci numarası");
    // studentColumnIndex = 0 dır çünkü öğrenci numarası ilk sütunda yer alır

    const lastColumnIndex = getRows.data.values[0].length - 1; // Son sütunun indeksini al
    // studentIndex excel de 5 ise matris te 4 numaradır diziler 0 dan başladığı için
    getRows.data.values[studentIndex - 1][lastColumnIndex] = 1; // En sondaki etkinlik sütununa 1 yaz

    // Veriyi güncelle
    googleSheets.spreadsheets.values.update({
      auth: client,
      spreadsheetId,
      range: "Sheet1!A:E",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: getRows.data.values,
      },
    });

    res
      .status(200)
      .json({ success: true, message: "Yoklama başarıyla güncellendi." });
  } catch (error) {
    console.error("Hata:", error);
    res.status(500).json({
      success: false,
      message: "Yoklama güncellenirken bir hata oluştu.",
    });
  }
};

const getUserCheck = async (req, res) => {
  let { name } = req.query;
  name = toLowerCase(name); // Kullanıcı adını küçük harfe çevir
  const { getRows } = await getSheetsRow();

  // İsim sütununun indeksini bul
  const nameColumnIndex = getRows.data.values[0].indexOf("İsim"); // İsim sütununun indeksini aldı // 1 oldu

  const matchingStudents = []; // eşleşen isimleri biriktirmek için boş bir dizi oluştur
  for (let i = 1; i < getRows.data.values.length; i++) {
    if (toLowerCase(getRows.data.values[i][nameColumnIndex]) === name) {
      matchingStudents.push({
        index: i + 1, // Satır numarası (1'den başladığı için +1) //* direkt exceldeki satır numarası
        values: getRows.data.values[i], // Öğrenciye ait tüm değerler
      });
    }
  }
  if (matchingStudents.length === 0) {
    res.status(200).json({ success: false, message: "Öğrenci bulunamadı." });
    return;
  }
  res.status(200).json({ success: true, data: matchingStudents });
};

module.exports = {
  userAttendance,
  getUserCheck,
};
