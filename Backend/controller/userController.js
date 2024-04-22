const googleSheetsAuth = require("../services/googleSheetsAuth");
const getSheetsRow = require("../services/getSheetsRow");
const toLowerCase = require("../utils/toLowerCase");

const userAttendance= async (req, res) => {
    // Yoklama İşlemini gerçekleştiren fonksiyon
    const { studentIndex } = req.body; // Öğrenci numarasını al
    const spreadsheetId = process.env.SPREAD_SHEET_ID  // Google Sheets belge kimliği
    console.log("studentIndex", studentIndex);

    try {
        const { client, googleSheets } = await googleSheetsAuth(); // Yetkilendirme al
        const { getRows } = await getSheetsRow() // Tablodaki tüm verileri al

        // Öğrenci numarasının bulunduğu sütunu bul
        const studentColumnIndex = getRows.data.values[0].indexOf("öğrenci numarası");
        // studentColumnIndex = 0 dır çünkü öğrenci numarası ilk sütunda yer alır

        const lastColumnIndex = getRows.data.values[0].length -1; // Son sütunun indeksini al
        // studentIndex excel de 5 ise matris te 4 numaradır diziler 0 dan başladığı için
        getRows.data.values[studentIndex-1][lastColumnIndex] = 1; // En sondaki etkinlik sütununa 1 yaz


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

        res.status(200).json({ success: true, message: "Yoklama başarıyla güncellendi." });
    } catch (error) {
        console.error("Hata:", error);
        res.status(500).json({ success: false, message: "Yoklama güncellenirken bir hata oluştu." });
    }
}

const getUserCheck = async (req, res) => {
    let { name } = req.query;
    name = toLowerCase(name); // Kullanıcı adını küçük harfe çevir
    const spreadsheetId = process.env.SPREAD_SHEET_ID 
    const { client, googleSheets } = await googleSheetsAuth();
    const { getRows } = await getSheetsRow()
    
    // İsim sütununun indeksini bul
    const nameColumnIndex = getRows.data.values[0].indexOf("İsim"); // İsim sütununun indeksini aldı // 1 oldu
    console.log("nameColumnIndex", nameColumnIndex);

    const matchingStudents = []; // eşleşen isimleri biriktirmek için boş bir dizi oluştur
    for (let i = 1; i < getRows.data.values.length; i++) {
      if (toLowerCase(getRows.data.values[i][nameColumnIndex]) === name) {
        matchingStudents.push({
          index: i + 1, // Satır numarası (1'den başladığı için +1) //* direkt exceldeki satır numarası
          values: getRows.data.values[i], // Öğrenciye ait tüm değerler
        });
      }
    }
    if(matchingStudents.length === 0) {
        res.status(200).json({ success: false, message: "Öğrenci bulunamadı." });
        return;
    }
    res.status(200).json({ success: true, data: matchingStudents });

}

module.exports = {
    userAttendance,
    getUserCheck
};


// matriste öğrenci numarası ile işleşen satırdaki son sütuna 1 yazdıran kod yedekte kalsın
        // Her öğrenci için öğrenci numarasını kontrol et ve en son etkinlik sütununa 1 yaz
/*         for (let i = 1; i < getRows.data.values.length; i++) {
            // i=1 den başlıyor çünkü 0. satır başlık satırıdır
            // kaç tane öğrenci varsa o kadar döngü dönecek
            // tüm öğrenciler için öğrenci numarasını kontrol eder
            if (getRows.data.values[i][studentColumnIndex] == studentNumber)
            //getRows.data.values[i][0] yani öğrenci numarası ile girilen öğrenci numarasını karşılaştırıyoruz
            {
                const lastColumnIndex = getRows.data.values[0].length; // Son sütunun indeksini al
                getRows.data.values[i][lastColumnIndex - 1] = 1; // En sondaki etkinlik sütununa 1 yaz
                break; // Öğrenci bulunduğunda döngüden çık
            }
        } */