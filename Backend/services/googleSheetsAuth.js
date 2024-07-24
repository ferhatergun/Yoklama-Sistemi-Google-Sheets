const { google } = require("googleapis");

const getAuth = async () => {
  const spreadsheetId = process.env.SPREAD_SHEET_ID; // Google Sheets belge kimliği
  const auth = new google.auth.GoogleAuth({
    keyFile: "yoklama-sistemi-key.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Yetkilendirme al
  const client = await auth.getClient();

  // Google Sheets API istemcisini oluştur
  const googleSheets = google.sheets({ version: "v4", auth: client });

  return {
    client,
    googleSheets,
  };
};

module.exports = getAuth;
