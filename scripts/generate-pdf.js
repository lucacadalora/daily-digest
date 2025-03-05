import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import htmlPdf from 'html-pdf';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HTML content for the PDF
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Permen ESDM No. 5 Tahun 2025</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
      line-height: 1.6;
    }
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }
    h2 {
      color: #444;
      margin-top: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .content {
      margin-bottom: 30px;
    }
    .footer {
      text-align: center;
      margin-top: 50px;
      font-size: 0.9em;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Permen ESDM No. 5 Tahun 2025</h1>
    <h2>Analisis Permen ESDM No. 5 Tahun 2025</h2>
    <h3>Komparasi dan Analisis Perubahan antara Permen ESDM No. 5/2025 (yang Mencabut Permen ESDM No. 10/2017) dan Perpres 112/2022</h3>
  </div>
  
  <div class="content">
    <h2>Pendahuluan</h2>
    <p>Dokumen ini memberikan analisis komprehensif tentang perubahan regulasi dalam Peraturan Menteri Energi dan Sumber Daya Mineral No. 5 Tahun 2025 dibandingkan dengan Peraturan Menteri ESDM No. 10 Tahun 2017 yang telah dicabut, serta kaitannya dengan Peraturan Presiden Nomor 112 Tahun 2022.</p>
    
    <h2>Poin-poin Utama Perubahan</h2>
    <p>Beberapa aspek kunci yang mengalami perubahan signifikan dalam regulasi baru ini meliputi:</p>
    <ul>
      <li>Perubahan dalam skema perizinan pertambangan</li>
      <li>Penyederhanaan proses administrasi</li>
      <li>Penguatan ketentuan lingkungan hidup</li>
      <li>Peningkatan pengawasan operasional</li>
      <li>Harmonisasi dengan regulasi terkait lainnya</li>
    </ul>
    
    <h2>Implikasi untuk Industri</h2>
    <p>Perubahan regulasi ini membawa implikasi penting bagi pelaku industri pertambangan dan energi di Indonesia, termasuk:</p>
    <ul>
      <li>Penyesuaian strategi operasional</li>
      <li>Kepatuhan terhadap standar lingkungan yang lebih ketat</li>
      <li>Peluang investasi baru dalam teknologi ramah lingkungan</li>
      <li>Penyesuaian struktur biaya operasional</li>
    </ul>
  </div>
  
  <div class="footer">
    <p>Dokumen Analisis - Tanggal 5 Maret 2025</p>
    <p>Kementerian Energi dan Sumber Daya Mineral Republik Indonesia</p>
  </div>
</body>
</html>
`;

// PDF generation options
const options = {
  format: 'A4',
  orientation: 'portrait',
  border: {
    top: '20mm',
    right: '20mm',
    bottom: '20mm',
    left: '20mm'
  }
};

// Ensure the directory exists
const pdfDir = path.join(__dirname, '../public/documents/law');
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

// PDF file path
const pdfPath = path.join(pdfDir, 'Permen_ESDM_No_5_Tahun_2025.pdf');

// Generate PDF
pdf.create(htmlContent, options).toFile(pdfPath, (err, res) => {
  if (err) {
    console.error('Error generating PDF:', err);
    return;
  }
  console.log('PDF successfully created:', res.filename);
});