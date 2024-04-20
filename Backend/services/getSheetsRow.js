const googleSheetsAuth = require("./googleSheetsAuth");

const getRow = async () => {
    const spreadsheetId = process.env.SPREAD_SHEET_ID  // Google Sheets belge kimliği
    // Veri okuma
    const { client, googleSheets } = await googleSheetsAuth();
    // Google Sheets API istemcisini al
    const getRows = await googleSheets.spreadsheets.values.get({
        auth: client,
        spreadsheetId,
        range: "Sheet1!A:E",
    });

    return {
        getRows
    };

}

module.exports = getRow;